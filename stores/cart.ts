import { defineStore } from 'pinia'
import { Cart } from '~/api/cart'

export const useCartStores = defineStore('cart', {
    state: () => ({
        data: Array<Object>(),
        count: 0
    }),
    getters:{
        getData(): any {
            return this.data
        },
        getCount(): any {
            return this.count
        }
    },
    actions: {
        fetchCart(params: object) {  
            const { get } = Cart()      
            return get(params)
                .then((response) => {
                    this.data = response.data.data.cart
                    this.count = response.data.data.cart.length
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        add(data: object) {
            const { add } = Cart()  
            return add(data)
                .then((response: any) => {
                    this.count = response.data.data.count
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        delete(data: object) {
            const { destroy } = Cart()  
            return destroy(data)
                .then((response) => {
                    this.count--
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        deleteAll(data: object) {
            const { deleteAll } = Cart()  
            return deleteAll(data)
                .then((response) => {
                    this.count = 0
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        refreshData() {
            this.count = 0
        },
        checkAvailability(params: object) {  
            const { checkAvailability } = Cart()        
            return checkAvailability(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
    
    }


})