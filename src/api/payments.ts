import axios from '@axios'

class Payments
{
    signature(params: object) {
        return axios.get('payments/signature', {params})
    }
}

const payments = new Payments();

export default payments;