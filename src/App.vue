<script setup>

import { ref } from 'vue'
import { useCartStores } from '@/stores/cart'
import { useAuthStores } from '@/stores/auth'
import { useFiltersStores } from '@/stores/filters'
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'
import Filters from '@/components/app/Filters.vue'
import FilterServices from '@/components/app/FilterServices.vue'
import home from '@assets/images/home.webp';
import categories from '@assets/images/categories.jpg';
import register from '@assets/images/register.jpg';
import blogs from '@assets/images/blogs.jpg';

const authStores = useAuthStores()
const cartStores = useCartStores()
const filtersStores = useFiltersStores()
const route = useRoute()

const backgroundStyle = ref({})
const background = ref('tw-bg-white')
const isMobile = /Mobi/i.test(navigator.userAgent);
const drawer = ref(false)
const twitterAccount = ref(import.meta.env.VITE_TWITTER_ACCOUNT ?? '')

const setMetaTags = ({ title, description, image, url, keywords }) => {
  document.title = title;

  const setMetaTag = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
    element.setAttribute('name', name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  };

  const setPropertyMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`) || document.createElement('meta');
    element.setAttribute('property', property);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  };

  setMetaTag('description', description);
  setMetaTag('keywords', keywords);
  setMetaTag('robots', 'index, follow');
  setMetaTag('autor', 'Partymax');
  setMetaTag('language', 'es');

  // Open Graph / Facebook / LinkedIn / Pinterest / WhatsApp
  setPropertyMetaTag('og:type', 'website');
  setPropertyMetaTag('og:title', title);
  setPropertyMetaTag('og:description', 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.');
  setPropertyMetaTag('og:image', image);
  setPropertyMetaTag('og:url', url);
  setPropertyMetaTag('og:site_name', 'PARTYMAX');

  // Twitter
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.');
  setMetaTag('twitter:image', image);
  setMetaTag('twitter:site', twitterAccount.value)
}

watch(() => 
  filtersStores.getDrawer, (data) => {
    drawer.value = data
  }
);


watchEffect(fetchData)

async function fetchData() {

  var bg = ''
  var repeat = 'repeat'
  var size = (isMobile) ? 'auto' : 'contain'

  if(route.name === 'dashboard' || route.name === 'register_confirm' || route.name === 'idea_generator') {
    background.value = 'tw-bg-green'
  } else {
    background.value = 'tw-bg-white'
  }

  if(route.name === 'home')
    bg = home
  else if(route.name === 'categories' || route.name === 'wholesalers')
    bg = categories
  else if(route.name === 'register' || route.name === 'type_client' || route.name === 'form_client' || 
          route.name === 'form_supplier' || route.name === 'login' || route.name === 'success_person' || 
          route.name === 'success_company' || route.name === 'forgot_password' || route.name === 'reset_password') {
    bg = register
    repeat = 'no-repeat'
    size = 'cover'
  } else if(route.name === 'blogs' || route.name === 'blogDetail') {
    bg = blogs
    size = 'contain'
  } else 
    bg = ''

  if (route.name === 'cart' || route.name === 'quote') {
    if (Object.keys(route.query).length > 0) {
      bg = register
      repeat = 'no-repeat'
      size = 'cover'
    } else {
      background.value = 'tw-bg-green'
    }
  }

  backgroundStyle.value = {
    backgroundImage: `url(${bg})`,
    backgroundSize: size,
    backgroundRepeat: repeat
  }

  if(localStorage.getItem('user_data')){
    const userData = localStorage.getItem('user_data')
    const userDataJ = JSON.parse(userData)

    const { user_data, userAbilities } = await authStores.me(userDataJ.hash)

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    localStorage.setItem('user_data', JSON.stringify(user_data))
  }

  setMetaTags({
    title: 'PARTYMAX | THE PARTY MARKET',
    description: `Descubre Partymax, la plataforma líder en Colombia para organizar eventos y celebraciones. Conecta con los mejores proveedores de decoración, catering y entretenimiento. Encuentra todo lo que necesitas para una fiesta inolvidable, de manera rápida, segura y al mejor precio. ¡Vive la experiencia Partymax! 🎉`,
    image:  import.meta.env.VITE_APP_DOMAIN_API_URL + '/logos/R_ORIGINAL@2x.png',
    url: `https://${import.meta.env.VITE_MY_DOMAIN}` ,
    keywords:  `eventos en Colombia, marketplace de fiestas, proveedores de eventos, organización de eventos, planificación de fiestas, catering, decoración de fiestas, entretenimiento para eventos, servicios para bodas, fiestas infantiles, despedidas de soltera, tecnología para eventos, Partymax`
  });

  await cartStores.fetchCart()
}
</script>

<template>
  <VApp> 
    <VLayout >
      <Filters :drawer="drawer" v-if="route.name === 'products'"/>
      <FilterServices :drawer="drawer" v-else/>
      <Header />
      <VMain :style="backgroundStyle" :class="background">
        <router-view />
      </VMain>
    </VLayout>
    <Footer />
  </VApp>
</template>