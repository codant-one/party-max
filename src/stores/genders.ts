import { defineStore } from 'pinia'
import Genders from '@/api/genders'

export const useGendersStores = defineStore('genders', {
    state: () => ({
        genders: null
    }),
    getters:{
        getGenders(): any {
            return this.genders
        }
    },
    actions: {
        getAll() {
            return Genders.getAll()
                .then((response) => {
                    this.genders = response.data.data
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
    }
})