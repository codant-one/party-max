import { useNuxtApp } from '#app'

export const DocumentTypes = () => {
    const { $axios } = useNuxtApp()

    const get = async () => {
        return await $axios.get('document-types')
    }

    return {
        get
    }
}