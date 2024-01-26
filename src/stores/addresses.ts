import { defineStore } from 'pinia'
import Addresses from '@/api/addresses'

export const useAddressesStores = defineStore('addresses', {
    state: () => ({
        addresses: Array<Object>()
    }),
    getters:{
        getAddresses(): any {
            return this.addresses
        }
    },
    actions: {
        fetchAddresses(params: object) {
            return Addresses.get(params)
                .then((response) => {
                    this.addresses = response.data.data.addresses.data
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        addAddress(data: object) {
            return Addresses.create(data)
                .then((response: any) => {
                    this.addresses.push(response.data.data.address)
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
            
        },
        updateAddress(data: object, id: Number) {
            return Addresses.update(data, id)
                .then((response: any) => {
                    let pos = this.addresses.findIndex((item: any) => item.id === response.data.data.address.id)
                    this.addresses[pos] = response.data.data.address
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        deleteAddress(id: Number) {
            return Addresses.delete(id)
                .then((response) => {
                    let index = this.addresses.findIndex((item: any) => item.id === id)
                    this.addresses.splice(index, 1)
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                }) 
        }
    }
})
