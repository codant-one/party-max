import { useNuxtApp } from '#app'

export const Openai = () => {
    const { $axios } = useNuxtApp()

    const show = async (data: object) => {
        return await $axios.post('party-recommendations', data)
    }

    return {
        show
    }
}
