<script setup>

import { ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { emailValidator, requiredValidator } from '@validators'
import { useMiscellaneousStores } from "@/stores/miscellaneous"
import icophone from '@assets/icons/phone-footer.svg'
import icochat from '@assets/icons/chat_bubble.svg'
import icomail from '@assets/icons/letter.svg'
import icostore from '@assets/icons/store_icon.svg'
import icosearch from '@assets/icons/youtube_icon.svg'
import instagram from '@assets/icons/instagram_magenta.svg?inline'
import facebook from '@assets/icons/facebook_magenta.svg?inline'
import whatsapp_magenta from '@assets/icons/whatsapp_magenta.svg?inline'
import partymax_logo from '@assets/images/logo.svg';

import payu from '@assets/images/payu/payu.svg'
import bancodebogota from '@assets/images/payu/bancodebogota.svg'
import visa from '@assets/images/payu/visa.png'
import pagobancolombia from '@assets/images/payu/pagobancolombia.png'
import pse from '@assets/images/payu/pse.png'
import sured from '@assets/images/payu/sured.png'
import nequi from '@assets/images/payu/nequi.png'
import mastercard from '@assets/images/payu/mastercard.png'
import gpay from '@assets/images/payu/gpay.png'
import efecty from '@assets/images/payu/efecty.png'
import diners from '@assets/images/payu/diners.png'
import davivienda from '@assets/images/payu/davivienda.png'
import codensa from '@assets/images/payu/codensa.png'
import breb from '@assets/images/payu/bre-b.png'
import bancolombia from '@assets/images/payu/bancolombia.png'
import amex from '@assets/images/payu/amex.svg'

const recaptchaInstance = useReCaptcha();
const miscellaneousStores = useMiscellaneousStores()

const currentYear = ref(new Date().getFullYear())
const terms = ref(false)
const background = ref('tw-bg-white')
const route = useRoute()
const isConnected = ref(false)

const refVForm = ref()
const name = ref('')
const email = ref('')
const message = ref('')

const errors = ref({
  name: undefined,
  email: undefined,
  message: undefined
})

const inputChange = () => {
  errors.value = {
    name: undefined,
    email: undefined,
    message: undefined
  }
}

watchEffect(fetchData)

async function fetchData() {
  isConnected.value = false

  if(route.name === 'about' || route.name === 'help' || 
      route.path?.startsWith('/products') ||
      route.path?.startsWith('/services')) {
    // background.value = 'tw-bg-light_cyan_2'
    background.value = 'tw-bg-white'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'dashboard' || route.name === 'dashboard-profile' ||
     route.name === 'dashboard-purchases' || route.name === 'dashboard-coupons' ||
     route.name === 'dashboard-favorites' || route.name === 'dashboard-information' ||
     route.name === 'dashboard-security' || route.name === 'dashboard-address' ||
     route.name === 'dashboard-purchases-id' || route.name === 'dashboard-rating-id') {
    isConnected.value = true
  }
}

const recaptcha = async () => {
    await recaptchaInstance?.recaptchaLoaded();

    const token = await recaptchaInstance?.executeRecaptcha('contact_form');

    return token;
};

const redirectTo = (url) => {
  if (url) {
    window.open(url, '_blank');
    // window.location.href = url
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
        miscellaneousStores.setLoading(true)
        const token = await recaptcha();
        
        let data = {
          email: email.value,
          name: name.value,
          message: message.value,
          recaptcha_token: token
        }

        miscellaneousStores.contactUs(data)
          .then(response => {
              name.value = ''
              email.value = ''
              message.value = ''
              terms.value = false
              errors.value = {
                name: '', 
                email: '',
                message: ''
              }
              miscellaneousStores.setLoading(false)
              miscellaneousStores.setMessage('¡Gracias por escribirnos! Hemos recibido tu mensaje y te responderemos muy pronto.')
          }).catch(err => {
            miscellaneousStores.setLoading(false)
            miscellaneousStores.setError(true)
            miscellaneousStores.setMessage(err.response.data.message)
            errors.value = {
              name: err, 
              email: '',
              password: ''
            }
          })
    }
  })
}

</script>

<template>
  <VFooter class="text-center d-flex flex-column p-0 w-100" :class="background">
    <label for="g-recaptcha-response" style="display: none;">
      reCAPTCHA response
    </label>
    <a href="https://wa.link/wvdoxg"
      target="_blank"
      class="whatsapp-float"
      title="Contáctanos por WhatsApp"
      aria-label="Contactar por WhatsApp"
      width="60"
      height="60"
      >
        <span class="mdi mdi-whatsapp whatsapp-icon" aria-hidden="true"></span>
    </a>

    <!-- ***************** E: NEW FOOTER ***************** -->
    <div class="partymax-footer tw-py-10 w-100 tw-bg-[#eef0ef]">
      <img :src="partymax_logo" alt="PartyMax" width="250" height="auto" />
      <div class="tw-flex tw-mt-8 justify-content-center">
        <a href="https://www.instagram.com/partymaxcolombia" target="_blank" class="tw-mr-2" aria-label="instagram">
          <instagram aria-hidden="true" />
        </a>
        <a href="https://www.facebook.com/partymaxcolombia" target="_blank" class="tw-mr-2" aria-label="facebook">
          <facebook aria-hidden="true" />
        </a>
        <a href="https://wa.link/wvdoxg" target="_blank" aria-label="whatsapp">
          <whatsapp_magenta aria-hidden="true" />
        </a>
      </div>
      <h2 class="tw-text-primary tw-font-bold tw-text-xl tw-mt-8 text-center">Conecta con Nosotros</h2>
      <p class="tw-text-black tw-text-[18px] tw-m-0 tw-mt-1 text-center">
        <NuxtLink 
            to="tel:+573004659997" 
            target="_blank"
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow noopener noreferrer"
          >
          +57 300 4659 997
        </NuxtLink>
        <span class="tw-hidden lg:tw-inline">&nbsp;|&nbsp;</span>
        <NuxtLink 
            to="mailto:fiesta@partymax.co" 
            target="_blank"
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow noopener noreferrer"
          >
          fiesta@partymax.co
        </NuxtLink>
      </p>
      <p class="misclinks tw-text-black tw-text-[16px] tw-m-0 tw-mt-8 text-center">
        <NuxtLink 
            to="/terms-and-conditions" 
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow"
          >
          Términos y Condiciones
        </NuxtLink>
        <span class="tw-hidden lg:tw-inline">&nbsp;|&nbsp;</span>
        <NuxtLink 
            to="/data-protection" 
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow"
          >
          Política de Protección de Datos
        </NuxtLink>
        <span class="tw-hidden lg:tw-inline">&nbsp;|&nbsp;</span>
        <NuxtLink 
            to="/privacy-statement" 
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow"
          >
          Política de Privacidad
        </NuxtLink>
        <span class="tw-hidden lg:tw-inline">&nbsp;|&nbsp;</span>
        <NuxtLink 
            to="/returns-and-refunds-policy" 
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow"
          >
          Política de Devoluciones y Reembolsos
        </NuxtLink>
        <span class="tw-hidden lg:tw-inline">&nbsp;|&nbsp;</span>
        <NuxtLink 
            to="/help" 
            class="tw-no-underline tw-text-inherit tw-block lg:tw-inline tw-mb-2 lg:tw-mb-0"
            rel="nofollow"
          >
          Preguntas Frecuentes
        </NuxtLink>
      </p>
      <div class="tw-mt-8">
        <p class="pm-payu-legend tw-text-black tw-text-xl tw-m-0 tw-mt-1 text-center tw-flex tw-items-center tw-justify-center tw-gap-2">
          <span>Pagos <strong class="tw-uppercase">confiables</strong> a traves de</span><img :src="payu" alt="PayU" width="100" height="auto"/>
        </p>
        <div class="tw-mt-1 tw-flex tw-items-center tw-justify-center tw-gap-1 lg:tw-gap-5 tw-flex-no-wrap tw-flex-col lg:tw-flex-row">
          <div class="payu-creditcards tw-flex tw-items-center tw-justify-center tw-gap-1 tw-flex-no-wrap">
            <img :src="visa" alt="Visa" width="50" height="auto"/>
            <img :src="mastercard" alt="Mastercard" width="40" height="auto"/>
            <img :src="diners" alt="Diners Club" width="50" height="auto"/>
            <img :src="amex" alt="American Express" width="30" height="auto"/>
            <img :src="codensa" alt="Codensa" width="50" height="auto"/>
          </div>
          <div class="payu-creditcards tw-flex tw-items-center tw-justify-center tw-gap-1 tw-flex-no-wrap tw-mt-3 lg:tw-mt-0">
            <img :src="sured" alt="SuRed" width="50" height="auto"/>
            <img :src="efecty" alt="Efecty" width="50" height="auto"/>
            <img :src="davivienda" alt="Davivienda" width="25" height="auto"/>
            <img :src="bancodebogota" alt="Banco de Bogotá" width="25" height="auto"/>
            <img :src="bancolombia" alt="Bancolombia" width="30" height="auto"/>
          </div>
          <div class="payu-creditcards tw-flex tw-items-center tw-justify-center tw-gap-1 tw-flex-no-wrap">
            <img :src="pse" alt="PSE" width="30" height="auto"/>
            <img :src="breb" alt="Breb" width="50" height="auto"/>
            <img :src="nequi" alt="Nequi" width="50" height="auto"/>
            <img :src="gpay" alt="Google Pay" width="50" height="auto" class="tw-ml-1"/>
          </div>
        </div>
      </div>
    </div>
    <!-- ***************** B: NEW FOOTER ***************** -->
  </VFooter>
</template>

<style scoped>
  .partymax-footer {
    font-family: 'poppins', sans-serif;
  }
  .partymax-footer .misclinks {
    line-height: 24px;
  }

  .whatsapp-float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
    z-index: 500;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #25D366;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .whatsapp-icon {
    font-size: 40px;
    color: white; /* Cambia el color del ícono a blanco */
  }

  .border-fix {
    border-right: 1px solid #E1E1E1 !important;
  }

  .copyright {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  .btn-register {
      font-size: 16px;
      font-style: normal;
      font-weight: bold;
      line-height: 14px;
      border-radius: 32px;
      height: 62px;
  }

  .button-hover:hover {
      background-color: #FF27B3 !important;
      box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .v-checkbox::v-deep(.v-selection-control) {
    min-height: 30px;
  }
  
  .v-checkbox::v-deep(.v-label){
      color:#0A1B33;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px; /* 138.462% */
  }
    
  .v-checkbox::v-deep(.v-label) {
      color:#0A1B33;
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px; /* 138.462% */
      margin-left: 10px;
  }

  .textinput .v-text-field::v-deep(.v-field__outline) { 
      border-radius: 24px !important;
      height: 35px;
      font-size: 14px;
  }

  .v-text-field::v-deep(.v-field__outline) {
      border-radius: 8px;
  }

  .v-text-field::v-deep(.v-field__outline__start) {
      flex: 0 0 17px !important;
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

  @media only screen and (max-width: 767px) {
    .border-fix {
      border-right: 0 !important;
      border-bottom: 1px solid #E1E1E1 !important;
    }
    .whatsapp-float {
      bottom: 80px;
    }
    .partymax-footer {
      padding-bottom: 100px !important;
    }
    .pm-payu-legend {
      flex-direction: column;
      font-size: 18px !important;
      gap: 0px !important;
      margin-bottom: 20px !important;
    }
  }

  @media only screen and (max-width: 960px) {

    .btn-register {
      width: 100%;
      height: 48px;
    }
  }

</style>