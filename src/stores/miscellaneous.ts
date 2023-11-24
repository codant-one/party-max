import { defineStore } from 'pinia'
import Miscellaneous from '@/api/miscellaneous'

export const useMiscellaneousStores = defineStore('miscellaneous', {
    state: () => ({
        data: {},
        loading: false
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        setLoading(payload: boolean){
            this.loading = payload
        },
        getCategory(slug: string) {
           
            return Miscellaneous.categories(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        allFaqs() {
            this.setLoading(true)
            
            return Miscellaneous.faqs()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        }
    }
})

