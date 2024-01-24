import axios from '@axios'

class Provinces {
    
    getAll() {
        return axios.get('provinces')
    }
}

const provinces = new Provinces();

export default provinces;