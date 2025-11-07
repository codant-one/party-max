<script setup>

import { useRuntimeConfig } from '#app'

const props = defineProps({
  validated: {
    type: Boolean,
    required: true,
  }
})

const config = useRuntimeConfig()
const baseURL = ref(config.public.APP_DOMAIN_API_URL)

const emit = defineEmits(['google-auth-error'])

const waitingAuth = ref(false)
let popupRef = null

const onValidate = () => {
  if(! props.validated ){
    // Emitir evento de error para que el padre active la validación
    //console.error('error', "Check Terminos " + props.validated)
    emit('google-auth-error')
  } else {
    // Abrir popup centrado y mostrar overlay
    // Forzar un nuevo flujo: limpiar cualquier token previo
    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token')
      localStorage.removeItem('user_data')
      localStorage.removeItem('userAbilities')
    } catch (e) {}

    const width = 520
    const height = 640
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height
    const left = screenWidth / 2 - width / 2 + dualScreenLeft
    const top = screenHeight / 2 - height / 2 + dualScreenTop
    const features = `scrollbars=yes,width=${width},height=${height},top=${top},left=${left},noopener=no,noreferrer=no,resizable=yes`

    const redirectUrl = baseURL.value + '/auth/google/redirect?prompt=select_account&force_auth=1'
    popupRef = window.open(redirectUrl, 'google_oauth', features)
    console.log('redirectUrl =', redirectUrl)
    waitingAuth.value = true

    // Listener para recibir credenciales desde callback
    window.addEventListener('message', handleAuthMessage, false)

    // Fallback timeout para evitar overlay infinito si no llega mensaje
    setTimeout(() => {
      if (waitingAuth.value) {
        waitingAuth.value = false
        window.removeEventListener('message', handleAuthMessage)
      }
    }, 60000)
  }
}

function handleAuthMessage(event) {
  try {
    // Opcional: validar event.origin si tu backend está en el mismo dominio público
    const data = event.data || {}
    if (data && data.type === 'google-auth-success') {
      // Guardar tokens en localStorage para mantener coherencia con el resto del flujo
      const tokenData = data.payload || {}
      if (tokenData.accessToken) localStorage.setItem('accessToken', tokenData.accessToken)
      if (tokenData.token) localStorage.setItem('token', tokenData.token)
      if (tokenData.user_data) localStorage.setItem('user_data', JSON.stringify(tokenData.user_data))
      if (tokenData.userAbilities) localStorage.setItem('userAbilities', JSON.stringify(tokenData.userAbilities))
      waitingAuth.value = false
      window.removeEventListener('message', handleAuthMessage)
      // Redirigir a dashboard
      window.location.assign('/dashboard/profile')
    }
    if (data && data.type === 'google-auth-error') {
      waitingAuth.value = false
      try { if (popupRef) popupRef.close() } catch (e) {}
      window.removeEventListener('message', handleAuthMessage)
      emit('google-auth-error')
    }
  } catch (e) {
    waitingAuth.value = false
    window.removeEventListener('message', handleAuthMessage)
    emit('google-auth-error')
  }
}

</script>

<template>
    <div cols="12" class="d-block">
        <span class="text-client text-left">ó</span> <br>
    </div>

    <VCardText class="d-block align-center text-center justify-content-center">
        
        <button 
            class="gsi-material-button w-100"
            type="button"
            @click="onValidate()"
        >
            <div class="gsi-material-button-state"></div>
            <div class="gsi-material-button-content-wrapper">
                <div class="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                </div>
                <span class="gsi-material-button-contents">Iniciar sesión con Google</span>
                <span style="display: none;">Iniciar sesión con Google</span>
            </div>
        </button>
    </VCardText>
  <VDialog v-model="waitingAuth" persistent max-width="400">
    <VCard class="px-6 py-6">
      <VCardText class="text-center">
        <VProgressCircular indeterminate color="primary" class="mb-4" />
        <div>Conectando con Google…</div>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn color="primary" variant="outlined" @click="waitingAuth = false">Cancelar</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  
</template>

<style scoped>

  .gsi-material-button {
    width: 100%;
    border: 1px solid #D9EEF2;
    border-radius: 32px;
    background-color: #ffffff;
    padding: 10px 16px;
  }

  .gsi-material-button-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .gsi-material-button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .gsi-material-button-contents {
    text-align: center;
    font-weight: 600;
    color: #0A1B33;
  }

  .oauth-frame {
    width: 100%;
    height: 80vh;
    border: 0;
  }

</style>