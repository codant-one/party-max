import axios from 'axios'

export async function loadProducts() {

    let data = {
        limit: -1
      }

    const response = await axios.get(process.env.NUXT_APP_DOMAIN_API_URL+ '/api/' +'miscellaneous/products', {data});

    return response?.data?.data.products.data.map((product: { slug: string }) => `/products/${product.slug}`);

}
