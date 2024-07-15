import { useNuxtApp } from '#app'

export const Payments = () => {
    const { $axios } = useNuxtApp()

    const signature = async (params: object) => {
        return await $axios.get('payments/signature', {params})
    }

    const redirectToPayU = async (params: object) => {
        return await $axios.post('payments', params)
    }

    return {
        signature,
        redirectToPayU
    }
}