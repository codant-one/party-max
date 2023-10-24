import axios from '@axios'

class Testing {

    permissions() {
        return axios.get('testing')
    }
}

const testing = new Testing();

export default testing;