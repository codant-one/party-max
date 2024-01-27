import axios from '@axios'

class Orders {

    show_by_client(id: Number) {
        return axios.get(`orders/show/${id}`)
    }

    show_by_id(id: Number) {
        return axios.get(`orders/show-order/${id}`)
    }
}

const orders = new Orders();

export default orders;