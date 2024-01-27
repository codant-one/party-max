import { defineStore } from 'pinia'
import Orders from '@/api/orders'

export const useOrdersStores = defineStore('orders',{

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

        show_by_client(id: Number)
        {
        

            return Orders.show_by_client(id)
                .then((response) => {
                    this.data = response.data.data.orders
                    return Promise.resolve(response.data.data.orders)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },

        show_by_id(id: Number)
        {
        

            return Orders.show_by_id(id)
                .then((response) => {
                    this.data = response.data.data.orders
                    return Promise.resolve(response.data.data.orders)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },

    
    }


})