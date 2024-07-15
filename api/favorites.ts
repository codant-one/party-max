import { useNuxtApp } from '#app'

export const Favorites = () => {
    const { $axios } = useNuxtApp()

    const get = async (params: object) => {
        return await $axios.get('favorites', {params})
    }

    const add = async (data: object) => {
        return await $axios.post('favorites/add', data)
    }

    const destroy = async (data: object) => {
        return await $axios.post('favorites/delete',data)
    }

    const show = async (data: object) => {
        return await $axios.post('favorites/show', data)
    }

    return {
        get,
        add,
        destroy,
        show
    }
}