<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import { ref } from "vue";
import { useHomeStores } from "@/stores/home";
import { useMiscellaneousStores } from "@/stores/miscellaneous";
import { useFavoritesStores } from '@/stores/favorites'
import { useCartStores } from '@/stores/cart'
import { formatNumber } from '@formatters'
import router from '@/router'
import Loader from "@/components/common/Loader.vue";
import icon1 from "@/assets/icons/icon-menu-product.svg";
import icon2 from "@/assets/icons/icon-menu-product2.svg";
import icon3 from "@/assets/icons/icon-menu-product3.svg";
import Product3 from "@/components/product/Product3.vue";
import Product4 from "@/components/product/Product4.vue";
import arrow_right from '@assets/icons/arrow_right.svg?inline';
import arrow_left from '@assets/icons/Arrow_left.svg?inline';
import t_7 from '@assets/images/t_7.jpg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = ref([Navigation, Pagination])

const route = useRoute();
const homeStores = useHomeStores();
const miscellaneousStores = useMiscellaneousStores();
const cartStores = useCartStores()
const favoritesStores = useFavoritesStores()

const isLoading = ref(true);
const categories = ref(null);
const panelCat = ref(null);
const openedGroups = ref([]);
const openedSubGroups = ref([]);
const products = ref([]);
const tab = ref("0");
const category = ref(null);
const toggle = ref([]);

const rowPerPage = ref(12);
const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);
const rangPrice = ref([0, 50000]);

const min = ref(null);
const max = ref(null);

const colors = ref([]);
const colorsSelected = ref([]);
const onlyWholesale = ref(false)

const rating = ref(5)
const isMobile = /Mobi/i.test(navigator.userAgent);
const baseURL = ref(import.meta.env.VITE_APP_DOMAIN_API_URL + '/storage/')

const client_id = ref(null)
const user_id = ref(null)
const load = ref(false)
const isSnackbarBottomStartVisible = ref(false)
const variant = ref('tonal')
const colorMessage = ref('')
const message = ref('')
const product_id = ref(0)

const bread = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  }
]);

const sortBy = ref(0)

const sortByItems = ref([
  { id: 0, name : 'Recomendados'},
  { id: 1, name : 'Precio: Menor a mayor'},
  { id: 2, name : 'Precio: Mayor a menor'},
  { id: 3, name : 'Mejor Valorados'},
  { id: 4, name :  'Recientes'}
])

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPages.value)
    currentPage.value = totalPages.value;
});

watch(() => 
  route.query,(newPath, oldPath) => {
    fetchData()
  }
);

watchEffect(fetchData);

async function fetchData() {

  bread.value = [
    {
      title: "Home",
      disabled: false,
      href: "/",
    }
  ]

  openedGroups.value = []
  openedSubGroups.value = []
  category.value = null 

  isLoading.value = true;

  await homeStores.fetchData();

  categories.value = homeStores.getData.parentCategories;

  let info = {
    orderByField: (route.query.category && route.query.category !== 'all') ? 'pl.order_id' : 'products.order_id',
    orderBy: 'asc',
    limit: (isMobile.value) ? 6 : rowPerPage.value,
    page: currentPage.value,
    category: route.query.category ?? null,
    subcategory: route.query.subcategory ?? null,
    colorId: route.query.colorId ?? null,
    searchPublic: route.query.search ?? null,
    min: min.value ?? null,
    max: max.value ?? null,
    sortBy: sortBy.value,
    wholesalers: route.query.wholesalers === 'true' ? true : false,
    rating: rating.value
  };

  var aux = await miscellaneousStores.products(info);
  products.value = aux.products.data;
  totalPages.value = aux.products.last_page;
  totalProducts.value = aux.productsTotalCount;

  colors.value = aux.colors
  onlyWholesale.value = aux.wholesale

  if(route.query.colorId) {
    const colorsQuery = route.query.colorId.split(',').map(Number);

    const positions = colors.value.map(obj => obj.id).reduce((acc, num, index) => {
      if (colorsQuery.includes(num))
        acc.push(index);
      return acc;
    }, []);

    toggle.value = positions
  }

  if (route.query.category && route.query.category !== 'all') {
    panelCat.value = null
    category.value = {
      title: categories.value.filter(item => item.slug === route.query.category)[0].name,
      disabled: false,
      href: "categories/" + route.query.category
    };

    bread.value.push(category.value);

    if (route.query.fathercategory) {
      const fathercategory = {
        title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name,
        disabled: true,
        href: "",
      };

      category.value.fathercategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].name

      bread.value.push(fathercategory);
    }

    if (typeof route.query.fathercategory === 'undefined' && route.query.subcategory) {
      const subcategory = {
        title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name,
        disabled: true,
        href: "",
      };

      category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].name

      bread.value.push(subcategory);
    }

    
    if (typeof route.query.fathercategory !== 'undefined' && route.query.subcategory) {
      const subcategory = {
        title: categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name,
        disabled: true,
        href: "",
      };

      category.value.subcategory = categories.value.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory+ '/' + route.query.subcategory)[0].name

      bread.value.push(subcategory);
    }


    const product_ = {
      title: "Productos",
      disabled: true,
      href: "",
    };

    bread.value.push(product_);
  }

  if(localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)
      
    client_id.value = userDataJ.client.id
    user_id.value = userDataJ.id
  }

  isLoading.value = false;
}

const changePage = (value) => {
  if(value === 'prev' && currentPage.value !== 1) {
    currentPage.value--
    fetchData()
  }  else if (value === 'next' && currentPage.value !== totalPages.value) {
    currentPage.value++
    fetchData()
  }
}

const chancePagination = () => {
  fetchData();
};

const isLastItem = (index) => {
  return index === products.value.length - 1;
};

const priceAction = () => {
  min.value = rangPrice.value[0];
  max.value = rangPrice.value[1];
  fetchData();
};

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

const toggleSubGroupFn = (index, subCat) => {
  if (openedSubGroups.value.includes(index)) {
    openedSubGroups.value = [];
  } else {
    openedSubGroups.value = [index];
    panelCat.value[1] = subCat
  }
};

const colorAction = () => {

  colorsSelected.value = []

  toggle.value.forEach(element => {
    colorsSelected.value.push(colors.value[element].id)
  });

  router.push({ 
    name: 'products', 
    query: {
      category: route.query.category,
      fathercategory: route.query.fathercategory,
      subcategory: route.query.subcategory,
      colorId: colorsSelected.value.join(","),
      wholesalers: route.query.wholesalers === 'true' ? true : false
    }
  })
}

const addCart = (value) => {
  product_id.value = value.product_id

  if(client_id.value) {
    
    let isWholesale = route.query.wholesalers === 'true' ? 1 : 0

    if(isWholesale === onlyWholesale.value || onlyWholesale.value === -1 ) {

      let data = {
        client_id: client_id.value,
        product_color_id: value.product_color_id,
        quantity: value.cant_prod,
        wholesale: isWholesale
      }

      load.value = true

      cartStores.add(data)
        .then(response => {

          isSnackbarBottomStartVisible.value = true
          message.value = 'Agregado al carrito'
          colorMessage.value = 'primary'
          variant.value = 'tonal'
          load.value = false

          setTimeout(() => {
            isSnackbarBottomStartVisible.value = false
            message.value = ''
            colorMessage.value = ''
          }, 3000)

        }).catch(err => {
          load.value = false
          //console.error(err.message)
        })
    } else {
      isSnackbarBottomStartVisible.value = true
      message.value = 'Debes agregar al carrito productos ' + (isWholesale ? 'al detal' : 'al mayor') + ' debido a tu selección anterior'
      colorMessage.value = 'error'
      variant.value = 'flat'
                      
      setTimeout(() => {
        isSnackbarBottomStartVisible.value = false
        message.value = ''
        colorMessage.value = ''
      }, 3000)
    }
  } else {
    isSnackbarBottomStartVisible.value = true
    message.value = 'Necesitas iniciar sesión antes de agregar un producto al carrito'
    colorMessage.value = 'error'
    variant.value = 'flat'
                    
    setTimeout(() => {
      isSnackbarBottomStartVisible.value = false
      message.value = ''
      colorMessage.value = ''
    }, 3000)
  }
}

const addfavorite = (product_id) => {

  if(client_id.value) {

    favoritesStores.add({user_id: user_id.value, product_id: product_id })
      .then(response => {

        isSnackbarBottomStartVisible.value = true
        message.value = 'Agregado a la lista de favoritos'
        colorMessage.value = 'primary'
        variant.value = 'tonal'
                    
        setTimeout(() => {
          isSnackbarBottomStartVisible.value = false
          message.value = ''
          colorMessage.value = ''
        }, 3000)

        fetchData()
    
      }).catch(err => {
        //console.error(err.message)
      })

    } else {
      isSnackbarBottomStartVisible.value = true
      message.value = 'Necesitas iniciar sesión antes de agregar un producto a la lista'
      colorMessage.value = 'error'
      variant.value = 'flat'

      setTimeout(() => {
        isSnackbarBottomStartVisible.value = false
        message.value = ''
        colorMessage.value = ''
      }, 3000)
  }
}

</script>

<template>
  <section>
    <VAppBar flat class="breadcumb tw-bg-cyan pt-1">
      <VContainer class="tw-text-tertiary d-flex align-center px-0">
        <v-breadcrumbs :items="bread" class="px-2"/>
      </VContainer>
    </VAppBar>
    <VContainer class="pt-0 container-mobile">
      <Loader :isLoading="isLoading" />
      <VRow no-gutters v-if="categories" class="products-structure">
        <VCol cols="12" md="3" class="d-none d-md-block">
          <VCard class="mt-7 sidebar-container">
            <VCardItem class="p-0 text-left mt-6"> CATEGORÍAS </VCardItem>

            <VCardItem v-if="route.query.category && route.query.category !== 'all'" class="p-0 text-allcategories tw-font-bold mt-6">
              <router-link
                :to="{
                  name: 'products',
                  query: {
                    wholesalers: route.query.wholesalers === 'true' ? true : false
                  }
                }"
                class="tw-no-underline tw-text-tertiary hover:tw-text-primary"
              >
                <span>
                  <VIcon icon="mdi-chevron-left" />
                  TODAS LAS CATEGORIAS
                </span>
              </router-link>
            </VCardItem>

            <VList v-else v-model:opened="panelCat">
              <div v-for="(i, index) in categories" :key="index">
                <VListItem v-if="i.children.length === 0" class="px-2">
                  <VListItemTitle>
                    <router-link
                      :to="{
                        name: 'products',
                        query: {
                          category: i.slug.split('/')[0],
                          colorId: colorsSelected.join(','),
                          wholesalers: route.query.wholesalers === 'true' ? true : false
                        },
                      }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ i.name }}
                    </router-link> 
                  </VListItemTitle>
                </VListItem>
                <VListGroup v-else :value="i.name" class="px-0">
                  <template #activator="{ props }">
                    <VListItem class="px-2">
                      <router-link
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            colorId: colorsSelected.join(','),
                            wholesalers: route.query.wholesalers === 'true' ? true : false
                          },
                        }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                        <VListItemTitle>{{ i.name }}</VListItemTitle>
                      </router-link>
                      <template #append>
                        <VIcon
                          v-bind="props"
                          :icon="openedGroups.includes(index)
                          ? 'mdi-chevron-up'
                          : 'mdi-chevron-down'"
                          @click="toggleGroupFn(index, i.name)"
                        />
                      </template>
                    </VListItem>
                  </template>

                  <div v-for="(j, jIndex) in i.children" :key="jIndex">
                    <VListItem v-if="j.grandchildren.length === 0">
                      <router-link
                        :to="{
                          name: 'products',
                          query: {
                            category: i.slug.split('/')[0],
                            subcategory: j.slug.split('/')[1],
                            colorId: colorsSelected.join(','),
                            wholesalers: route.query.wholesalers === 'true' ? true : false
                          },
                        }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary">
                        <VListItemTitle> {{ j.name }} </VListItemTitle>
                      </router-link>
                    </VListItem>
                    <VListGroup v-else :value="j.name">
                      <template #activator="{ props }">
                        <VListItem>
                          <router-link
                            :to="{
                              name: 'products',
                              query: {
                                category: i.slug.split('/')[0],
                                subcategory: j.slug.split('/')[1],
                                colorId: colorsSelected.join(','),
                                wholesalers: route.query.wholesalers === 'true' ? true : false
                              },
                            }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                            <VListItemTitle> {{ j.name }} </VListItemTitle>
                          </router-link>
                          <template #append>
                            <VIcon
                              v-bind="props"
                              :icon="openedSubGroups.includes(jIndex)
                              ? 'mdi-chevron-up'
                              : 'mdi-chevron-down'"
                              @click="toggleSubGroupFn(jIndex, j.name)"
                            />
                          </template>
                        </VListItem>
                      </template>
                      <div v-for="k in j.grandchildren" :key="k">
                        <VListItem>
                          <router-link
                            :to="{
                              name: 'products',
                              query: {
                                category: i.slug.split('/')[0],
                                fathercategory: j.slug.split('/')[1],
                                subcategory: k.slug.split('/')[2],
                                colorId: colorsSelected.join(','),
                                wholesalers: route.query.wholesalers === 'true' ? true : false
                              },
                            }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                            {{ k.name }}
                          </router-link> 
                        </VListItem>
                      </div>
                    </VListGroup>
                  </div>
                </VListGroup>
              </div>
            </VList>

            <!-- padres, hijos y nietos -->
            <VList v-if="route.query.fathercategory && category" v-model:opened="panelCat">
              <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
                <span>
                  <VIcon icon="mdi-chevron-left" />
                  <router-link
                    :to="{
                      name: 'products',
                        query: {
                          category: route.query.category,
                          colorId: colorsSelected.join(','),
                          wholesalers: route.query.wholesalers === 'true' ? true : false
                        },
                      }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ category.title }}
                  </router-link> 
                </span>
              </VListItem>

              <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
                <span>
                  <VIcon icon="mdi-chevron-left" />
                  <router-link
                    :to="{
                      name: 'products',
                        query: {
                          category: route.query.category,
                          subcategory: route.query.fathercategory,
                          colorId: colorsSelected.join(','),
                          wholesalers: route.query.wholesalers === 'true' ? true : false
                        },
                      }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ category.fathercategory }}
                  </router-link> 
                </span>
              </VListItem>

              <VListItem class="px-2">
                <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                  {{  category.subcategory }}
                </VListItemTitle>
              </VListItem>
            </VList>

            <!-- solo padres e hijos -->
            <VList 
              v-if="typeof route.query.fathercategory === 'undefined' && 
              typeof route.query.subcategory !== 'undefined' 
              && route.query.category && category" 
              v-model:opened="panelCat">

              <VListItem class="tw-font-bold hover:tw-text-primary tw-uppercase px-0">
                <span>
                  <VIcon icon="mdi-chevron-left" />
                  <router-link
                    :to="{
                      name: 'products',
                        query: {
                          category: route.query.category,
                          colorId: colorsSelected.join(','),
                          wholesalers: route.query.wholesalers === 'true' ? true : false
                        },
                      }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ category.title }}
                  </router-link> 
                </span>
              </VListItem>

              <VListItem class="px-2">
                <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                  {{  category.subcategory }}
                </VListItemTitle>
              </VListItem>

              <div 
                v-for="(j, jIndex) in 
                categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren" 
                :key="jIndex">
                <VListItem>
                  <router-link
                    :to="{
                      name: 'products',
                      query: {
                        category: route.query.category,
                        fathercategory: route.query.subcategory,
                        subcategory: j.slug.split('/')[2],
                        colorId: colorsSelected.join(','),
                        wholesalers: route.query.wholesalers === 'true' ? true : false
                      },
                    }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                      {{ j.name }}
                  </router-link> 
                </VListItem>
              </div>
            </VList>

            <!-- Solo padres -->
            <VList 
              v-if="typeof route.query.fathercategory === 'undefined' && 
              typeof route.query.subcategory === 'undefined' 
              && route.query.category && category" 
              v-model:opened="panelCat">

              <VListItem class="px-2">
                <VListItemTitle class="tw-uppercase tw-font-bold tw-text-primary px-0 list-text">
                  {{ category.title }}
                </VListItemTitle>
              </VListItem>

              <div v-for="(j, jIndex) in categories.filter(item =>item.slug === route.query.category)[0].children" :key="jIndex">
                  <VListItem v-if="j.grandchildren.length === 0">
                    <router-link
                      :to="{
                        name: 'products',
                        query: {
                          category: route.query.category,
                          subcategory: j.slug.split('/')[1],
                          colorId: colorsSelected.join(','),
                          wholesalers: route.query.wholesalers === 'true' ? true : false
                        },
                      }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                        {{ j.name }}
                    </router-link> 
                  </VListItem>
                  <VListGroup v-else :value="j.name">
                    <template #activator="{ props }">
                      <VListItem>
                        <router-link
                          :to="{
                            name: 'products',
                            query: {
                              category: route.query.category,
                              subcategory: j.slug.split('/')[1],
                              colorId: colorsSelected.join(','),
                              wholesalers: route.query.wholesalers === 'true' ? true : false
                            },
                          }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                          <VListItemTitle> {{ j.name }} </VListItemTitle>
                        </router-link>
                        <template #append>
                          <VIcon
                            v-bind="props"
                            :icon="openedGroups.includes(jIndex)
                            ? 'mdi-chevron-up'
                            : 'mdi-chevron-down'"
                            @click="toggleGroupFn(jIndex, j.name)"
                          />
                        </template>
                      </VListItem>
                    </template>
                    <div v-for="k in j.grandchildren" :key="k">
                      <VListItem>
                        <router-link
                          :to="{
                            name: 'products',
                            query: {
                              category: route.query.category,
                              fathercategory: j.slug.split('/')[1],
                              subcategory: k.slug.split('/')[2],
                              colorId: colorsSelected.join(','),
                              wholesalers: route.query.wholesalers === 'true' ? true : false
                            },
                          }" class="tw-no-underline tw-text-tertiary hover:tw-text-primary"> 
                          {{ k.name }}
                        </router-link> 
                      </VListItem>
                    </div>
                  </VListGroup>
              </div>
            </VList>

          </VCard>

          <VCard class="mt-7 sidebar-container">
            <VCardItem class="p-0 text-left mt-6"> COLOR </VCardItem>
            <VCardText class="text-left align-left p-0 mt-4">
              <div class="d-flex align-center flex-column">
          
                <VBtnToggle
                  v-model="toggle"
                  density="comfortable"
                  multiple
                  class="d-flex align-center flex-wrap tw-bg-none v-avatar-group h-auto"
                >
                  <VBtn v-for="(color, index) in colors" variant="text" @click="colorAction">
                    <VAvatar 
                      v-if="color.is_gradient" 
                      size="30" 
                      class="my-1 tw-cursor-pointer"
                      :class="(toggle.indexOf(index) !== -1) ? 'color-selected' : 'color-chip'"
                      :style="{ backgroundImage: color.color }"
                    >
                      <VTooltip
                        location="top"
                        activator="parent"
                        transition="scroll-x-transition"
                      >
                        <span>{{ color.name }}</span>
                      </VTooltip>
                    </VAvatar>
                    <VAvatar 
                      v-else 
                      :color="color.color" 
                      size="30" 
                      class="my-1 tw-cursor-pointer"
                      :class="(toggle.indexOf(index) !== -1) ? 'color-selected' : 'color-chip'"
                    >
                      <VTooltip
                        location="top"
                        activator="parent"
                      >
                        <span>{{ color.name }}</span>
                      </VTooltip>
                    </VAvatar>
                  </VBtn>
                </VBtnToggle>
              </div>
            </VCardText>

            <VDivider class="mb-6 mt-6"/>

            <VCardItem class="p-0 text-left mb-6 mt-6"> PRECIO </VCardItem>
            <VCardText class="text-left align-left p-0 mt-4">
              <VRow class="align-center container-vslider">
                <VCol cols="12">
                  <VRangeSlider
                    v-model="rangPrice"
                    :max="50000"
                    step="10"
                    thumb-label="always"
                    color="primary"
                    @end="priceAction"
                  />
                </VCol>
              </VRow>
              <VCardItem class="p-0 text-left mt-5">
                ${{ formatNumber(rangPrice[0]) }} - ${{ formatNumber(rangPrice[1]) }}
              </VCardItem>
            </VCardText>
           
            <VDivider class="mb-6 mt-6"/>

            <VCardItem class="p-0 text-left mb-6 mt-6"> REVIEW </VCardItem>
            <VCardText class="p-0 text-left mt-5 mb-6">
              <VRating
                half-increments
                :length="5"
                :size="isMobile ? 20 : 25"
                v-model="rating"
                hover
                color="yellow-darken-2"
                active-color="yellow-darken-2"
                @update:modelValue="fetchData"
              />
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" md="9" class="col-menuproduct d-flex flex-column">
          <!-- filters -->
          <VCard class="mt-7 menu-prod pt-0 pt-md-2 px-0 px-md-5">
            <VRow no-gutters class="align-center">
              <VCol
                cols="6"
                md="6"
                lg="6"
                class="text-left order-first order-md-first pb-4 pb-md-0 pl-4 pl-md-0 border-mobile d-flex"
              >
                <span class="text-products pr-1">{{ totalProducts }} </span>
                <span class="text-products" v-if="totalProducts === 1"> Producto </span>
                <span class="text-products" v-else> Productos </span>
              </VCol>

              <VCol cols="7" md="7" lg="4" class="text-left pl-4 pl-lg-0">
                <VSelect
                  v-model="sortBy"
                  :items="sortByItems"
                  item-title="name"
                  item-value="id"
                  menu-icon="mdi-chevron-down"
                  label="Ordenar:"
                  variant="outlined"
                  rounded
                  class="my-custom-select"
                  :menu-props="{ maxHeight: '1000px'}"
                  @update:modelValue="fetchData"
                />
              </VCol>

              <VCol cols="5" md="5" lg="5" class="filter-mobile d-flex justify-content-end align-center d-lg-none tw-text-right pr-5">
                <img :src="icon3" />
                <span class="pl-2">Filtros</span>
              </VCol>

              <VCol
                cols="6"
                md="6"
                lg="2"
                class="pr-4 pr-md-0 pl-10 pl-md-16 pl-lg-7 d-flex align-center justify-content-between order-first order-lg-last mb-5 mb-md-0 border-mobile"
              >
                <span>Vista</span>
                <VTabs v-model="tab">
                  <VTab value="0">
                    <img :src="icon1" />
                  </VTab>
                  <VTab value="1">
                    <img :src="icon2" />
                  </VTab>
                </VTabs>
              </VCol>
            </VRow>
          </VCard>

          <!-- padres, hijos y nietos -->
          <VCard class="no-shadown mt-5 card-icons tw-bg-green" v-if="route.query.fathercategory && category">
            <VCardText 
              v-if="categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.length < 6 && !isMobile"
              class="px-2 px-md-4 px-md-7 d-flex align-items-stretch"
              :class="categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.length > 1 ? 'justify-content-between' : 'justify-content-center'">        
              <template v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren">
                <router-link
                  :to="{
                    name: 'products',
                    query: {
                      category: route.query.category,
                      fathercategory: route.query.fathercategory,
                      subcategory: i.slug.split('/')[2],
                      colorId: colorsSelected.join(','),
                      wholesalers: route.query.wholesalers === 'true' ? true : false
                    }
                  }" class="tw-no-underline d-block text-center justify-content-center zoom w-50">
                    <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                    <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                  <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[2] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                </router-link>
              </template>
            </VCardText>
            <VCardText 
              v-else
              class="py-2 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
              <swiper
                :initialSlide="categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren.findIndex(item =>item.slug === route.query.category + '/' + route.query.fathercategory + '/' + route.query.subcategory)"
                :slidesPerView="isMobile ? 3 : 5"
                :spaceBetween="isMobile ? 1 : 5"
                :navigation="true"
                :loop="true"
                :modules="modules"
                class="mySwiper">
                <swiper-slide v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.fathercategory)[0].grandchildren" class="py-2">
                  <router-link
                    :to="{
                      name: 'products',
                      query: {
                        category: route.query.category,
                        fathercategory: route.query.fathercategory,
                        subcategory: i.slug.split('/')[2],
                        colorId: colorsSelected.join(','),
                        wholesalers: route.query.wholesalers === 'true' ? true : false
                      }
                    }" class="tw-no-underline d-block text-center justify-content-center zoom">
                    <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                    <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                    <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[2] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                  </router-link>
                </swiper-slide>
              </swiper>
            </VCardText> 
          </VCard>

          <!-- solo padres e hijos -->
          <VCard 
            class="no-shadown mt-5 card-icons tw-bg-green" 
            v-if="typeof route.query.fathercategory === 'undefined' && 
            typeof route.query.subcategory !== 'undefined' 
            && route.query.category && category
            && categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren.length > 0">
            <VCardText 
              v-if="categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren.length < 6 && !isMobile"
              class="px-2 px-md-4 px-md-7 d-flex align-items-stretch"
              :class="categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren.length > 1 ? 'justify-content-between' : 'justify-content-center'">        
              <template v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren">
                <router-link
                  :to="{
                    name: 'products',
                    query: {
                      category: route.query.category,
                      fathercategory: route.query.subcategory,
                      subcategory: i.slug.split('/')[2],
                      colorId: colorsSelected.join(','),
                      wholesalers: route.query.wholesalers === 'true' ? true : false
                    }
                  }" class="tw-no-underline d-block text-center justify-content-center zoom w-50">
                  <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                  <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                  <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[2] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                </router-link>
              </template>
            </VCardText> 
            <VCardText 
              v-else
              class="py-2 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
              <swiper
                :slidesPerView="isMobile ? 3 : 5"
                :spaceBetween="isMobile ? 1 : 5"
                :navigation="true"
                :loop="true"
                :modules="modules"
                class="mySwiper">
                <swiper-slide v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren" class="py-2">
                  <router-link
                    :to="{
                      name: 'products',
                      query: {
                        category: route.query.category,
                        fathercategory: route.query.subcategory,
                        subcategory: i.slug.split('/')[2],
                        colorId: colorsSelected.join(','),
                        wholesalers: route.query.wholesalers === 'true' ? true : false
                      }
                    }" class="tw-no-underline d-block text-center justify-content-center zoom">
                    <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                    <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[2] ? 'border-theme-active' : 'border-theme'"/>
                    <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[2] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                  </router-link>
                </swiper-slide>
              </swiper>
            </VCardText> 
          </VCard>

          <!-- solo padres e hijos sin nietos -->
          <VCard 
            class="no-shadown mt-5 card-icons tw-bg-green" 
            v-if="typeof route.query.fathercategory === 'undefined' && 
            typeof route.query.subcategory !== 'undefined' 
            && route.query.category && category
            && categories.filter(item =>item.slug === route.query.category)[0].children.filter(item =>item.slug === route.query.category + '/' + route.query.subcategory)[0].grandchildren.length === 0">
            <VCardText 
              v-if="categories.filter(item =>item.slug === route.query.category)[0].children.length < 6 && !isMobile"
              class="px-2 px-md-4 px-md-7 d-flex align-items-stretch"
              :class="categories.filter(item =>item.slug === route.query.category)[0].children.length > 1 ? 'justify-content-between' : 'justify-content-center'">        
              <template v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children">
                <router-link
                  :to="{
                    name: 'products',
                    query: {
                      category: route.query.category,
                      subcategory: i.slug.split('/')[1],
                      colorId: colorsSelected.join(','),
                      wholesalers: route.query.wholesalers === 'true' ? true : false
                    }
                  }" class="tw-no-underline d-block text-center justify-content-center zoom w-50">
                  <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                  <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                  <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[1] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                </router-link>
              </template>
            </VCardText> 
            <VCardText 
              v-else
              class="py-2 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
              <swiper
                :initialSlide="categories.filter(item =>item.slug === route.query.category)[0].children.findIndex(item =>item.slug === route.query.category + '/' + route.query.subcategory)"
                :slidesPerView="isMobile ? 3 : 5"
                :spaceBetween="isMobile ? 1 : 5"
                :navigation="true"
                :loop="true"
                :modules="modules"
                class="mySwiper">
                <swiper-slide v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children" class="py-2">
                  <router-link
                    :to="{
                      name: 'products',
                      query: {
                        category: route.query.category,
                        subcategory: i.slug.split('/')[1],
                        colorId: colorsSelected.join(','),
                        wholesalers: route.query.wholesalers === 'true' ? true : false
                      }
                    }" class="tw-no-underline d-block text-center justify-content-center zoom">
                    <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                    <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                    <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[1] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                  </router-link>
                </swiper-slide>
              </swiper>
            </VCardText> 
          </VCard>

          <!-- solo padres -->
          <VCard 
            class="no-shadown mt-5 card-icons tw-bg-green" 
            v-if="typeof route.query.fathercategory === 'undefined' && 
            typeof route.query.subcategory === 'undefined' 
            && route.query.category && category
            && categories.filter(item =>item.slug === route.query.category)[0].children.length > 0">
            <VCardText 
              v-if="categories.filter(item =>item.slug === route.query.category)[0].children.length < 6 && !isMobile"
              class="px-2 px-md-4 px-md-7 d-flex align-items-stretch"
              :class="categories.filter(item =>item.slug === route.query.category)[0].children.length > 1 ? 'justify-content-between' : 'justify-content-center'">        
              <template v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children">
                <router-link
                  :to="{
                    name: 'products',
                    query: {
                      category: route.query.category,
                      subcategory: i.slug.split('/')[1],
                      colorId: colorsSelected.join(','),
                      wholesalers: route.query.wholesalers === 'true' ? true : false
                    }
                  }" class="tw-no-underline d-block text-center justify-content-center zoom w-50">
                  <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                  <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                  <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[1] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                </router-link>
              </template>
            </VCardText> 
            <VCardText 
              v-else
              class="py-2 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
              <swiper
                :slidesPerView="isMobile ? 3 : 5"
                :spaceBetween="isMobile ? 1 : 5"
                :navigation="true"
                :loop="true"
                :modules="modules"
                class="mySwiper">
                <swiper-slide v-for="(i, index) in categories.filter(item =>item.slug === route.query.category)[0].children" class="py-2">
                  <router-link
                    :to="{
                      name: 'products',
                      query: {
                        category: route.query.category,
                        subcategory: i.slug.split('/')[1],
                        colorId: colorsSelected.join(','),
                        wholesalers: route.query.wholesalers === 'true' ? true : false
                      }
                    }" class="tw-no-underline d-block text-center justify-content-center zoom">
                    <img v-if="i.icon_subcategory !== null" :src="baseURL + i.icon_subcategory" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                    <img v-else :src="t_7" class="d-block" :class="route.query.subcategory === i.slug.split('/')[1] ? 'border-theme-active' : 'border-theme'"/>
                    <span class="d-block size-theme mt-2" :class="route.query.subcategory === i.slug.split('/')[1] ? 'tw-text-primary' : 'tw-text-tertiary'">{{i.name}}</span>
                  </router-link>
                </swiper-slide>
              </swiper>
            </VCardText> 
          </VCard>

          <!-- products -->
          <div class="align-center row-products pb-0">
            <v-window v-model="tab">
              <v-window-item value="0">
                <VRow no-gutters class="ms-1 ms-md-3">
                  <VCol cols="6" sm="4" md="4" lg="3" v-for="(product, i) in products" class="mb-3 mb-md-7">
                    <Product3 :key="i" :product="product" :readonly="true" />
                  </VCol>
                </VRow>
              </v-window-item>
              <v-window-item value="1">
                <VRow no-gutters class="ms-3">
                  <VCol cols="12" v-for="(product, i) in products">
                    <Product4
                      :key="i"
                      :product="product"
                      :readonly="true"
                      :isLastItem="isLastItem(i)"
                      :loading="load"
                      :productId="product_id"
                      @addCart="addCart"
                      @addfavorite="addfavorite"
                     />
                  </VCol>
                </VRow>
              </v-window-item>
            </v-window>
          </div>

          <!-- pagination -->
          <div class="mt-auto">
            <VCardText v-if="totalProducts === 0" class="d-flex align-center justify-content-center py-3 px-5">
              Datos no disponibles
            </VCardText>
            <VCardText class="d-flex align-center justify-content-center py-3 px-5 pb-0">
              <VPagination
                v-model="currentPage"
                :total-visible="isMobile ? 4 : 5"
                :length="totalPages"
                rounded="circle"
                active-color="#FF0090"
                class="pagination-custom"
                size="small"
                @update:modelValue="chancePagination">
                <template v-slot:prev="{ attrs }">
                  <VBtn variant="plain" icon v-bind="attrs" class="icon-left" @click="changePage('prev')">
                    <arrow_left class="me-2"/>
                    <span class="d-none d-md-block">Anterior</span>
                  </VBtn>
                </template>
                <template v-slot:next="{ attrs }">
                  <VBtn variant="plain" icon v-bind="attrs" class="icon-right" @click="changePage('next')">
                    <span class="d-none d-md-block">Siguiente</span>
                    <arrow_right class="ms-1"/>
                  </VBtn>
                </template>
              </VPagination>
            </VCardText>
          </div>
          
        </VCol>
      </VRow>
    </VContainer>
    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
      :variant="variant"
      :color="colorMessage"
    >
      {{ message }}
    </VSnackbar>
  </section>
</template>

<style scoped>

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper::v-deep(.swiper-wrapper)  {
    align-items: center !important;
  }

  .swiper::v-deep(.swiper-slide) {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  .swiper {
    width: 100%;
  }

  .swiper::v-deep(.swiper-button-prev), .swiper::v-deep(.swiper-button-next) {
    color: #0A1B33 !important;
    width: 6px !important;
  }

  .swiper::v-deep(.swiper-button-prev:after), .swiper::v-deep(.swiper-button-next:after) {
    font-size: 20px;
    font-weight: bold;
  }

  .card-icons {
    border-radius: 16px;
  }

  .border-theme {
    width: 120px;
    border-radius: 192px;
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
    margin: auto;
  }

  .border-theme-active {
    width: 120px;
    border-radius: 192px;
    border: 3px solid #FF0090;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
    margin: auto;
  }

  .zoom {
    transition: transform ease-in-out 0.3s;
  }

  .zoom:hover {
    transform: scale(1.1);
  }

  .zoom:hover span{
    color: #FF0090!important;
  }

  .w-50 {
    width: 50%;
  }

  .products-structure {
    display: flex;
    flex-wrap: wrap;
  }

  .icon-left::v-deep(path), .icon-right::v-deep(path) {
    fill: #0A1B33;
  }

  .v-pagination::v-deep(.v-pagination__item--is-active .v-btn__overlay), .v-pagination::v-deep(.v-pagination__item--is-active .v-btn) {
    opacity: 1 !important;
  }

  .v-pagination::v-deep(.v-btn__content) {
    color: #0A1B33;
    caret-color: #0A1B33;
    z-index: 999;
    text-transform: capitalize;
  }

  .v-pagination::v-deep(.v-pagination__prev button) {
    padding: 0 !important;
  }

  .v-pagination::v-deep(.v-pagination__next button) {
    padding-left: 10px !important;
    padding-right: 0 !important;
  }

  .v-pagination::v-deep(.v-pagination__item) {
    margin-top: 8px;
  }

  .v-pagination::v-deep(.v-pagination__prev:hover .v-btn__content), .v-pagination::v-deep(.v-pagination__next:hover .v-btn__content) {
    color: #FF0090 !important;
    caret-color: #FF0090 !important;
  }

  .icon-left:hover::v-deep(path), .icon-right:hover::v-deep(path) {
    fill: #FF0090;
  }

  .v-pagination::v-deep(.v-pagination__prev .v-btn__content), .v-pagination::v-deep(.v-pagination__prev button),
  .v-pagination::v-deep(.v-pagination__next .v-btn__content), .v-pagination::v-deep(.v-pagination__next button) {
    background-color: #E2F8FC; 
    width: 130px;
    color: #0A1B33;
    caret-color: #0A1B33;
    opacity: 1;
  }

  .v-pagination::v-deep(.v-pagination__item--is-active .v-btn__content) {
    color: white;
    caret-color: white;
    z-index: 999;
  }

  .pagination-custom {
    background-color: #E2F8FC;
    border-radius: 16px;
  }

  .v-btn-group::v-deep(.v-btn--size-default) {
    padding: 0 !important;
    min-width: 40px !important;
  }

  .v-btn-toggle::v-deep(.v-btn.v-btn--active:not(.v-btn--disabled) > .v-btn__overlay) {
    opacity: 0 !important;
  }

  .v-btn:hover::v-deep(.v-btn__overlay) {
    opacity: 0 !important;
  }

  .v-avatar-group {
    display: flex !important;
    align-items: center !important;
  }

  .color-chip {
    border: 2px solid #F3FCFE;
  }

  .color-selected {
    border: 2px solid #E2F8FC;
    box-shadow: 0 0 0 2px #0A1B33;
  }

  .v-avatar-group>*:hover {
    transform: translateY(-5px) scale(1);
    box-shadow: 0 3px 12px rgba(var(--v-shadow-key-umbra-color), var(--v-shadow-md-opacity)), 0 0 transparent, 0 0 transparent;
  }

  .v-select::v-deep(.v-field__input) {
    padding-top: 2%;
    padding-left: 8%;
  }

  .v-select::v-deep(.v-field__append-inner) {
    padding-top: 15% !important;
  }

  .v-select::v-deep(.v-field__clearable) {
    padding-top: 15% !important;
    margin-inline: 0 !important;
  }

  .v-select::v-deep(.v-field__overlay:focus-visible) {
    outline: -webkit-focus-ring-color auto 0px !important;
  }

  .v-select::v-deep(.v-field__clearable > .v-icon--size-default) {
    font-size: 20px !important;
  }

  .v-select::v-deep(.v-field__append-inner > .v-icon) {
    padding-right: 20% !important;
  }

  .v-select::v-deep(.v-field) {
    padding: 0 !important;
  }

  .v-select::v-deep(.v-label) {
    font-size: 14px !important;
  }

  .v-select::v-deep(.v-field__field) {
    height: 33px !important;
    border-radius: 48px !important;
  }

  .v-select::v-deep(.v-input__details) {
    height: 0px !important;
  }

  .v-select::v-deep(.v-field--appended) {
    background-color: #ffffff;
  }

  .v-select::v-deep(.v-field__outline__start) {
    flex-basis: 20px !important;
  }

  .v-select::v-deep(.v-select__selection) {
    margin-top: -12px !important;
  }

  .v-list {
    background-color: #e2f8fc;
  }

  .v-list::v-deep(.v-list-item:hover > .v-list-item__overlay) {
    opacity: 0 !important;
  }

  .v-list::v-deep(.v-list-item__overlay) {
    background-color: #e2f8fc;
  }

  .v-list-group__items .v-list-item {
    padding-inline-start: calc(5px + var(--indent-padding)) !important;
  }

  .v-list::v-deep(.v-list-item-title) {
    font-size: 15px !important;
  }

  .v-list-item--density-default.v-list-item--one-line {
    min-height: 40px !important;
  }

  .v-list::v-deep(.v-list-item__content) {
    font-size: 14px !important;
  }

  .v-list::v-deep(.v-list-item--active) {
    background-color: #F3FCFE !important;
  }

  .list-text {
    white-space: normal;
    text-overflow: clip;
  }

  .button-chip {
    padding: 0;
    opacity: 1 !important;
  }

  .breadcumb {
    height: 55px !important;
  }

  .v-btn--size-default {
    padding: 0 10px !important;
  }

  .v-tab.v-tab {
    min-width: 15px !important;
  }

  .sidebar-container {
    padding: 0 20px 15px 20px;
    background-color: #e2f8fc;
    border-radius: 16px;
    box-shadow: none !important;
  }

  .col-menuproduct {
    padding-left: 20px !important;
  }

  .menu-prod {
    padding: 8px 16px;
    border-radius: 32px;
    background-color: #e2f8fc;
    box-shadow: none !important;
  }

  .my-custom-select {
    border-radius: 48px !important;
    font-size: 12px !important;
    max-height: 33px !important;
  }

  .row-products {
    padding: 20px 0;
  }

  .custom-check {
    max-height: 50px !important;
  }

  .container-vslider {
    max-height: 40px !important;
    margin-top: 24px;
  }

  .custom-check::deep(.v-label) {
    margin-left: 10px !important;
  }

  .text-left {
    font-size: 18px;
  }

  .text-allcategories {
    font-size: 14px;
  }

  .text-subitem {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  @media only screen and (max-width: 767px) {
    .text-left {
      color: var(--Maastricht-Blue, #0a1b33);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px; /* 114.286% */
    }

    .menu-prod {
      border-radius: 16px;
    }

    .col-menuproduct {
      padding-left: 0px !important;
    }

    .breadcumb {
      height: 50px !important;
      margin-top: -5px !important;
    }
    
    .v-breadcrumbs {
      padding-top: 0 !important;
      margin-top: -5px !important;
    }

    .v-breadcrumbs::v-deep(.v-breadcrumbs-item) {
      font-size: 10px;
    }

    .v-breadcrumbs::v-deep(.v-breadcrumbs-divider){
      padding: 0 2px !important;
    }

    .container-mobile {
      margin-top: -25px !important;
    }

    .border-mobile {
      border-bottom: 1px solid #D9EEF2 !important; 
    }

    .my-custom-select {
      margin-top: -10px !important;
    }

    .text-products {
      margin-top: -5px !important;
    }

    .filter-mobile {
      margin-top: -15px !important;
    }

    .border-theme {
      width: 70px !important;
    }

    .border-theme-active {
      width: 70px !important;
    }

    .size-theme {
      font-size: 10px !important;
      height: 30px !important;
    }

    .swiper-slide img {
      width: 70px !important;
      height: 70px !important;
    }

    .v-pagination::v-deep(.v-pagination__next button) {
      padding-left: 0 !important;
    }

    .v-pagination::v-deep(.v-pagination__prev .v-btn__content), .v-pagination::v-deep(.v-pagination__prev button),
    .v-pagination::v-deep(.v-pagination__next .v-btn__content), .v-pagination::v-deep(.v-pagination__next button) {
      width: 30px !important;
    }

  }
</style>