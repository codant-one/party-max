import axios from '@axios'

class Cart {

    get(params: object) {
        return axios.get('shopping-cart', {params})
    }

    checkAvailability(params: object) {
        return axios.get('shopping-cart/checkAvailability', {params})
    }
}

const cart = new Cart();

export default cart;