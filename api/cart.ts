import { useNuxtApp } from '#app'

export const Cart = () => {
    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('shopping-cart', {params})
    }

    const add = async (data: object) => {
        return await $axios.post('shopping-cart/add', data)
    }

    const destroy = async (data: object) => {
        return await $axios.post('shopping-cart/delete',data)
    }

    const deleteAll = async (data: object) => {
        return await $axios.post('shopping-cart/deleteAll',data)
    }

    const checkAvailability = async (params: object) => {
        return await $axios.get('shopping-cart/checkAvailability', {params})
    }

    return {
        get,
        add,
        destroy,
        deleteAll,
        checkAvailability
    }
}