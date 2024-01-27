import axios from '@axios'

class Cart {

    get(params: object) {
        return axios.get('shopping-cart', {params})
    }

    add(data: object) {
        return axios.post('shopping-cart/add', data)
    }

    delete(data: object) {
        return axios.post('shopping-cart/delete',data)
    }
}

const cart = new Cart();

export default cart;