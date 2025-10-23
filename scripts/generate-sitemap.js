import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const baseUrl = process.env.NUXT_MY_DOMAIN || 'https://partymax.com';
const apiUrl = process.env.NUXT_APP_DOMAIN_API_URL || 'https://api.partymax.com';

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
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Error fetching ${endpoint}:`, error.message);
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
  const productsData = await fetchFromAPI('/products');
  if (productsData && productsData.data) {
    productsData.data.forEach(product => {
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
  }

  // Obtener servicios
  const servicesData = await fetchFromAPI('/services');
  if (servicesData && servicesData.data) {
    servicesData.data.forEach(service => {
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
  }

  // Obtener categorías
  const categoriesData = await fetchFromAPI('/categories');
  if (categoriesData && categoriesData.data) {
    categoriesData.data.forEach(category => {
      if (category.slug) {
        sitemap += `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${category.updated_at || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
      }
    });
  }

  // Obtener blogs
  const blogsData = await fetchFromAPI('/blogs');
  if (blogsData && blogsData.data) {
    blogsData.data.forEach(blog => {
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
