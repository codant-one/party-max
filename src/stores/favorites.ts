import { defineStore } from 'pinia'
import Favorites from '@/api/favorites'

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
            return Favorites.get(params)
                .then((response) => {
                    this.data = response.data.data.favorites
                    return Promise.resolve(response.data.data.favorites)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        add(data: object) {
            return Favorites.add(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },
        delete(data: object) {
            return Favorites.delete(data)
                .then((response) => {
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 

        },
        show(data: object) {
            return Favorites.show(data)
                .then((response) => {
                    return Promise.resolve(response.data.data.favorite)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        },   
    }
})