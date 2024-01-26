import axios from '@axios'

class Addresses
{

    get(params: object) {
        return axios.get('addresses', {params})
    }

    create(data: object) {
        return axios.post('/addresses', data)
    }

    update(data: object, id: Number) {
        return axios.put(`/addresses/${id}`, data)
    }

    delete(id: Number){
        return axios.delete(`/addresses/${id}`)
    }
}

const addresses = new Addresses();

export default addresses;