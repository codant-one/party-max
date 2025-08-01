import { defineStore } from 'pinia'
import { Auth } from '~/api/auth'

export const useAuthStores = defineStore('auth', {
    state: () => ({
        user: null
    }),
    getters:{
        getUser(): any {
            return this.user
        }
    },
    actions: {
        me(hash: string) {
            const { me } = Auth()
            return me(hash)
                .then((response) => {
                    this.user = response.data.data.user_data
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        login(data: object) {
            const { login } = Auth()
            return login(data)
                .then((response) => {
                    this.user = response.data.data.user_data
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        logout() {
            const { logout } = Auth()
            return logout()
                .then((response) => {
                    this.user = null
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        forgot_password(data: object) {
            const { forgot_password } = Auth()
            return forgot_password(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        find(token: string) {
            const { find } = Auth()
            return find(token)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change(data: object) {
            const { change } = Auth()
            return change(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        generateQR() {
            const { generateQR } = Auth()
            return generateQR()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        register(data: object) {
            const { register } = Auth()
            return register(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        sendInfo(data: object) {
            const { sendInfo } = Auth()
            return sendInfo(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        findToken(token: string) {
            const { findToken } = Auth()
            return findToken(token)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        completed(data: object) {
            const { completed } = Auth()
            return completed(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
    }
})