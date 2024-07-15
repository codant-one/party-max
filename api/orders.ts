import { useNuxtApp } from '#app'

export const Orders = () => {
    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('orders', {params})
    }

    const create = async (data: object) => {
        return await $axios.post('/orders', data)
    }

    const update = async (data: object, id: Number) => {
        return await $axios.put(`/orders/${id}`, data)
    }

    const destroy = async (id: Number) => {
        return await $axios.delete(`/orders/${id}`)
    }

    const updatePaymentState = async (data: object, id: Number) => {
        return await $axios.put(`/orders/updatePaymentState/${id}`, data)
    }

    const show_by_client = async (params: object, id: Number) => {
        return await $axios.get(`orders/show/${id}`, {params})
    }

    const show_by_id = async (id: Number) => {
        return await $axios.get(`orders/show-order/${id}`)
    }

    return {
        get,
        update,
        create,
        destroy,
        updatePaymentState,
        show_by_client,
        show_by_id
    }
}