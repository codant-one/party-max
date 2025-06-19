import { useNuxtApp } from '#app'

export const Quotes = () => {
    const { $axios } = useNuxtApp()

    const create = async (data: object) => {
        return await $axios.post('/miscellaneous/quotes', data)
    }

    const show = async (id: Number) => {
        return await $axios.get(`/miscellaneous/quotes/${id}`)
    }

    return {
        create,
        show
    }
}