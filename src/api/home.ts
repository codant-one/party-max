import axios from '@axios'

class Home {

    home() {
        return axios.get('home')
    }
}

const home = new Home();

export default home;