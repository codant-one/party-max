import { useNuxtApp } from '#app'

export const Auth = () => {
    const { $axios } = useNuxtApp()

    const me = async (hash: string) => {
        return await $axios.post('auth/me', { hash: hash })
    }

    const login = async (data: object) => {
        return await $axios.post('auth/login', data)
    }

    const logout = async () => {
        return await $axios.post('auth/logout')
    }

    const forgot_password = async (data: object) => {
        return await $axios.post('auth/forgot-password', data)
    }

    const find = async (token: string) => {
        return await $axios.get(`auth/password/find/${token}`)
    }

    const change = async (data: object) => {
        return await $axios.post('auth/change', data)
    }

    const generateQR = async () => {
        return await $axios.get('auth/generateQR')
    }

    const register = async (data: object) => {
        return await $axios.post('auth/register', data)
    }

    const sendInfo = async (data: object) => {
        return await $axios.post('auth/sendInfo', data)
    }

    const findToken = async (token: string) => {
        return await $axios.get(`auth/find/${token}`)
    }

    const completed = async (data: object) => {
        return await $axios.post('auth/completed', data)
    }

    return {
        me,
        login,
        logout,
        forgot_password,
        find,
        change,
        generateQR,
        register,
        sendInfo,
        findToken,
        completed
    }
}