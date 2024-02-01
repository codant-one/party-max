import axios from '@axios'

class Payments
{
    signature(params: object) {
        return axios.get('payments/signature', {params})
    }

    redirectToPayU(params: object) {
        return axios.post('payments', params)
    }
}

const payments = new Payments();

export default payments;