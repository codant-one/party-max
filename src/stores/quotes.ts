import { defineStore } from 'pinia'
import Quotes from '@/api/quotes'

export const useQuotesStores = defineStore('quotes',{

    state: () => ({
        data: {},
        quotes: Array<Object>()
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        addQuote(data: object) {
            return Quotes.create(data)
                .then((response: any) => {
                    this.quotes.push(response.data.data.quote)
                    return Promise.resolve(response.data.data.quote)
                }).catch(error => {
                    return Promise.reject(error)
                })
            
        },
        showQuote(id: Number) {
            return Quotes.show(id)
                .then((response: any) => {
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
        } 
    }
})