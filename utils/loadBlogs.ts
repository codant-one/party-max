import axios from 'axios'

export async function loadBlogs() {

    let data = {
        category: null,
        search: null
      }

    const response = await axios.get(process.env.NUXT_APP_DOMAIN_API_URL+ '/api/' +'miscellaneous/blogs/populars', {data});

    return response?.data?.data.blogs.map((blog: { slug: string }) => `/blogs/${blog.slug}`);

}
