import axios from '@axios'

class Favorites {

    get(params: object) {
        return axios.get('favorites', {params})
    }

    add(data: object) {
        return axios.post('favorites/add', data)
    }

    delete(data: object){
        return axios.post('favorites/delete',data)
    }

    show(data: object) {
        return axios.post('favorites/show', data)
    }
}

const favorites = new Favorites();

export default favorites;