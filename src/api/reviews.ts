import axios from '@axios'

class Reviews {

    get(params: object) {
        return axios.get('reviews', {params})
    }

    create(data: object) {
        return axios.post('/reviews', data)
    }

    update(data: object, id: Number) {
        return axios.put(`/reviews/${id}`, data)
    }

    delete(data: object){
        return axios.post('/reviews/delete', data)
    }

    show_by_client(params: object, id: Number) {
        return axios.get(`reviews/show/${id}`, {params})
    }

}

const reviews = new Reviews();

export default reviews;