import { defineStore } from 'pinia'
import Auth from '@/api/auth'

export const useAuthStores = defineStore('auth', {
    state: () => ({
        items: {}
    }),
    actions: {
        me(hash: string) {
            return Auth.me(hash)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        login(data: object) {
            
            return Auth.login(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        logout(){
            return Auth.logout()
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        validate(data: object) {
            
            return Auth.validate(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        forgot_password(data: object) {
            
            return Auth.forgot_password(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        find(token: string) {
            
            return Auth.find(token)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change(data: object) {
            
            return Auth.change(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        generateQR() {
            return Auth.generateQR()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
    }
})