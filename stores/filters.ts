import { defineStore } from 'pinia'

export const useFiltersStores = defineStore('filters', {
    state: () => ({
        drawer: false,
        prices: {},
        rating: 5
    }),
    getters:{
        getDrawer(): any {
            return this.drawer
        },
        getPrices(): any {
            return this.prices
        },
        getRating(): any {
            return this.rating
        },
    },
    actions: {
        changeDrawer() {
            this.drawer = !this.drawer       
        },
        changePrices(data: object) {
            this.prices = data
            this.drawer = false
        },
        changeRating(value: any) {
            this.rating = value
            this.drawer = false
        }
    }
})