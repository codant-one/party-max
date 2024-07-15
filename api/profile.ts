import { useNuxtApp } from '#app'

export const Profile = () => {
    const { $axios } = useNuxtApp()

    const change_password = async (data: object) => {
        return await $axios.post('profile/changePassword', data)
    }

    const change_phone = async (data: object) => {
        return await $axios.post('profile/changePhone',data)
    }

    const update_profile = async (data: object) => {
        return await $axios.post('profile', data)
    }

    const change_avatar = async (data: object) => {
        return await $axios.post('profile/changeAvatar', data)
    }

    return {
        change_password,
        change_phone,
        update_profile,
        change_avatar
    }

}