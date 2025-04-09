import axios from '@axios'

class Coupons {

    show_by_client(params: object, id: Number) {
        return axios.get(`coupons/show/${id}`, {params})
    }

    show_by_code(code: String) {
        return axios.get(`coupons/show-coupon/${code}`)
    }
}

const coupons = new Coupons();

export default coupons;