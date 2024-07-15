import { defineStore } from 'pinia'
import { Payments } from '~/api/payments'

export const usePaymentsStores = defineStore('payments', {
    state: () => ({
        //
    }),
    actions: {
        signature(params: object) {
            const { signature } = Payments()
            return signature(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        redirectToPayU(data: object) {
            const { redirectToPayU } = Payments()
            return redirectToPayU(data)
                .then((response: any) => {
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
    }
})
