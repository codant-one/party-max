<script setup>

import { useRouter } from 'vue-router'
import festin_image2 from '@assets/images/festin-register.jpg';
import icon2 from '@assets/icons/input-user.svg';
import icon4 from '@assets/icons/icon-password.svg';
import check_circle from '@assets/icons/check-circle.svg';
import error_circle from '@assets/icons/error-circle.svg';
import GoogleAuth from '/components/common/GoogleAuth.vue'

const router = useRouter()
const route = useRoute()

const { isMobile } = useDevice();
const isDialogVisible = ref(false)
const message = ref('')
const isError = ref(false)
const isPopup = ref(false)

// Ejecutar solo en el cliente
onMounted(() => {
    if (process.client) {
        isPopup.value = !!(window.opener && window.opener !== window)
    }
    fetchData()
})

async function fetchData() {
    // Verificar que estamos en el cliente
    if (process.client) {
        try {
            // Obtener los parámetros de la URL
            const data = route.query.data
            if (data){
                const tokenData = JSON.parse(atob(decodeURIComponent(data)));

                // Si viene desde popup, devolver datos al opener
                if (window.opener && window.opener !== window) {
                    window.opener.postMessage({ type: 'google-auth-success', payload: tokenData }, '*')
                    window.close()
                    return
                }
                // Flujo directo: Guardar en localStorage y redirigir
                localStorage.setItem('accessToken', tokenData.accessToken)
                localStorage.setItem('token', tokenData.token)
                localStorage.setItem('user_data', JSON.stringify(tokenData.user_data))
                localStorage.setItem('userAbilities', JSON.stringify(tokenData.userAbilities))
                router.push({ name: 'dashboard-profile' })
            } else {
                const error = route.query.error

                // Notificar error a opener si es popup
                if (window.opener && window.opener !== window) {
                    window.opener.postMessage({ type: 'google-auth-error', payload: error }, '*')
                    window.close()
                    return
                }
                isDialogVisible.value = true
                message.value = error
                isError.value = true

                setTimeout(() => {
                    isDialogVisible.value = false
                    message.value = ''
                    isError.value = false

                    router.push({ name: 'login' });
                }, 3000)
            }
            
        } catch (error) {
            console.error('Error en fetchData:', error)
            // Manejar error - podrías redirigir a login o mostrar un mensaje
        }
    }
}

function handleGoogleAuthError() {
    isDialogVisible.value = true
    message.value = 'No se pudo continuar con Google. Inténtalo de nuevo.'
    isError.value = true
    setTimeout(() => {
        isDialogVisible.value = false
        message.value = ''
        isError.value = false
        router.push({ name: 'login' });
    }, 3000)
}

</script>

<template>
    <VContainer v-if="!isPopup" class="mt-1 mt-md-10">  
        <VRow no-gutters>
            <VCard
                :width="500" 
                class="no-shadown card-register d-block text-center mx-auto">
                <VImg :src="festin_image2" class="img-festin mx-auto d-none d-md-block"/>
                <VCardText class="subtitle-register p-0 mb-5 mb-md-0">
                    ¡Bienvenidx a la fiesta!
                </VCardText>
                <VCardItem class="client-card">
                    <VRow no-gutters class="text-left align-center">
                        <VCol cols="12" class="d-flex text-left mb-2">
                            <img :src="icon2" alt="Icono de Usuario" class="me-3"/>
                            <div class="d-block">
                                <span class="text-client text-left">E-mail o usuario</span> <br>
                            </div>
                        </VCol>
                        <VCol cols="12" class="mb-1">
                            <VTextField
                                label="E-mail"
                                variant="outlined"
                                type="email"
                            />
                        </VCol>

                        <VCol cols="12" class="d-flex text-left mb-2">
                        <img :src="icon4" alt="Icono de Contraseña" class="me-3"/>
                        <div cols="10" class="d-block">
                            <span class="text-client text-left">Contraseña</span> <br>
                        </div>
                    </VCol>
                    <VCol cols="12">
                        <VTextField
                            label="Contraseña"
                            variant="outlined"
                            append-inner-icon="mdi-eye-outline"
                        />
                    </VCol>
                    </VRow>
                </VCardItem>
                <VCardText class="d-block d-md-flex text-center align-center flex-wrap justify-space-between pb-0">
                    <VCheckbox
                        color="primary"
                        label="Recordar mi cuenta"/>
                    <NuxtLink
                        class="letter hover:tw-text-primary"
                        :to="{ name: 'clients-forgot_password' }"
                    >
                        ¿Olvidaste tu contraseña?
                    </NuxtLink>
                </VCardText>
                <VCardText class="d-block align-center text-center justify-content-center">
                    <VBtn
                        variant="flat"
                        :width="288"
                        :height="48"
                        block
                        type="submit"
                        class="btn-register tw-text-white tw-bg-primary button-hover"
                    >
                        Iniciar sesión
                    </VBtn>
                </VCardText>

                <GoogleAuth 
                    :validated="true" 
                    @google-auth-error="handleGoogleAuthError" 
                />
                
            </VCard>
        </VRow>
    
        <!--PopUp Message-->
        <VDialog v-model="isDialogVisible" >
            <VCard 
                class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
                <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" class="mx-auto"/>
                <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
                {{ message }}
            </VCardText>
            </VCard>
        </VDialog>
    </VContainer>
    <div v-else class="d-flex align-center justify-center" style="height: 60vh;">
        <VProgressCircular indeterminate color="primary" class="me-3"/>
        <span>Procesando inicio de sesión…</span>
    </div>
</template>


<style scoped>
    .hover-icon-arrow-right:hover::v-deep(path) {
        fill: #FF0090;
    }

    .more {
        text-align: end;
        display: contents;
    }

    .card-register {
        padding: 20px;
        border-radius: 32px !important;
        width: 500px; 
    }

    .img-festin {
        width: 164px!important;
        height: auto;
    }

    .subtitle-register {
        color: #FF0090;
        text-align: center;
        font-size: 23px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px;
        margin-top: 34px;   
    }

    .text-register {
        color:#0A1B33;
        text-align: center;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 133.333% */
    }

    .text-message {
        color:  #FF0090;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 30px; 
        padding: 0 80px !important;
    }

    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
    }

    .btn-register {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        border-radius: 32px;
    }

    .button-hover:hover {
        background-color: #FF27B3 !important;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }
   
    .v-text-field::v-deep(.v-field) { 
        border-radius: 24px;
        height: 35px;
        font-size: 14px;
    }
    
    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 24px;
    }
    
    .v-text-field::v-deep(.v-field__outline__start) {
        border-start-start-radius: 24px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #0A1B33 !important;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 12px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
    }

    .text-client {
        color: #0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 8px; /* 50% */
    }

    .p-client {
        color:  #999;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 8px; /* 50% */
    }

    @media only screen and (max-width: 767px) {
        .card-register {
            width: auto;
            padding: 40px 20px !important;
        }

        .subtitle-register {
            font-size: 20px;
            line-height: 24px; /* 120% */
        }

        .img-festin {
            width: 120px !important;
            height: auto;
            display: none;
        }

        .v-row.v-row--no-gutters > .v-col, .v-row.v-row--no-gutters > [class*=v-col-] {
            line-height: 20px;
        }
    }
</style>