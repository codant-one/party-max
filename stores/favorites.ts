import { defineStore } from 'pinia'
import { Favorites } from '~/api/favorites'

export const useFavoritesStores = defineStore('favorites',{
    state: () => ({
        data: {}
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        fetchFavorites(params: object) {
            const { get } = Favorites()
            return get(params)
                .then((response) => {
                    this.data = response.data.data.favorites.data
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        add(data: object) {
            const { add } = Favorites()
            return add(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        delete(data: object) {
            const { destroy } = Favorites()
            return destroy(data)
                .then((response) => {
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 

        },
        show(data: object) {
            const { show } = Favorites()
            return show(data)
                .then((response) => {
                    return Promise.resolve(response.data.data.favorite)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },   
    }
})