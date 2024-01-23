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
  const services = ref([])
  const textSearch = ref(null)
  const user_data = ref(authStores.getUser)
  const name = ref(null)

  const cols = ref(12)
  const colse = ref(12)
  const category = ref(1)
  const service = ref(1)
  const width = ref(260)
  const widths = ref(260)
  const openMenu = ref(false)
  const menuOpen = ref(false)

  const openMenuS = ref(false)
  const menuOpenS = ref(false)

  const cant_shop = 1;

  const isMobile = /Mobi/i.test(navigator.userAgent);
  const drawer = ref(false)
  const fixedSectionRef = ref(null)
  const classFixed = ref('second-header')

  const items_check = ref([
    { id: 1, name: 'item 1', children: [{ id: 1, name: 'item 1 (1)' }, { id: 2, name: 'item 1 (2)' }] },
    { id: 2, name: 'item 2', children: [{ id: 1, name: 'item 2 (1)' }, { id: 2, name: 'item 2 (2)' }] },
    { id: 3, name: 'item 3', children: [{ id: 1, name: 'item 3 (1)' }, { id: 2, name: 'item 3 (2)' }] }
  ])

  watch(() => 
    authStores.getUser, (user) => {
      user_data.value = user
      name.value = (user_data.value === null) ? null : (user_data.value.name + ' ' +(user_data.value.last_name ?? ''))
    });

  watchEffect(fetchData)

  async function fetchData() {
    await homeStores.fetchData()
    categories.value = homeStores.getData.parentCategories
    services.value = homeStores.getData.parentServices
  
    categoriesSearch.value = 0
    categories_.value = [{ id: 0, name: 'Todos' }, ...categories.value];

    color.value = (isMobile.value) ? '#FFFFFF' : '#FF0090'
  }

  const logout = () => {
    authStores.logout()
      .then(response => {
        localStorage.removeItem('user_data')// Remove "user_data" from localStorage
        localStorage.removeItem('accessToken')// Remove "accessToken" from localStorage
        localStorage.removeItem('userAbilities')// Remove "userAbilities" from localStorage

        router.push({ name: 'login' });
    })
  }

  const openCategory = (id) => {
    cols.value = 6
    category.value = id - 1
    width.value = 750
  }

  const openService = (id) => {
    colse.value = 6
    service.value = id - 161
    widths.value = 750
    console.log(service.value)
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

  const chanceMenuS = () => {
    colse.value = (openMenuS.value === true) ? 6 : 12
    service.value = 0
    widths.value = (openMenuS.value === true) ? 750 : 260
    openMenuS.value = (openMenuS.value === true) ? false : true
  }

  const closeMenuS = () => {
    menuOpenS.value = false
    chanceMenuS()
  }

  const search = () => {

    if(categoriesSearch.value === 0)
      router.push({ 
        name: 'products',
        query: {
          category: 'all',
          search: textSearch.value
        }         
      })
    else 
      router.push({ 
        name: 'products',
        query: {
          category: categories.value.filter(item => item.id === Number(categoriesSearch.value))[0].slug,
          search: textSearch.value
        }         
      })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {

    if (fixedSectionRef.value && isMobile) {
      const scrollY = window.scrollY || window.pageYOffset;
    
      classFixed.value = (scrollY === 0 ) ? 'second-header' : 'topFixed';
    }
  };

  const redirect = (name) => {
    router.push({ name : name})
}

  
</script>

<template>
  <section>
    <VNavigationDrawer
      v-model="drawer"
      temporary>
      <VList>
        <VListItem>
          <VListItemTitle class="d-block lineheight borderList py-2">
            <router-link to="/about-us" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Quiénes somos</span>
            </router-link>
          </VListItemTitle>
          <VListItemTitle class="d-block lineheight borderList py-2">
            <router-link to="/help" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Ayuda</span>
            </router-link>
          </VListItemTitle>          
          <VListItemTitle class="d-block lineheight borderList py-2">
            <router-link to="/blogs" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Blogs</span>
            </router-link>
          </VListItemTitle>
          <VListItemTitle class="d-block lineheight borderList py-2">
            <router-link to="/wholesalers" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Mayoristas</span>
            </router-link>
          </VListItemTitle>
          <VListItemTitle class="d-block lineheight pt-6 pb-2">
            <span class="d-block title-menu">PRODUCTOS</span>
            <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
            </svg>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VExpansionPanels
            variant="inset"
            class="text-center item borderList"
            v-for="item in categories"
            :key="item.id"
            :value="item.name">
            <VExpansionPanel                         
              elevation="0"
              rounded="rounded-0">
              <VExpansionPanelTitle
                class="font-weight-medium title-text px-0 hover:tw-bg-yellow"
              >
                {{ item.name }}
                <template v-slot:actions="{ expanded }">
                  <VIcon
                    size="20" 
                    :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                  />
                </template>
              </VExpansionPanelTitle>
              <VExpansionPanelText
                class="text-justify description-text"
              >
                <VListItem 
                  v-for="(i, index2) in categories[item.id - 1].children"
                  :key="index2">
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
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VListItem>
        <VListItem>
          <VListItemTitle class="d-block lineheight pt-6 pb-2">
            <span class="d-block title-menu">SERVICIOS</span>
            <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
            </svg>
          </VListItemTitle>
        </VListItem>
        <VListItem>
          <VExpansionPanels
            variant="inset"
            class="text-center item borderList"
            v-for="item in items_check"
            :key="item.id"
            :value="item.name">
            <VExpansionPanel                         
              elevation="0"
              rounded="rounded-0">
              <VExpansionPanelTitle
                class="font-weight-medium title-text px-0 hover:tw-bg-yellow"
              >
                {{ item.name }}
                <template v-slot:actions="{ expanded }">
                  <VIcon
                    size="20" 
                    :icon="expanded ? 'mdi-minus' : 'mdi-plus'"
                  />
                </template>
              </VExpansionPanelTitle>
              <VExpansionPanelText
                class="text-justify description-text"
              >
                <VListItem 
                  v-for="(i, index2) in items_check[item.id - 1].children"
                  :key="index2">
                  <span class="subtitle-menu">{{ i.name }}</span>
                </VListItem>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VListItem>
      </VList>
    </VNavigationDrawer>
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
                :class="(name === null) ? 'ms-10': 'me-24'" @click="redirect('favorites')">
                <heart />
            </VBtn>
              
            <VBtn variant="plain" icon class="pb-2 me-4 shoppinp_cart" @click="redirect('cart')">
              <VBadge
                color="primary"
                :content="cant_shop"
                location="end top"
              >
                <shoppinp_cart />
              </VBadge>
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
                    <VListItemTitle class="px-5 mb-5 line-div tw-text-primary">{{name}}</VListItemTitle>
                    <VListItemTitle class="px-5">
                      <router-link class="link-header" :to=" { name : 'profile' }">
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
              <router-link class="link-header" :to="{ name: 'register'}">
                <span class="d-flex align-center tw-text-tertiary font-size-14 pb-2" v-if="name === null">
                  Ingresar o Registrarme
                </span>
              </router-link>
            </div>
          </VCol>
        </VRow>
        <VRow no-gutters v-else class="px-3">
          <VCol cols="6" class="d-flex">
            <router-link to="/" class="tw-no-underline tw-text-white">
              <img :src="logo" width="200" cover/>
            </router-link>
          </VCol>
          <VCol cols="6" class="d-flex align-center align-items-stretch flex-shrink-0 iconsMobile">
            <VBtn 
              variant="plain" 
              icon 
              class="index heart ms-12" @click="redirect('favorites')">
              <heart />
            </VBtn>
            <VBtn variant="plain" icon class="shoppinp_cart" @click="redirect('cart')">
              <VBadge
                color="primary"
                :content="cant_shop"
                location="end top"
              >
                <shoppinp_cart />
              </VBadge>
            </VBtn>
            <div class="d-flex user-text">
              <VBtn v-if="name === null" variant="plain" icon class="user">
                <router-link class="link-header" :to="{ name: 'register' }">
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
                    <VListItemTitle class="px-5 mb-5 line-div tw-text-primary">{{name}}</VListItemTitle>
                    <VListItemTitle class="px-5">
                      <router-link class="link-header" :to=" { name : 'profile' }">
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
    <VAppBar flat class="tw-bg-primary" :class="classFixed" ref="fixedSectionRef">
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
                          <span v-if="item.children.length>0"
                            class="subtitle-menu" 
                            @click="openCategory(item.id)">
                            {{ item.name }}
                          </span>

                          <router-link 
                            :to="{
                                  name: 'categories',
                                  params: {
                                  slug: item.slug
                                  }
                                }" 
                            class="subtitle-menu tw-no-underline"   
                            v-else>{{ item.name }}
                          </router-link> 
                          <VSpacer />
                          <icon_right v-if="item.children.length>0"/> 
                           
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
          <VMenu 
            v-model="menuOpenS"
            transition="slide-x-transition" 
            location="bottom"
            :close-on-content-click="false"
            @update:modelValue="chanceMenuS">
            <template  v-slot:activator="{ props }">
              <div v-bind="props">
                <VAppBarNavIcon variant="text" />
                <span class="font-size-16 me-7 tw-cursor-pointer">Servicios</span>
              </div>
            </template>
            <VCard class="style-menu" :width="widths">
              <VRow no-gutters>
                <VCol cols="12" :md="colse" class="py-5 pr-3">
                  <VList class="pb-0">
                    <VListItem>
                      <VListItemTitle class="d-block lineheight">
                        <span class="d-block title-menu">SERVICIOS</span>
                        <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
                        </svg>
                      </VListItemTitle>
                    </VListItem>
                    <VListItem  
                      v-for="(item, index) in services"
                      :key="index">
                        <div class="d-flex hover-icon-right tw-cursor-pointer" >
                          <span v-if="item.children.length>0"
                            class="subtitle-menu" 
                            @click="openService(item.id)">
                            {{ item.name }}
                          </span>

                          <router-link 
                            :to="{
                                  name: 'categories',
                                  params: {
                                  slug: item.slug
                                  }
                                }" 
                            class="subtitle-menu tw-no-underline"   
                            v-else>{{ item.name }}
                          </router-link> 
                          <VSpacer />
                          <icon_right v-if="item.children.length>0"/> 
                           
                        </div>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol cols="12" :md="colse" v-show="colse === 6" class="borderCol py-5">
                  <VList class="style-submenu mt-8">
                    <VListItem 
                      v-for="(i, index2) in services[service].children"
                      :key="index2"
                      @click="closeMenuS">
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
        <router-link to="/wholesalers" class="tw-no-underline tw-text-white hover:tw-text-yellow d-flex align-center text-center hover-icon-arrow-right">
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
          <VAppBarNavIcon variant="text" @click.stop="drawer = !drawer"/> 
        </div>
        <!-- search -->
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

  .line-div
  {
    border-bottom: 1px solid var(--Light-Cyan-3, #D9EEF2)!important;
  }

  @media (max-width: 768px) {
    .second-header {
      top: 80px !important;
      position: fixed !important;
    }
    
    .topFixed {
      top: 0 !important;
      position: fixed !important;
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
      min-height: 27px;
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

    .v-navigation-drawer::v-deep(.v-navigation-drawer__content) {
      padding: 10px;
    }

    .title-menu {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .borderList {
      border-bottom: 1px solid #D9EEF2;
    }

    .v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
      min-height: 30px;
    }

    .v-expansion-panels--variant-inset > .v-expansion-panel--active {
      max-width: 100%;
    }

    .v-navigation-drawer::v-deep(.v-expansion-panel-text__wrapper) {
      padding: 10px;
    }

    .item .v-list-item--density-default.v-list-item--one-line {
      min-height: 20px !important;
      padding-inline: 0 !important;
    }

    .subtitle-menu {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px
    }
  }
</style>

