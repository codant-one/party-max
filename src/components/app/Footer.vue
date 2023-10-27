<script setup>

  import icophone from '@/assets/icons/ic_phone.svg';
  import icopayment1 from '@/assets/icons/payment-1.svg';
  import icopayment2 from '@/assets/icons/payment-2.svg';
  import icopayment3 from '@/assets/icons/payment-3.svg';
  import icopayment4 from '@/assets/icons/payment-4.svg';
  import icopayment5 from '@/assets/icons/payment-5.svg';
  import icopayment6 from '@/assets/icons/payment-6.svg';

  import festinfooter from '@/assets/images/festin-footer.png';
</script>

<template>
  <VFooter class="text-center d-flex flex-column bg p-0">
    <VContainer class="my-10">
        <VRow no-gutters  class="tw-text-tertiary">
          <VCol cols="12" md="4" class="d-flex text-start">
            <p class="line-p"><span class="text-footer">Conoce todas nuestras ofertas</span> <br>
            <span class="subtext-footer">Regístrate ahora a nuestro newsletter.</span></p>
          </VCol> 
          <VCol cols="12" md="8" class="d-flex align-center">
            <span>Buscador</span>
          </VCol>  
        </VRow>  

    </VContainer>

    <VDivider class="hr" />

    <VContainer class="my-12">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="12" md="3" class="d-block align-center text-left">
          <span class="contact-text">Contactanos</span>
          <div class="d-flex text-left cont-phone">
            <VBtn variant="plain" icon class="pb-2"><img :src="icophone" width="33"/></VBtn>
              <span class="d-flex align-center tw-text-tertiary font-size-16 pb-2 phone-text">
                +57 310 4870 310           
              </span>
          </div>
          
            <span class="item-footer-text">Calle 13 # 69 - 06 , Bogotá</span> <br>
            <span class="item-footer-text">fiesta@partymax.co</span>
         
        </VCol>

        <VCol cols="12" md="2" class="d-flex align-center"></VCol>

        <VCol cols="12" md="2" class="d-block align-center text-left">
          <span class="item-footer-text">Quiénes somos</span> <br>
          <span class="item-footer-text">Fiestas infantiles</span> <br>
          <span class="item-footer-text">Fiestas temáticas</span> <br>
          <span class="item-footer-text">Mayoristas</span> <br>
          <span class="item-footer-text">Blog</span> <br>
          <span class="item-footer-text">Ayuda</span> 
        </VCol>

        <VCol cols="12" md="2" class="d-block align-center text-left">
          <span class="item-footer-text">Desechables</span> <br>
          <span class="item-footer-text">Decoración</span> <br>
          <span class="item-footer-text">Sorpresas</span> <br>
          <span class="item-footer-text">Mobiliario</span> <br>
          <span class="item-footer-text">Animación y entrenimiento</span> <br>
          <span class="item-footer-text">Hora loca</span> 
        </VCol>
        

        <VCol cols="12" md="3" class="align-center text-right">
          <img :src="festinfooter" class="border-theme"/>
        </VCol>
        

      </VRow>
    </VContainer>

    <VContainer class="mt-10">
      <VRow no-gutters class="tw-text-tertiary">
        <VCol cols="12" md="6" class="d-block align-center text-left">
          <span class="copyright">© 2023 PartyMax. All Rights Reserved</span>
        </VCol>
        <VCol cols="12" md="6" class="d-flex align-center text-right">
          <VRow no-gutters class="tw-text-tertiary">
            <VCol cols="12" md="6" class="d-block align-center text-center">
              <span class="copyright">Pagos seguros con</span>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment1" width="45"/>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment2" width="44"/>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment3" width="44"/>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment4" width="46"/>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment5" width="45"/>
            </VCol>
            <VCol cols="12" md="1" class="d-block align-center text-left">
              <img :src="icopayment6" width="46"/>
            </VCol>
           
          </VRow>
          
        </VCol>
      </VRow>

    </VContainer>
    
  </VFooter>
</template>
<style scoped>
 .hr {
    width: 100%;
    color: #D9EEF2;
    opacity: 1 !important;
  }
.text-footer
{
  font-size: 24px;
  font-weight: 600;
}

.subtext-footer
{
  font-size: 12px;
}
.line-p
{
  line-height: 20px;
}

.contact-text
{
  font-size: 16px;
  font-weight: 600;
}

.phone-text
{
  color:  #FF0090!important;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 28.8px; 
}

.cont-phone
{
  margin: 30px 0;
}

.item-footer-text
{
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.4px;
}
.copyright
{
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.4px;
}
</style>
