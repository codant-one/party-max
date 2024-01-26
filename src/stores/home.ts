import { defineStore } from 'pinia'
import Home from '@/api/home'

export const useHomeStores = defineStore('home', {
    state: () => ({
        data: {}
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        fetchData() {
            return Home.home()
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        }
    }
})

