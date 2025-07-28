import { defineStore } from 'pinia'
import { Miscellaneous } from '~/api/miscellaneous'

export const useMiscellaneousStores = defineStore('miscellaneous', {
    state: () => ({
        data: {},
        loading: false,
        error: false,
        message: ''
    }),
    getters:{
        getData(): any {
            return this.data
        },
        getLoading(): any {
            return this.loading
        },
        getMessage(): any {
            return this.message
        },
        getError(): any {
            return this.error
        }
    },
    actions: {
        setLoading(value: any) {
            this.loading = value
        },
        setMessage(value: any) {
            this.message = value
        },
        setError(value: any) {
            this.error = value
        },
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
        services(params: Object) {
            const { services } = Miscellaneous()
            return services()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        getService(slug: string) {
            const { service } = Miscellaneous()
            return service(slug)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        fetchDataCupcake() {
            const { getDataCupcake } = Miscellaneous()
            return getDataCupcake()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        ips() {
            const { ips } = Miscellaneous()
            return ips()
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        contactUs(data: object) {
            const { contactUs } = Miscellaneous()
            return contactUs(data)
                .then((response: any) => {
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
            
        },
    }
})

