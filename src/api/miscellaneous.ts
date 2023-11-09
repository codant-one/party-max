import axios from '@axios'

class Miscellaneous {

    categories(slug: string) {
        return axios.get(`miscellaneous/categories/${slug}`)
    }
}

const miscellaneous = new Miscellaneous();

export default miscellaneous;