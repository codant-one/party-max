<script setup>
  import { ref } from 'vue'
  import icophone from '@assets/icons/ic_phone.svg?inline';
  import icochat from '@assets/icons/chat_bubble.svg?inline';
  import icomail from '@assets/icons/letter.svg?inline';
  import icostore from '@assets/icons/store_icon.svg?inline';
  import icosearch from '@assets/icons/youtube_icon.svg?inline';
  import instagram from '@assets/icons/instagram_magenta.svg?inline';
  import xtwitter from '@assets/icons/x.svg?inline';
  import facebook from '@assets/icons/facebook_magenta.svg?inline';

  const currentYear = ref(new Date().getFullYear());
  const terms = ref(false)

</script>

<template>
  <VFooter class="text-center d-flex flex-column bg p-0 w-100 d-print-none tw-bg-white">

      <VRow class="tw-relative row-footer">
        <VCol cols="12" md="6" class="text-left tw-pr-8">
            <h2 class="tw-text-primary tw-font-bold tw-text-4xl">Conecta con Nosotros</h2>
            
            <div class="mt-6">
              <div class="d-flex align-center">
                <icophone class="me-3"/>
                <div>
                  <p class="tw-text-tertiary tw-font-semibold tw-text-lg m-0">Teléfono</p>
                  <p class="color-text-gray-1 m-0 tw-text-sm">Llámanos para asesoría personalizada.</p>
                </div>
              </div>
              <p class="tw-text-tertiary tw-font-bold tw-text-2xl mt-2 mb-0">+57 310 4870 310</p>
            </div>
            
            <div class="mt-6">
              <div class="d-flex align-center">
                <icochat class="me-3"/>
                <div>
                  <p class="tw-text-tertiary tw-font-semibold tw-text-lg m-0">Mensaje directo</p>
                  <p class="color-text-gray-1 m-0 tw-text-sm">Escríbenos para dudas rápidas y seguimiento.</p>
                </div>
              </div>
              <VBtn class="tw-bg-primary tw-text-white mt-3" rounded="pill" href="https://wa.link/wvdoxg" target="_blank">Mensaje Directo</VBtn>
            </div>

            <div class="mt-6">
              <div class="d-flex align-center">
                <icomail class="me-3"/>
                <div>
                  <p class="tw-text-tertiary tw-font-semibold tw-text-lg m-0">Correo electrónico</p>
                  <p class="color-text-gray-1 m-0 tw-text-sm">Ideal para cotizaciones y ventas mayoristas.</p>
                </div>
              </div>
              <p class="tw-text-tertiary tw-font-bold tw-text-2xl mt-2 mb-0">comercial@partymax.co</p>
            </div>

            <div class="mt-6">
              <div class="d-flex align-center">
                <icostore class="me-3"/>
                <div>
                  <p class="tw-text-tertiary tw-font-semibold tw-text-lg m-0">Tienda</p>
                  <p class="color-text-gray-1 m-0 tw-text-sm">Visita nuestra tienda y sorpréndete.</p>
                </div>
              </div>
              <p class="tw-text-tertiary tw-font-bold tw-text-2xl mt-2 mb-0">Calle 13 #-06, Bogotá</p>
            </div>

            <div class="mt-6">
              <div class="d-flex align-center">
                <icosearch class="me-3"/>
                <div>
                  <p class="tw-text-tertiary tw-font-semibold tw-text-lg m-0">Encuentra Inspiración Diaria</p>
                  <p class="color-text-gray-1 m-0 tw-text-sm">Síguenos en nuestras redes y descubre ideas, tutoriales y las últimas tendencias para tus celebraciones.</p>
                </div>
              </div>
              <div class="d-flex mt-3">
                <a href="https://www.instagram.com/partymaxcolombia" target="_blank" class="me-2" aria-label="instagram">
                  <instagram />
                </a>
                <a href="#" target="_blank" class="me-2" aria-label="twitter">
                  <xtwitter />
                </a>
                <a href="https://www.facebook.com/partymaxcolombia" target="_blank" aria-label="facebook">
                  <facebook />
                </a>
              </div>
            </div>
        </VCol>
        

        <VCol cols="12" md="6" class="tw-pl-8">
          <div class="divider-line d-none d-md-block"></div>
          <div class="contact-form">
            <h2 class="tw-text-primary tw-font-bold tw-text-4xl mb-2">¡Hablemos, nos encantan las fiestas!</h2>
            <p class="tw-text-tertiary mt-2 mb-6">Estamos aquí para ayudarte con tus consultas.</p>

            <VForm class="mt-6">
                <div class="mb-4">
                  <label class="tw-text-tertiary tw-text-left tw-text-sm tw-block mb-1">Nombre</label>
                  <VTextField
                    class="rounded-input"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></VTextField>
                </div>

                <div class="mb-4">
                  <label class="tw-text-tertiary tw-text-left tw-text-sm tw-block mb-1">Correo Electrónico</label>
                  <VTextField
                    class="rounded-input"
                    variant="outlined"
                    density="compact"
                    hide-details
                  ></VTextField>
                </div>

                <div class="mb-4">
                  <label class="tw-text-tertiary tw-text-left tw-text-sm tw-block mb-1">Mensaje</label>
                  <VTextarea
                    variant="outlined"
                    placeholder="Escribe tu mensaje..."
                    hide-details
                    rows="4"
                  ></VTextarea>
                </div>

                <VCheckbox
                  v-model="terms"
                  color="primary"
                  class="mb-4"
                  hide-details
                >
                  <template #label>
                    <div class="tw-text-tertiary tw-text-sm">
                      Acepto los <a href="/terms-and-conditions" target="_blank" class="tw-text-primary tw-underline">Términos</a> y el <a href="/data-protection" target="_blank" class="tw-text-primary tw-underline">tratamiento de datos</a>.
                    </div>
                  </template>
                </VCheckbox>

                <VBtn class="tw-bg-primary tw-text-white" rounded="pill" size="large">Enviar mensaje</VBtn>
            </VForm>
          </div>
        </VCol>
      </VRow>
    <div class="d-flex w-100 tw-gap-4 mt-5 p-4 align-center justify-content-center tw-border-t tw-border-gray-200">
      <span class="copyright">©{{currentYear}} PartyMax. Todos los derechos reservados.</span>
      <router-link to="/terms-and-conditions" class="copyright tw-no-underline tw-text-tertiary hover:tw-text-primary">
        Términos y Condiciones
      </router-link>
    </div>
  </VFooter>
</template>

<style scoped>
  .contact-form {
    border-radius: 8px;
  }

  .copyright {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  /* Línea divisoria vertical */
  .divider-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #e5e5e5;
    z-index: 1;
  }

  /* Estilos para que los labels de los textfield se vean correctamente */
  .v-text-field, .v-textarea {
    margin-top: 0;
  }

 
  .v-field {
    border-radius: 8px !important;
  }

  .v-text-field .v-field,
  .v-textarea .v-field {
    background-color: white;
  }

  .row-footer{
      margin-top: 72px;
      margin-bottom: 72px;
      align-items: baseline;
    }

    :deep(.v-form .rounded-input.rounded-input .v-field),
:deep(.v-form .rounded-input.rounded-input .v-field__outline) {
  border-radius: 48px !important;
}

:deep(.rounded-input .v-field__input) {
  padding-inline-start: 24px !important;
  padding-inline-end: 24px !important;
}
  .color-text-gray-1
  {
    color: #999999;
  }

  @media only screen and (max-width: 960px) {
    .text-left {
      text-align: center !important;
    }
    .d-flex.align-center {
      justify-content: center;
    }
    .d-flex.mt-3{
      justify-content: center;
    }
    
    .divider-line {
      display: none !important;
    }
    
    .tw-pr-8,
    .tw-pl-8 {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

</style>