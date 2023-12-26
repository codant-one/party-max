import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Testing from '@/views/Testing.vue'
import Blogs from '@/views/blogs/index.vue'
import BlogDetail from '@/views/blogs/detail.vue'
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
import success_registerp from '@/views/clients/success_registerper.vue'
import success_registerc from '@/views/clients/success_registercom.vue'

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
      component: Dashboard
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const privatePages = ['/dashboard'];
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
