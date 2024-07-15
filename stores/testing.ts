import { defineStore } from 'pinia'
import { Testing } from '~/api/testing'

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
            const { permissions } = Testing()

            return permissions()
                .then((response: any) => {
                    this.permissions = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
            
        }
    }
})

