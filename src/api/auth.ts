import axios from '@axios'

class Auth {

    me(hash: string) {
        return axios.post('auth/me', { hash: hash })
    }

    login(data: object) {
        return axios.post('auth/login', data)
    }

    logout() {
        return axios.post('auth/logout')
    }

    validate(data: object) {
        return axios.post('auth/2fa/validate', data)
    }

    forgot_password(data: object) {
        return axios.post('auth/forgot-password', data)
    }

    find(token: string) {
        return axios.get(`auth/password/find/${token}`)
    }

    change(data: object) {
        return axios.post('auth/change', data)
    }

    generateQR() {
        return axios.get('auth/generateQR')
    }

    register(data: object) {
        return axios.post('auth/register', data)
    }

    sendInfo(data: object) {
        return axios.post('auth/sendInfo', data)
    }

    findToken(token: string) {
        return axios.get(`auth/find/${token}`)
    }

    completed(data: object) {
        return axios.post('auth/completed', data)
    }
}

const auth = new Auth();

export default auth;