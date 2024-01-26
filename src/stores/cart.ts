import { defineStore } from 'pinia'
import Cart from '@/api/cart'

export const useCartStores = defineStore('cart',{

    state: () => ({
        data: {},
        user: null,
        loading: false,
    }),

    getters:{
        getData(): any {
            return this.data
        }
    },

    actions: {

        add_cart(data: object) {
            
            return Cart.add_cart(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },

        show_cart(id: Number)
        {
        

            return Cart.show_cart(id)
                .then((response) => {
                    this.data = response.data.data.cart
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },

        delete_cart(data: object) {

            return Cart.delete_cart(data)
                .then((response) => {
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
            
            }
    
    }


})