<script setup>

import { ref } from 'vue'
import festinabout from '@/assets/images/festin-aboutus.jpg'
import aboutimage from '@/assets/images/aboutus1.jpg'
import bg_clients from '@/assets/images/register.jpg'
import client_about from '@/assets/images/client-about.png'
import Loader from '@/components/common/Loader.vue'

const repeat = ref('repeat')
const size = ref('cover')
const backgroundStyle = ref({
  backgroundImage: `url(${bg_clients})`,
  backgroundSize: size,
  backgroundRepeat: repeat
})

const isLoading = ref(true)

const fetchData = async () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false   
  }, 2000)  
}

fetchData()

</script>

<template>
  <VContainer class="content py-13 text-center w-100">
    <Loader :isLoading="isLoading"/>
    <VRow align="center" no-gutters>
      <VCol cols="12" md="6" class="order-last order-md-first align-left">
        <h1  class="tw-text-primary title-about">Donde la magia de las celebraciones crea momentos inolvidables</h1>
        <p class="text-about">
          En el corazón de PartyMax reside el sueño compartido de tres mujeres emprendedoras que anhelaban llevar 
          la magia festiva a cada rincón de Colombia. Lo que comenzó como una modesta tienda de productos evolucionó a una
           plataforma en línea, surgiendo de la necesidad de ofrecer una variedad completa de servicios para celebraciones.
        </p>
      </VCol>
      <VCol cols="12" md="6" class="align-right">
        <v-img
          class="bg-white align-imagen"
          width="auto"
          :src="aboutimage"
        />
      </VCol>
    </VRow>  

    <VRow align="center" class="second-row" no-gutters>
      <VCol cols="12" md="6" class="align-right">
        <v-img
          class="bg-white align-imagel"
          width="auto"
          :src="festinabout"
        />
      </VCol>
      <VCol cols="12" md="6" class="align-left">
        <p class="text-about">
          A través de desafíos que se convirtieron en lecciones valiosas, PartyMax se ha transformado en un referente en la 
          industria de eventos, comprometido en brindar experiencias excepcionales y productos de calidad que reflejen la alegría 
          de cada celebración. Con nuestra nueva plataforma, estamos emocionados de llevar la experiencia de PartyMax a nuevos 
          horizontes, conectando con nuestros clientes de una manera aún más cercana y memorable.
          <br><br>  
          <b>Únete a nosotros en este emocionante viaje, donde celebramos juntos cada momento especial.</b>
        </p>
      </VCol>
    </VRow>      
  </VContainer>

  <VRow :style="backgroundStyle" class="row-section d-none" no-gutters>
    <VContainer>
      <h2 class="tw-text-primary subtitle-about">Nuestros clientes</h2>
      <VRow align="center"  class="second-section" no-gutters>
        <VCol cols="12" md="4">
          <v-img
            class="bg_white image-client"
            width="auto"
            :src="client_about"
          />
          <p class="text-clients">
            “Usar YouTube Ads como estrategia publicitaria es clave para alcanzar tus objetivos marketing y venta, 
            en este curso te explicaré paso a paso cómo lograrlos”
          </p>
          <h4 class="tw-text-primary name-client">NOMBRE Y APELLIDO</h4>
        </VCol>
        <VCol cols="12" md="4">
          <v-img
            class="bg_white image-client"
            width="auto"
            :src="client_about"
          />
          <p class="text-clients">
            “Usar YouTube Ads como estrategia publicitaria es clave para alcanzar tus objetivos marketing y venta, 
            en este curso te explicaré paso a paso cómo lograrlos”
          </p>
          <h4 class="tw-text-primary name-client">NOMBRE Y APELLIDO</h4>
        </VCol>
        <VCol cols="12" md="4">
          <v-img
            class="bg_white image-client"
            width="auto"
            :src="client_about"
          />
          <p class="text-clients">
            “Usar YouTube Ads como estrategia publicitaria es clave para alcanzar tus objetivos marketing y venta, 
            en este curso te explicaré paso a paso cómo lograrlos”
          </p>
          <h4 class="tw-text-primary name-client">NOMBRE Y APELLIDO</h4>
        </VCol>
      </VRow>
    </VContainer>
  </VRow>
</template>

<style scoped>

  .title-about {
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: 63px;
    text-align: left;
  }

  .align-imagen {
    float: right; /* Alineación a la derecha usando float */
  }

  .text-about {
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 38px;
    text-align: left;
    color: #0A1B33;
    margin-top: 40px;
  }

  .second-row {
    margin-top: 90px;
  }

  .align-imagel {
    float: left;
  }

  .row-section {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .image-client {
    margin: auto;
  }

  .subtitle-about {
    text-align: center;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 56px;
    margin-bottom: 40px;
  }

  .text-clients {
    color: v#0A1B33;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 16px 30px;
  }

  .name-client {
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 767px) {
    .second-row {
      margin-top: 50px;
    }

    .title-about {
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      margin-top: 24px;
    }

    .text-about {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
  }
</style>