import axios from '@axios'

class Countries {
    
    getAll() {
        return axios.get('countries')
    }
}

const countries = new Countries();

export default countries;