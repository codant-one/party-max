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
        setLoading(payload: boolean){
            this.loading = payload
        },
        getCategory(slug: string) {
           
            return Miscellaneous.categories(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        blogs() {
            this.setLoading(true)
            
            return Miscellaneous.blogs()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        blogsByCategory(slug: string) {
            this.setLoading(true)
            
            return Miscellaneous.blogsByCategory(slug)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        getBlog(slug: string) {
           
            return Miscellaneous.blog(slug)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        allFaqs() {
            this.setLoading(true)
            
            return Miscellaneous.faqs()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        allCategories() {
            this.setLoading(true)
            
            return Miscellaneous.categoriesAll()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        products(params: Object) {
            this.setLoading(true)
            
            return Miscellaneous.products(params)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
        getProduct(slug: string) {
           
            return Miscellaneous.product(slug)
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        },
    }
})

