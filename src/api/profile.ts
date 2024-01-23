import axios from '@axios'

class Profile
{

    
    change_password(data: object)
    {
        return axios.post('profile/changePassword', data)
    }

    change_phone(data: object)
    {
        return axios.post('profile/changePhone',data)
    }

    update_profile(data: object) {
        return axios.post('profile', data)
    }

    get_countries() {
        return axios.get('countries')
    }

    get_provinces() {
        return axios.get('provinces')
    }

    get_gender() {
        return axios.get('genders')
    }
}

const profile = new Profile();

export default profile;