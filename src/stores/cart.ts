import { defineStore } from 'pinia'
import Cart from '@/api/cart'

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
            return Cart.get(params)
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
            return Cart.add(data)
                .then((response: any) => {
                    this.count++
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        delete(data: object) {
            return Cart.delete(data)
                .then((response) => {
                    this.count--
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        refreshData() {
            this.count = 0
        }
    
    }


})