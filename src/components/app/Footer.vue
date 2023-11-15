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
  import subtract from '@assets/icons/subtract.svg?inline';
  import threads from '@assets/icons/threads.svg?inline';

  import festinfooter from '@assets/images/festin-footer.png';

  const route = useRoute()
  const isProduct = ref(false)


  watchEffect(fetchData)

  async function fetchData() {

    if(route.name === 'products')
      isProduct.value = true
    else 
      isProduct.value =false

  }

</script>

<template>
  <VFooter class="text-center d-flex flex-column bg p-0">
    <div class="container-footer" :class="isProduct ? 'tw-bg-primary text-colorfooter' : ''">
        <VContainer class="my-10">
            <VRow no-gutters  class="tw-text-tertiary">
              <VCol cols="12" md="5" class="d-flex text-start">
                <p class="line-p"><span class="text-footer">Conoce todas nuestras ofertas</span> <br>
                <span class="subtext-footer">Regístrate ahora a nuestro newsletter.</span></p>
              </VCol> 
              <VCol cols="12" md="7" class="d-flex align-center">
                <VTextField
                  class="me-24"
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
    
    <VDivider class="hr" />

    <VContainer class="mt-16">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="12" md="3" class="d-block align-center text-left">
          <span class="contact-text">Contactanos</span>
          <div class="d-flex text-left mt-12 mb-5">
            <icophone class="mt-1 me-2"/>
              <span class="d-flex align-center tw-text-tertiary font-size-16 pb-2 phone-text">
                +57 310 4870 310           
              </span>
          </div>
          
          <span class="item-footer-text">Calle 13 # 69 - 06 , Bogotá</span> <br>
          <span class="item-footer-text">fiesta@partymax.co</span>

          <div class="d-flex align-center text-right mt-10">
            <instagram class="mt-1 me-2"/>
            <threads class="mt-1 me-2"/>
            <subtract class="mt-1 me-2"/>
            <facebook class="mt-1 me-2"/>
          </div>
        </VCol>

        <VCol cols="12" md="2" class="d-flex align-center"></VCol>

        <VCol cols="12" md="2" class="d-flex flex-column align-start text-left tw-gap-3">
          <router-link to="/about-us" class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Quiénes somos
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'fiestas-infantiles'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Fiestas infantiles
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'fiestas-tematicas'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Fiestas temáticas
          </router-link>
          <router-link to="/suppliers" class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Mayoristas
          </router-link>
          <router-link to="/blogs" class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Blog
          </router-link>
          <router-link to="/help" class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Ayuda
          </router-link>
        </VCol>

        <VCol cols="12" md="2" class="d-flex flex-column align-start text-left tw-gap-3">
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'desechables'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Desechables
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'decoracion'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Decoración
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'sorpresas'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Sorpresas
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'mobiliario'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Mobiliario
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'animacion-y-entretenimiento'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Animación y entrenimiento
          </router-link>
          <router-link 
            :to="{
              name: 'categories',
              params: {
                slug: 'hora-loca'
              }
            }" 
            class="item-footer-text tw-no-underline tw-text-tertiary font-size-16 me-3 hover:tw-text-primary">
            Hora loca
          </router-link>
        </VCol>
        <VCol cols="12" md="3" class="align-center text-right">
          <img :src="festinfooter" class="border-theme"/>
        </VCol>
      </VRow>
      <VDivider class="hr mt-10" />
    </VContainer>

    <VContainer class="mt-2">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="12" md="6" class="d-block align-center text-left">
          <span class="copyright">© 2023 PartyMax. All Rights Reserved</span>
        </VCol>
        <VCol cols="12" md="6" class="d-flex align-center text-right">
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


  .v-text-field::v-deep(.v-field) { 
    border-radius: 100px;
    border: 1px solid #0A1B33 !important;
    height: 43px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #0A1B33 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
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
  }

  .subtext-footer {
    font-size: 12px;
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

  .container-footer
  {
    width: 100%;
  }
  .text-colorfooter span{
    color: #FFFFFF!important;
  }
</style>
