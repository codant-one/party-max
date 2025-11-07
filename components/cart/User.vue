<script setup>

  import HoverIcon from '@/components/app/HoverIcon.vue'
  import user_alt from '@assets/icons/user-icon.svg?inline'
  import user_solid from '@assets/icons/user-icon-solid.svg?inline'

  const emit = defineEmits(['login'])

  const password = ref('')
  const showPassword = ref(false)
  const isLoggedIn = ref(false)
  const userName = ref('')
  const userEmail = ref('')

  const maskedEmail = computed(() => {
    const email = userEmail.value || ''
    const [user, domain] = email.split('@')
    if (!user || !domain) return email
    const start = user.slice(0, 3)
    const end = user.slice(-2)
    return `${start}${'*'.repeat(Math.max(user.length - 5, 3))}${end}@${domain}`
  })

  const onSubmit = () => {
    if (password.value.trim().length === 0) return
    emit('login', password.value)
  }

  onMounted(() => {
    if (process.client && localStorage.getItem('user_data')) {
      try {
        const userDataJ = JSON.parse(localStorage.getItem('user_data'))
        isLoggedIn.value = true
        userName.value = userDataJ?.name || ''
        userEmail.value = userDataJ?.email || ''
      } catch (e) {
        // ignore parse errors
      }
    }
  })

</script>

<template>

  <VCardText v-if="isLoggedIn" class="p-0 mt-3 px-5 d-flex align-center">
    <HoverIcon :icon-alt="user_alt" :icon-solid="user_solid" class="me-3 cursor-no-pointer" />
    <div class="d-block">
      <div class="tw-text-gray">Hola,</div>
      <div class="tw-font-semibold">{{ userName || 'Usuario' }} <span v-if="userEmail">({{ maskedEmail }})</span></div>
    </div>
  </VCardText>

  <VCardText v-else class="px-5 pt-2">
    <VRow no-gutters class="align-center">
      <VCol cols="12" md="8" class="pr-md-3">
        <VTextField
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          placeholder="Ingresa tu Contraseña"
          class="textinput"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="showPassword = !showPassword"
        />
      </VCol>
      <VCol cols="12" md="4" class="pt-2 pt-md-0">
        <VBtn
          block
          variant="flat"
          class="btn-register tw-text-white tw-bg-primary button-hover"
          @click="onSubmit"
        >
          INICIAR SESIÓN
        </VBtn>
      </VCol>
    </VRow>
  </VCardText>

</template>

<style scoped>
    
    .btn-order {
        border-radius: 32px;
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        height: 54px;
        width: 177px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
        box-shadow: none;
    }

    .btn-order:hover {
        border: 1px solid var(--Maastricht-Blue, #0A1B33) !important;
        background: var(--Maastricht-Blue, #0A1B33) !important;
        color: #FFFFFF!important;
    }

    .btn-order:hover::v-deep(path) {
        fill: #FFFFFF;
    }

    .textinput .v-text-field::v-deep(.v-field) { 
        border-radius: 8px;
        height: 35px;
        font-size: 14px;
    }

    .v-text-field::v-deep(.v-field__outline) {
        border-radius: 8px;
    }

    .v-text-field::v-deep(.v-field__outline__start) {
        flex: 0 0 17px !important;
        border-start-start-radius: 8px;
    }

    .v-text-field::v-deep(::placeholder) { 
        color: #999999 !important;
        font-size: 15px;
        opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
        padding-top: 0 !important;
        padding-left: 20px !important;
    }

    .textinput .v-text-field::v-deep(.v-input__details) {
        min-height: 15px !important;
    }


    .textinput .v-text-field::v-deep(.v-field-label) {
        top: 33% !important;
        font-size: 14px !important;
    }

    .v-textarea::v-deep(.v-field-label) {
        top: 10% !important;
        font-size: 14px !important;
    }

    .v-text-field::v-deep(.v-field__append-inner) { 
        padding-top: 8px !important;
        align-items: start !important;
    }

    .v-autocomplete::v-deep(.v-field__overlay) {
        background: white !important;
    }

    .v-autocomplete::v-deep(.v-field__input) { 
        padding-top: 0 !important;
    }

    .v-autocomplete::v-deep(.v-input__prepend) {
        margin-inline-end: 0 !important;
    }

    .v-textarea::v-deep(.v-field) { 
        border-radius: 24px !important;
    }

    .v-checkbox::v-deep(.v-selection-control) {
        min-height: 15px;
    }
    
    .v-checkbox::v-deep(.v-label) {
        color:#0A1B33;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
        margin-left: 10px;
    }

    .v-checkbox::v-deep(.v-input__details) { 
        min-height: 0 !important;
        padding: 0 !important;
        height: 0 !important;
    }

    .border-title {
        border-bottom: 1px solid #D9EEF2;
    }

    .title-summary {
        color: #0A1B33;
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .title-card {
        color: #0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-cardp {
        border-bottom: 1px solid #D9EEF2;
        border-top: 1px solid #D9EEF2;
    }
    
    .row-cardp2 {
        border-bottom: 1px solid #D9EEF2;
        height:100px;
        padding: 32px;

    }

    .row-cardp3 {
        padding: 16px 32px;
    }

    .row-cardp3 span {
        color: #FF0090;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .row-cardp3 h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-cardelivery3 {
        margin-top:20px;
        padding-top:20px;
        padding-bottom:20px;
        border-top: 1px solid #E2F8FC;

    }

    .row-cardelivery3 h4 {
        color:#0A1B33;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .card-bono {
        display: flex;
        padding: 24px 32px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        margin-top:16px;
        border-radius: 16px;
        box-shadow: none;
    }

    .button-bono {
        display: flex;
        height: 16px;
        padding: 16px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 32px;
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        color:#0A1B33;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px; 
        margin-left: 16px;
    }

    .button-bono:hover {
        border: 1px solid var(--Maastricht-Blue, #0A1B33);
        background: var(--Maastricht-Blue, #0A1B33);
        color: #FFFFFF!important;
    }

    .row-total {
        width:100%;
        border-bottom: 1px solid  #E2F8FC;
        padding: 16px 32px;
    }

    .row-total h4 {
        color: #0A1B33;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align:left;

    }

    .row-total h5 {
        color: #FF0090;
        text-align: right;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .row-realizar {
        padding: 15px;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }

    .row-realizar button {
        display: flex;
        width: 100%;
        height: 54px;
        padding: 0px 32px;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        background:  #FF0090;
        color: #FFF;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 14px; 
    }

    .row-realizar button:hover {
        background:  #FF27B3;
        box-shadow: 0px 0px 24px 0px #FF27B3;
    }

    .row-payu span, p {
        color: #999;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
    }

    @media only screen and (max-width: 767px) {

        .form-payment {
            width: 100%!important;
        }

        .title-summary, .title-card {
            font-size: 20px !important;
        }

        .row-payu span, p {
            font-size: 14px !important;
        }

        .btn-register, .btn-order {
            width: 100%;
        }
    }

</style>