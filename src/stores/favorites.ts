import { defineStore } from 'pinia'
import Favorite from '@/api/favorites'

export const useFavoriteStores = defineStore('favorite',{

    state: () => ({
        data: {},
        user: null,
        loading: false,
    }),

    getters:{
        getData(): any {
            return this.data
        }
    },

    actions: {

        setLoading(payload: boolean){
            this.loading = payload
        },

        add_favorite(data: object) {
            
            return Favorite.add_favorite(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },

        show_favorites(id: Number)
        {
            this.setLoading(true)

            return Favorite.show_favorites(id)
                .then((response) => {
                    this.data = response.data.data.favorites
                    return Promise.resolve(response.data.data.favorites)
                })
                .catch(error => Promise.reject(error))
                .finally(() => {
                    this.setLoading(false)
                })
        },

        delete_favorite(data: object) {
            this.setLoading(true)

            return Favorite.delete_favorite(data)
                .then((response) => {
                    return Promise.resolve(response)
                })
                .catch(error => {Promise.reject(error)})
            
            }
                
    
    }


})