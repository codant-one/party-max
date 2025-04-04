import { defineStore } from 'pinia'
import Openai from '@/api/openai'

export const useOpenaiStores = defineStore('openai', {
    state: () => ({
        data: {}
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        show(data: object) {
            return Openai.show(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },   
    }
})

