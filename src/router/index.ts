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
import LoginClient from '@/views/clients/login_client.vue'
import Shopping from '@/views/shopping/index.vue'
import Delivery from '@/views/shopping/form_delivery.vue'
import Summary from '@/views/shopping/summary.vue'

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
      path: '/login/client',
      name: 'login_client',
      component: LoginClient
    },

    {
      path: '/shopping/cart',
      name: 'shopping_cart',
      component: Shopping
    },

    {
      path: '/shopping/delivery',
      name: 'shopping_delivery',
      component: Delivery
    },

    {
      path: '/shopping/summary',
      name: 'shopping_summary',
      component: Summary
    },
  ]
})

export default router
