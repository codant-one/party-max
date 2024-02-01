import { defineStore } from 'pinia'
import Payments from '@/api/payments'

export const usePaymentsStores = defineStore('payments', {
    state: () => ({
        //
    }),
    actions: {
        signature(params: object) {
            return Payments.signature(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        redirectToPayU(data: object) {
            return Payments.redirectToPayU(data)
                .then((response: any) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
    }
})
