import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Testing from '@/views/Testing.vue'
import Blogs from '@/views/blogs/index.vue'
import BlogDetail from '@/views/blogs/detail.vue'
import BlogsByCategory from '@/views/blogs/blogsByCategory.vue'
import About from '@/views/About.vue'
import Help from '@/views/Help.vue'
import Categories from '@/views/categories/index.vue'
import Products from '@/views/products/index.vue'
import ProductDetail from '@/views/products/detail.vue'
import Suppliers from '@/views/Suppliers.vue'
import Services from '@/views/Services.vue'
import Register from '@/views/clients/register.vue'
import TypeClient from '@/views/clients/type_client.vue'
import FormClient from '@/views/clients/form_client.vue'
import FormSupplier from '@/views/clients/form_supplier.vue'
import Login from '@/views/Login.vue'
import Cart from '@/views/cart/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Profile from '@/views/dashboard/profile/index.vue'
import Testing2 from '@/views/dashboard/profile/testing.vue'
import information_client from '@/views/dashboard/profile/information.vue'
import security_client from '@/views/dashboard/profile/security.vue'
import address_client from '@/views/dashboard/profile/address.vue'
import add_address from '@/views/dashboard/profile/add_address.vue'
import Purchases from '@/views/dashboard/purchases.vue'
import Favorites from '@/views/dashboard/favorites.vue'
import Detail_pusher from '@/views/dashboard/details_purchases.vue'
import success_registerp from '@/views/clients/success_registerper.vue'
import success_registerc from '@/views/clients/success_registercom.vue'
import forgot_password from '@/views/clients/forgot_password.vue'
import reset_password from '@/views/clients/reset_password.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/testing',
      name: 'testing',
      component: Testing
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    },
    {
      path: '/blogs/:slug',
      name: 'blogDetail',
      component: BlogDetail
    },
    {
      path: '/blogs/categories/:slug',
      name: 'blogsByCategory',
      component: BlogsByCategory
    },
    {
      path: '/about-us',
      name: 'about',
      component: About
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/categories/:slug',
      name: 'categories',
      component: Categories
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/products/:slug',
      name: 'productDetail',
      component: ProductDetail
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: Suppliers
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/type_client',
      name: 'type_client',
      component: TypeClient
    },
    {
      path: '/register/form_client',
      name: 'form_client',
      component: FormClient
    },
    {
      path: '/register/form_supplier',
      name: 'form_supplier',
      component: FormSupplier
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/dashboard',
          component: Profile,
        },
        {
          path: '/testing2',
          component: Testing2,
        },
        {
          path: '/mydata',
          component: information_client,
        },
        {
          path: '/security',
          component: security_client,
        },
        {
          path:'/client-address',
          component: address_client,
        },
        {
          path: '/add-address',
          component: add_address, 
        },
        {
          path: '/my-purchases',
          name: 'my_purchases',
          component: Purchases,
        },
        {
          path: '/my-favorites',
          name: 'favorites',
          component: Favorites,
        },
        {
          path: '/detail-purchases',
          name: 'detail_pusher',
          component: Detail_pusher,
        }
      ],
    },
    {
      path: '/register/success_person',
      name: 'success_person',
      component: success_registerp
    },
    {
      path: '/register/success_company',
      name: 'success_company',
      component: success_registerc
    },

    {
      path: '/forgot-password',
      name: 'forgot_password',
      component:forgot_password
    },
    {
      path: '/reset_password',
      name: 'reset_password',
      component: reset_password
    }
  ]
})

router.beforeEach((to, from, next) => {
  const privatePages = ['/dashboard','/my-favorites','/detail-purchases','/my-purchases','/mydata','/security','/client-address','/add-address'];
  const authRequired = privatePages.includes(to.path);
  const loggedIn = localStorage.getItem('user_data');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
