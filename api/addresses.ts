import { useNuxtApp } from '#app'

export const Addresses = () => {

    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('addresses', {params})
    }

    const create = async (data: object) => {
        return await $axios.post('/addresses', data)
    }

    const update = async (data: object, id: Number) => {
        return await $axios.put(`/addresses/${id}`, data)
    }

    const destroy = async (id: Number) => {
        return await $axios.delete(`/addresses/${id}`)
    }

    return {
        get,
        create,
        update,
        destroy
    }
}