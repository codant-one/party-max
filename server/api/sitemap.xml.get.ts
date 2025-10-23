// Tipos para las respuestas de la API
interface ApiResponse<T> {
  data: T[]
  success?: boolean
  message?: string
}

interface Product {
  slug: string
  updated_at?: string
}

interface Service {
  slug: string
  updated_at?: string
}

interface Category {
  slug: string
  updated_at?: string
}

interface Blog {
  slug: string
  updated_at?: string
}

export default defineEventHandler(async (event) => {
  const baseUrl = process.env.NUXT_MY_DOMAIN || 'https://partymax.com'
  const apiUrl = process.env.NUXT_APP_DOMAIN_API_URL || 'https://api.partymax.com'
  
  // Configurar headers para XML
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // Rutas estáticas
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/products', priority: '0.9', changefreq: 'daily' },
    { url: '/services', priority: '0.9', changefreq: 'daily' },
    { url: '/blogs', priority: '0.8', changefreq: 'weekly' },
    { url: '/categories', priority: '0.8', changefreq: 'daily' },
    { url: '/help', priority: '0.6', changefreq: 'monthly' },
    { url: '/event-planner', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-statement', priority: '0.3', changefreq: 'yearly' },
    { url: '/data-protection', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' }
  ]

  // Añadir rutas estáticas
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  })

  try {
    // Obtener productos
    const productsResponse = await $fetch<ApiResponse<Product>>(`${apiUrl}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (productsResponse && productsResponse.data) {
      productsResponse.data.forEach((product) => {
        if (product.slug) {
          sitemap += `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${product.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
        }
      })
    }
  } catch (error) {
    console.warn('Error fetching products for sitemap:', error)
  }

  try {
    // Obtener servicios
    const servicesResponse = await $fetch<ApiResponse<Service>>(`${apiUrl}/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (servicesResponse && servicesResponse.data) {
      servicesResponse.data.forEach((service) => {
        if (service.slug) {
          sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${service.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
        }
      })
    }
  } catch (error) {
    console.warn('Error fetching services for sitemap:', error)
  }

  try {
    // Obtener categorías
    const categoriesResponse = await $fetch<ApiResponse<Category>>(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (categoriesResponse && categoriesResponse.data) {
      categoriesResponse.data.forEach((category) => {
        if (category.slug) {
          sitemap += `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${category.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
        }
      })
    }
  } catch (error) {
    console.warn('Error fetching categories for sitemap:', error)
  }

  try {
    // Obtener blogs
    const blogsResponse = await $fetch<ApiResponse<Blog>>(`${apiUrl}/blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (blogsResponse && blogsResponse.data) {
      blogsResponse.data.forEach((blog) => {
        if (blog.slug) {
          sitemap += `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${blog.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
        }
      })
    }
  } catch (error) {
    console.warn('Error fetching blogs for sitemap:', error)
  }

  sitemap += `
</urlset>`

  return sitemap
})
