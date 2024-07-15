import { defineStore } from 'pinia'
import { Orders } from '~/api/orders'

export const useOrdersStores = defineStore('orders',{

    state: () => ({
        data: {},
        orders: Array<Object>()
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        fetchOrders(params: object) {
            const { get } = Orders()
            return get(params)
                .then((response) => {
                    this.orders = response.data.data.orders.data
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        addOrder(data: object) {
            const { create } = Orders()
            return create(data)
                .then((response: any) => {
                    this.orders.push(response.data.data.order)
                    return Promise.resolve(response.data.data.order)
                }).catch(error => {
                    return Promise.reject(error)
                })
            
        },
        updateOrder(data: object, id: Number) {
            const { update } = Orders()
            return update(data, id)
                .then((response: any) => {
                    let pos = this.orders.findIndex((item: any) => item.id === response.data.data.order.id)
                    this.orders[pos] = response.data.data.order
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        deleteOrder(id: Number) {
            const { destroy } = Orders()
            return destroy(id)
                .then((response) => {
                    let index = this.orders.findIndex((item: any) => item.id === id)
                    this.orders.splice(index, 1)
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                }) 
        },
        updatePaymentState(data: object, id: Number) {
            const { updatePaymentState } = Orders()
            return updatePaymentState(data, id)
                .then((response) => {
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                }) 
        },
        show_by_client(data: object, id: Number) {
            const { show_by_client } = Orders()
            return show_by_client(data, id)
                .then((response) => {
                    this.data = response.data.data.orders
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        show_by_id(id: Number) {
            const { show_by_id } = Orders()
            return show_by_id(id)
                .then((response) => {
                    this.data = response.data.data.orders
                    return Promise.resolve(response.data.data.orders)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        }
    }
})