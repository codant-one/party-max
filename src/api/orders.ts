import axios from '@axios'

class Orders {

    get(params: object) {
        return axios.get('orders', {params})
    }

    create(data: object) {
        return axios.post('/orders', data)
    }

    update(data: object, id: Number) {
        return axios.put(`/orders/${id}`, data)
    }

    delete(id: Number){
        return axios.delete(`/orders/${id}`)
    }

    updatePaymentState(data: object, id: Number){
        return axios.put(`/orders/updatePaymentState/${id}`, data)
    }

    show_by_client(params: object, id: Number) {
        return axios.get(`orders/show/${id}`, {params})
    }

    show_by_id(id: Number) {
        return axios.get(`orders/show-order/${id}`)
    }

    uploadFile(data: object) {
        return axios.post('/orders/upload/file', data)
    }
}

const orders = new Orders();

export default orders;