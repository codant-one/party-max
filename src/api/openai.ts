import axios from '@axios'

class Openai {

    show(data: object) {
        return axios.post('party-recommendations', data)
    }
}

const openai = new Openai();

export default openai;