<script setup>
  
  import { useCartStores } from '~/stores/cart'
  import { useHomeStores } from '~/stores/home'
  import { useAuthStores } from '~/stores/auth'
  import { markRaw } from 'vue';
  import { formatNumber } from '@formatters'
  import { useRouter, useRoute } from 'vue-router'
  import { useCategoriesStores } from '@/stores/categories'
  import Loader from '@/components/common/Loader.vue'
  import Product8 from '@/components/product/Product8.vue'
  import Service4 from '@/components/service/Service4.vue'
  import HoverIcon from '@/components/app/HoverIcon.vue'
  import logo from '@assets/images/logo.svg';
  import logo_short from '@assets/images/logo-short.png';
  import heart from '@assets/icons/heart.svg?inline';
  import shoppinp_cart from '@assets/icons/shoppinp_cart.svg?inline';
  import user from '@assets/icons/user.svg?inline';
  import icon_right from '@assets/icons/right-icon.svg?inline';

  import cart from '@assets/icons/cart.svg?inline'
  import cart_mobile from '@assets/icons/cart_mobile.svg?inline'
  import menu_alt from '@assets/icons/menu-alt.svg?inline'
  import home_alt from '@assets/icons/home-icon.svg?inline'
  import favorite_alt from '@assets/icons/fav-icon.svg?inline'
  import favorite_solid from '@assets/icons/fav-icon-solid.svg?inline'
  import user_alt from '@assets/icons/user-icon.svg?inline'
  import user_solid from '@assets/icons/user-icon-solid.svg?inline'
  import cart_alt from '@assets/icons/cart-icon.svg?inline'
  import cart_solid from '@assets/icons/cart-icon-solid.svg?inline'

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
  const categoriesStores = useCategoriesStores()

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

  const drawerType = ref('')
  const isGuest = computed(() => name.value === null)
  // const isGuest = ref(false)

  const openedGroups = ref([]);
  const panelCat = ref(null);

  const { isMobile, isDesktop } = useDevice();
  const { $metapixel } = useNuxtApp()

  const windowWidth = ref(0);
  const isSmallViewport = computed(() => windowWidth.value < 768);
  const isSearchFixed = ref(false)

  const isHydrating = ref(true);

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
        // if(route.path.startsWith('/products') || route.path.startsWith('/services'))
        //   isDrawerOpen.value = true
        
        isLoading.value = true
        await cartStores.fetchCart()
        products.value = cartStores.getData

        let sum = 0
        products.value.forEach(element => {
          const cleanId = element.type === 0 ? String(element.product_id).replace(/"/g, '') : String(element.id).replace(/"/g, '')
          const finalContentId = element.type === 0 ? `PRODUCT_${cleanId}` : `SERVICE_${cleanId}`;

          let cupcake = element.type === 0 ? null : element.cupcakes.find(item => item.cake_size_id === element.cake_size_id)
          let value = 
            element.type === 0 ? element.product.price_for_sale :
              (element.cake_size_id === 0 ? element.price : cupcake.price)

          sum += (parseFloat(value) * element.quantity)

          const priceAsNumber = Number(value)
          const formattedPrice = Number(priceAsNumber.toFixed(2))

          if ($metapixel && $metapixel.trackEvent) {
            $metapixel.trackEvent('AddToCart', {
              content_ids: [finalContentId], 
              content_type: 'product',
              value: formattedPrice,
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

  const buildPrettyPathProducts = (category, subcategory = null, fathercategory = null) => {
    if (category && subcategory && fathercategory)
      return `/products/categories/${category}/${fathercategory}/${subcategory}`
    if (category && subcategory)
      return `/products/categories/${category}/${subcategory}`
    if (category)
      return `/products/categories/${category}`
    return '/products'
  }

  const buildPrettyPathServices = (category, subcategory = null, fathercategory = null) => {
    if (category && subcategory && fathercategory)
      return `/services/categories/${category}/${fathercategory}/${subcategory}`
    if (category && subcategory)
      return `/services/categories/${category}/${subcategory}`
    if (category)
      return `/services/categories/${category}`
    return '/services'
  }

  const handleCategoryClickProducts = (category, subcategory = null, fathercategory = null) => {
    categoriesStores.reset()
    if (category) categoriesStores.setCategory(category)
    if (subcategory) categoriesStores.setSubcategory(subcategory)
    if (fathercategory) categoriesStores.setFathercategory(fathercategory)
    router.push(buildPrettyPathProducts(category, subcategory, fathercategory))
  }

  const handleCategoryClickServices = (category, subcategory = null, fathercategory = null) => {
    categoriesStores.reset()
    if (category) categoriesStores.setCategory(category)
    if (subcategory) categoriesStores.setSubcategory(subcategory)
    if (fathercategory) categoriesStores.setFathercategory(fathercategory)
    router.push(buildPrettyPathServices(category, subcategory, fathercategory))
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
    if (process.client) {
        updateWindowWidth();
        window.addEventListener('resize', updateWindowWidth);
    }
    nextTick(() => {
      isHydrating.value = false;
    });
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (process.client) {
        window.removeEventListener('resize', updateWindowWidth);
    }
  });

  const updateWindowWidth = () => {
      if (process.client) {
          windowWidth.value = window.innerWidth;
      }
  };

  const handleScroll = () => {

   if (fixedSectionRef.value && isSmallViewport.value) {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 60) {
        isSearchFixed.value = 'fixed';
      } else if (scrollY <= 60) {
        isSearchFixed.value = '';
      }
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

  const toggleDrawer = (dt) => {
    if (drawer.value && drawerType.value === dt) {
      drawer.value = false;
    } else {
      drawer.value = true;
    }
    drawerType.value = dt;
    isDrawerOpen.value = false;
  };

  const toggleDrawerCart = () => {
    drawer.value = false; 
    isDrawerOpen.value = !isDrawerOpen.value;
  };

  /* const isActive = computed(() => {
    return route.path === '/' || route.path === '/dashboard/favorites';
  }); */
  const isActive = computed(() => {
    return route.path === '/';
  });

  const isLinkActive = (targetPath) => {
    const currentPath = route.path;
    if (currentPath === targetPath) {
        return true;
    }
    return false;
  };
</script>

<template>
  <section>
    <!-- B: MENU MOBILE -->
    <VNavigationDrawer
      v-model="drawer"
      class="d-print-none pm-menu-mobile"
      temporary
      :width="300"
      >

      <div id="pm-menu-logo">
        <span class="">
          <img :src="logo_short" width="50" alt="PartyMax - The Party Market" cover/>
        </span>
      </div>
      
      <div 
        id="pm-menu-profile" 
        :class="drawerType == 'mainmenu' ? 'pma-hidden' : ''"
      >
        <div style="padding: 4px 16px;">
          <h2 class="d-block title-menu tw-uppercase pt-6 pb-2">Hola</h2>
          <span class="d-block tw-text-primary pm-username-mobile">Arturo Guarin</span>
        </div>

        <!-- B: PROFILE MENU -->
        <VList
          aria-label="Menú de navegación de perfil"
          role="list"
          class="p-0 mt-5"
          :ripple="false"
        >
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                :to="{ name : 'dashboard' }"
                class="tw-no-underline item-link"
                aria-label="item-about-us"
              >
                <span class="d-block title-menu">Dashboard</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                :to="{ name : 'dashboard-profile' }"
                class="tw-no-underline item-link"
                aria-label="item-about-us"
              >
                <span class="d-block title-menu">Mi Perfil</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                :to="{ name : 'dashboard-purchases' }"
                class="tw-no-underline item-link"
                aria-label="item-about-us"
              >
                <span class="d-block title-menu">Compras</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                :to="{ name : 'dashboard-coupons' }"
                class="tw-no-underline item-link"
                aria-label="item-about-us"
              >
                <span class="d-block title-menu">Cupones</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                :to="{ name : 'dashboard-favorites' }"
                class="tw-no-underline item-link"
                aria-label="item-about-us"
              >
                <span class="d-block title-menu">Mis favoritos</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item logout tw-border-0 mt-8">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink 
                class="tw-no-underline item-link"
                aria-label="item-logout"
                @click="logout"
              >
                <span class="d-block">Cerrar Sesión</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
        </VList>
        <!-- E: PROFILE MENU -->
      </div>

      <div 
        id="pm-menu-noprofile"
        :class="drawerType != 'mainmenu' ? 'pma-hidden' : ''"
      >
        <VList id="pm-products" role="list" aria-label="Menu de Productos Móviles" v-model:opened="panelCat" class="pb-0" :ripple="false">
          <VListItem role="listitem">
            <VListItemTitle class="d-block lineheight pt-6 pb-2">
              <h2 class="d-block title-menu tw-uppercase">Productos</h2>
            </VListItemTitle>
          </VListItem>
          <template v-for="(item, index) in categories">
            <VListItem
              class="pm-menu-item"
              role="listitem"
              :active="false"
              selectable="false"
              v-if="categories[index]?.children.length === 0"
              :to="buildPrettyPathProducts(item.slug)"
            >
              <VListItemTitle class="d-block title-menu lineheight item-link">
                {{ item.name }}
              </VListItemTitle> 
            </VListItem>
            <VListGroup 
              v-else
              :id="`v-list-product-group--id-${item.slug}`"
              :value="item.name"
              :raw-id="item.slug" 
              :eager="false"
              class="pm-menu-item"
              ref="listGroup"
            >
              <template #activator="{ props }">
                <VListItem 
                  role="listitem"
                  :active="false"
                  selectable="false" 
                  class="items-list">
                  <VListItemTitle class="d-block lineheight">
                    <NuxtLink
                      :to="{
                        name: 'categories-slug',
                        params: { slug: item.slug }
                      }"  
                      class="tw-no-underline item-link"
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
                      size="45"
                      class="pm-menu-icon"
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
                    :to="buildPrettyPathProducts(item.slug, k.slug.split('/')[1])"
                    @click.prevent="handleCategoryClickProducts(item.slug, k.slug.split('/')[1])"  
                    class="tw-no-underline item-link">
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
        <VList id="pm-services" role="list" aria-label="Menu de Servicios Móviles" v-model:opened="panelCat" class="pb-0" :ripple="false">
          <VListItem role="listitem">
            <VListItemTitle class="d-block lineheight pt-6">
              <h2 class="d-block title-menu tw-uppercase">Servicios</h2>
            </VListItemTitle>
          </VListItem>
          <template v-for="(item, index) in services">
            <VListItem class="pm-menu-item" role="listitem" v-if="services[index]?.children.length === 0">
              <VListItemTitle class="d-block lineheight">
                <NuxtLink 
                  :to="buildPrettyPathServices(item.slug)"
                  @click.prevent="handleCategoryClickServices(item.slug)"
                  class="tw-no-underline item-link">
                  <span class="d-block title-menu">{{ item.name }}</span>
                </NuxtLink>
              </VListItemTitle> 
            </VListItem>
            <VListGroup 
              class="pm-menu-item" 
              :id="`v-list-service-group--id-${item.slug}`"
              v-else 
              :raw-id="item.slug" 
              :value="item.name" 
              :eager="false"
            >
              <template #activator="{ props }">
                <VListItem role="listitem" class="items-list">
                  <VListItemTitle class="d-block lineheight">
                    <NuxtLink
                      :to="{
                        name: 'categories-slug',
                        params: { slug: item.slug }
                      }"  
                      class="tw-no-underline item-link"
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
                      size="45"
                      class="pm-menu-icon"
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
                    :to="buildPrettyPathServices(item.slug, k.slug.split('/')[1])"
                    @click.prevent="handleCategoryClickServices(item.slug, k.slug.split('/')[1])"  
                    class="tw-no-underline item-link">
                    <span class="d-block title-menu">
                      {{ k.name }}
                    </span>
                  </NuxtLink>
                </VListItem>
              </div>
            </VListGroup>
          </template>
        </VList>
        <!--FIN MENU SERVICIOS MOBILE-->
  
        <div class="pm-menu-separator my-5"></div>
  
        <!-- B: MISCELANEOUS MENU -->
        <VList
          aria-label="Menú de navegación principal"
          role="list"
          class="p-0 mb-10"
          v-model:opened="panelCat"
          :ripple="false"
        >
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink aria-label="item-about-us" to="/about" class="tw-no-underline item-link">
                <span class="d-block title-menu">Quiénes somos</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink aria-label="item-help" to="/help" class="tw-no-underline item-link">
                <span class="d-block title-menu">Preguntas frecuentes</span>
              </NuxtLink>
            </VListItemTitle>  
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink aria-label="item-help" to="/terms-and-conditions" class="tw-no-underline item-link">
                <span class="d-block title-menu">Términos y condiciones</span>
              </NuxtLink>
            </VListItemTitle>  
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink aria-label="item-help" to="/data-protection" class="tw-no-underline item-link">
                <span class="d-block title-menu">Protección de datos</span>
              </NuxtLink>
            </VListItemTitle>  
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">
            <VListItemTitle class="d-block lineheight">
              <NuxtLink aria-label="item-help" to="/privacy-statement" class="tw-no-underline item-link">
                <span class="d-block title-menu">Declaración de privacidad</span>
              </NuxtLink>
            </VListItemTitle>  
          </VListItem>
          <VListItem role="listitem" class="pm-menu-item tw-border-0">        
            <VListItemTitle class="d-block lineheight">
              <NuxtLink to="/blogs" class="tw-no-underline item-link">
                <span class="d-block title-menu">Blog</span>
              </NuxtLink>
            </VListItemTitle>
          </VListItem>
        </VList>
        <!-- E: MISCELANEOUS MENU -->
      </div>


    </VNavigationDrawer>
    <!-- E: MENU MOBILE -->

    <!-- :width="isMobile ? 300 : 300"
      :height="isMobile ? '80vh' : '100vh'" -->
    <VNavigationDrawer
      :model-value="isDrawerOpen"
      width="300"
      height="100vh"
      location="end"
      :class="['scrollable-content', 'drawer', 'd-print-none', 'pm-drawer-cart', { 'pm-hide-on-hydration': isHydrating }]"
      temporary
      @update:model-value="handleDrawerModelValueUpdate"
    >
      <Loader :isLoading="isLoading"/>
      <!-- 👉 Title -->
      <div class="d-flex align-center pa-4 pa-md-6 pb-1 pb-md-1">
        <h2 class="text-h6">
          Carrito
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
              <cart_alt class="d-block mx-auto mb-5 w-50" style="fill: #FF0090;"/>
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

    <VAppBar flat class="header d-print-none pm-header-desktop">
      <VContainer class="tw-bg-white">
        <!-- B: HEADER DESKTOP -->
        <div no-gutters class="container d-flex justify-content-center align-center tw-gap-4 w-100">
          <NuxtLink to="/" class="tw-no-underline tw-text-white me-0 me-sm-8">
            <img :src="logo" class="pm-logo-header" width="200" alt="PartyMax - The Party Market" cover/>
          </NuxtLink>
          <VBtn class="pm-menu-button desktop" @click.prevent="toggleDrawer('mainmenu')"></VBtn>
          <VTextField
            v-model="textSearch"
            ref="fixedSectionRef"
            class="pm-searchfield-desktop pt-4 w-100x"
            :class="isSearchFixed ? 'fixed' : ''"
            placeholder="Encuentra el producto que buscas..."
            :color="color"
            flat
            variant="solo"
            id="search-input"
            aria-label="Encuentra el producto que buscas..."
            @keydown.enter="search">
            <template v-slot:append-inner>
              <VBtn @click="search" class="tw-text-white h-100 search-button"></VBtn>
            </template>
          </VTextField>
          <div class="d-flex align-center align-items-stretch flex-shrink-0 pm-user-functions">
            <button 
                class="index heart me-5" aria-label="Mis favoritos"
                @click="redirect('dashboard-favorites')">
                <HoverIcon
                  :icon-alt="favorite_alt"
                  :icon-solid="favorite_solid"
                />
            </button>
            <button aria-label="Abrir carrito de compras" icon class="me-3 shoppinp_cart" @click="isDrawerOpen = true">
              <VBadge
                color="primary"
                aria-label="Abrir carrito de compras"
                :content="cart_products"
                :model-value="!!cart_products"
                location="end top"
              >
                <HoverIcon
                  :icon-alt="cart_alt"
                  :icon-solid="cart_solid"
                />
              </VBadge>
            </button>
            <div class="d-flex user-text">
              <button v-if="name === null" aria-label="Iniciar Sesion o Registrarse" class="user ms-2" @click="redirect('register')">
                <HoverIcon
                  :icon-alt="user_alt"
                  :icon-solid="user_solid"
                />
              </button>
              <VMenu v-else>
                <template v-slot:activator="{ props }">
                  <button 
                    class="user ms-2" 
                    v-bind="props"
                    aria-label="Menú de usuario"
                    aria-haspopup="true"
                  >
                    <HoverIcon
                      :icon-alt="user_alt"
                      :icon-solid="user_solid"
                    />
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
            </div>
          </div>
        </div>
        <!-- E: HEADER DESKTOP -->
      </VContainer>
    </VAppBar>

    <section class="pm-floating-functions-mobile">
      <VContainer class="py-0 h-100">
        <div class="d-flex align-items-center justify-content-center tw-gap-6 h-100">
          <NuxtLink 
            to="/" 
            class="pm-ff-link tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100"
            :class="{ 'active': isLinkActive('/') }"
            >
            <home_alt class="pm-ff-icon" />
          </NuxtLink>
          <NuxtLink 
            class="pm-ff-link tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100"
            :class="{ 'active': isLinkActive('/dashboard/favorites') }"
            @click="redirect('dashboard-favorites')"
            >
            <favorite_alt class="pm-ff-icon" />
          </NuxtLink>
          <NuxtLink 
            class="pm-ff-link featured tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100"
            :class="{ 'active': isDrawerOpen }"
            @click.prevent="toggleDrawerCart"
          >
              <VBadge
                aria-label="Abrir carrito de compras"
                :content="cart_products"
                :model-value="!!cart_products"
                location="end top"
              >
              </VBadge>
            <cart_alt class="pm-ff-icon" />
          </NuxtLink>


          <NuxtLink 
            v-if="!isGuest"
            class="pm-ff-link tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100"
            :class="{ 'active': (drawer && drawerType === 'profile') }"
            @click.prevent="toggleDrawer('profile')"
          >
            <user_alt class="pm-ff-icon" />
          </NuxtLink>
          <NuxtLink 
            v-else
            class="pm-ff-link tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100"
            :class="{ 'active': isLinkActive('/register') }"
            @click="redirect('register')"
          >
            <user_alt class="pm-ff-icon" />
          </NuxtLink>


          <NuxtLink 
            class="pm-ff-link tw-no-underline d-flex align-items-center justify-content-center tw-gap-6 h-100" 
            :class="{ 'active': (drawer && drawerType === 'mainmenu') }"
            @click.prevent="toggleDrawer('mainmenu')"
          >
            <menu_alt class="pm-ff-icon" />
          </NuxtLink> 
        </div>
      </VContainer>
    </section>

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
  .pma-hidden {
    display: none;
  }

  .pm-hide-on-hydration {
    visibility: hidden !important;
    opacity: 0 !important;
  }

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
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z' style='fill:%23999999'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    
    top: 0;
    right: 0;
    bottom: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font-size: 11.5px;
    font-weight: bold;
    padding: 0;
    min-width: 60px;
  }
  .search-button:hover {
    background-size: 55%;
  }

  .pm-searchfield-desktop {
    height: 43px;
    padding: 0 !important;
  }

  .v-text-field::v-deep(.v-field) { 
    border-radius: 3px;
    border: 1.5px solid rgb(var(--v-theme-primary)) !important;
    height: 43px;
    padding: 0 !important;
  } 

  .v-text-field::v-deep(::placeholder) { 
    color: #999999 !important;
    opacity: inherit;
  }

  .v-text-field::v-deep(input) { 
    padding: 0 60px 0 10px;
    min-height: 39px;
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
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    font-style: normal;
  }

    h2.title-menu {
      font-family: 'Poppins', sans-serif;
      /* font-size: 32px; */
      font-style: normal;
      font-weight: 900;
      color: #777;
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
 
  /* 

  .style-submenu .v-list-item--density-default.v-list-item--one-line {
    min-height: 35px !important;
  } */

  .style-submenu:hover .v-list-item--density-default.v-list-item--one-line {
    color: white !important;
  }

  .line-div {
    border-bottom: 1px solid var(--Light-Cyan-3, #D9EEF2)!important;
  }

  .pm-menu-button {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='%23ff0090'%3E%3Cpath%20d='M4%206h16v2H4zM4%2011h16v2H4zM4%2016h16v2H4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0px;
    border: 1px solid transparent;
    width: 43px;
    height: 43px;
    min-width: 43px;
  }

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

  /* .items-list::v-deep(.v-list-item__append) {
    border-bottom: 1px solid #D9EEF2 !important;
    padding-bottom: 4px !important;
  } */

  /* .v-text-field::v-deep(.v-field) { 
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
  } */

  /* .w-100x {
    width: 68%;
  }

  .w-15 {
    width: 32%;
  } */

  .iconsMobile .v-btn--icon.v-btn--density-default {
    width: calc(var(--v-btn-height) + 6px) !important;
  }

  /* .search-button {
    width: 36px;
    height: 29px !important;
  }

  .button-hover:hover {
    color: #FFFFFF !important;
  } */

  .v-navigation-drawer {
    position: fixed !important;
  }

  /* .v-navigation-drawer::v-deep(.v-navigation-drawer__content) {
    padding: 10px 10px 0 10px;
  } */

  .v-navigation-drawer::v-deep(.v-expansion-panel-text__wrapper) {
    padding: 10px;
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
    /* min-height: 35px !important; */
  }
  
  .pm-header-desktop {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  }

  #pm-menu-logo {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    top: 0;
    width: 100%;
    height: 84px;
    z-index: 1;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
  }

  #pm-menu-logo span {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e1f9fb;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  #pm-menu-logo span img {
    width: 80%;
    object-fit: scale-down;
  }

  .pm-menu-mobile {
    padding-top: 83px;
  }

  .pm-menu-item {
    position: relative;
    transform: .2s !important;
    border-bottom: 1px solid #f7f8f9;
    padding: 0 !important;
  }
  .pm-menu-item:hover {
    background: #f7f8f9;
  }
  .pm-menu-item:hover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background-color: #FF0090;
    transition: transform .3s;
    transform-origin: top;
  }
  .pm-menu-item:last-child {
      border: 0;
  }

  .pm-menu-item .v-list-item--density-default.v-list-item--one-line {
    min-height: unset;
    padding: 0 0;
  }

  .pm-menu-item .item-link {
    display: flex !important;
    height: 45px;
    align-items: center;
    padding: 0 0 0 16px;
  }

  .pm-menu-item.logout {
    padding: 0 16px !important;
  }
  .pm-menu-item.logout .item-link {
    background-color: #FF0090;
    border-radius: 3px;;
    justify-content: center;
    font-family: 'poppins', sans-serif;
    font-weight: 600;
    color: #FFFFFF !important;
   }

  .pm-menu-item :deep(.pm-menu-icon) {
    font-size: 25px !important;
  }

  .pm-menu-item :deep(.v-list-item__spacer) {
    display: none;
  }

  .pm-menu-separator {
    background-color: #EEE;
    height: 5px;
  }

  .pm-floating-functions-mobile {
    display: none;
    position: fixed !important;
    background-color: #FFFFFF;
    border: 2px solid #EEE;
    bottom: -1px !important;
    width: 100%;
    height: 60px;
    z-index: 1100;
  }

  .pm-floating-functions-mobile .pm-ff-icon {
    width: 32px !important;
    height: auto !important;
    color: #777;
  }

  .pm-floating-functions-mobile .pm-ff-link {
    position: relative;
    background: #FFFFFF;
    width: 60px;
  }

  .pm-floating-functions-mobile .pm-ff-link.active .pm-ff-icon {
    color: #FF0090 !important;
  }

  .pm-ff-link.featured {
      border: 2px solid #EEE;
      border-radius: 50%;
      margin-top: -15px;
      width: 58px;
      height: 58px;
      min-width: 58px;
      min-height: 58px;
      transform: scale(1.2);
  }

  .pm-ff-link.featured .v-badge {
    position: absolute;
    /* top: 5px;
    right: 5px; */
    top: 24px;
    right: 24px;
  }
  .pm-ff-link.featured .pm-ff-icon {
    width: 40px !important;
  }

  .pm-username-mobile {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
  }

  .pm-drawer-cart {
    /* display: none; */
  }

  @media only screen and (max-width: 767px) {
    .pm-header-desktop .v-container {
      display: flex;
    }
    
    .pm-header-desktop .container {
      flex-direction: column;
      gap: 10px !important;
    }

    .pm-logo-header {
      width: 180px;
    }

    .pm-searchfield-desktop {
      width: 100% !important;
    }

    .pm-searchfield-desktop.fixed {
        width: 100% !important;
        padding: 13px 15px 11px !important;
        position: fixed;
        top: 0;
        background: #fff;
        height: 66px;
    }

    .pm-menu-mobile {
      padding-bottom: 37px;
    }
    .pm-drawer-cart .v-navigation-drawer__append {
      padding-bottom: 80px !important;
    }

    .pm-menu-button.desktop, .pm-user-functions {
      display: none !important;
    }

    .pm-floating-functions-mobile {
      display: block !important;
    }
  }
</style>