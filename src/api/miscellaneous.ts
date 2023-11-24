import axios from '@axios'

class Miscellaneous {

    categories(slug: string) {
        return axios.get(`miscellaneous/categories/${slug}`)
    }

    faqs(){
        return axios.get('/miscellaneous/faqs/all')
    }

    blogs(){
        return axios.get('/miscellaneous/blogs/populars')
    }
}

const miscellaneous = new Miscellaneous();

export default miscellaneous;