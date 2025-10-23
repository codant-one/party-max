# Sitemap para PartyMax

Este proyecto incluye un sitemap XML optimizado para SEO que se genera automáticamente.

## Archivos del Sitemap

- `public/sitemap.xml` - Sitemap estático con las rutas principales
- `scripts/generate-sitemap.js` - Script para generar sitemap dinámico
- `server/api/sitemap.xml.get.ts` - Endpoint API para sitemap dinámico (opcional)

## Rutas Incluidas

### Rutas Estáticas
- `/` (página principal) - Prioridad 1.0, actualización diaria
- `/products` - Prioridad 1.0, actualización diaria
- `/services` - Prioridad 1.0, actualización diaria
- `/categories` - Prioridad 1.0, actualización diaria
- `/blogs` - Prioridad 0.8, actualización semanal
- `/about` - Prioridad 0.8, actualización mensual
- `/help` - Prioridad 0.6, actualización mensual
- `/event-planner` - Prioridad 0.7, actualización mensual
- `/privacy-statement` - Prioridad 0.3, actualización anual
- `/data-protection` - Prioridad 0.3, actualización anual
- `/terms-and-conditions` - Prioridad 0.3, actualización anual

### Rutas Dinámicas
El sitemap dinámico incluye automáticamente:
- `/products/[slug]` - Productos individuales (Prioridad 1.0, diaria)
- `/services/[slug]` - Servicios individuales (Prioridad 1.0, diaria)
- `/categories/[slug]` - Categorías individuales (Prioridad 1.0, diaria)
- `/blogs/[slug]` - Artículos de blog individuales (Prioridad 0.6, semanal)

## Cómo Usar

### 1. Sitemap Estático
El sitemap estático está disponible en `/sitemap.xml` y se sirve directamente desde la carpeta `public/`.

### 2. Generar Sitemap Dinámico
Para generar un sitemap dinámico que incluya todas las URLs de productos, servicios, categorías y blogs:

```bash
npm run sitemap
```

Este comando:
1. Consulta la API para obtener todos los slugs
2. Genera un sitemap XML completo
3. Lo guarda en `public/sitemap.xml`

### 3. Configuración de Variables de Entorno
Asegúrate de tener configuradas estas variables de entorno:

```env
NUXT_MY_DOMAIN=https://partymax.com
NUXT_APP_DOMAIN_API_URL=https://api.partymax.com
```

## Configuración SEO

### Prioridades
- **1.0**: Página principal, productos, servicios y categorías
- **0.8**: Blogs y about
- **0.7**: Event planner
- **0.6**: Help
- **0.3**: Páginas legales

### Frecuencias de Actualización
- **daily**: Página principal, productos, servicios y categorías
- **weekly**: Blogs
- **monthly**: About, help, event planner
- **yearly**: Páginas legales

## Exclusiones

Las siguientes rutas están excluidas del sitemap:
- `/dashboard/**` - Panel de administración
- `/clients/**` - Área de clientes
- `/cart` - Carrito de compras
- `/login` - Página de login
- `/register` - Página de registro
- `/register-confirm` - Confirmación de registro
- `/testing` - Páginas de testing
- `/openai/**` - Rutas de OpenAI
- `/quote/**` - Rutas de cotizaciones
- `/.well-known/**` - Archivos de configuración

## Automatización

### En Desarrollo
El sitemap estático se sirve automáticamente durante el desarrollo.

### En Producción
1. Ejecuta `npm run sitemap` antes del build
2. O configura un cron job para actualizar el sitemap periódicamente
3. El sitemap se regenerará automáticamente con las últimas URLs

## Verificación

Para verificar que el sitemap funciona correctamente:

1. Visita `https://tu-dominio.com/sitemap.xml`
2. Verifica que el XML sea válido
3. Comprueba que todas las URLs importantes estén incluidas
4. Usa herramientas como Google Search Console para validar el sitemap

## Mantenimiento

- Actualiza las rutas estáticas en `scripts/generate-sitemap.js` cuando añadas nuevas páginas
- Modifica las prioridades y frecuencias según las necesidades de SEO
- Ejecuta `npm run sitemap` después de cambios importantes en el contenido
