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

    return {
        categories,
        categoriesAll,
        faqs,
        blogs,
        blog,
        products,
        product,
        colors
    }
}