import { useNuxtApp } from '#app'

export const Home = () => {
    const { $axios } = useNuxtApp()

    const home = async () => {
        return await $axios.get('home')
    }

    return {
        home
    }
}