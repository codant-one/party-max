import { defineStore } from 'pinia'
import Testing from '@/api/testing'

export const useTestingStores = defineStore('testing', {
    state: () => ({
        permissions: {},
        loading: false
    }),
    getters:{
        getPermissions(): any {
            return this.permissions
        }
    },
    actions: {
        fetchPermissions() {
            return Testing.permissions()
                .then((response) => {
                    this.permissions = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
            
        }
    }
})

