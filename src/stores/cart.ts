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

        setLoading(payload: boolean){
            this.loading = payload
        },

        add_cart(data: object) {
            
            return Cart.add_cart(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },

        show_cart(id: Number)
        {
            this.setLoading(true)

            return Cart.show_cart(id)
                .then((response) => {
                    this.data = response.data.data.cart
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
        }
    
    }


})