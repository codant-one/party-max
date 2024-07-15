import { useNuxtApp } from '#app'

export const Genders = () => {
    const { $axios } = useNuxtApp()

    const getAll = async () => {
        return await $axios.get('genders')
    }

    return {
        getAll
    }
}