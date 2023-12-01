<script setup lang="ts">

import { ref } from 'vue'
import default_image from '@/assets/images/default_about.png'
import bg_clients from '@/assets/images/register.jpg'
import client_about from '@/assets/images/client-about.png'
const backgroundStyle = ref({})


  var repeat = 'repeat'
  var size = 'cover'
backgroundStyle.value = {
    backgroundImage: `url(${bg_clients})`,
    backgroundSize: size,
    backgroundRepeat: repeat
  }

</script>

<template>
 

  <VContainer class="content py-13 text-center w-100">
    
    <VRow align="center" no-gutters>
      <VCol cols="12" md="6" class="align-left">
        <h1  class="tw-text-primary title-about">Venenatis eu risus fermentum quam.</h1>

        <p class="text-about">
          Venenatis eu risus fermentum quam. Lacus leo arcu molestie volutpat. Facilisis vel enim tincidunt malesuada id elit 
          leo viverra egestas. Purus sed tincidunt a dui amet urna sodales aliquam vitae. Mattis ut tristique arcu non arcu. 
          Turpis risus sed enim sed id adipiscing integer consectetur suspendisse. Tortor scelerisque varius commodo felis nibh.
        </p>
      </VCol>
      <VCol cols="12" md="6" class="align-right">
        <v-img
        class="bg-white align-imager"
        width="auto"
        :src="default_image"
        ></v-img>
      </VCol>
    </VRow>  

    <VRow align="center" class="second-row" no-gutters>

      <VCol cols="12" md="6" class="align-right">
        <v-img
        class="bg-white align-imagel"
        width="auto"
        :src="default_image"
        ></v-img>
      </VCol>

      <VCol cols="12" md="6" class="align-left">
        <p class="text-about">
          Lorem ipsum dolor sit amet consectetur. Imperdiet maecenas sit vitae eu nulla lectus mollis magna quis. 
          Nam aliquet lorem nunc molestie scelerisque quisque eu. Rhoncus enim lobortis dolor porttitor. Justo platea platea 
          ac quisque. Sed nisl id convallis cras aliquam lacus. At posuere vitae hendrerit in sed cursus magna quis.
          <br><br>  
          Venenatis eu risus fermentum quam. Lacus leo arcu molestie volutpat. Facilisis vel enim tincidunt malesuada id elit 
          leo viverra egestas. Purus sed tincidunt a dui amet urna sodales aliquam vitae. Mattis ut tristique arcu non arcu.
        </p>
      </VCol>
      
    </VRow>  

    
  </VContainer>

  <VRow :style="backgroundStyle" class="row-section" no-gutters>

  <VContainer>
    <h2 class="tw-text-primary subtitle-about">Nuestros clientes</h2>
    <VRow align="center"  class="second-section" no-gutters>
      <VCol cols="12" md="4">
        <v-img
        class="bg_white image-client"
        width="auto"
        :src="client_about"
        >

        </v-img>

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
        >

        </v-img>
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
        >

        </v-img>
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
.title-about{
font-size: 60px;
font-style: normal;
font-weight: 700;
line-height: 63px;
text-align: left;
}
.align-imager {
  float: right; /* Alineación a la derecha usando float */
}
.text-about
{
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 38px;
text-align: left;
color: #0A1B33;
margin-top: 40px;
}

.second-row
{
  margin-top: 90px;
}
.align-imagel
{
  float: left;
}

.row-section
{
  padding-top: 48px;
  padding-bottom: 48px;
}

.image-client
{
  margin: auto;
}

.subtitle-about
{
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 56px;
  margin-bottom: 40px;
}

.text-clients
{
  color: v#0A1B33;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 16px 30px;
}

.name-client
{
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}
</style>