<script setup>
  
  import { ref } from 'vue'
  import icophone from '@assets/icons/ic_phone.svg?inline';
  import icopayment1 from '@assets/icons/payment-1.svg';
  import icopayment2 from '@assets/icons/payment-2.svg';
  import icopayment3 from '@assets/icons/payment-3.svg';
  import icopayment4 from '@assets/icons/payment-4.svg';
  import icopayment5 from '@assets/icons/payment-5.svg';
  import icopayment6 from '@assets/icons/payment-6.svg';


  import instagram from '@assets/icons/instagram.svg?inline';
  import facebook from '@assets/icons/facebook.svg?inline';
  import whatsapp_mobile from '@assets/icons/whatsapp_mobile.svg?inline';

  import festinfooter from '@assets/images/festin-footer.webp';

  const backgroundTemp = ref('tw-bg-white')
  const currentYear = ref(new Date().getFullYear());
  const route = useRoute()
  const isProduct = ref(false)

  watchEffect(fetchData)

  async function fetchData() {

    if(route.name === 'services' || route.name === 'products' || route.name === 'about' || route.name === 'help' ||
       route.name === 'cart' || route.name === 'serviceDetail' || route.name === 'productDetail' ||
       route.name === 'detail_wholesalers' || route.name === 'terms_and_conditions' || route.name === 'privacy_statement') {
      isProduct.value = true
      backgroundTemp.value = route.name === 'cart' ? 'tw-bg-white' : 'tw-bg-green'
    } else {
      isProduct.value = false
      backgroundTemp.value = 'tw-bg-white'
    }

  }

</script>

<template>
  <VFooter class="text-center d-flex flex-column bg p-0 w-100 d-print-none" :class="backgroundTemp">
    <a href="https://wa.link/wvdoxg"
        target="_blank"
        class="whatsapp-float"
        title="Contáctanos por WhatsApp"
        >
            <span class="mdi mdi-whatsapp whatsapp-icon"></span>
    </a>
    <div class="container-footer d-none" :class="isProduct ? 'tw-bg-primary text-colorfooter' : ''">
      <VContainer class="my-10">
        <VRow no-gutters class="tw-text-tertiary">
          <VCol cols="12" md="5" class="d-flex xs:tw-text-center md:tw-text-left mb-4 mb-md-0">
            <p class="line-p"><span class="text-footer">Conoce todas nuestras ofertas</span> <br>
            <span class="subtext-footer">Regístrate ahora a nuestro newsletter.</span></p>
          </VCol> 
          <VCol cols="12" md="7" class="d-flex align-center dark" v-if="isProduct">  
            <VTextField
              class="me-20"
              placeholder="Email"
              flat
              variant="solo">
              <template v-slot:append-inner>
                <VBtn class="tw-bg-white tw-text-primary h-100 search-button button-hover">Suscríbete</VBtn>
              </template>
            </VTextField>
          </VCol> 
          <VCol cols="12" md="7" class="d-flex align-center" v-else>
            <VTextField
              class="me-20"
              placeholder="Email"
              flat
              variant="solo">
              <template v-slot:append-inner>
                <VBtn class="tw-bg-primary tw-text-white h-100 search-button button-hover">Suscríbete</VBtn>
              </template>
            </VTextField>
          </VCol>  
        </VRow>  
      </VContainer>
    </div>
    
    <VDivider class="hr d-none" />

    <VContainer class="mt-5 mt-md-16 borderBottom">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="7" md="3" class="d-block align-center text-left">
          <span class="contact-text">Contactanos</span>
          <div class="d-flex text-left mt-3 mt-md-12 mb-1 mb-md-5">
            <icophone class="mt-1 me-2"/>
              <span class="d-flex align-center tw-text-tertiary font-size-16 pb-2 phone-text">
                300 4659 997         
              </span>
          </div>
          
          <span class="item-footer-text">Calle 13 # 69 - 06 , Bogotá</span> <br>
          <span class="item-footer-text">fiesta@partymax.co</span>

          <div class="d-flex align-center text-right mt-3 mt-md-8">
            <a href="https://www.instagram.com/partymaxcolombia" target="_blank" class="m-0">
              <instagram class="mt-1 me-2"/>
            </a>
            <a href="https://www.facebook.com/partymaxcolombia" target="_blank" class="m-0">
              <facebook class="mt-1 me-2"/>
            </a>
            <a href="https://wa.link/wvdoxg" target="_blank" class="m-0">
              <whatsapp_mobile class="mt-1 me-2" />
            </a>
          </div>
        </VCol>

        <VCol cols="12" md="4" class="d-flex align-center col-mobile"></VCol>

        <VCol cols="12" md="2" class="d-flex flex-column align-start text-left tw-gap-3 col-mobile">
          <router-link to="/about-us" class="item-footer-text tw-no-underline tw-text-tertiary font-size-20 me-3 hover:tw-text-primary">
            Quiénes somos
          </router-link>
          <!-- <router-link to="/products?wholesalers=true" class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Mayoristas
          </router-link> -->
          <router-link to="/blogs" class="item-footer-text tw-no-underline tw-text-tertiary font-size-20 me-3 hover:tw-text-primary">
            Blog
          </router-link>
          <router-link to="/help" class="item-footer-text tw-no-underline tw-text-tertiary font-size-20 me-3 hover:tw-text-primary">
            Preguntas frecuentes
          </router-link>
          <router-link to="/terms-and-conditions" class="item-footer-text tw-no-underline tw-text-tertiary font-size-20 me-3 hover:tw-text-primary">
            Términos y condiciones
          </router-link>
          <router-link to="/privacy-statement" class="item-footer-text tw-no-underline tw-text-tertiary font-size-20 me-3 hover:tw-text-primary">
            Declaración de Privacidad
          </router-link>
        </VCol>
        <VCol cols="5" md="3" class="align-center text-right">
          <img :src="festinfooter" class="festin-footer-size" alt="festin-footer" loading="lazy"/>
        </VCol>
      </VRow>
      <VDivider class="hr mt-10 d-none d-md-block" />
    </VContainer>

    <VContainer class="mt-2">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="12" md="6" class="d-block align-center text-left col-copy">
          <p class="copyright">©{{currentYear}} PartyMax. All Rights Reserved</p>
        </VCol>
        <VCol cols="12" md="6" class="d-flex align-center text-right col-mobile">
          <VSpacer />
          <span class="copyright">Pagos seguros con</span>
          <img :src="icopayment1" width="45" class="me-3 ms-8"/>
          <img :src="icopayment2" width="44" class="me-3"/>
          <img :src="icopayment3" width="44" class="me-3"/>
          <img :src="icopayment4" width="46" class="me-3"/>
          <img :src="icopayment5" width="45" class="me-3"/>
          <img :src="icopayment6" width="46"/>
        </VCol>
      </VRow>

    </VContainer>
    
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
    cursor: pointer;
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

  .search-button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 11.5px;
    padding-top: 2px;
  }

  .v-text-field::v-deep(.v-input__details) { 
    padding: 0;
    height: 0;
    min-height: 0;
  }

  .dark .v-text-field::v-deep(.v-field) { 
    border-radius: 100px;
    border: 1px solid #0A1B33 !important;
    height: 43px;
    background-color: #FF0090;
    border: 1.5px solid #FFFFFF !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-radius: 100px;
    border: 1px solid #0A1B33 !important;
    height: 43px;
  } 

  .dark .v-text-field::v-deep(::placeholder) { 
    color: #FFFFFF !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .dark .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    color: #FFFFFF !important;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
  }
  
  .dark .button-hover:hover {
    background-color: #E2F8FC !important;
    box-shadow: 0px 0px 24px 0px #F3FCFE;
  }

  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

 
  .hr {
    width: 100%;
    color: #D9EEF2;
    opacity: 1 !important;
  }
  .text-footer {
    font-size: 24px;
    font-weight: 600;
    line-height: 146.3%;
  }

  .subtext-footer {
    font-size: 12px;
    font-weight: 400;
    line-height: 146.3%; 
  }
  .line-p {
    line-height: 20px;
  }

  .contact-text {
    font-size: 16px;
    font-weight: 600;
  }

  .phone-text {
    color:  #FF0090!important;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 28.8px; 
  }

  .item-footer-text {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.4px;
  }
  .copyright {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22.4px;
  }

  .container-footer {
    width: 100%;
  }
  .text-colorfooter span {
    color: #FFFFFF!important;
  }

  .festin-footer-size
  {
    width: 228px;
    height: 286px;
  }


  @media only screen and (max-width: 767px) {
    .col-mobile {
      display: none!important;
    }

    .border-theme  {
      width: 150px!important;
    }
    .phone-text {
      font-size: 20px;
      line-height: 28.8px; /* 144% */
    }

    .col-copy p {
      text-align: center !important;
    }

    .line-p {
      margin: auto;
    }

    .borderBottom {
      border-bottom: 1px solid #D9EEF2;
    }

    .text-footer {
      font-size: 20px;
    }

    .subtext-footer {
      font-size: 12px;
      font-weight: 400;
      line-height: 146.3%; 
    }

    .v-text-field::v-deep(input) {
      font-size: 14px;
      padding-top: 4px !important;
     }

     .search-button {
      font-size: 10px;
     }

     .festin-footer-size
      {
        width: 150px;
        height: 188px;
      }

      .whatsapp-float
      {
        width: 40px;
        height: 40px;
      }

      .whatsapp-icon {
        font-size: 28px;
      }
  }
</style>
