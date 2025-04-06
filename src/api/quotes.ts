import axios from '@axios'

class Quotes {

    create(data: object) {
        return axios.post('/miscellaneous/quotes', data)
    }

    show(id: Number) {
        return axios.get(`/miscellaneous/quotes/${id}`)
    }
}

const quotes = new Quotes();

export default quotes;