import { defineStore } from 'pinia'
import { Miscellaneous } from '~/api/miscellaneous'

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
            const { categories } = Miscellaneous()
            return categories(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        blogs(params: Object) {
            const { blogs } = Miscellaneous()
            return blogs(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        getBlog(slug: string) {
            const { blog } = Miscellaneous()
            return blog(slug)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        allFaqs() {
            const { faqs } = Miscellaneous()
            return faqs()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        allCategories() {
            const { categoriesAll } = Miscellaneous()
            return categoriesAll()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        products(params: Object) {
            const { products } = Miscellaneous()
            return products(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        getProduct(slug: string) { 
            const { product } = Miscellaneous()
            return product(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
            
        },
        colors() {
            const { colors } = Miscellaneous()
            return colors()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
    }
})
