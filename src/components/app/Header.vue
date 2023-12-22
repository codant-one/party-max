<script setup>
  
  import { useHomeStores } from '@/stores/home'

  import logo from '@assets/images/logo.svg';
  import heart from '@assets/icons/heart.svg?inline';
  import shoppinp_cart from '@assets/icons/shoppinp_cart.svg?inline';
  import user from '@assets/icons/user.svg?inline';
  import arrow_right from '@assets/icons/arrow_right.svg?inline';

  const color = ref('#FF0090')
  
  const homeStores = useHomeStores()

  const categories = ref(null)
  const categoriesSearch = ref('Todos')
  const name = ref(null)

  watchEffect(fetchData)

  async function fetchData() {

    await homeStores.fetchData()
    categories.value = homeStores.getData.parentCategories
    me()
  }

  const me = async () => {

    if(localStorage.getItem('user_data')){
      const userData = localStorage.getItem('user_data')
      const userDataJ = JSON.parse(userData)

      name.value = userDataJ.name + ' ' +(userDataJ.last_name ?? '')

    }
  }
</script>

<template>
  <section>
    <VAppBar flat class="header">
      <VContainer class="tw-bg-white">
        <VRow no-gutters>
          <VCol cols="10" class="d-flex">
            <router-link to="/" class="tw-no-underline tw-text-white ms-2">
              <img :src="logo" width="255" cover/>
            </router-link>
            <VLayout>
              <VSelect
                v-model="categoriesSearch"
                class="ms-8 pt-4 tw-text-primary w-15"
                variant="plain"
                menu-icon="mdi-chevron-down"
                :items="['Todos', 'Fiesta Infantiles', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              />
              <VTextField
                class="me-24 pt-4 w-100x"
                placeholder="Quiero..."
                :color="color"
                flat
                variant="solo">
                <template v-slot:append-inner>
                  <VBtn class="tw-bg-primary tw-text-white h-100 search-button button-hover">Buscar</VBtn>
                </template>
              </VTextField>
              <VSpacer />
            </VLayout>
          </VCol>
          <VCol cols="2" 
            class="d-flex align-center align-items-stretch flex-shrink-0"
            :class="(name === null) ? 'ms-n70': ''">
            <VBtn variant="plain" icon class="pb-2 me-4 index heart">
              <heart />
            </VBtn>
            <VBtn variant="plain" icon class="pb-2 me-4 shoppinp_cart">
              <shoppinp_cart />
            </VBtn>
            <div class="d-flex user-text">
              <VBtn v-if="name === null" variant="plain" icon class="pb-2 user" v-bind="props">
                <user />
              </VBtn>
              <v-menu v-else>
                <template v-slot:activator="{ props }">
                  <VBtn variant="plain" icon class="pb-2 user" v-bind="props">
                    <user />
                  </VBtn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-title><b>Hola</b></v-list-item-title>
                    <v-list-item-title>{{name}}</v-list-item-title> <br>
                    <v-list-item-title><router-link class="link-header" :to="{name:'dashboard',}">Dashboard</router-link></v-list-item-title>
                    <v-list-item-title>Configuración cuenta</v-list-item-title>
                    <v-list-item-title>Historial</v-list-item-title> <br><br>
                    <v-list-item-title>Cerrar Sesión</v-list-item-title>

                  </v-list-item>
                </v-list>
              </v-menu>
              <router-link class="link-header" :to="{name:'register',}">
                <span class="d-flex align-center tw-text-tertiary font-size-14 pb-2" v-if="name === null">
                  Ingresar o Registrarme
                </span>
              </router-link>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </VAppBar>
    <VAppBar flat class="second-header tw-bg-primary">
      <VContainer class="p-0 tw-text-white d-flex align-center">
        
          <div class="hover:tw-text-yellow">
            <VAppBarNavIcon variant="text"/>
            <span class="font-size-16 me-7">Productos</span>
          </div>
          <div class="hover:tw-text-yellow">
            <VAppBarNavIcon variant="text"/>
            <span class="font-size-16">Servicios</span>
          </div>
          <router-link to="/suppliers" class="tw-no-underline tw-text-white hover:tw-text-yellow d-flex align-center text-center hover-icon-arrow-right">
            <span class="ms-8">Mayoristas</span>
            <arrow_right class="ms-2 p-0 index"/>
          </router-link>  
          <VSpacer />

          <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">Quiénes somos</router-link>
          <VDivider class="hr" vertical/>
          <router-link to="/blogs" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">Blogs</router-link>
          <VDivider class="hr" vertical/>
          <router-link to="/help" class="ms-5 tw-no-underline tw-text-white me-3 hover:tw-text-yellow">Ayuda</router-link>

      </VContainer>
    </VAppBar>
  </section>
</template>

<style scoped>

  .w-100x {
    width: 500px;
  }
  .v-toolbar::v-deep(.mdi-menu) { 
    font-size: 30px !important;
  }

  .hr {
    width: 2px;
    margin: 15px 0 15px 15px;
    background-color: white;
    opacity: 1 !important;
  }

  .second-header {
    top: 96px !important;
  }

  .index {
    z-index: 9999;
  }

  .ms-n70 {
    margin-inline-start: -55px !important;
  }

  .w-15 {
    width: auto;
  }

  .w-30 {
    width: 30%;
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
 
  .me-24 {
    margin-inline-end: 82px !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1.5px solid #FF0090 !important;
    height: 43px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #FF0090 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
    color: #FF0090 !important;
  }

  .v-select::v-deep(.v-field__input) {
    padding-top: 0;
    padding-left: 20%;
   }

   .v-select::v-deep(.v-field__append-inner) {
    padding-top: 30% !important;
    padding-right: 10% !important;
   }
  .v-select::v-deep(.v-field) { 
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    border: 1.5px solid #FF0090 !important;
    padding: 0 !important;
  }

  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .hover-icon-arrow-right:hover::v-deep(path) {
    fill: #FFC549;
  }

  .heart:hover::v-deep(path), .shoppinp_cart:hover::v-deep(path) {
    fill: #FF0090;
  }

  .user-text:hover span  {
    color: #FF0090 !important;
  }

  .user-text:hover .user::v-deep(path) {
    fill: #FF0090;
  }
  
  .link-header
  {
    text-decoration: none;
  }

 
</style>
