<script setup>
  
  import { useHomeStores } from '@/stores/home'
  import { useAuthStores } from '@/stores/auth'
  import router from '@/router'
  import logo from '@assets/images/logo.svg';
  import heart from '@assets/icons/heart.svg?inline';
  import shoppinp_cart from '@assets/icons/shoppinp_cart.svg?inline';
  import user from '@assets/icons/user.svg?inline';
  import arrow_right from '@assets/icons/arrow_right.svg?inline';
  import icon_right from '@assets/icons/right-icon.svg';
  import default_item from '@assets/images/subitem-menu-default.png'

  const color = ref('#FF0090')
  
  const homeStores = useHomeStores()
  const authStores = useAuthStores()

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

  const logout = () => {

    authStores.logout()
      .then(response => {
        // Remove "user_data" from localStorage
        localStorage.removeItem('user_data')

        // Remove "accessToken" from localStorage
        localStorage.removeItem('accessToken')
        
        // Remove "userAbilities" from localStorage
        localStorage.removeItem('userAbilities')

        // Reset ability to initial ability
        router.push({ name: 'login' }).catch(() => {}).finally(() => {
            location.reload(true);
        });

    })

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
              <VBtn v-if="name === null" variant="plain" icon class="pb-2 user">
                <user />
              </VBtn>
              <VMenu v-else>
                <template v-slot:activator="{ props }">
                  <VBtn variant="plain" icon class="pb-2 user" v-bind="props">
                    <user />
                  </VBtn>
                </template>
                <VList>
                  <VListItem class="px-0">
                    <VListItemTitle class="px-5"><b>Hola</b></VListItemTitle>
                    <VListItemTitle class="px-5 mb-5">{{name}}</VListItemTitle>
                    <VListItemTitle class="px-5">
                      <router-link class="link-header" :to=" { name : 'dashboard' }">
                        Dashboard
                      </router-link>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">Configuración</VListItemTitle>
                    <VListItemTitle class="px-5 mb-2">Historial</VListItemTitle> 
                    <VDivider />
                    <VListItemTitle class="px-5 mt-2 tw-cursor-pointer" @click="logout">Cerrar Sesión</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
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
            <!--INICIO DEL MENÚ PRODUCTOS-->
            <v-menu>
              <template  v-slot:activator="{ props }">
                
                  <VAppBarNavIcon variant="text" v-bind="props"/>
                  <span class="font-size-16 me-7">Productos</span>
                
              </template>
              <v-list class="style-menu">
                <v-list-item>
                  <v-list-item-title><span class="title-menu">PRODUCTOS</span></v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <VRow align="center"> 
                          <VCol cols="10">
                            <!--INICIO SUB MENÚ DEL ITEM-->
                            <v-menu location="end">
                              <template v-slot:activator="{ props }">
                                <span class="subtitle-menu" v-bind="props">Fiestas infantiles</span>
                              </template>
                              <v-list class="style-submenu">
                                <v-list-item>
                                  <span class="subtitle-menu">Niños</span>
                                </v-list-item>
                                <v-list-item>
                                  <span class="subtitle-menu">Niñas</span>
                                </v-list-item>
                                <v-list-item>
                                  <span class="subtitle-menu">Bebes</span>
                                </v-list-item>
                                <v-list-item>
                                  <VImg :src="default_item" class="image-item"></VImg>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                            <!--FIN SUB MENÚ DEL ITEM-->                        
                          </VCol>
                          <VCol cols="2">
                            <VImg :src="icon_right" class="icon-right" v-bind="props"></VImg>  
                          </VCol>                     
                    </VRow>
                </v-list-item>               
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Fiestas temáticas</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Fiestas especiales</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Globos</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Decoración</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Hora loca</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Desechables</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Accesorias para sorpresas</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
                <v-list-item>
                    <VRow align="center">
                      <VCol cols="10">
                        <span class="subtitle-menu">Ponqués</span>                        
                      </VCol>
                      <VCol cols="2">
                        <VImg :src="icon_right" class="icon-right"></VImg>  
                      </VCol>
                    </VRow>
                </v-list-item>
              </v-list>
            </v-menu>
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

  .title-menu
  {
    color: #0A1B33;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 80% */
  }
  .subtitle-menu
  {
    color:#0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
  .subtitle-menu:hover
  {
    color: #FF0090;
    cursor: pointer;
  }
  .icon-right
  {
    width: 20px;
  }

  .style-menu
  {
    padding:32px;
    min-width: 314px;
    border-radius: 0px 0px 0px 24px!important;
  }

  .image-item
  {
    width: 250px;
    height: 186.831px;
    flex-shrink: 0;
    border-radius: 16px;
  }

  .style-submenu
  {
    padding: 88px 32px 32px 32px;
    border-radius: 0px 0px 0px 24px!important;
  }
 
</style>

