import { defineStore } from 'pinia'
import Profile from '@/api/profile'

export const useProfileStores = defineStore('profile',{
    state: () => ({
    }),
    actions: {
        change_password(data: object) {
            return Profile.change_password(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change_phone(data:object) {
            return Profile.change_phone(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })

        },
        update_profile(data: object) {       
            return Profile.update_profile(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change_avatar(data: object) {       
            return Profile.change_avatar(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        }
    }
})