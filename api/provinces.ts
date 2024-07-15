import { useNuxtApp } from '#app'

export const Provinces = () => {
    const { $axios } = useNuxtApp()

    const getAll = async () => {
        return await $axios.get('provinces')
    }

    return {
        getAll
    }
}