import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const baseUrl = 'https://' + (process.env.NUXT_MY_DOMAIN || 'partymax.com');
const apiUrl = process.env.NUXT_APP_DOMAIN_API_URL + '/api/miscellaneous' || 'https://backend.partymax.co/api/miscellaneous';

// Debug: Mostrar configuración
console.log('🔧 Configuración del sitemap:');
console.log('Base URL:', baseUrl);
console.log('API URL:', apiUrl);

// Rutas estáticas
const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/products', priority: '1.0', changefreq: 'daily' },
  { url: '/services', priority: '1.0', changefreq: 'daily' },
  { url: '/blogs', priority: '0.8', changefreq: 'weekly' },
  { url: '/categories', priority: '1.0', changefreq: 'daily' },
  { url: '/help', priority: '0.6', changefreq: 'monthly' },
  { url: '/event-planner', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy-statement', priority: '0.3', changefreq: 'yearly' },
  { url: '/data-protection', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' }
];

// Función para hacer fetch a la API
async function fetchFromAPI(endpoint) {
  try {
    const fullUrl = `${apiUrl}${endpoint}`;
    console.log(`🌐 Intentando conectar a: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // 10 segundos timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ ${endpoint} `);
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message);
    console.error(`   URL intentada: ${apiUrl}${endpoint}`);
    return null;
  }
}

// Función para generar el sitemap
async function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Añadir rutas estáticas
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Obtener productos
  const productsData = await fetchFromAPI('/products?limit=-1');
  if (productsData && productsData.data && productsData.data.products) {
    const products = productsData.data.products;
    console.log(`📦 Procesando ${products.length} productos`);
    products.forEach(product => {
      if (product.slug) {
        sitemap += `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${product.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
      }
    });
  } else {
    console.log(`📦 No se encontraron productos o no es un array`);
  }

  // Obtener servicios
  const servicesData = await fetchFromAPI('/services?limit=-1');
  if (servicesData && servicesData.data && servicesData.data.services) {
    const services = servicesData.data.services;
    console.log(`🔧 Procesando ${services.length} servicios`);
    services.forEach(service => {
      if (service.slug) {
        sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${service.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
      }
    });
  } else {
    console.log(`🔧 No se encontraron servicios o no es un array`);
  }

  // Obtener categorías
  const categoriesData = await fetchFromAPI('/categoriesAll');
  if (categoriesData && categoriesData.data && categoriesData.data.categories && Array.isArray(categoriesData.data.categories)) {
    const categories = categoriesData.data.categories;
    console.log(`📂 Procesando ${categories.length} categorías`);
    categories.forEach(category => {
      if (category.slug) {

        if(category.category_id === null) {
          sitemap += `
            <url>
              <loc>${baseUrl}/categories/${category.slug}</loc>
              <lastmod>${category.updated_at || new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>`;
        }

        if(category.category_type_id === 1) {
          sitemap += `
            <url>
              <loc>${baseUrl}/products/categories/${category.slug}</loc>
              <lastmod>${category.updated_at || new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>`;
        }
        
        if(category.category_type_id === 2) {
          sitemap += `
            <url>
              <loc>${baseUrl}/services/categories/${category.slug}</loc>
              <lastmod>${category.updated_at || new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>`;
        }
      }
    });
  } else {
    console.log(`📂 No se encontraron categorías o no es un array`);
  }

  // Obtener blogs (comentado hasta que se confirme el endpoint)
  const blogsData = await fetchFromAPI('/blogs/populars');
  if (blogsData && blogsData.data && blogsData.data.blogs) {
     const blogs = blogsData.data.blogs;
     console.log(`📝 Procesando ${blogs.length} blogs`);
     blogs.forEach(blog => {
       if (blog.slug) {
         sitemap += `
   <url>
     <loc>${baseUrl}/blogs/${blog.slug}</loc>
     <lastmod>${blog.updated_at || new Date().toISOString()}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.6</priority>
   </url>`;
       }
     });
   }

  sitemap += `
</urlset>`;

  return sitemap;
}

// Ejecutar la generación
async function main() {
  try {
    console.log('Generando sitemap...');
    const sitemap = await generateSitemap();
    
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    
    console.log('Sitemap generado exitosamente en:', sitemapPath);
    console.log('Tamaño del archivo:', fs.statSync(sitemapPath).size, 'bytes');
  } catch (error) {
    console.error('Error generando sitemap:', error);
    process.exit(1);
  }
}

main();
