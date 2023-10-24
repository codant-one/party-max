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
        setLoading(payload: boolean){
            this.loading = payload
        },
        fetchPermissions() {
           
            return Testing.permissions()
                .then((response) => {
                    this.permissions = response.data.data
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        }
    }
})

