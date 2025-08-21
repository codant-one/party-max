<script setup>
  
  import { useCartStores } from '~/stores/cart'
  import { useHomeStores } from '~/stores/home'
  import { useAuthStores } from '~/stores/auth'
  import { markRaw } from 'vue';
  import { formatNumber } from '@formatters'
  import { useRouter, useRoute } from 'vue-router'
  import Loader from '@/components/common/Loader.vue'
  import Product8 from '@/components/product/Product8.vue'
  import Service4 from '@/components/service/Service4.vue'
  import logo from '@assets/images/logo.svg';
  import heart from '@assets/icons/heart.svg?inline';
  import shoppinp_cart from '@assets/icons/shoppinp_cart.svg?inline';
  import user from '@assets/icons/user.svg?inline';
  import icon_right from '@assets/icons/right-icon.svg?inline';

  import cart from '@assets/icons/cart.svg?inline'
  import cart_mobile from '@assets/icons/cart_mobile.svg?inline'

  import icon1 from '@assets/icons/fiestas-infantiles.svg?inline';
  import icon2 from '@assets/icons/fiestas-tematicas.svg?inline';
  import icon3 from '@assets/icons/fechas-especiales.svg?inline';
  import icon4 from '@assets/icons/globos.svg?inline';
  import icon5 from '@assets/icons/decoracion.svg?inline';
  import icon6 from '@assets/icons/hora-loca.svg?inline';
  import icon7 from '@assets/icons/desechables.svg?inline';
  import icon8 from '@assets/icons/sorpresas.svg?inline';
  import icon9 from '@assets/icons/dulces.svg?inline';
  import icon10 from '@assets/icons/animación.svg?inline';
  import icon11 from '@assets/icons/mobiliario.svg?inline';

  const color = ref('#FF0090')
  
  const route = useRoute()
  const router = useRouter()
  const homeStores = useHomeStores()
  const authStores = useAuthStores()
  const cartStores = useCartStores()

  const categories = ref([])
  const categories_ = ref([])
  const services = ref([])
  const textSearch = ref(null)
  const user_data = ref(authStores.getUser)
  const cart_products = ref(null)
  const products = ref([])
  const subTotal = ref('0.00')
  const name = ref(null)

  const cols = ref(12)
  const colse = ref(12)
  const category = ref(1)
  const service = ref(1)
  const width = ref(300)
  const widths = ref(300)
  const menuOpen = ref(false)
  const menuOpenS = ref(false)
  const isDrawerOpen = ref(false)

  const isLoading = ref(false)
  const drawer = ref(false)
  const fixedSectionRef = ref(null)
  const classFixed = ref('second-header')

  const openedGroups = ref([]);
  const panelCat = ref(null);

  const { isMobile, isDesktop } = useDevice();
  const { $metapixel } = useNuxtApp()

  const items_products = ref([
    { text: 'Fiestas infantiles', icon: markRaw(icon1), slug: 'fiestas-infantiles' },
    { text: 'Fiestas temáticas', icon: markRaw(icon2), slug: 'fiestas-tematicas' },
    { text: 'Fechas especiales', icon: markRaw(icon3), slug: 'fechas-especiales' },
    { text: 'Globos', icon: markRaw(icon4), slug: 'globos' },
    { text: 'Decoración', icon: markRaw(icon5), slug: 'decoracion' },
    { text: 'Hora loca', icon: markRaw(icon6), slug: 'hora-loca' },
    { text: 'Desechables', icon: markRaw(icon7), slug: 'desechables' },
    { text: 'Sorpresas', icon: markRaw(icon8), slug: 'sorpresas' }
  ])

  const items_services = ref([
    { text: 'Animadores de Fiestas', icon: markRaw(icon10), slug: 'animadores-de-fiestas' },
    { text: 'Dulces y Ponques', icon: markRaw(icon9), slug: 'dulces-y-ponques' },
    { text: 'Comida', icon: markRaw(icon7), slug: 'comida' },
    { text: 'Musica', icon: markRaw(icon2), slug: 'musica' },
    { text: 'Renta de Mobiliario', icon: markRaw(icon11), slug: 'renta-de-mobiliario' },
    { text: 'Inflables', icon: markRaw(icon1), slug: 'inflables' }
  ])

  watch(() => 
    authStores.getUser, (user) => {
      user_data.value = user
      name.value = (user_data.value === null) ? null : (user_data.value.name + ' ' +(user_data.value.last_name ?? ''))
    });

  watch(() => 
    cartStores.getCount, async (value) => {
      cart_products.value = value
      products.value = []
      subTotal.value = '0.00'

      if(cart_products.value > 0) {
        if(route.path.startsWith('/products') || route.path.startsWith('/services'))
          isDrawerOpen.value = true
        
        isLoading.value = true
        await cartStores.fetchCart()
        products.value = cartStores.getData

        let sum = 0
        products.value.forEach(element => {
          let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
          let value = 
            element.type === 0 ? 
              (element.wholesale === 1 ? element.product.wholesale_price : element.product.price_for_sale) :
              (element.cake_size_id === 0 ? element.price : cupcake.price)
          let name =  element.type === 0 ? element.product.name : element.name
          let id =  element.type === 0 ? 'PRODUCT_' + element.id : 'SERVICE_' + element.id

          sum += (parseFloat(value) * element.quantity)

          if ($metapixel && $metapixel.trackEvent) {
            $metapixel.trackEvent('AddToCart', {
              content_ids: [id], 
              content_name: toSentenceCase(name),
              content_type: 'product',
              value: value,
              currency: 'COP'
            })
          }
        });

        subTotal.value = sum.toFixed(2)
        isLoading.value = false
      }
    }
  );

  watch(() => 
    route.query,(newPath, oldPath) => {
      fetchData()
      isDrawerOpen.value = false
    }
  );
  
  watch(() => 
    drawer.value, (value) => {
      panelCat.value = null 
      openedGroups.value = []
    }
  );

  watchEffect(fetchData)

  async function fetchData() {

    openedGroups.value = []

    await homeStores.fetchData()
    
    categories.value = homeStores.getData.parentCategories
    services.value = homeStores.getData.parentServices

    textSearch.value = route.query.search ?? null

    categories_.value = [{ id: 0, name: 'Todos' }, ...categories.value];

    color.value = (isMobile.value) ? '#FFFFFF' : '#FF0090'
  }

  const toSentenceCase = (str) => {
    if (!str) return '';
    // 1. Convierte toda la cadena a minúsculas
    // 2. Toma la primera letra y la convierte a mayúscula
    // 3. Une la primera letra mayúscula con el resto de la cadena en minúscula
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  const toggleGroupFn = (index, cat) => {
    if (openedGroups.value.includes(index)) {
      openedGroups.value = [];
    } else {
      openedGroups.value = [index];
      panelCat.value = [cat]
      // Cambiar el icono de todos los demás elementos a mdi-chevron-down
      for (let i = 0; i < categories.length; i++) {
        if (i !== index) {
          openedGroups.value.push(i);
        }
      }
    }
  };

  const logout = () => {
    authStores.logout()
      .then(async response => {
        localStorage.removeItem('user_data')// Remove "user_data" from localStorage
        localStorage.removeItem('accessToken')// Remove "accessToken" from localStorage
        localStorage.removeItem('userAbilities')// Remove "userAbilities" from localStorage

        await cartStores.refreshData()

        router.push({ name: 'login' });
    })
  }

  const openCategory = (index) => {
    category.value = index
    
    if(categories.value[index].children.length > 0) {
      cols.value = 6
      width.value = 650
    } else {
      cols.value = 12
      width.value = 300
    }
  }

  const openService = (index) => {
    category.value = index
    
    if(services.value[index].children.length > 0) {
      cols.value = 6
      width.value = 650
    } else {
      cols.value = 12
      width.value = 300
    }
  }

  const chanceMenu = () => {
    cols.value = 12
    category.value = 0
    width.value = 300
  }

  const closeMenu = () => {
    menuOpen.value = false
    chanceMenu()
  }

  const chanceMenuS = () => {
    colse.value = 12
    service.value = 0
    widths.value = 300
  }

  const closeMenuS = () => {
    menuOpenS.value = false
    chanceMenuS()
  }

  const search = () => {
    router.push({ 
      name: 'products',
      query: {
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

  const redirect_ = (name, slug) =>{
    router.push({
      name: name, 
      params: {
        slug: slug
      }
    })
  }

  const closeMenuOnMouseLeave = () => {
    if (menuOpen.value !== false) {
      closeMenu()
    } else if (menuOpenS.value !== false) {
      closeMenuS()
    }
  }


  const isLastItem = (index) => {
    return index === products.value.length - 1;
  }

  const deleteProduct = async (data) => {

    isLoading.value = true
    await cartStores.delete(data)
    fetchData()   
    isLoading.value = false

  }

  const handleDrawerModelValueUpdate = val => {
    isDrawerOpen.value = val
  }
</script>

<template>
  <section>
    <VNavigationDrawer
      v-model="drawer"
      class="d-print-none"
      temporary>
      <VList
        aria-label="Menú de navegación principal"
        role="list"
        class="pb-0"
        v-model:opened="panelCat"
        :ripple="false"
      >
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink aria-label="item-about-us" to="/about" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Quiénes somos</span>
            </NuxtLink>
          </VListItemTitle>
        </VListItem>
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink aria-label="item-help" to="/help" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Preguntas frecuentes</span>
            </NuxtLink>
          </VListItemTitle>  
        </VListItem>
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink aria-label="item-help" to="/terms-and-conditions" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Términos y condiciones</span>
            </NuxtLink>
          </VListItemTitle>  
        </VListItem>
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink aria-label="item-help" to="/data-protection" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Protección de datos</span>
            </NuxtLink>
          </VListItemTitle>  
        </VListItem>
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink aria-label="item-help" to="/privacy-statement" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Declaración de privacidad</span>
            </NuxtLink>
          </VListItemTitle>  
        </VListItem>
        <VListItem role="listitem">        
          <VListItemTitle class="d-block lineheight borderList pb-2">
            <NuxtLink to="/blogs" class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
              <span class="d-block title-menu">Blog</span>
            </NuxtLink>
          </VListItemTitle>
        </VListItem>
      </VList>

      <VList role="list" aria-label="Menu de Productos mobile" v-model:opened="panelCat" class="pb-0" :ripple="false">
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight pt-6 pb-2">
            <h2 class="d-block title-menu">PRODUCTOS</h2>
            <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
            </svg>
          </VListItemTitle>
        </VListItem>
        <template v-for="(item, index) in categories">
          <VListItem
            role="listitem"
            :active="false"
            selectable="false"
            v-if="categories[index]?.children.length === 0"
            :to="{
              name: 'products',
              query: { category: item.slug }
            }">
            <VListItemTitle class="d-block title-menu lineheight borderList pb-2">
              {{ item.name }}
            </VListItemTitle> 
          </VListItem>
          <VListGroup 
            v-else
            :id="`v-list-product-group--id-${item.slug}`"
            :value="item.name"
            :raw-id="item.slug" 
            :eager="false"
            ref="listGroup"
          >
            <template #activator="{ props }">
              <VListItem 
                role="listitem"
                :active="false"
                selectable="false" 
                class="items-list">
                <VListItemTitle class="d-block lineheight borderList pb-2">
                  <NuxtLink
                    :to="{
                      name: 'categories-slug',
                      params: { slug: item.slug }
                    }"  
                    class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow"
                    :aria-label="`${item.name}, ${openedGroups.includes(index) ? 'submenú abierto' : 'submenú cerrado'}`">
                    <span class="d-block title-menu" :id="`product-mobile-${item.slug}`">{{ item.name }}</span>
                  </NuxtLink>
                </VListItemTitle> 
                <template #append>
                  <VIcon
                    v-bind="props"
                    :icon="openedGroups.includes(index) 
                    ? 'mdi-minus' 
                    : 'mdi-plus'"
                    size="20"
                    @click="toggleGroupFn(index, item.name)"
                    :aria-label="openedGroups.includes(index) ? `Colapsar ${item.name}` : `Expandir ${item.name}`"
                    :aria-labelledby="`product-mobile-${item.slug}`"
                  />
                </template>
              </VListItem>
            </template>
            <div 
              v-for="(k, index2) in categories[index].children"
              :key="index2"
              class="style-menu-mobile">
              <VListItem 
                role="listitem"
                :active="false"
                selectable="false"
                class="subtitle-menu">
                <NuxtLink
                  :to="{
                    name: 'products',
                    query: {
                      category: item.slug,
                      subcategory: k.slug.split('/')[1]
                    }
                  }"  
                  class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
                  <span class="d-block title-menu">
                    {{ k.name }}
                  </span>
                </NuxtLink>
              </VListItem>
            </div>
          </VListGroup>
        </template>
      </VList>
        
      <!--MENU SERVICIOS MOBILE-->
      <VList role="list" aria-label="Menu de Servicios mobile" v-model:opened="panelCat" class="pb-0" :ripple="false">
        <VListItem role="listitem">
          <VListItemTitle class="d-block lineheight pt-6 pb-2">
            <h2 class="d-block title-menu">SERVICIOS</h2>
            <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
            </svg>
          </VListItemTitle>
        </VListItem>
        <div v-for="(item, index) in services">
          <VListItem role="listitem" v-if="services[index]?.children.length === 0">
            <VListItemTitle class="d-block lineheight borderList pb-2">
              <NuxtLink 
                :to="{
                  name: 'services',
                  query: {
                    category: item.slug
                  }
                }" 
                class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
                <span class="d-block title-menu">{{ item.name }}</span>
              </NuxtLink>
            </VListItemTitle> 
          </VListItem>
          <VListGroup 
            :id="`v-list-service-group--id-${item.slug}`"
            v-else 
            :raw-id="item.slug" 
            :value="item.name" 
            :eager="false"
          >
            <template #activator="{ props }">
              <VListItem role="listitem" class="items-list">
                <VListItemTitle class="d-block lineheight borderList pb-2">
                  <NuxtLink
                    :to="{
                      name: 'categories-slug',
                      params: { slug: item.slug }
                    }"  
                    class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow"
                    :aria-label="`${item.name}, ${openedGroups.includes(index) ? 'submenú abierto' : 'submenú cerrado'}`">
                    <span class="d-block title-menu" :id="`service-mobile-${item.slug}`">{{ item.name }}</span>
                  </NuxtLink>
                </VListItemTitle> 
                <template #append>
                  <VIcon
                    v-bind="props"
                    :icon="openedGroups.includes(index) 
                    ? 'mdi-minus' 
                    : 'mdi-plus'"
                    size="20"
                    @click="toggleGroupFn(index, item.name)"
                    :aria-label="openedGroups.includes(index) ? `Colapsar ${item.name}` : `Expandir ${item.name}`"
                    :aria-labelledby="`service-mobile-${item.slug}`"
                  />
                </template>
              </VListItem>
            </template>
            <div 
              v-for="(k, index2) in services[index].children"
              :key="index2"
              class="style-menu-mobile">
              <VListItem role="listitem" class="subtitle-menu">
                <NuxtLink
                  :to="{
                    name: 'services',
                    query: {
                      category: item.slug,
                      subcategory: k.slug.split('/')[1]
                    }
                  }"  
                  class="ms-5 tw-no-underline tw-text-white hover:tw-text-yellow">
                  <span class="d-block title-menu">
                    {{ k.name }}
                  </span>
                </NuxtLink>
              </VListItem>
            </div>
          </VListGroup>
        </div>
      </VList>
      <!--FIN MENU SERVICIOS MOBILE-->
   
    </VNavigationDrawer>
    <VNavigationDrawer
      :model-value="isDrawerOpen"
      :width="isMobile ? 280 : 380"
      :height="isMobile ? '80vh' : '100vh'"
      location="end"
      class="scrollable-content drawer d-print-none"
      temporary
      @update:model-value="handleDrawerModelValueUpdate"
    >
      <Loader :isLoading="isLoading"/>
      <!-- 👉 Title -->
      <div class="d-flex align-center pa-4 pa-md-6 pb-1 pb-md-1">
        <h2 class="text-h6">
          Shopping Cart
        </h2>

        <VSpacer />

        <!-- 👉 Close btn -->
        <VBtn
          variant="text"
          color="primary"
          @click="isDrawerOpen = false"
          aria-label="Cerrar carrito de compras">
          <span class="tw-hidden">Cerrar modal</span> 
          <VIcon icon="mdi-close-circle-outline" />
        </VBtn>
      </div>
      <VDivider class="mt-2 mt-md-4"/>
      <PerfectScrollbar :options="{ wheelPropagation: false }">
        <VCard 
          v-if="products.length === 0 && (typeof route.query.merchantId === 'undefined')"
          class="mb-10 card-timeline px-0">
          <VCardText class="d-flex flex-column align-center text-center justify-content-center">
            <VCardItem class="d-block align-center text-center justify-content-center cart-svg">
              <cart v-if="isDesktop" class="d-block mx-auto mb-5"/>
              <cart_mobile v-if="isMobile" class="d-block mx-auto mb-5"/>
              <span class="d-block cart-empty">Tu carrito esta vacio.</span>
            </VCardItem>
          </VCardText>
        </VCard>
        <div v-else>
          <template v-for="(item, i) in products" :key="i">
            <Product8
              v-if="item.type === 0"
              :product="item"
              :readonly="true"
              :isLastItem="isLastItem(i)"
              @delete="deleteProduct({ type: 0, product_color_id: parseInt(item.product_color_id) })"
            />
            <Service4
              v-else
              :service="item"
              :readonly="true"
              :type="item.type"
              :isLastItem="isLastItem(i)"
              @delete="deleteProduct({ type: 1, service_id: parseInt(item.id) })"
            />
          </template>
        </div>
      </PerfectScrollbar>
      <template v-slot:append>
        <VDivider class="mt-4"/>
        <div class="pa-2">
          <div class="d-flex px-3">
            <span class="tw-text-tertiary subtotal">SUBTOTAL</span>
            <VSpacer />
            <span>${{ formatNumber(subTotal) }}</span>
          </div>
          <VBtn
            variant="flat"
            block
            class="btn-register tw-text-white tw-bg-primary button-hover my-2 mt-md-5"
            @click="redirect('cart')">
            pagar
          </VBtn>
          <VBtn
            v-if="products.length > 0"
            variant="flat"
            block
            class="btn-order tw-text-tertiary my-2 me-2"
            @click="redirect('quote')"
            >
              cotizar
          </VBtn>
        </div>
      </template>
    </VNavigationDrawer>
    <VAppBar flat class="header d-print-none">
      <VContainer class="tw-bg-white">
        <VRow no-gutters v-if="isDesktop">
          <VCol cols="9" class="d-flex">
            <NuxtLink to="/" class="tw-no-underline tw-text-white ms-2 me-8">
              <img :src="logo" width="255" alt="Logo de PartyMax - Ir a la página de inicio" cover/>
            </NuxtLink>
            <VSpacer />
            <VTextField
              v-model="textSearch"
              class="pt-4 w-100x"
              placeholder="Quiero..."
              :color="color"
              flat
              variant="solo"
              id="search-input"
              aria-label="Buscar...">
              <template v-slot:append-inner>
                <VBtn @click="search" class="tw-bg-primary tw-text-white h-100 search-button button-hover">Buscar</VBtn>
              </template>
            </VTextField>
          </VCol>
          <VCol cols="3" class="d-flex align-center align-items-stretch flex-shrink-0">
            <VSpacer />
            <button 
                class="index heart" aria-label="Mis favoritos"
                :class="(name === null) ? 'ms-n70 me-5': 'me-5'" @click="redirect('dashboard-favorites')">
                <heart aria-hidden="true" />
            </button>
            <button aria-label="Abrir carrito de compras" icon class="me-3 shoppinp_cart" @click="isDrawerOpen = true">
              <VBadge
                color="primary"
                aria-label="Abrir carrito de compras"
                :content="cart_products"
                :model-value="!!cart_products"
                location="end top"
              >
                <shoppinp_cart aria-hidden="true" />
              </VBadge>
            </button>
            <div class="d-flex user-text">
              <button v-if="name === null" aria-label="Iniciar Sesion o Registrarse" class="user ms-2">
                <user aria-hidden="true" />
              </button>
              <VMenu v-else>
                <template v-slot:activator="{ props }">
                  <button 
                    class="user ms-2 me-3" 
                    v-bind="props"
                    aria-label="Menú de usuario"
                    aria-haspopup="true"
                  >
                    <user aria-hidden="true" />
                  </button>
                </template>
                <VList aria-label="Opciones de usuario" class="px-0">
                  <VListItem class="px-0">
                    <VListItemTitle class="px-5"><b>Hola</b></VListItemTitle>
                    <VListItemTitle class="px-5 mb-3 pb-3 line-div tw-text-primary">{{name}}</VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard' }">
                        Dashboard
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-profile' }">
                        Mi Perfil
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-purchases' }">
                        Compras
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-coupons' }">
                        Cupones
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5 mb-3 pb-3 line-div">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-favorites' }">
                        Mis favoritos
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5 mt-2 tw-text-gray " @click="logout">Cerrar Sesión</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
              <NuxtLink class="link-header" :to="{ name: 'register'}">
                <span class="d-flex align-center tw-text-tertiary font-size-14 ms-2 text-regi" v-if="name === null">
                  Ingresar o Registrarme
                </span>
              </NuxtLink>
            </div>
          </VCol>
        </VRow>
        <VRow no-gutters v-if="isMobile" class="px-3">
          <VCol cols="6" class="d-flex">
            <NuxtLink to="/" class="tw-no-underline tw-text-white">
              <img :src="logo" width="200" height="52" alt="Logo de PartyMax - Ir a la página de inicio" cover/>
            </NuxtLink>
          </VCol>
          <VCol cols="6" class="d-flex align-center align-items-stretch flex-shrink-0 iconsMobile">
            <VSpacer />
            <span class="index heart me-3" @click="redirect('dashboard-favorites')">
              <heart />
            </span>
            <span icon class="shoppinp_cart me-3" @click="isDrawerOpen = true">
              <VBadge
                color="primary"
                :content="cart_products"
                :model-value="!!cart_products"
                location="end top"
              >
                <shoppinp_cart />
              </VBadge>
            </span>
            <div class="d-flex user-text">
              <span v-if="name === null" class="user">
                <NuxtLink class="link-header" :to="{ name: 'register' }" aria-label="Registrarse">
                  <user />
                </NuxtLink>
              </span>
              <VMenu v-else>
                <template v-slot:activator="{ props }">
                  <span class="user" v-bind="props">
                    <user />
                  </span>
                </template>
                <VList>
                  <VListItem class="px-0">
                    <VListItemTitle class="px-5"><b>Hola</b></VListItemTitle>
                    <VListItemTitle class="px-5 mb-3 pb-3 line-div tw-text-primary">{{name}}</VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard' }">
                        Dashboard
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-profile' }">
                        Mi Perfil
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-purchases' }">
                        Compras
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-coupons' }">
                        Cupones
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5 mb-3 pb-3 line-div">
                      <NuxtLink class="link-header tw-text-gray " :to=" { name : 'dashboard-favorites' }">
                        Mis favoritos
                      </NuxtLink>
                    </VListItemTitle>
                    <VListItemTitle class="px-5 mt-2 tw-text-gray" @click="logout">Cerrar Sesión</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </VAppBar>
    <VAppBar flat class="d-print-none tw-border-y tw-border-grey_2" :class="classFixed" ref="fixedSectionRef">
      <VContainer class="p-0 tw-text-tertiary d-flex justify-space-around align-center" v-if="isDesktop">
        <div>
          <VMenu 
            v-model="menuOpen"
            transition="slide-x-transition" 
            location="bottom"
            :close-on-content-click="false"
            @update:modelValue="chanceMenu">
            <template  v-slot:activator="{ props }">
              <button 
                v-bind="props"
                class="d-flex menu-trigger hover:tw-text-primary"
                aria-haspopup="true"
                :aria-expanded="menuOpen ? 'true' : 'false'"
                aria-controls="products-menu"
                @keydown.enter="menuOpen = true"
                @keydown.escape="menuOpen = false"
                aria-label="Menú Productos"
              >
                <VIcon icon="mdi-menu" class="me-3" aria-hidden="true"/>
                <h2 class="pt-1 font-size-16 me-7">Productos</h2>
              </button>
            </template>
            <VCard class="style-menu" :width="width" @mouseleave="closeMenuOnMouseLeave">
              <VRow no-gutters>
                <VCol cols="12" :md="cols" class="py-5 pr-3">
                  <VList role="list" class="pb-0">
                    <VListItem role="listitem">
                      <VListItemTitle class="d-block lineheight">
                        <h2 class="d-block title-menu">PRODUCTOS</h2>
                        <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
                        </svg>
                      </VListItemTitle>
                    </VListItem>
                    <VListItem
                      v-for="(item, index) in categories"
                      :key="index"
                      role="listitem" 
                      tabindex="-1" 
                      :id="`product-label-${category}`">
                        <div class="d-flex align-center hover-icon-right" @mouseover="openCategory(index)">
                          <span v-if="item.children.length > 0"
                            class="subtitle-menu d-flex align-center"
                            @click="redirect_('categories-slug', item.slug)" @keydown.enter="redirect_('categories-slug', item.slug)"
                            role="link" tabindex="0" :aria-label="`Ver categoría ${item.name}`">
                              <component v-if="items_products.filter(e => e.slug === item.slug).length === 1" :is="items_products.filter(e => e.slug === item.slug)[0].icon" class="me-3" />
                              <component v-else :is="icon5" class="me-3" />
                              {{ item.name }}
                          </span>
                          <NuxtLink 
                            :to="{
                              name: 'products',
                              query: {
                                category: item.slug
                              }
                            }" 
                            class="subtitle-menu d-flex align-center tw-no-underline" v-else>
                            <component v-if="items_products.filter(e => e.slug === item.slug).length === 1" :is="items_products.filter(e => e.slug === item.slug)[0].icon" class="me-3" />
                            <component v-else :is="icon5" class="me-3" />
                            {{ item.name }}
                          </NuxtLink> 
                          <VSpacer />
                          <icon_right v-if="item.children.length > 0"/>  
                        </div>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol cols="12" :md="cols" v-show="cols === 6" class="borderCol py-5">
                  <VList class="style-submenu mt-8" :aria-labelledby="`product-label-${category}`" role="menu">
                    <VListItem
                      v-for="(i, index2) in categories[category].children"
                      :key="index2"
                      @click="closeMenu">
                      <NuxtLink
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: i.slug.split('/')[1]
                          }
                        }"
                        class="tw-no-underline tw-text-tertiary">
                        <span class="subtitle-menu">{{ i.name }}</span>
                      </NuxtLink>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCard>
          </VMenu>
        </div>
      <!-----------------------SERVICIOS MENÚ------------------------------->
        <div class="">
          <VMenu 
            v-model="menuOpenS"
            transition="slide-x-transition" 
            location="bottom"
            :close-on-content-click="false"
            @update:modelValue="chanceMenuS">
            <template  v-slot:activator="{ props }">
              <button 
                v-bind="props"
                class="d-flex menu-trigger hover:tw-text-primary"
                aria-haspopup="true"
                :aria-expanded="menuOpen ? 'true' : 'false'"
                aria-controls="products-menu"
                @keydown.enter="menuOpen = true"
                @keydown.escape="menuOpen = false"
                aria-label="Menú Servicios"
              >
                <VIcon icon="mdi-menu" class="me-3" aria-hidden="true"/>
                <h2 class="pt-1 font-size-16 me-7 font-light">Servicios</h2>
              </button>
            </template>
            <VCard class="style-menu" :width="width" @mouseleave="closeMenuOnMouseLeave">
              <VRow no-gutters>
                <VCol cols="12" :md="cols" class="py-5 pr-3">
                  <VList class="pb-0">
                    <VListItem >
                      <VListItemTitle class="d-block lineheight">
                        <h2 class="d-block font-light title-menu">SERVICIOS</h2>
                        <svg width="59" height="3" viewBox="0 0 59 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="1.5" x2="58.8589" y2="1.5" stroke="#0A1B33" stroke-width="3"/>
                        </svg>
                      </VListItemTitle>
                    </VListItem>
                    <VListItem  
                      v-for="(item, index) in services"
                      :key="index" tabindex="-1" 
                      :id="`service-label-${index}`" role="menu">
                        <div class="d-flex align-center hover-icon-right" @mouseover="openService(index)">
                          <span v-if="item.children.length > 0"
                            class="subtitle-menu d-flex align-center"
                            @click="redirect_('categories-slug', item.slug)" @keydown.enter="redirect_('categories-slug', item.slug)" aria-label="Subservicios">
                              <component v-if="items_services.filter(e => e.slug === item.slug).length === 1" :is="items_services.filter(e => e.slug === item.slug)[0].icon" class="me-3" />
                              <component v-else :is="icon5" class="me-3" />
                              {{ item.name }} 
                          </span>
                          <NuxtLink 
                            :to="{
                              name: 'services',
                              query: {
                                category: item.slug
                              }
                            }"
                            class="subtitle-menu d-flex align-center tw-no-underline" v-else>
                            <component v-if="items_services.filter(e => e.slug === item.slug).length === 1" :is="items_services.filter(e => e.slug === item.slug)[0].icon" class="me-3" />
                            <component v-else :is="icon5" class="me-3" />
                            {{ item.name }}
                          </NuxtLink> 
                          <VSpacer />
                          <icon_right v-if="item.children.length > 0" :aria-label="openedGroups.includes(index) ? 'Submenú expandido' : 'Submenú colapsado'"/>  
                        </div>
                    </VListItem>
                  </VList>
                </VCol>
                <VCol cols="12" :md="cols" v-show="cols === 6" class="borderCol py-5">
                  <VList class="style-submenu mt-8">
                    <VListItem 
                      v-for="(i, index2) in services[category].children"
                      :key="index2"
                      @click="closeMenuS"
                      :aria-labelledby="`service-label-${category}`" role="menu">
                      <NuxtLink
                        :to="{
                          name: 'services',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: i.slug.split('/')[1]
                          }
                        }"
                        class="tw-no-underline tw-text-tertiary">
                        <span class="subtitle-menu">{{ i.name }}</span>
                      </NuxtLink>
                    </VListItem>
                  </VList>
                </VCol>
              </VRow>
            </VCard>
          </VMenu>
        </div>
      <!---------FIN SERVICIOS MENÚ--------------------------->
        <VSpacer />

        <NuxtLink to="/about" class="ms-5 tw-text-tertiary tw-no-underline hover:tw-text-primary">Quiénes somos</NuxtLink>
        <VDivider class="hr" vertical/>
        <NuxtLink to="/blogs" class="ms-5 tw-text-tertiary tw-no-underline hover:tw-text-primary">Blog</NuxtLink>
        <VDivider class="hr" vertical/>
        <NuxtLink to="/help" class="ms-5 tw-text-tertiary tw-no-underline me-3 hover:tw-text-primary">Preguntas frecuentes</NuxtLink>

      </VContainer>
      <VContainer class="p-0 tw-text-white d-flex" v-if="isMobile">
        <div class="hover:tw-text-yellow">
          <VAppBarNavIcon variant="text" @click.stop="drawer = !drawer" class="w-100 h-100 me-2 tw-text-tertiary" aria-label="menu"/> 
        </div>
        <VTextField
          v-model="textSearch"
          class="me-3"
          placeholder="Quiero..."
          flat
          variant="solo">
          <template v-slot:append-inner>
            <VBtn
              aria-label="Buscar"
              icon="mdi-magnify"
              @click="search"
              class="tw-bg-primary tw-text-white tw-font-bold h-100 search-button button-hover"
            />
          </template>
        </VTextField>
      </VContainer>
    </VAppBar>
  </section>
</template>

<style lang="scss">
  .scrollable-content {
      &.v-navigation-drawer {
        .v-navigation-drawer__content {
          display: flex;
          overflow: hidden;
          flex-direction: column;
        }
      }
    }
</style>

<style scoped>

  h2 {
    font-weight: normal;
  }

  .subtotal {
    font-size: 16px;
    font-weight: 600;
  }

  .btn-register {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    border-radius: 32px;
  }

  .btn-order {
    border-radius: 32px;
    border: 1px solid var(--Maastricht-tertiary, #0A1B33);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    box-shadow: none;
  }

  .btn-order:hover {
    border: 1px solid var(--Maastricht-tertiary, #0A1B33) !important;
    background: var(--Maastricht-tertiary, #0A1B33) !important;
    color: #FFFFFF!important;
  }

  .cart-empty {
    color: #FF0090;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
  }

  .card-timeline {
    padding: 16px 0px;
    border-radius: 24px;
    box-shadow: none;
  }

  .drawer {
    position: fixed !important;
    display: flex;
    flex-direction: column;
    height: 100vh !important; /* Ocupa el 100% de la altura de la ventana */
  }

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
    width: 30%;
  }

  .v-toolbar::v-deep(.mdi-menu) { 
    font-size: 30px !important;
  }

  .hr {
    width: 2px;
    margin: 15px 0 15px 20px;
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
    margin-inline-start: 90px  !important;
  }

  .text-regi {
    line-height: 16px;
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
    font-weight: bold;
    padding-top: 2px;
  }

  .v-text-field::v-deep(.v-field) { 
    border-radius: 100px;
    border: 1.5px solid #0A1B33 !important;
    height: 43px;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #999999 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding-top: 0 !important;
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
  }

  .subtitle-menu:hover {
    color: #FF0090;
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
    max-height: 450px;
    overflow-y: auto;
  }

  .style-submenu::-webkit-scrollbar {
    width: 4px;
  }

  .style-submenu::-webkit-scrollbar-track {
    background-color: #F3FCFE;
    border-radius: 10px;
  }

  .style-submenu::-webkit-scrollbar-thumb {
    background-color: #D9EEF2;
    border-radius: 10px;
  }
 
  .v-list-item--density-default.v-list-item--one-line {
    min-height: 44px !important;
  }

  .style-submenu .v-list-item--density-default.v-list-item--one-line {
    min-height: 35px !important;
  }

  .style-submenu:hover .v-list-item--density-default.v-list-item--one-line {
    color: white !important;
  }

  .line-div {
    border-bottom: 1px solid var(--Light-Cyan-3, #D9EEF2)!important;
  }

  @media only screen and (max-width: 767px) {

    .btn-register, .btn-order {
      width: 100%;
    }

    .drawer {
      height: auto !important; /* Ocupa el 100% de la altura de la ventana */
    }

    .drawer::v-deep(.v-navigation-drawer__content) {
      padding: 0 !important;
    }

    .cart-svg::v-deep(path) {
        fill: #FF0090 !important;
    }

    .second-header {
      top: 80px !important;
      position: fixed !important;
    }
    
    .topFixed {
      top: 0 !important;
      position: fixed !important;
    }

    .v-list::v-deep(.v-list-item--active .v-list-item__overlay) {
      background-color: #D9EEF2 !important;
    }

    .v-list::v-deep(.v-list-item--variant-text .v-list-item__overlay) {
      background-color: transparent;
    }

    .items-list::v-deep(.v-list-item__append) {
      border-bottom: 1px solid #D9EEF2 !important;
      padding-bottom: 4px !important;
    }

    .v-text-field::v-deep(.v-field) { 
      border-radius: 100px;
      height: 30px;
      top: 35%;
      padding: 0;
    } 

    .v-text-field::v-deep(.v-field__input) { 
      min-height: 27px;
    }
    
    .v-text-field::v-deep(::placeholder) { 
      color: #0A1B33 !important;
      opacity: inherit;
    }

    .v-text-field::v-deep(input) { 
      padding: 0 0 0 4% !important;
      font-size: 13px;
      border-radius: 100px;
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
      width: 36px;
      height: 29px !important;
    }

    .button-hover:hover {
      color: #FFFFFF !important;
    }

    .v-navigation-drawer {
      position: fixed !important;
    }

    .v-navigation-drawer::v-deep(.v-navigation-drawer__content) {
      padding: 10px 10px 0 10px;
    }

    .v-navigation-drawer::v-deep(.v-expansion-panel-text__wrapper) {
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

    .subtitle-menu {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      padding-inline: 25px !important;
    }

    .style-menu-mobile .v-list-item--density-default.v-list-item--one-line {
      min-height: 35px !important;
    }

  }
</style>