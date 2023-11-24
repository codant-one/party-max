import axios from '@axios'

class Miscellaneous {

    categories(slug: string) {
        return axios.get(`miscellaneous/categories/${slug}`)
    }

    faqs(){
        return axios.get('/miscellaneous/faqs/all')
    }
}

const miscellaneous = new Miscellaneous();

export default miscellaneous;