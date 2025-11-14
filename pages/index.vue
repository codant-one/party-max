<script setup>
  import { ref, watch, watchEffect, onMounted } from 'vue'
  import { useHomeStores } from '@/stores/home'
  import { useMiscellaneousStores } from "@/stores/miscellaneous";
  import { Autoplay, Navigation, Pagination } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';
  import 'swiper/css/pagination';

  import Product1 from '@/components/product/Product1.vue'
  import Product2 from '@/components/product/Product2.vue'
  import Loader from '@/components/common/Loader.vue'
  import WelcomePopup from '@/components/app/WelcomePopup.vue'
  import { useCategoriesStores } from '@/stores/categories'

  import logo_seo from '@assets/images/logo.png';

  import arrow_right from '@assets/icons/arrow_right_dark.svg?inline';

  import motorcycle from '@assets/icons/motorcycle.svg';
  import location from '@assets/icons/location.svg';
  import sold from '@assets/icons/sold.svg';
  import tracking from '@assets/icons/tracking.svg';

  import t_1 from '@assets/images/t_1.webp';
  import t_2 from '@assets/images/t_2.webp';
  import t_3 from '@assets/images/t_3.webp';
  import t_4 from '@assets/images/t_4.webp';
  import t_5 from '@assets/images/t_5.webp';

  import f_1 from '@assets/images/f_1.webp';
  import f_2 from '@assets/images/f_2.webp';
  import f_3 from '@assets/images/f_3.webp';
  import f_4 from '@assets/images/f_4.webp';

  import t_7 from '@assets/images/t_7.jpg';

  import mb_1 from '@assets/images/pmhb-01-envio-express.svg';
  import mb_2 from '@assets/images/pmhb-02-lo-mas-nuevo.svg';
  import mb_3 from '@assets/images/pmhb-03-oferta-del-dia.svg';
  import mb_4 from '@assets/images/pmhb-04-mas-vendidos.svg';
  import mb_5 from '@assets/images/pmhb-05-aliados.svg';
  import mb_6 from '@assets/images/pmhb-06-nuestro-blog.svg';

  import check_circle from '@assets/icons/check-circle.svg';
  import error_circle from '@assets/icons/error-circle.svg';

  const thumbsSwiper = ref(null);
  const modules = ref([Navigation, Pagination])
  const modulesSlider = ref([Autoplay, Pagination, Navigation])

  const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
  }

  const pm_url = useRequestURL();
  const protocol = pm_url.protocol;
  const config = useRuntimeConfig()
  const baseURL = ref(config.public.APP_DOMAIN_API_URL + '/storage/')
  const twitterAccount = ref(config.public.TWITTER_ACCOUNT ?? '')

  useSeoMeta({
    // ----------------------------------------------------
    // META-TAGS BÁSICOS
    // ----------------------------------------------------
    title: 'Partymax — Marketplace de Eventos y Celebraciones en Bogotá, Colombia',
    description: 'Partymax, tu aliado ideal para fiestas en Bogotá, Colombia. Conectamos tus ideas con los mejores proveedores. ¡Haz tu celebración inolvidable de forma fácil y económica!',
    keywords: 'decoración de fiestas en bogotá colombia, fiestas temáticas en bogotá colombia, fiestas infantiles en bogotá colombia, despedidas de soltera en bogotá colombia, globos latex en bogotá colombia, globos metalizados en bogotá colombia, tortas en bogotá colombia, desechables para fiesta en bogotá colombia, eventos y fiestas en bogotá colombia, marketplace de fiestas, celebraciones, partymax, proveedores de eventos, organización de eventos, planificación de fiestas, servicios para bodas, entretenimiento para eventos, catering, decoración para fiestas, artículos para fiestas, decoración de cumpleaños, globos para fiestas, kits de fiesta, sorpresas y detalles, productos personalizados, piñatas y dulces, fiestas temáticas, fechas especiales, fiesta vallenata, fiesta picnic, ponques, cup cake, cupcake',
    robots: 'index, follow',
    author: 'Partymax',
    language: 'es',

    // ----------------------------------------------------
    // OPEN GRAPH (Facebook, WhatsApp, etc.)
    // ----------------------------------------------------
    ogType: 'website',
    ogTitle: 'Partymax — Marketplace de Eventos y Celebraciones en Bogotá, Colombia',
    ogDescription: 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.',
    ogImage: `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
    ogUrl: `${protocol}//${config.public.MY_DOMAIN}`,
    ogSiteName: 'Partymax',
    
    // ----------------------------------------------------
    // TWITTER
    // ----------------------------------------------------
    twitterCard: 'summary_large_image',
    twitterTitle: 'Partymax — Marketplace de Eventos y Celebraciones en Bogotá, Colombia',
    twitterDescription: 'Organiza tu evento ideal con Partymax. Encuentra los mejores proveedores de decoración, catering, entretenimiento y más en un solo lugar.',
    twitterImage: `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
    twitterSite: twitterAccount.value
  });

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${protocol}//${config.public.MY_DOMAIN}/#website`,
              "url": `${protocol}//${config.public.MY_DOMAIN}`,
              "name": "Partymax | Marketplace de Eventos y Celebraciones en Bogotá, Colombia",
              "description": "Partymax es la plataforma líder en Bogotá, Colombia para la organización de eventos y celebraciones. Conectamos clientes con los mejores proveedores para crear celebraciones inolvidables con seguridad, eficiencia y calidad.",
              "publisher": {
                "@id": `${protocol}//${config.public.MY_DOMAIN}/#organization`
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${protocol}//${config.public.MY_DOMAIN}/products?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "@id": `${protocol}//${config.public.MY_DOMAIN}/#organization`,
              "name": "Partymax | Plataforma Digital de Eventos y Celebraciones en Bogotá, Colombia",
              "alternateName": "Partymax The Party Market Colombia",
              "url": `${protocol}//${config.public.MY_DOMAIN}`,
              "logo": `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
              "sameAs": [
                "https://www.instagram.com/partymaxcolombia",
                "https://www.facebook.com/partymaxcolombia",
                "https://wa.link/wvdoxg"
              ],
              "foundingDate": "2017",
              "foundingLocation": {
                "@type": "Place",
                "name": "Bogotá, Colombia",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Calle 13 No. 69-02, 3er piso, Bogotá, Colombia",
                  "addressLocality": "Bogotá",
                  "addressRegion": "Cundinamarca",
                  "addressCountry": "CO",
                    "postalCode": "110931"
                }
              },
              "description": "Partymax es una plataforma digital que conecta personas y proveedores del sector de eventos y celebraciones. Ofrece una plataforma innovadora para encontrar, cotizar y contratar servicios y productos de calidad con confianza y seguridad.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Atención al cliente",
                "email": "fiesta@partymax.co",
                "availableLanguage": ["es"]
              },
              "brand": {
                "@type": "Brand",
                "name": "Partymax",
                "logo": `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
              },
              "slogan": "Tu evento, nuestra misión. Conectamos sueños con los mejores proveedores de Colombia.",
              "knowsAbout": [
                "Organizadores de eventos",
                "Fiestas",
                "Celebraciones",
                "Decoración para fiestas",
                "Catering y banquetes",
                "Sonido y música para eventos",
                "Fotografía de eventos",
                "Animación y entretenimiento",
                "Fiestas temáticas",
                "Fiestas infantiles",
                "Despedidas de soltera",
                "Globos",
                "Tortas",
                "Ponques",
                "Desechables",
                "Marketplace de fiestas",
                "Fiesta vallenata",
                "Fiesta Mexicana",
                "Despedida de soltera",
                "Cup cake"
              ]
            },
            {
              "@type": "WebPage",
              "@id": `${protocol}//${config.public.MY_DOMAIN}/#homepage`,
              "url": `${protocol}//${config.public.MY_DOMAIN}`,
              "name": "Partymax | Marketplace de Eventos y Celebraciones en Bogotá, Colombia",
              "description": "Partymax revoluciona la manera en que las personas organizan sus celebraciones, conectando clientes con proveedores verificados y ofreciendo los mejores productos y servicios para fiestas y eventos en Bogotá, Colombia.",
              "mainEntity": {
                "@id": `${protocol}//${config.public.MY_DOMAIN}/#categories`
              },
              "isPartOf": {
                "@id": `${protocol}//${config.public.MY_DOMAIN}/#website`
              },
              "about": [
                {
                  "@type": "CreativeWork",
                  "name": "Misión de Partymax | Conectamos Personas y Proveedores para Crear Fiestas Inolvidables",
                  "description": "Facilitar la planificación de eventos mediante una plataforma digital que une clientes con proveedores de calidad, impulsando el crecimiento de emprendedores del sector y garantizando experiencias únicas, seguras y accesibles."
                },
                {
                  "@type": "CreativeWork",
                  "name": "Visión de Partymax | Ser el Marketplace de Eventos Más Grande y Confiable de Latinoamérica",
                  "description": "Consolidarse como la plataforma líder en Bogotá, Colombia y referente en Latinoamérica para la organización de fiestas y eventos, impulsando la innovación, la tecnología y el crecimiento del sector de celebraciones."
                },
                {
                  "@type": "CreativeWork",
                  "name": "Historia de Partymax | Innovación y Tecnología para Revolucionar la Industria de Eventos",
                  "description": "Partymax nació del sueño de simplificar la organización de eventos y conectar a las personas con proveedores confiables. Hoy es un marketplace que impulsa la creatividad, la eficiencia y la confianza en la industria de las celebraciones."
                },
                {
                  "@type": "Store",
                  "name": "Marketplace de Eventos y Celebraciones | Partymax Colombia",
                  "description": "Plataforma digital que centraliza productos, servicios y proveedores de eventos, facilitando que los clientes encuentren todo lo necesario para sus celebraciones en un solo lugar.",
                  "image": `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
                  "url": `${protocol}//${config.public.MY_DOMAIN}`,
                  "telephone": "+57 300 4659 997",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Calle 13 No. 69-02, 3er piso, Bogotá, Colombia",
                    "addressLocality": "Bogotá",
                    "addressRegion": "Cundinamarca",
                    "addressCountry": "CO",
                    "postalCode": "110931"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "4.642167153134921",
                    "longitude": "-74.12330468669168"
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "name": "Servicios de Planificación y Organización de Eventos | Partymax",
                  "description": "Proveedores para organización y planificación de eventos sociales, empresariales y familiares. Partymax conecta a los mejores profesionales de decoración, catering, fotografía y entretenimiento.",
                  "image": `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
                  "url": `${protocol}//${config.public.MY_DOMAIN}`,
                  "telephone": "+57 300 4659 997",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Calle 13 No. 69-02, 3er piso, Bogotá, Colombia",
                    "addressLocality": "Bogotá",
                    "addressRegion": "Cundinamarca",
                    "addressCountry": "CO",
                    "postalCode": "110931"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "4.642167153134921",
                    "longitude": "-74.12330468669168"
                  },
                },
                {
                  "@type": "Service",
                  "name": "Productos y Servicios Especializados para Fiestas, Celebraciones y Eventos | Partymax | Colombia",
                  "description": "Red de proveedores que ofrecen servicios de decoración, animación, catering, música y más, garantizando calidad y confianza para cada evento."
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Proveedores de Fiestas, Celebraciones y Eventos en Bogotá, Colombia | Partymax",
                  "description": "Plataforma digital que conecta clientes con proveedores del sector de eventos y celebraciones, con presencia en ciudades de toda Colombia, que ofrecen productos y servicios certificados y competitivos.",
                  "image": `${protocol}//${config.public.MY_DOMAIN}${logo_seo}`,
                  "url": `${protocol}//${config.public.MY_DOMAIN}`,
                  "telephone": "+57 300 4659 997",
                  "priceRange": "$$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Calle 13 No. 69-02, 3er piso, Bogotá, Colombia",
                    "addressLocality": "Bogotá",
                    "addressRegion": "Cundinamarca",
                    "addressCountry": "CO",
                    "postalCode": "110931"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "4.642167153134921",
                    "longitude": "-74.12330468669168"
                  },
                }
              ]
            },
            {
              "@type": "ItemList",
              "@id": `${protocol}//${config.public.MY_DOMAIN}/#categories`,
              "name": "Productos y Servicios Partymax",
              "description": "Descubre las principales categorías de productos y servicios para tus eventos y celebraciones en Partymax.",
              "numberOfItems": 23,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                  "@type": "Thing",
                  "name": "Fiestas Infantiles",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Mickey Mouse",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninos/tematica-mickey-mouse`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Spiderman",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninos/tematica-spiderman`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Cars",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninos/tematica-cars`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Princesas",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninas/tematica-princesas`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 6,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Frozen",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninas/tematica-frozen`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 7,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Minnie Mouse",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-ninas/tematica-minnie-mouse`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 8,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Espacial",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-infantiles/tematica-bebes/tematica-espacial`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 9,
                  "item": {
                  "@type": "Thing",
                  "name": "Fiestas Temáticas",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-tematicas`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 10,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Mexicana",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-tematicas/tematica-mexicana`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 11,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Vallenata",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-tematicas/tematica-vallenata`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 12,
                  "item": {
                  "@type": "Thing",
                  "name": "Temática Neón",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fiestas-tematicas/tematica-neon`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 13,
                  "item": {
                  "@type": "Thing",
                  "name": "Baby Shower Niña",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fechas-especiales/baby-shower-nina`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 14,
                  "item": {
                  "@type": "Thing",
                  "name": "Baby Shower Niño",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fechas-especiales/baby-shower-nino`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 15,
                  "item": {
                  "@type": "Thing",
                  "name": "Revelación De Género",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fechas-especiales/revelacion`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 16,
                  "item": {
                  "@type": "Thing",
                  "name": "Despedida de Soltera",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fechas-especiales/despedida-de-soltera`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 17,
                  "item": {
                  "@type": "Thing",
                  "name": "Navidad",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/fechas-especiales/navidad`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 18,
                  "item": {
                  "@type": "Thing",
                  "name": "Globos Látex",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/globos/globos-latex`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 19,
                  "item": {
                  "@type": "Thing",
                  "name": "Globos Metalizados",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/globos/globos-metalizados`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 20,
                  "item": {
                  "@type": "Thing",
                  "name": "Velas Decorativas",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/decoracion/velas`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 21,
                  "item": {
                  "@type": "Thing",
                  "name": "Desechables",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/desechables`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 22,
                  "item": {
                  "@type": "Thing",
                  "name": "Piñatas",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/products/categories/dulces-y-pinatas/pinatas`
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 23,
                  "item": {
                  "@type": "Thing",
                  "name": "Decoración",
                  "url": `${protocol}//${config.public.MY_DOMAIN}/categories/decoracion`
                  }
                }
              ]
            }
          ]
        })
      }
    ]
  });

  const banner_1 = ref([])
  const banner_2 = ref([])
  const banner_3 = ref([])
  const banner_4 = ref([])
  const banner_5 = ref([])
  const banner_6 = ref([])
  const banner_products = ref([])
  const banner_services = ref([])
  const homeFeaturedBanners = ref({})

  const { isMobile } = useDevice();

  const sliders = ref([])
  const banners = ref([])

  const homeStores = useHomeStores()
  const miscellaneousStores = useMiscellaneousStores()
  const categoriesStores = useCategoriesStores()


  const buildPrettyPathProducts = (category, subcategory = null, fathercategory = null) => {
    if (category && subcategory && fathercategory)
      return `/products/categories/${category}/${fathercategory}/${subcategory}`
    if (category && subcategory)
      return `/products/categories/${category}/${subcategory}`
    if (category)
      return `/products/categories/${category}`
    return '/products'
  }

  const handleCategoryClickProducts = (category, subcategory = null, fathercategory = null) => {
    categoriesStores.reset()
    if (category) categoriesStores.setCategory(category)
    if (subcategory) categoriesStores.setSubcategory(subcategory)
    if (fathercategory) categoriesStores.setFathercategory(fathercategory)
  }

  const data = ref(null)
  const isLoading = ref(true)

  const isDialogVisible = ref(false)
  const isError = ref(false)
  const message = ref(false)

  const categories = ref([]);

  watch(() => 
    miscellaneousStores.getLoading, async (value) => {
      isLoading.value = value
    }
  )

  watch(() => 
    miscellaneousStores.getMessage, async (value) => {
      if(value !== '') {
        isError.value = miscellaneousStores.getError
        isDialogVisible.value = true
        message.value = value
        setTimeout(() => {
          miscellaneousStores.setError(false)
          isDialogVisible.value = false
          isError.value = false
          message.value = ''
        }, 2000)
      }
    }
  )

  // watchEffect(fetchData)

  async function fetchSliderBannersData() {
    try {
      await homeStores.fetchData(); 
      
      const allImages = homeStores.getData.images;
      sliders.value = allImages.filter(item => item.is_slider === 1).sort((a, b) => a.order_id - b.order_id);

      const tempBanners = {};
      const specialBanners = [
        { id: 7, prop: 'products' },
        { id: 8, prop: 'services' }
      ];
      const sequentialIds = { start: 9, end: 16 };
      for (const { id, prop } of specialBanners) {
        const foundBanner = banners.value.find(item => item.order_id === id);
        
        if (foundBanner) {
            tempBanners[prop] = {
                image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
                url: foundBanner.url,
                title: foundBanner.title
            };
        }
      }
      for (let id = sequentialIds.start; id <= sequentialIds.end; id++) {
        const propName = `banner${id}`;
        const foundBanner = banners.value.find(item => item.order_id === id);

        if (foundBanner) {
            tempBanners[propName] = {
                image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
                url: foundBanner.url,
                title: foundBanner.title
            };
        }
      }
      homeFeaturedBanners.value = tempBanners;
    } catch (e) {
      console.error("Error al cargar los sliders en el cliente:", e);
    }
    isLoading.value = false;
  }

  async function fetchData() {

    isLoading.value = true
    
    await homeStores.fetchData()

    categories.value = homeStores.getData.parentCategories;
    data.value = homeStores.getData

    const allImages = data.value.images;
    // sliders.value = data.value.images.filter(item => item.is_slider === 1);
    // sliders.value = allImages.filter(item => item.is_slider === 1).sort((a, b) => a.order_id - b.order_id);
    
    banners.value = data.value.images.filter(item => item.is_slider === 0);

    banner_1.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 1).mobile : banners.value.find(item => item.order_id === 1).image);
    banner_1.value.url = banners.value.find(item => item.order_id === 1).url;
    banner_1.value.title = banners.value.find(item => item.order_id === 1).title;

    banner_2.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 2).mobile : banners.value.find(item => item.order_id === 2).image);
    banner_2.value.url = banners.value.find(item => item.order_id === 2).url;
    banner_2.value.title = banners.value.find(item => item.order_id === 2).title;

    banner_3.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 3).mobile : banners.value.find(item => item.order_id === 3).image);
    banner_3.value.url = banners.value.find(item => item.order_id === 3).url;

    banner_4.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 4).mobile : banners.value.find(item => item.order_id === 4).image);
    banner_4.value.url = banners.value.find(item => item.order_id === 4).url;

    banner_5.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 5).mobile : banners.value.find(item => item.order_id === 5).image);
    banner_5.value.url = banners.value.find(item => item.order_id === 5).url;

    banner_6.value.image = baseURL.value + (isMobile ? banners.value.find(item => item.order_id === 6).mobile : banners.value.find(item => item.order_id === 6).image);
    banner_6.value.url = banners.value.find(item => item.order_id === 6).url;

    const tempBanners = {};
    const specialBanners = [
      { id: 7, prop: 'products' },
      { id: 8, prop: 'services' }
    ];
    const sequentialIds = { start: 9, end: 16 };
    for (const { id, prop } of specialBanners) {
      const foundBanner = banners.value.find(item => item.order_id === id);
      
      if (foundBanner) {
          tempBanners[prop] = {
              image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
              url: foundBanner.url,
              title: foundBanner.title
          };
      }
    }
    for (let id = sequentialIds.start; id <= sequentialIds.end; id++) {
      const propName = `banner${id}`;
      const foundBanner = banners.value.find(item => item.order_id === id);

      if (foundBanner) {
          tempBanners[propName] = {
              image: baseURL.value + (isMobile ? foundBanner.mobile : foundBanner.image),
              url: foundBanner.url,
              title: foundBanner.title
          };
      }
    }
    homeFeaturedBanners.value = tempBanners;

    // isLoading.value = true
  }

  await useAsyncData('homeData', fetchData);

  onMounted(() => {
    fetchSliderBannersData();
  });

  const redirectTo = (url) => {
    if (url) {
      window.open(url, '_blank');
      // window.location.href = url
    }
  }

  const tab = ref('0')

  const featuredCategory = 'fiestas-tematicas'
  const featuredCategorySwiperOptions = reactive({
    slidesPerView: 2,
    spaceBetween: 2,
    breakpoints: {
      501: {
        slidesPerView: 3,
        spaceBetween: 3,
      },
      768: {
        slidesPerView: 4, 
        spaceBetween: 4, 
      },
      1280: {
        slidesPerView: 6, 
        spaceBetween: 6, 
      },
    },
  });
</script>

<template>
  <ClientOnly>
    <WelcomePopup />
  </ClientOnly>
  <ClientOnly>
    <Loader :isLoading="isLoading"/>
  </ClientOnly>

  <h1 class="visually-hidden">
    Partymax, tu aliado ideal para fiestas, celebraciones y eventos en Bogotá, Colombia.
  </h1>

  <!-- B: NEW MAIN BANNER SLIDER -->
  <section id="main-banner">
    <div class="">
      <ClientOnly>
        <swiper
          :pagination="true"
          :navigation="true"
          :modules="modulesSlider"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          class="MySwiper"
        >
          <swiper-slide
            v-for="(item,i) in sliders"
            :key="i"
            class="w-100 tw-relative"
          >
            <NuxtLink 
              :to="item.url" 
              class="tw-block tw-w-full tw-h-full"
              rel="noopener"
              :aria-label="item.title"
            >
              <img 
                :src="baseURL + (isMobile ? item.mobile : item.image)"
                :alt="item.title"
                class="w-100"
                :loading="i === 0 ? 'eager' : 'lazy'"
                :fetchpriority="i === 0 ? 'high' : 'auto'"
              >
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </ClientOnly>
    </div>
  </section>
  <!-- E: NEW MAIN BANNER SLIDER -->

  <!-- B: PRODUCTS / SERVICES CARDS CTA | MISC CARDS -->
  <section id="misc-banner" class="mt-3">
    <VContainer>
      <!-- B: PRODUCTS / SERVICES CARDS CTA -->
      <VCard class="no-shadown card-information p-0 d-flex transparent card-banner34">
        <VCard class="no-shadown card-information p-0 w-50 grid-item w-100">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.products?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.products?.title"
              >
                <img 
                  :src="homeFeaturedBanners.products?.image" 
                  loading="lazy"
                  fetchpriority="high"
                  cover 
                  class="img-gallery" 
                  :alt="homeFeaturedBanners.products?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0 w-50 ms-5 grid-item w-100">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.services?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.services?.title"
              >
                <img 
                  :src="homeFeaturedBanners.services?.image" 
                  loading="lazy" 
                  fetchpriority="high" 
                  cover 
                  class="img-gallery" 
                  :alt="homeFeaturedBanners.services?.title"/>
              </NuxtLink>
            </VCardItem>
        </VCard>
      </VCard>
      <!-- E: PRODUCTS / SERVICES CARDS CTA -->

      <!-- B: MISC CARDS -->
      <VCard 
      class="home-misc-card-container mt-10 no-shadown p-0 transparent"
      :class="[
        'tw-w-full', 
        'tw-grid tw-gap-4', 
        'tw-grid-cols-2', 
        'md:tw-grid-cols-5' 
      ]"
      >
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/shipping-policies#express_shipping" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="Envío Express ¡Recibe Hoy!"
                >
                  <img :src="mb_1" class="" loading="lazy" fetchpriority="high" alt="Envío Express ¡Recibe Hoy!"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/products?n" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="¡Si Llegaron! Lo Más Nuevo"
                >
                  <img :src="mb_2" class="" loading="lazy" fetchpriority="high" alt="¡Si Llegaron! Lo Más Nuevo"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/products/muneco-decorativo-raton-parado-de-62-cm" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="Descubre La Oferta Del Día"
                >
                  <img :src="mb_3" class="" loading="lazy" fetchpriority="high" alt="Descubre La Oferta Del Día"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/products?r" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="Productos Más Vendidos"
                >
                  <img :src="mb_4" class="" loading="lazy" fetchpriority="high" alt="Productos Más Vendidos"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/clients/form_supplier" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="Quiero Ser Aliado"
                >
                  <img :src="mb_5" class="" loading="lazy" fetchpriority="high" alt="Quiero Ser Aliado"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="tw-p-0 tw-shadow-none home-misc-card mb-blog-card">
            <VCardItem class="tw-p-0 tw-text-center"> 
              <NuxtLink 
                  to="/blogs" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  aria-label="Inspírate con Nuestro Blog"
                >
                  <img :src="mb_6" class="" loading="lazy" fetchpriority="high" alt="Inspírate con Nuestro Blog"/>
                </NuxtLink>
            </VCardItem> 
        </VCard>
      </VCard>
      <!-- E: MISC CARDS -->
    </VContainer>
  </section>
  <!-- E: PRODUCTS / SERVICES CARDS CTA | MISC CARDS -->

  <section id="most-popular">
    <h2 class="home-section-title tw-text-center tw-uppercase tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">¡Los Más Elegidos!</h2>
    <VContainer>
      <!-- B: MOST POPULAR 1 -->
      <VCard 
        class="mt-7 no-shadown p-0 transparent"
        :class="[
          'tw-w-full', 
          'tw-grid tw-gap-4', 
          'tw-grid-cols-2', 
          'md:tw-grid-cols-4' 
        ]"
      >
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner9?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner9?.title"
              >
                <img :src="homeFeaturedBanners.banner9?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner9?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner10?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner10?.title"
              >
                <img :src="homeFeaturedBanners.banner10?.image" cover  cloading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner10?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner11?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner11?.title"
              >
                <img :src="homeFeaturedBanners.banner11?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner11?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
        <VCard class="no-shadown card-information p-0">
            <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner12?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner12?.title"
              >
                <img :src="homeFeaturedBanners.banner12?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner12?.title"/>
              </NuxtLink>
            </VCardItem> 
        </VCard>
      </VCard>
      <!-- E: MOST POPULAR 1 -->
      <!-- B: MOST POPULAR 2 -->
      <VCard class="mt-7 no-shadown p-0 d-flex transparent card-banner34">
          <VCard class="no-shadown p-0 w-50 grid-item w-100 card-information">
              <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner13?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner13?.title"
              >
                <img :src="homeFeaturedBanners.banner13?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner13?.title"/>
              </NuxtLink>
            </VCardItem> 
          </VCard>
          <VCard class="no-shadown p-0 w-50 ms-5 grid-item w-100 card-information">
              <VCardItem class="p-0">
              <NuxtLink 
                :to="homeFeaturedBanners.banner14?.url" 
                class="tw-block tw-w-full tw-h-full"
                rel="noopener"
                :aria-label="homeFeaturedBanners.banner14?.title"
              >
                <img :src="homeFeaturedBanners.banner14?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner14?.title"/>
              </NuxtLink>
            </VCardItem> 
          </VCard>
      </VCard>
      <!-- E: MOST POPULAR 2 -->
    </VContainer>
  </section>

  <!-- B: FEATURED CATEGORY A -->
  <section id="featured-category-a">
    <div class="pm-bg-softgray featured-category-container">
      <h2 class="home-section-title tw-text-center tw-uppercase tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">Compra por Temática</h2>
      <VContainer class="mt-3">
        <VCard 
          class="no-shadown card-icons pm-bg-softgray" 
          v-if="categories && categories.length > 0 && categories.filter(item => item.slug === featuredCategory)[0]?.children?.length > 0">          
          <VCardText class="pt-2 pb-1 px-0 px-md-4 d-flex align-items-stretch justify-content-center">
            <ClientOnly>
              <swiper
                :slides-per-view="featuredCategorySwiperOptions.slidesPerView"
                :space-between="featuredCategorySwiperOptions.spaceBetween"
                :breakpoints="featuredCategorySwiperOptions.breakpoints"

                :navigation="true"
                :loop="true"
                :modules="modules"
                class="mySwiper">
                <swiper-slide 
                  v-for="(i, index) in (categories?.filter(item => item.slug === featuredCategory)[0]?.children || [])"
                  :key="index"
                  class="py-2">
                  
                  <NuxtLink
                    :to="'/products/categories/' + featuredCategory + '/' + i.slug.split('/')[1]"
                    class="tw-no-underline d-block text-center justify-content-center zoom"
                    :aria-label="i.name"
                    >
                    <img 
                      v-if="i.icon_subcategory" 
                      :src="baseURL + i.icon_subcategory"
                      class="d-block border-theme"
                      loading="lazy" fetchpriority="auto"
                      :alt="i.name"
                    />
                    <img 
                      v-else 
                      :src="t_7"
                      class="d-block border-theme"
                      loading="lazy" fetchpriority="auto"
                      :alt="i.name"
                    />
                    <span 
                      class="d-block mt-2 tw-text-tertiary" 
                    >
                      {{ i.name }}
                    </span>
                  </NuxtLink>
                </swiper-slide>
              </swiper>
            </ClientOnly>
          </VCardText> 
        </VCard>
      </VContainer>
    </div>
  </section>
  <!-- E: FEATURED CATEGORY A -->

  <!-- B: MOST WANTED / RECOMMENDATIONS -->
  <section id="most-wanted">
    <h2 class="home-section-title tw-text-center tw-uppercase text-yellow-darken-2 tw-leading-[48px] tw-text-[36px] md:tw-text-[40px] tw-mt-10 tw-mb-0">Los Más Buscados</h2>
    <VContainer>
      <VCard class="no-shadown card-information p-0">
        <!-- d-none d-md-flex align-items-stretch justify-content-between -->
        <VCardText class="px-4 px-md-7 mt-5 mb-5 prodrecommended-grid-6-4-2" v-if="data"> 
          <Product1 
            v-for="(product, i) in data.recommendations"
            :key="i"
            :product="product"
            :readonly="true"/>
        </VCardText>
      </VCard>
      
      <!-- B: MOST WANTED BANNERS -->
      <VCard class="mt-7 mb-10 no-shadown card-information p-0 transparent most-wanted-banners">
        <VRow no-gutters class="tw-w-full">
          
          <VCol cols="12" lg="5" md="5" sm="5" xs="12">
            <VCard class="no-shadown p-0 tw-w-full card-information">
              <VCardItem class="p-0">
                <NuxtLink 
                  :to="homeFeaturedBanners.banner15?.url" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  :aria-label="homeFeaturedBanners.banner15?.title"
                >
                  <img :src="homeFeaturedBanners.banner15?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner15?.title"/>
                </NuxtLink>
              </VCardItem> 
            </VCard>
          </VCol>

          <VCol cols="12" lg="7" md="7" sm="7" xs="12" class="tw-h-full tw-mt-0 tw-pl-5">
            <VCard class="no-shadown p-0 tw-w-full card-information">
              <VCardItem class="p-0">
                <NuxtLink 
                  :to="homeFeaturedBanners.banner16?.url" 
                  class="tw-block tw-w-full tw-h-full"
                  rel="noopener"
                  :aria-label="homeFeaturedBanners.banner16?.title"
                >
                  <img :src="homeFeaturedBanners.banner16?.image" cover loading="lazy" fetchpriority="auto" class="img-gallery" :alt="homeFeaturedBanners.banner16?.title"/>
                </NuxtLink>
              </VCardItem> 
            </VCard>
          </VCol>
        </VRow>
      </VCard>
      <!-- E: MOST WANTED BANNERS -->
    </VContainer>
  </section>
  <!-- E: MOST WANTED / RECOMMENDATIONS -->

  <section id="footer-seo" class="mb-4">
    <VContainer>
      <h3>En Partymax encuentra los mejores productos para </h3>
      <p>
        <NuxtLink to="/products/categories/fiestas-infantiles" aria-label="Fiestas Infantiles">Fiestas Infantiles</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninos/tematica-mickey-mouse" aria-label="Temática Mickey Mouse">Temática Mickey Mouse</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninos/tematica-spiderman" aria-label="Temática Spiderman">Temática Spiderman</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninos/tematica-cars" aria-label="Temática Cars">Temática Cars</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninas/tematica-princesas" aria-label="Temática Princesas">Temática Princesas</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninas/tematica-frozen" aria-label="Temática Frozen">Temática Frozen</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-ninas/tematica-minnie-mouse" aria-label="Temática Minnie Mouse">Temática Minnie Mouse</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-infantiles/tematica-bebes/tematica-espacial" aria-label="Temática Espacial">Temática Espacial</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-tematicas" aria-label="Fiestas Temáticas">Fiestas Temáticas</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-tematicas/tematica-mexicana" aria-label="Temática Mexicana">Temática Mexicana</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-tematicas/tematica-vallenata" aria-label="Temática Vallenata">Temática Vallenata</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-tematicas/tematica-vaquero" aria-label="Temática Vaquera">Temática Vaquera</NuxtLink> - 
        <NuxtLink to="/products/categories/fiestas-tematicas/tematica-neon" aria-label="Temática Neón">Temática Neón</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/baby-shower-nina" aria-label="Baby Shower Niña">Baby Shower Niña</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/baby-shower-nino" aria-label="Baby Shower Niño">Baby Shower Niño</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/revelacion" aria-label="Revelación De Género">Revelación De Género</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/bautizo-nina" aria-label="Bautizo Niña">Bautizo Niña</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/bautizo-nino" aria-label="Bautizo Niño">Bautizo Niño</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/graduacion" aria-label="Graduación">Graduación</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/despedida-de-soltera" aria-label="Despedida de Soltera">Despedida de Soltera</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/dia-de-la-madre-y-del-padre" aria-label="Día de la Madre y del Padre">Día de la Madre y del Padre</NuxtLink> - 
        <NuxtLink to="/products/categories/fechas-especiales/navidad" aria-label="Navidad">Navidad</NuxtLink> - 
        <NuxtLink to="/products/categories/globos/globos-latex" aria-label="Globos Látex">Globos Látex</NuxtLink> - 
        <NuxtLink to="/products/categories/globos/globos-metalizados" aria-label="Globos Metalizados">Globos Metalizados</NuxtLink> - 
        <NuxtLink to="/products/categories/decoracion/globos-chinos" aria-label="Globos Chinos">Globos Chinos</NuxtLink> - 
        <NuxtLink to="/products/categories/decoracion/velas" aria-label="Velas Decorativas">Velas Decorativas</NuxtLink> - 
        <NuxtLink to="/products/categories/decoracion/cortinas-metalizadas" aria-label="Cortinas Metalizadas">Cortinas Metalizadas</NuxtLink> - 
        <NuxtLink to="/products/categories/hora-loca" aria-label="Hora Loca">Hora Loca</NuxtLink> - 
        <NuxtLink to="/products/categories/desechables" aria-label="Desechables">Desechables</NuxtLink> - 
        <NuxtLink to="/products/categories/sorpresas/sorpresas-para-ninas-y-ninos" aria-label="Sorpresas para Niños y Niñas">Sorpresas para Niños y Niñas</NuxtLink> - 
        <NuxtLink to="/products/categories/dulces-y-pinatas/pinatas" aria-label="Piñatas">Piñatas</NuxtLink> - 
        <NuxtLink to="/products/categories/dulces-y-pinatas/dulces-y-caramelos" aria-label="Dulces y Caramelos">Dulces y Caramelos</NuxtLink> - 
        <NuxtLink to="/services/categories/alimentos-y-bebidas/bruch-y-desayunos-sorpresa" aria-label="Brunch y Desayunos Sorpresa">Brunch y Desayunos Sorpresa</NuxtLink> - 
        <NuxtLink to="/services/categories/musica-e-iluminacion" aria-label="Música e Iluminación">Música e Iluminación</NuxtLink> - 
        <NuxtLink to="/services/categories/flores" aria-label="Flores">Flores</NuxtLink> - 
        <NuxtLink to="/services/categories/inflables-y-saltarines" aria-label="Inflables y Saltarines">Inflables y Saltarines</NuxtLink> - 
        <NuxtLink to="/products/extintor-revelacion-genero-baby-shower" aria-label="Extintor Revelación de Género">Extintor Revelación de Género</NuxtLink> - 
        <NuxtLink to="/categories/decoracion" aria-label="Decoración">Decoración</NuxtLink> - 
        <NuxtLink to="/products/categories/decoracion/pompones" aria-label="Pompones Decorativos">Pompones Decorativos</NuxtLink> - 
        <NuxtLink to="/products/sombrero-granjero" aria-label="Sombrero Granjero">Sombrero Granjero</NuxtLink> - 
        <NuxtLink to="/products/categories/hora-loca/pitos-y-cornetas" aria-label="Pitos y Cornetas">Pitos y Cornetas</NuxtLink> - 
        <NuxtLink to="/products/espanta-suegras-tiras-metalizadas-25-unidades" aria-label="Espanta Suegras">Espanta Suegras</NuxtLink> - 
        <NuxtLink to="/products/sombrero-vaquero-rosado" aria-label="Sombrero Vaquero Rosado">Sombrero Vaquero Rosado</NuxtLink>
        <span>y mucho más.</span>
      </p>
    </VContainer>
  </section>

<!-- **************************************************************** OLD HOMEPAGE **************************************************************** -->
  <ClientOnly>
    <VDialog v-model="isDialogVisible" >
      <VCard
        class="px-10 py-14 pb-2 pb-md-4 no-shadown card-register d-block text-center mx-auto">
        <VImg :width="isMobile ? '120' : '180'" :src="isError ? error_circle : check_circle" :alt="isError ? 'Icono de error' : 'Icono de éxito'" class="mx-auto"/>
        <VCardText class="text-message mb-5 px-0 px-md-5 pt-0">
          {{ message }}
        </VCardText>
      </VCard>
    </VDialog>
  </ClientOnly>
</template>

<style scoped>

  .home-section-title {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: 38.4px;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .text-message {
    color:  #FF0090;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px !important;
  }

  .card-register {
    width: 500px;
    border-radius: 32px!important;
  }

  .btn-register {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px;
    border-radius: 32px;
    height: 62px;
  }

  .more {
    text-align: end;
    display: contents;
  }

  .hr-primary {
    border-bottom: 1px solid #0A1B33;
    opacity: 1;
  }

  .hr-cyan {
    border-bottom: 1px solid #D9EEF2;
    opacity: 1;
  }

  .hr-secondary {
    border-bottom: 1px solid #FFFFFF;
    opacity: 1;
  }

  .size-theme {
    font-size: 20px;
    line-height: 22.4px;
  }

  .border-theme {
    border-radius: 192px;
    border: 1px solid var(--Maastricht-Blue, #0A1B33);
  }

  .border-img {
    border-radius: 16px !important;
  }

  .hr {
    border-right: 1px solid #D9EEF2;
    height: 60px;
  }

  .card-information {
    padding: 32px;
    border-radius: 16px;
  }

  .card-information-title {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  }

  .card-information-subtitle {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }

  .list {
    min-height: 59.2px !important;
  }

  .transparent {
    background: transparent !important;
  }

  .hover-icon-arrow-right:hover::v-deep(path) {
    fill: #FF0090;
  }

  .img-zoom {
    transition: transform ease-in-out 0.3s;
  }

  .img-zoom:hover{ 
      transform: scale(1.1);
  }

  .img-zoom:hover span{ 
      color: #FF0090!important;
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
  
  .img-gallery {
    width: 100%;
    height: 100%;
  }

  .img-gallery:hover{
    filter: saturate(180%)!important;
  }

  .v-tab:hover::v-deep(button) {
    background-color: teal !important;
  }

  .v-tab::v-deep(.v-btn__content) {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 25.6px;
    text-transform: none !important;
  }

  .text-pink-accent-3 {
    color: #FF0090 !important;
  }

  .size-circles-desktop {
    width: 194px;
    height: 194px;
  }

  .size-rect-desktop {
    width: 204px;
    height: 284px;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid #D9EEF2;
  }


  .button-hover:hover {
    background-color: #FF27B3 !important;
    box-shadow: 0px 0px 24px 0px #FF27B3;
  }

  .MySwiper::v-deep(.swiper-pagination-bullet-active) {
    /* background: transparent !important; */
    border: 2px double #FF0090 !important;
    width: 16px; 
    height: 16px;
    opacity: 1;
    
    /* Círculo interior rosado */
    &::after {
      content: '';
      position: absolute;
      top: 45%;
      transform: translate(-50%, -50%);
      width: 6px;  /* Tamaño del círculo rosado */
      height: 6px;
      background: #FF0090;
      border-radius: 50%;
    }
  }

  .MySwiper:deep(.swiper-pagination-bullets-dynamic) {
    overflow: visible !important;
  }

  .MySwiper:deep(.swiper-pagination-bullet),
  .MySwiper:deep(.swiper-pagination-bullet-active-next),
  .MySwiper:deep(.swiper-pagination-bullet-active-next-next) {
    width: 16px; 
    height: 16px;
    background-color: white;
    opacity: 0.7;
  }

  .MySwiper:deep(.swiper-button-next),
  .MySwiper:deep(.swiper-button-prev) {
    background-position: center !important;
    background-repeat: no-repeat !important;
    border-radius: 11px !important;
    width: 40px !important;
    height: 40px !important;
  }

  .MySwiper:deep(.swiper-button-next) {
    background-image: url('@/assets/icons/arrow-square-right.svg') !important;
    right: 2% !important;
  }

  .MySwiper:deep(.swiper-button-prev) {
    background-image: url('@/assets/icons/arrow-square-left.svg') !important;
    left: 2% !important;
  }

  .MySwiper:deep(.swiper-button-next::after),
  .MySwiper:deep(.swiper-button-prev::after) {
      content: '' !important; /* Elimina flecha default */
  }

  .MySwiper2 {
    height: 300px!important;
  }

  .MySwiper3 {
    height: 380px!important;
  }

  .MySwiper2::v-deep(.swiper-pagination-bullet-active),
  .MySwiper3::v-deep(.swiper-pagination-bullet-active) {
    background: #FF0090 !important;
  }

  .home-misc-card-container {
    overflow: unset;
  }
  .home-misc-card {
    transition: transform ease-in-out .2s; 
  }
  .home-misc-card:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }

  .pm-bg-softgray {
    background-color: #f2f2f2 !important;
  }

  #featured-category-a .swiper {
    width: 100%;
    height: 100%;
  }

  #featured-category-a .swiper::v-deep(.swiper-wrapper)  {
    align-items: center !important;
  }

  #featured-category-a .swiper::v-deep(.swiper-slide) {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #featured-category-a .swiper-slide img {
    display: block;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev), 
  #featured-category-a .swiper::v-deep(.swiper-button-next) {
    color: #0A1B33 !important;
    width: 6px !important;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev) {
    left: 5px;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-next) {
    right: 5px;
  }

  #featured-category-a .swiper::v-deep(.swiper-button-prev:after), 
  #featured-category-a .swiper::v-deep(.swiper-button-next:after) {
    font-size: 20px;
    font-weight: bold;
  }

  .featured-category-container {
    padding-top: 150px;
    margin-top: -150px;
  }

  .most-wanted-banners .v-card {
    max-height: 280px;
  }
  /* .swiper::v-deep(.swiper-pagination-horizontal ) {
    top: 92%;
  }     */

  .mb-blog-card {
    display: none;
  }

  #footer-seo h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    margin-bottom: 15px;
  }
  #footer-seo p {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  #footer-seo p, #footer-seo a {
    font-size: 12px;
    text-decoration: none;
    color: #888;
  }

  @media only screen and (max-width: 1280px) {
    .most-wanted-banners .v-card {
      max-height: 180px;
    }
  }
  @media only screen and (max-width: 869px) {
    .most-wanted-banners .v-card {
      max-height: 150px;
    }
  }
  @media only screen and (max-width: 768px) {
    .most-wanted-banners .v-card {
      max-height: 125px;
    }
  }
  @media only screen and (max-width: 600px) {
    .most-wanted-banners .v-card {
      max-height: unset;
    }
    .most-wanted-banners .v-col-12 {
      padding-left: 0 !important;
      margin-top: 1rem !important;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    .size-circles-desktop {
      width: 170px;
      height: 170px;
    }

    .no-border {
      border-right: 0 !important;
    }
  }

  @media only screen and (max-width: 767px) {    
    .mb-blog-card {
      display: block;
    }

    .size-circles-desktop {
      width: 160px;
      height: 160px;
    }

    .size-rect-desktop {
      width: 160px !important;
      height: 220px !important;
    }

    .button-hover:hover {
      color: #FFFFFF !important;
    }
    .btn-register {
      height: 48px;
    }

    .col-mobile {
      display: none !important;
    }

    .hr {
      border-right: 0px;
      border-bottom: 1px solid #D9EEF2;
      width: 80%;
      padding-top: 64px!important;
      padding-bottom: 64px!important;
    }

    .col-siguecompra {
      padding-top: 32px!important;
      padding-bottom: 32px!important;
    }

    .card-information {
      padding: 10px 32px;
    }

    .card-vendido {
      display: block!important;
    }

    .vendido-globos {
      margin-inline-start: 0px !important;
    }

    .card-banner5 {
        padding-top: 8px!important;
    }

    .card-banner34 {
      display: grid!important;
      grid-template-columns: 1fr!important;
      grid-gap: 0!important;
    }

    .grid-item {
      margin: 0 0 15px 0px !important;
      padding: 0!important;
    }

    .cardtitles {
      white-space: pre-wrap;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .v-tab::v-deep(.v-btn__content) {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }

    .v-tabs::v-deep(.v-btn.v-btn--density-default) {
      height: 40px !important;
      padding: 0 2px;
    }

    .MySwiper:deep(.swiper-button-next),
    .MySwiper:deep(.swiper-button-prev) {
        display: none;
    }

    .card-register {
      padding: 20px;
      width: auto;
    }

    .text-message {
      font-size: 18px;
    }


    #footer-seo h3 {
      text-align: center;
    }
    #footer-seo p {
      justify-content: center;
    }
  }


  /* *********** B: PRODUCTS RECOMMENDED STYLES *********** */

  .prodrecommended-grid-6-4-2 {
    /* Móvil (sm/xs) -> 2 columnas */
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  /* Tablet (md/sm) -> 3 columnas */
  @media (min-width: 501px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* Tablet (md) -> 4 columnas */
  @media (min-width: 768px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  /* Desktop (lg) -> 6 columnas */
  @media (min-width: 1280px) {
    .prodrecommended-grid-6-4-2 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
  /* *********** E: PRODUCTS RECOMMENDED STYLES *********** */

</style>