import axios from '@axios'

class Genders {
    
    getAll() {
        return axios.get('genders')
    }
}

const genders = new Genders();

export default genders;