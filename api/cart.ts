import { useNuxtApp } from '#app'

export const Cart = () => {
    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('shopping-cart', {params})
    }

    const checkAvailability = async (params: object) => {
        return await $axios.get('shopping-cart/checkAvailability', {params})
    }

    return {
        get,
        checkAvailability
    }
}