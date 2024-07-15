import { defineStore } from 'pinia'
import { Provinces } from '~/api/provinces'

export const useProvincesStores = defineStore('provinces', {
    state: () => ({
        provinces: null
    }),
    getters:{
        getProvinces(): any {
            return this.provinces
        }
    },
    actions: {
        getAll() {
            const { getAll } = Provinces()
            return getAll()
                .then((response) => {
                    this.provinces = response.data.data
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
    }
})