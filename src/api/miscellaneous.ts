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

    blogs(params: Object){
        return axios.get(`/miscellaneous/blogs/populars`, {params})
    }

    blog(slug: string){
        return axios.get(`/miscellaneous/blogs/${slug}`)
    }

    products(params: Object) {
        return axios.get(`miscellaneous/products`, {params})
    }

    product(slug: string) {
        return axios.get(`miscellaneous/products/${slug}`)
    }

    colors() {
        return axios.get(`miscellaneous/colors`)
    }

    services(params: Object) {
        return axios.get(`miscellaneous/services`, {params})
    }

    service(slug: string) {
        return axios.get(`miscellaneous/services/${slug}`)
    }

    getDataCupcake() {
        return axios.get('miscellaneous/cupcakes')
    }
}

const miscellaneous = new Miscellaneous();

export default miscellaneous;