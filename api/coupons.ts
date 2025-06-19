import { useNuxtApp } from "#app"

export const Coupons = () => {
    const { $axios } = useNuxtApp()

    const show_by_client = async (params: object, id: Number) => {
        return await $axios.get(`coupons/show/${id}`, { params })
    }

    const show_by_code = async (code: String) => {
        return await $axios.get(`coupons/show-coupon/${code}`)
    }

    return {
        show_by_client,
        show_by_code
    }
}