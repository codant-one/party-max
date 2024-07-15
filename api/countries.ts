import { useNuxtApp } from '#app'

export const Countries = () => {
    const { $axios } = useNuxtApp()

    const getAll = async () => {
        return await $axios.get('countries')
    }

    return {
        getAll
    }
}
