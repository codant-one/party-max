import { defineStore } from 'pinia'
import { Countries } from '~/api/countries'

export const useCountriesStores = defineStore('countries', {
    state: () => ({
        countries: null
    }),
    getters:{
        getCountries(): any {
            return this.countries
        }
    },
    actions: {
        getAll() {
            const { getAll } = Countries()
            return getAll()
                .then((response) => {
                    this.countries = response.data.data
                    return Promise.resolve(response.data.data)
                }).catch(error => {
                    return Promise.reject(error)
                })            
        },
    }
})