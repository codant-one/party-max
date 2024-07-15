import { defineStore } from 'pinia'
import { Reviews } from '~/api/reviews'

export const useReviewsStores = defineStore('reviews',{

    state: () => ({
        data: {},
        reviews: Array<Object>()
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        fetchReviews(params: object) {
            const { get } = Reviews()
            return get(params)
                .then((response) => {
                    this.reviews = response.data.data.reviews.data
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
        addReview(data: object) {
            const { create } = Reviews()
            return create(data)
                .then((response: any) => {
                    this.reviews.push(response.data.data.review)
                    return Promise.resolve(response.data.data.review)
                }).catch(error => {
                    return Promise.reject(error)
                })
            
        },
        updateReview(data: object, id: Number) {
            const { update } = Reviews()
            return update(data, id)
                .then((response: any) => {
                    let pos = this.reviews.findIndex((item: any) => item.id === response.data.data.review.id)
                    this.reviews[pos] = response.data.data.review
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        deleteReview(data: object) {
            const { destroy } = Reviews()
            return destroy(data)
                .then((response) => {
                    return Promise.resolve(response)
                }).catch(error => {
                    return Promise.reject(error)
                }) 
        },
        show_by_client(data: object, id: Number) {
            const { show_by_client } = Reviews()
            return show_by_client(data, id)
                .then((response) => {
                    return Promise.resolve(response.data.data)
                })
                .catch(error => {
                    return Promise.reject(error)
                }) 
        }    
    }
})