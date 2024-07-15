import { useNuxtApp } from '#app'

export const Reviews = () => {
    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('reviews', {params})
    }

    const create = async (data: object) => {
        return await $axios.post('/reviews', data)
    }

    const update = async (data: object, id: Number) => {
        return await $axios.put(`/reviews/${id}`, data)
    }

    const destroy = async (data: object) => {
        return await $axios.post('/reviews/delete', data)
    }

    const show_by_client = async (params: object, id: Number) => {
        return await $axios.get(`reviews/show/${id}`, {params})
    }

    return {
        get,
        create,
        update,
        destroy,
        show_by_client
    }

}