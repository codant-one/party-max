import { defineStore } from 'pinia'
import Miscellaneous from '@/api/miscellaneous'

export const useMiscellaneousStores = defineStore('miscellaneous', {
    state: () => ({
        data: {},
        loading: false
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        getCategory(slug: string) {  
            return Miscellaneous.categories(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        blogs(params: Object) {
            return Miscellaneous.blogs(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        getBlog(slug: string) {
            return Miscellaneous.blog(slug)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        allFaqs() {
            return Miscellaneous.faqs()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        allCategories() {
            return Miscellaneous.categoriesAll()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        products(params: Object) {
            return Miscellaneous.products(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        getProduct(slug: string) { 
            return Miscellaneous.product(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
            
        },
        colors() {
            return Miscellaneous.colors()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
    }
})

