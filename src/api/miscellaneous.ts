import axios from '@axios'

class Miscellaneous {

    categories(slug: string) {
        return axios.get(`miscellaneous/categories/${slug}`)
    }

    categoriesAll() {
        return axios.get(`miscellaneous/categories`)
    }

    faqs(){
        return axios.get('/miscellaneous/faqs/all')
    }

    blogs(){
        return axios.get('/miscellaneous/blogs/populars')
    }

    products(params: Object) {
        return axios.get(`miscellaneous/products`, {params})
    }

    product(slug: string) {
        return axios.get(`miscellaneous/products/${slug}`)
    }
}

const miscellaneous = new Miscellaneous();

export default miscellaneous;