import { useNuxtApp } from '#app'

export const Testing = () => {
    const { $axios } = useNuxtApp()

    const permissions = async () => {
        return await $axios.get('testing')
    }

    return {
        permissions
    }
}
