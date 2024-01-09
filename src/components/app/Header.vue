<script setup>
  
  import { useHomeStores } from '@/stores/home'
  import { useAuthStores } from '@/stores/auth'
  import router from '@/router'
  import logo from '@assets/images/logo.svg';
  import heart from '@assets/icons/heart.svg?inline';
  import shoppinp_cart from '@assets/icons/shoppinp_cart.svg?inline';
  import user from '@assets/icons/user.svg?inline';
  import arrow_right from '@assets/icons/arrow_right.svg?inline';
  import icon_right from '@assets/icons/right-icon.svg?inline';
  import default_item from '@assets/images/subitem-menu-default.png'

  const color = ref('#FF0090')
  
  const homeStores = useHomeStores()
  const authStores = useAuthStores()

  const categories = ref([])
  const categories_ = ref([])
  const categoriesSearch = ref(null)
  const textSearch = ref(null)
  const name = ref(null)

  const cols = ref(12)
  const category = ref(1)
  const width = ref(260)
  const openMenu = ref(false)
  const menuOpen = ref(false)

  const isMobile = /Mobi/i.test(navigator.userAgent);

  watchEffect(fetchData)

  async function fetchData() {
    await homeStores.fetchData()
    categories.value = homeStores.getData.parentCategories

    categoriesSearch.value = 0
    categories_.value = [{ id: 0, name: 'Todos' }, ...categories.value];

    color.value = (isMobile.value) ? '#FFFFFF' : '#FF0090'

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
        localStorage.removeItem('user_data')// Remove "user_data" from localStorage
        localStorage.removeItem('accessToken')// Remove "accessToken" from localStorage
        localStorage.removeItem('userAbilities')// Remove "userAbilities" from localStorage

        router.push({ name: 'login' }).catch(() => {}).finally(() => {
            location.reload(true);
        });
    })
  }

  const openCategory = (id) => {
    cols.value = 6
    category.value = id - 1
    width.value = 750
  }

  const chanceMenu = () => {
    cols.value = (openMenu.value === true) ? 6 : 12
    category.value = 0
    width.value = (openMenu.value === true) ? 750 : 260
    openMenu.value = (openMenu.value === true) ? false : true
  }

  const closeMenu = () => {
    menuOpen.value = false
    chanceMenu()
  }

  const search = () => {
    router.push({ 
      name: 'products',
      query: {
        category: categories.value.filter(item => item.id === Number(categoriesSearch.value))[0].slug,
        search: textSearch.value
      }         
     })
  }
  
</script>

<template>
  <section>
    <VAppBar flat class="header">
      <VContainer class="tw-bg-white">
        <VRow no-gutters v-if="!isMobile">
          <VCol cols="9" class="d-flex">
            <router-link to="/" class="tw-no-underline tw-text-white ms-2">
              <img :src="logo" width="255" cover/>
            </router-link>
            <VSpacer />
            <VSelect
              v-model="categoriesSearch"
              class="ms-8 pt-4 tw-text-primary w-15 custom-select"
              variant="plain"
              menu-icon="mdi-chevron-down"
              :items="categories_"
              item-title="name"
              item-value="id"
              :menu-props="{ maxHeight: '1000px'}"
              />
            <VTextField
              v-model="textSearch"
              class="pt-4 w-100x"
              placeholder="Quiero..."
              :color="color"
              flat
              variant="solo">
              <template v-slot:append-inner>
                <VBtn @click="search" class="tw-bg-primary tw-text-white h-100 search-button button-hover">Buscar</VBtn>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="3" class="d-flex align-center align-items-stretch flex-shrink-0">
            <VBtn 
              variant="plain" 
              icon 
              class="pb-2 me-4 index heart"
              :class="(name === null) ? 'ms-10': 'me-24'">
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
        <VRow no-gutters v-else>
          <VCol cols="6" class="d-flex">
            <router-link to="/" class="tw-no-underline tw-text-white ms-4">
              <img :src="logo" width="200" cover/>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center align-items-stretch flex-shrink-0 iconsMobile">
            <VBtn 
              variant="plain" 
              icon 
              class="index heart ms-14">
              <heart />
            </VBtn>
            <VBtn variant="plain" icon class="shoppinp_cart">
              <shoppinp_cart />
            </VBtn>
            <div class="d-flex user-text">
              <VBtn v-if="name === null" variant="plain" icon class="user">
                <router-link class="link-header" :to="{name:'register',}">
                  <user />
                </router-link>
              </VBtn>
              <VMenu v-else>
                <template v-slot:activator="{ props }">
                  <VBtn variant="plain" icon class="user" v-bind="props">
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
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </VAppBar>
    <VAppBar flat class="second-header tw-bg-primary">
      <VContainer class="p-0 tw-text-white d-flex justify-space-around align-center" v-if="!isMobile">
        <div class="hover:tw-text-yellow">
          <VMenu 
            v-model="menuOpen"
            transition="slide-x-transition" 
            location="bottom"
            :close-on-content-click="false"
            @update:modelValue="chanceMenu">
            <template  v-slot:activator="{ props }">
              <div v-bind="props">
                <VAppBarNavIcon variant="text" />
                <span class="font-size-16 me-7 tw-cursor-pointer">Productos</span>
              </div>
            </template>
            <VCard class="style-menu" :width="width">
              <VRow no-gutters>
                <VCol cols="12" :md="cols" class="py-5 pr-3">
                  <VList class="pb-0">
                    <VListItem>
                      <VListItemTitle class="d-block lineheight">
                        <span class="d-block title-menu">PRODUCTOS</span>
                        <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
                        </svg>
                      </VListItemTitle>
                    </VListItem>
                    <VListItem  
                      v-for="(item, index) in categories"
                      :key="index">
                        <div class="d-flex hover-icon-right tw-cursor-pointer" >
                          <span 
                            class="subtitle-menu" 
                            @click="openCategory(item.id)">
                            {{ item.name }}
                          </span>
                          <VSpacer />
                          <icon_right/> 
                        </div>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol cols="12" :md="cols" v-show="cols === 6" class="borderCol py-5">
                  <VList class="style-submenu mt-8">
                    <VListItem 
                      v-for="(i, index2) in categories[category].children"
                      :key="index2"
                      @click="closeMenu">
                      <router-link
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: i.slug.split('/')[1]
                          }
                        }"
                        class="tw-no-underline tw-text-tertiary">
                        <span class="subtitle-menu">{{ i.name }}</span>
                      </router-link>
                    </VListItem>
                    <VListItem>
                      <VImg :src="default_item" class="image-item"></VImg>
                    </VListItem>
                  </VList>
                </VCol>
                </VRow>
              </VCard>
            </VMenu>
          </div>
          <div class="hover:tw-text-yellow">
            <VAppBarNavIcon variant="text"/>
            <span class="font-size-16 tw-cursor-pointer">Servicios</span>
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
      <VContainer class="p-0 tw-text-white d-flex" v-else>
        <div class="hover:tw-text-yellow">
          <VMenu 
            v-model="menuOpen"
            transition="slide-x-transition" 
            location="bottom"
            :close-on-content-click="false"
            @update:modelValue="chanceMenu">
            <template  v-slot:activator="{ props }">
              <div v-bind="props">
                <VAppBarNavIcon variant="text" />
              </div>
            </template>
            <VCard class="style-menu" :width="width">
              <VRow no-gutters>
                <VCol cols="12" :md="cols" class="py-5 pr-3">
                  <VList class="pb-0">
                    <VListItem>
                      <VListItemTitle class="d-block lineheight">
                        <span class="d-block title-menu">PRODUCTOS</span>
                        <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
                        </svg>
                      </VListItemTitle>
                    </VListItem>
                    <VListItem  
                      v-for="(item, index) in categories"
                      :key="index">
                        <div class="d-flex hover-icon-right tw-cursor-pointer" >
                          <span 
                            class="subtitle-menu" 
                            @click="openCategory(item.id)">
                            {{ item.name }}
                          </span>
                          <VSpacer />
                          <icon_right/> 
                        </div>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol cols="12" :md="cols" v-show="cols === 6" class="borderCol py-5">
                  <VList class="style-submenu mt-8">
                    <VListItem 
                      v-for="(i, index2) in categories[category].children"
                      :key="index2"
                      @click="closeMenu">
                      <router-link
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: i.slug.split('/')[1]
                          }
                        }"
                        class="tw-no-underline tw-text-tertiary">
                        <span class="subtitle-menu">{{ i.name }}</span>
                      </router-link>
                    </VListItem>
                    <VListItem>
                      <VImg :src="default_item" class="image-item"></VImg>
                    </VListItem>
                  </VList>
                </VCol>
                </VRow>
            </VCard>
          </VMenu>
        </div>
            <VSelect
              v-model="categoriesSearch"
              class="ms-1 tw-text-white w-15 custom-select"
              variant="plain"
              menu-icon="mdi-chevron-down"
              :items="categories_"
              item-title="name"
              item-value="id"
              :menu-props="{ maxHeight: '1000px', fontSize: '8px'}"
              />
            <VTextField
              v-model="textSearch"
              class="w-100x me-3"
              placeholder="Quiero..."
              :color="color"
              flat
              variant="solo">
              <template v-slot:append-inner>
                <VBtn @click="search" class="tw-bg-white tw-text-primary h-100 search-button button-hover">Buscar</VBtn>
              </template>
            </VTextField>
      </VContainer>
    </VAppBar>
  </section>
</template>

<style scoped>

  .borderCol {
    border-left: 1px solid #E1E1E1; 
  }

  .lineheight {
    line-height: 0;
  }
  .w-100x {
    width: 73%;
  }

  .w-15 {
    width: 27%;
  }

  .me-24 {
    margin-inline-start: 150px !important;
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
    padding-left: 8%;
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

  .custom-select .v-list-item { 
    background-color: #FF0090;
  }

  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .hover-icon-right:hover::v-deep(path) {
    fill: #FF0090;
  }

  .hover-icon-right:hover::v-deep(.subtitle-menu) {
    color: #FF0090;
    cursor: pointer;
  }

  .subtitle-menu:hover {
    color: #FF0090;
    cursor: pointer;
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
  
  .link-header {
    text-decoration: none;
  }

  .title-menu {
    color: #0A1B33;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px; /* 80% */
  }
  .subtitle-menu {
    color:#0A1B33;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .icon-right {
    width: 20px;
  }

  .style-menu {
    padding: 0 15px 0 32px;
    border-radius: 0px 0px 24px 24px!important;
  }

  .image-item {
    width: 250px;
    height: 186.831px;
    flex-shrink: 0;
    border-radius: 16px;
  }

  .style-submenu {
    padding: 22px 0 0 32px;
    border-radius: 0px 0px 0px 24px!important;
  }
 
  .v-list-item--density-default.v-list-item--one-line {
    min-height: 44px !important;
  }

  .style-submenu .v-list-item--density-default.v-list-item--one-line {
    min-height: 20px !important;
  }

  @media (max-width: 768px) {
    .second-header {
      top: 80px !important;
    }

    .v-text-field::v-deep(.v-field) { 
      border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: 1.5px solid #FFFFFF !important;
      height: 30px;
      top: 35%;
    } 

    .v-text-field::v-deep(.v-field__input) { 
      min-height: 28px;
      background-color: #FF0090;
    }
    
    .v-text-field::v-deep(::placeholder) { 
      color: #FFFFFF !important;
      opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
      padding: 0 0 0 4% !important;
      color: #FFFFFF !important;
      font-size: 8px;
    }
    .v-select::v-deep(.v-field__input) {
      padding-top: 6%;
      padding-left: 10%;
      font-size: 8px;
      opacity: 1;
      border-radius: 24px;
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
      border: 1.5px solid #FFFFFF !important;
      padding: 0 !important;
    }

    .v-select::v-deep(.v-field__append-inner > .v-icon) { 
      opacity: 1;
    }

    .v-select::v-deep(.v-icon--size-default) {
      font-size: calc(var(--v-icon-size-multiplier) * 1em);
    }
    .w-100x {
      width: 68%;
    }

    .w-15 {
      width: 32%;
    }

    .iconsMobile .v-btn--icon.v-btn--density-default {
      width: calc(var(--v-btn-height) + 6px) !important;
    }

    .search-button {
      font-size: 8px;
    }

    .button-hover:hover {
      color: #FFFFFF !important;
    }
  }
</style>

