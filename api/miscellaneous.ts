import { useNuxtApp } from '#app'

export const Miscellaneous = () => {
    const { $axios } = useNuxtApp()

    const categories = async (slug: string) => {
        return await $axios.get(`miscellaneous/categories/${slug}`)
    }

    const categoriesAll = async () => {
        return await $axios.get(`miscellaneous/categories`)
    }

    const faqs = async () => {
        return await $axios.get('/miscellaneous/faqs/all')
    }

    const blogs = async (params: Object) => {
        return await $axios.get(`/miscellaneous/blogs/populars`, {params})
    }

    const blog = async (slug: string) => {
        return await $axios.get(`/miscellaneous/blogs/${slug}`)
    }

    const products = async (params: Object) => {
        return await $axios.get(`miscellaneous/products`, {params})
    }

    const product = async (slug: string) => {
        return await $axios.get(`miscellaneous/products/${slug}`)
    }

    const colors = async () => {
        return await $axios.get(`miscellaneous/colors`)
    }

    const services = async () => {
        return await $axios.get(`miscellaneous/services`)
    }

    const service = async (slug: string) => {
        return await $axios.get(`miscellaneous/services/${slug}`)
    }

    const getDataCupcake = async () => {
        return await $axios.get(`miscellaneous/cupcakes`)
    }

    const ips = async () => {
        return await $axios.get(`miscellaneous/ips`)
    }

    const contactUs = async (data: object) => {
        return  await $axios.post(`miscellaneous/contactUs`, data)
    }

    return {
        categories,
        categoriesAll,
        faqs,
        blogs,
        blog,
        products,
        product,
        colors,
        services,
        service,
        getDataCupcake,
        ips,
        contactUs
    }
}