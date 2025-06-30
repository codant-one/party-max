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
        <h1  class="tw-text-primary title-about">Misión</h1>
        <p class="text-about">
          En Partymax, transformamos la manera en que las personas organizan sus celebraciones, brindando una plataforma digital innovadora donde clientes y proveedores se conectan en un solo lugar. Nuestra misión es facilitar la planificación de eventos, ofreciendo productos y servicios de calidad a los mejores precios del mercado, mientras potenciamos el crecimiento de nuestros aliados estratégicos con excelentes oportunidades de negocio. 
          Nos comprometemos a ofrecer una experiencia segura, rápida y eficiente, donde cada usuario encuentre exactamente lo que necesita para hacer de su evento una ocasión inolvidable. 
        </p>
      </VCol>
      <VCol cols="12" md="6" class="align-right">
        <v-img
          class="bg-white align-imagen"
          width="auto"
          :src="aboutimage"
        />
      </VCol>
      <VCol cols="12" md="12">
        <h1  class="tw-text-primary title-about mt-10">Visión</h1>
        <p class="text-about">          
          Ser la plataforma líder en Colombia y un referente en Latinoamérica para la organización de eventos y celebraciones. Nos proyectamos como el marketplace más grande y confiable del sector, donde clientes puedan encontrar todo lo necesario para sus fiestas y eventos en un solo lugar, con acceso a proveedores verificados y precios altamente competitivos. 
 
          Queremos consolidarnos como el socio estratégico de nuestros proveedores, garantizando altas utilidades y visibilidad para sus negocios, creando un ecosistema digital que impulse el crecimiento del sector de eventos con tecnología, innovación y excelencia en el servicio. 
        </p>
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
        <h1  class="tw-text-primary title-about">Nuestra Historia</h1>
        <p class="text-about">
          En Partymax, creemos que cada celebración es una oportunidad única para crear momentos inolvidables. Nuestra historia comienza con un sueño: revolucionar la industria de los eventos conectando a clientes con los mejores proveedores en un solo lugar, de manera rápida, segura y eficiente. 
          <br><br>
          Desde nuestros inicios, entendimos que la organización de eventos podía ser un desafío: encontrar los mejores decoradores, servicios de catering, entretenimiento y logística requería tiempo y esfuerzo. Fue entonces cuando decidimos innovar y crear una plataforma digital que simplifica la planificación de eventos, ofreciendo acceso a una amplia red de proveedores confiables y de calidad. 
          <br>
        </p>
      </VCol>
      <VCol cols="12" md="12" class="align-center">
        <p class="text-about">
          A lo largo de nuestra trayectoria, hemos transformado la manera en que las personas organizan sus celebraciones, impulsando el crecimiento de emprendedores y empresas del sector. Nuestro compromiso es seguir evolucionando, incorporando tecnología, creatividad e innovación para brindar experiencias cada vez más personalizadas y satisfactorias. 
          
          Hoy, Partymax es mucho más que un marketplace. Somos un ecosistema donde clientes y proveedores se encuentran para hacer realidad eventos extraordinarios, con la confianza de contar con un servicio ágil, seguro y respaldado por los más altos estándares de calidad. 

          <br><br>  
          <b> Bienvenidos a Partymax, donde la magia de los eventos cobra vida. 🎉</b>
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