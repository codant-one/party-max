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
      route.name === 'products' || route.name === 'products-slug' || 
      route.name === 'services' || route.name === 'services-slug') {
    background.value = 'tw-bg-light_cyan_2'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'dashboard' || route.name === 'dashboard-profile' ||
     route.name === 'dashboard-purchases' || route.name === 'dashboard-coupons' ||
     route.name === 'dashboard-favorites' || route.name === 'dashboard-information' ||
     route.name === 'dashboard-security' || route.name === 'dashboard-address' ||
     route.name === 'dashboard-purchases-id' || route.name === 'dashboard-rating-id' ||
     route.name === 'event-planner') {
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
      >
        <span class="mdi mdi-whatsapp whatsapp-icon" aria-hidden="true"></span>
    </a>
    <div v-show="!isConnected">
      <div class="tw-flex tw-flex-col md:tw-flex-row my-10 tw-px-5">
        <div class="md:tw-w-1/2 text-left tw-pr-0 md:tw-pr-8 border-fix">
          <h2 class="tw-text-primary tw-font-bold tw-text-4xl">Conecta con Nosotros</h2>
          <div class="tw-mt-6">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center">
                <img :src="icophone "class="tw-mr-3" alt="Teléfono" width="32" height="32"/>
                <span class="tw-text-tertiary tw-font-semibold tw-text-lg tw-m-0">Teléfono</span>
              </div>
              <span class="tw-text-gray tw-mt-2 tw-text-sm">Llámanos para asesoría personalizada.</span>
            </div>
            <h2 class="tw-text-tertiary tw-text-2xl tw-mt-2 tw-mb-0 tw-font-normal">+57 310 4870 310</h2>
          </div>
          <div class="tw-mt-6">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center">
                <img :src="icochat" class="tw-mr-3" alt="Chat" width="32" height="32"/>
                <span class="tw-text-tertiary tw-font-semibold tw-text-lg tw-m-0">Mensaje directo</span>
              </div>
              <span class="tw-text-gray tw-mt-2 tw-text-sm">Escríbenos para dudas rápidas y seguimiento.</span>
            </div>
            <VBtn
              class="btn-register tw-text-white tw-bg-primary button-hover tw-normal-case tw-mt-6"
              @click="redirectTo('https://wa.link/wvdoxg')"
            >
              Mensaje directo
            </VBtn>
          </div>
          <div class="tw-mt-6">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center">
                <img :src="icomail "class="tw-mr-3" alt="Mail" width="32" height="32" />
                <span class="tw-text-tertiary tw-font-semibold tw-text-lg tw-m-0">Correo electrónico</span>
              </div>
              <span class="tw-text-gray tw-mt-2 tw-text-sm">Ideal para cotizaciones y ventas mayoristas.</span>
            </div>
            <span class="tw-text-tertiary tw-text-2xl tw-mt-2 tw-mb-0">comercial@partymax.co</span>
          </div>
          <div class="tw-mt-6">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center">
                <img :src="icostore "class="tw-mr-3" alt="Store" width="32" height="32"/>
                <span class="tw-text-tertiary tw-font-semibold tw-text-lg tw-m-0">Tienda</span>
              </div>
                <span class="tw-text-gray tw-mt-2 tw-text-sm">Visita nuestra tienda y sorpréndete.</span>
            </div>
            <span class="tw-text-tertiary tw-text-2xl tw-mt-2 tw-mb-0">Calle 13 #-06, Bogotá</span>
          </div>
          <div class="tw-mt-6 tw-mb-6 md:tw-mb-0">
            <div class="tw-flex tw-flex-col">
              <div class="tw-flex tw-items-center">
                <img :src="icosearch "class="tw-mr-3" alt="Search" width="32" height="32" />
                <span class="tw-text-tertiary tw-font-semibold tw-text-lg tw-m-0">Encuentra Inspiración Diaria</span>
              </div>
              <span class="tw-text-gray tw-mt-2 tw-text-sm">
                Síguenos en nuestras redes y descubre ideas, tutoriales y las últimas tendencias para tus celebraciones.
              </span>
            </div>
            <div class="tw-flex tw-mt-3">
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
          </div>
        </div>
        <div class="md:tw-w-1/2 text-left tw-pl-0 md:tw-pl-8 tw-mt-6 md:tw-mt-0">
          <h2 class="tw-text-primary tw-font-bold tw-text-4xl tw-mb-2">¡Hablemos, nos encantan las fiestas!</h2>
          <p class="tw-text-tertiary tw-mt-2 tw-mb-6">Estamos aquí para ayudarte con tus consultas.</p>
          <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
              >
            <div class="tw-mb-1 textinput">
              <label class="tw-text-tertiary tw-text-sm tw-block tw-mb-1" for="name-input">Nombre</label>
              <VTextField
                v-model="name"
                variant="outlined" 
                density="compact" 
                :rules="[requiredValidator]"
                @input="inputChange()"
                id="name-input" />
            </div>
            <div class="tw-mb-1 textinput">
              <label class="tw-text-tertiary tw-text-sm tw-block tw-mb-1" for="email-input">Correo Electrónico</label>
              <VTextField 
                v-model="email"
                type="email"
                variant="outlined" 
                density="compact" 
                :rules="[requiredValidator, emailValidator]"
                @input="inputChange()" 
                id="email-input"/>
            </div>
            <div class="tw-mb-1">
              <label class="tw-text-tertiary tw-text-sm tw-block tw-mb-1" for="message-input">Mensaje</label>
              <VTextarea
                v-model="message"
                variant="outlined"
                placeholder="Escribe tu mensaje..."
                :rules="[requiredValidator]"
                @input="inputChange()"
                rows="4"
                id="message-input"
              />
            </div>
            <VCheckbox v-model="terms" color="primary" class="tw-mb-4" :rules="[requiredValidator]">
              <template #label>
                <div class="tw-text-tertiary tw-text-sm">
                  Acepto los
                  <a href="/terms-and-conditions" target="_blank" class="tw-text-primary tw-underline">Términos</a> y el
                  <a href="/data-protection" target="_blank" class="tw-text-primary tw-underline">tratamiento de datos</a>.
                </div>
              </template>
            </VCheckbox>
            <VBtn
              variant="flat"
              type="submit"
              class="btn-register tw-text-white tw-bg-primary button-hover tw-normal-case">
              Enviar mensaje
            </VBtn>
          </VForm>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col md:tw-flex-row w-100 tw-p-5 tw-gap-2 md:tw-gap-4 align-center justify-content-center tw-border-t tw-border-solid tw-border-grey_2">
      <span class="copyright">©{{currentYear}} PartyMax. Todos los derechos reservados.</span>
      <NuxtLink to="/terms-and-conditions" class="copyright tw-no-underline tw-text-tertiary hover:tw-text-primary">
        Términos y Condiciones
      </NuxtLink>
    </div>
  </VFooter>
</template>

<style scoped>

  .whatsapp-float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
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
  }

  @media only screen and (max-width: 960px) {

    .btn-register {
      width: 100%;
      height: 48px;
    }
  }

</style>