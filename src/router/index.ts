import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Testing from '@/views/Testing.vue'
import Blogs from '@/views/blogs/index.vue'
import About from '@/views/About.vue'
import Help from '@/views/Help.vue'
import Categories from '@/views/categories/index.vue'
import Products from '@/views/Products.vue'
import Suppliers from '@/views/Suppliers.vue'
import Services from '@/views/Services.vue'

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
      path: '/suppliers',
      name: 'suppliers',
      component: Suppliers
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    }
  ]
})

export default router
