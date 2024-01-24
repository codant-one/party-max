import axios from '@axios'

class Profile {
    
    change_password(data: object) {
        return axios.post('profile/changePassword', data)
    }

    change_phone(data: object) {
        return axios.post('profile/changePhone',data)
    }

    update_profile(data: object) {
        return axios.post('profile', data)
    }

    change_avatar(data: object) {
        return axios.post('profile/changeAvatar', data)
    }

}

const profile = new Profile();

export default profile;