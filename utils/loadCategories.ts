import axios from 'axios'

export async function loadCategories() {
  const response = await axios.get('home');

  return response?.data?.data

}
