import axios from 'axios'

export async function loadCategories() {

  console.log(process.env.NUXT_APP_DOMAIN_API_URL+ '/api/' +'home')
  const response = await axios.get(process.env.NUXT_APP_DOMAIN_API_URL+ '/api/' +'home');

  return response?.data?.data;

}
