import { defineStore } from 'pinia'
import Coupons from '@/api/coupons'

export const useCouponsStores = defineStore('coupons',{

    state: () => ({
        data: {},
        coupons: Array<Object>()
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        show_by_client(data: object, id: Number) {
            return Coupons.show_by_client(data, id)
                .then((response) => {
                    this.data = response.data.data.coupons
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        show_by_code(code: String) {
            return Coupons.show_by_code(code)
                .then((response) => {
                    this.data = response.data.data.coupon
                    return Promise.resolve(response.data.data.coupon)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        }
    }
})