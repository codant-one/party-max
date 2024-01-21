<script setup>
import { ref } from 'vue'
import { useHomeStores } from '@/stores/home'
import { useMiscellaneousStores } from '@/stores/miscellaneous' 
import Loader from '@/components/common/Loader.vue'

import banner from '@assets/images/banner-wholesalers.png'
import mayorista_1 from '@assets/images/mayoristas1.png';

const route = useRoute()

const homeStores = useHomeStores()
const miscellaneousStores = useMiscellaneousStores()

const isLoading = ref(true)
const categories = ref(null)
const products = ref([])
const tab = ref('0')
const category = ref(null)
const data = ref(null)

watchEffect(fetchData)

async function fetchData() {

if(route.query.category && category.value === null) {
  category.value = {
    title: formatTitle(route.query.category),
    disabled: false,
    href: 'categories/' + route.query.category,
  }

  bread.value.push(category.value)

  if(route.query.subcategory) {
    const subcategory = {
      title: formatTitle(route.query.subcategory),
      disabled: true,
      href: '',
  }

    bread.value.push(subcategory)
  }

  const product_ = {
    title: 'Productos',
    disabled: true,
    href: '',
  }

  bread.value.push(product_)
} 

isLoading.value = true

await homeStores.fetchData()

categories.value = homeStores.getData.parentCategories
console.log("categorias: ",categories.value)



isLoading.value = false
}

</script>

<template>

    <VRow class="banner-main">
        <img :src="banner" class="banner-img"/>
    </VRow>

    <VRow class="tw-bg-tertiary row-data">
        <VCol cols="12" md="4" class="d-flex col-logo">
            <img :src="mayorista_1" class="logo-store"/>
        </VCol>
        <VCol cols="12" md="8" class="d-flex">
            <p><h3 class="store-name tw-text-white">A - Tienda 01</h3> <br> 
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.25736 3.25736C4.38258 2.13214 5.9087 1.5 7.5 1.5C9.0913 1.5 10.6174 2.13214 11.7426 3.25736C12.8679 4.38258 13.5 5.9087 13.5 7.5C13.5 9.82354 11.9882 12.0782 10.3305 13.8279C9.51704 14.6866 8.701 15.3896 8.08749 15.8781C7.85916 16.0599 7.65973 16.2114 7.5 16.3294C7.34027 16.2114 7.14084 16.0599 6.91251 15.8781C6.299 15.3896 5.48296 14.6866 4.66946 13.8279C3.0118 12.0782 1.5 9.82354 1.5 7.5C1.5 5.9087 2.13214 4.38258 3.25736 3.25736ZM7.08357 17.8738C7.08379 17.8739 7.08397 17.874 7.5 17.25L7.91603 17.874C7.6641 18.042 7.33549 18.0417 7.08357 17.8738ZM7.08357 17.8738L7.5 17.25C7.91603 17.874 7.91678 17.8735 7.91699 17.8734L7.91857 17.8723L7.92357 17.869L7.94076 17.8574C7.95536 17.8474 7.97619 17.8332 8.00283 17.8147C8.0561 17.7778 8.13265 17.7241 8.22916 17.6544C8.42209 17.5151 8.69523 17.3117 9.02188 17.0516C9.674 16.5323 10.5455 15.7821 11.4195 14.8596C13.1368 13.0468 15 10.4265 15 7.5C15 5.51088 14.2098 3.60322 12.8033 2.1967C11.3968 0.790176 9.48912 0 7.5 0C5.51088 0 3.60322 0.790176 2.1967 2.1967C0.790176 3.60322 0 5.51088 0 7.5C0 10.4265 1.8632 13.0468 3.58054 14.8596C4.45454 15.7821 5.326 16.5323 5.97812 17.0516C6.30477 17.3117 6.57791 17.5151 6.77084 17.6544C6.86735 17.7241 6.9439 17.7778 6.99717 17.8147C7.02381 17.8332 7.04464 17.8474 7.05924 17.8574L7.07643 17.869L7.08143 17.8723L7.08357 17.8738ZM6 7.5C6 6.67157 6.67157 6 7.5 6C8.32843 6 9 6.67157 9 7.5C9 8.32843 8.32843 9 7.5 9C6.67157 9 6 8.32843 6 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="white"/>
                </svg>
                <span class="tw-text-white text-infostore">&nbsp;&nbsp;&nbsp;Bogota D.C&nbsp;&nbsp;&nbsp;</span>
                <span class="tw-text-white text-infostore">145  Ordenes</span>
            </p>
        </VCol>
    </VRow>

    <VContainer class="pt-4">

        <VRow no-gutters>
            <VCol cols="12" md="3" class="col-left">
                <VCard class="mt-7 sidebar-container">
                    <VCardItem class="p-0 text-left mb-6 mt-6">
                        CATEGORÍAS
                    </VCardItem> 

                    <VCardItem class="p-0 text-allcategories tw-font-bold ml-5">
                        <router-link to="/products" class="tw-no-underline tw-text-tertiary">
                        TODAS LAS CATEGORIAS
                        </router-link>
                    </VCardItem> 

                    <VCardItem class="p-0 text-allcategories tw-font-bold" style="margin-top: 10px;">
                        Categoría
                    </VCardItem> 
                    
                    

                    <v-list class="text-left sidebar-container mb-6">
                    
                        <v-list-group  v-for="(i, index2) in categories" :key="index2" :value="i.id">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="i.name"></v-list-item>
                            
                        </template>

                        <v-list-item v-for="(j, index3) in i.children" :key="index3">

                            <router-link
                                :to="{
                                name: 'products',
                                query: {
                                    category: i.slug.split('/')[0],
                                    subcategory: j.slug.split('/')[1]
                                }
                                }"
                                class="tw-no-underline tw-text-tertiary">
                                <span class="text-subitem tw-text-tertiary">{{ j.name }}</span>
                            </router-link>
                        </v-list-item>

                        </v-list-group>
                            
                    </v-list>
                </VCard>
            </VCol>
            
            <VCol cols="12" md="9" class="col-right">

               
                    <VCard class="col-tab mt-7">
                        <VTabs v-model="tab" color="pink-accent-3" class="tab-main" align-tabs="center">
                            <VTab value="0">Productos</VTab>
                            <VTab value="1">Acerca de nosotros</VTab>
                        </VTabs>
                    </VCard>

                    <VRow class="mt-4 ml-4">
                        <v-window v-model="tab">
                            <v-window-item value="0">
                                <h3>ACA IRAN TODOS LOS PRODUCTOS DEL PROVEEDOR</h3>
                            </v-window-item>

                            <v-window-item value="1">
                                <h3>TODA LA INFORMACIÓN SOBRE EL PROVEEDOR</h3>
                            </v-window-item>
                        </v-window>
                    </VRow>

            </VCol>
        
        </VRow> 

    </VContainer>

</template>

<style scoped>
.banner-img
{
    width: 100%;
    height: 170px;

}

.logo-store
{
    width: 173.96px;
    height: 173.96px;
    max-width: 173.96px;
    border-radius: 16px;
    border: 1px solid var(--Grey-2, #E1E1E1);
    margin-top: -150px;

}

.col-logo
{
    text-align: right;
    justify-content: end;
}

.row-data
{
    padding:60px;
}

.store-name
{
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; 
}

.text-infostore
{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
}

.text-left
  {
    font-size: 18px;
  }

.sidebar-container 
  {
    padding: 0px 20px;
    background-color: #E2F8FC;
    border-radius: 16px; 
    box-shadow: none !important;
  }

.col-right  
  {
    padding-left: 20px!important;

  }

.col-tab
{
    padding: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #E2F8FC;
    box-shadow: none;
}
  


@media only screen and (max-width: 767px) 
{
    .store-name
    {
        font-size:20px;
    }

    .col-logo
    {
        text-align: left;
        justify-content: start;
    }

    .logo-store
    {
        width: 100px;
        height: 100px;
        margin-top: -120px;
    }

    .col-left
    {
      display: none;
    }

    .tab-main
    {
        font-size:12px!important;
    }

    .v-tab::v-deep(.v-btn__content) {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }
}
</style>