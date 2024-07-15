import { defineStore } from 'pinia'
import { Profile } from '~/api/profile'

export const useProfileStores = defineStore('profile',{
    state: () => ({
        //
    }),
    actions: {
        change_password(data: object) {
            const { change_password } = Profile()
            return change_password(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change_phone(data:object) {
            const { change_phone } = Profile()
            return change_phone(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        update_profile(data: object) { 
            const { update_profile } = Profile()      
            return update_profile(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        change_avatar(data: object) { 
            const { change_avatar } = Profile()      
            return change_avatar(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        }
    }
})