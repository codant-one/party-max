import { defineStore } from 'pinia'
import Profile from '@/api/profile'

export const useProfileStores = defineStore('profile',{
    state: () => ({
        countries: {},
        provinces: {},
        genders: {},
        user: null
    }),
    getters:{
        getUser(): any {
            return this.user
        },
        getCountries() {
            return this.countries
          },
        getProvinces() {
            return this.provinces
        },

        getGenders() {
            return this.genders
          }
        
    },
    actions: {
    change_password(data: object) {
            
        return Profile.change_password(data)
            .then((response) => {
                return Promise.resolve(response.data)
            }).catch(error => {
                return Promise.reject(error)
            })
    },

    change_phone(data:object){

        return Profile.change_phone(data)
            .then((response) => {
                return Promise.resolve(response.data)
            }).catch(error => {
                return Promise.reject(error)
            })

    },

    update_profile(data: object) {
            
        return Profile.update_profile(data)
            .then((response) => {
                return Promise.resolve(response.data)
            }).catch(error => {
                return Promise.reject(error)
            })
    },

    setLoading(payload){
        this.loading = payload
    },

    fetchCountries(){
        this.setLoading(true)

        return Profile.get_countries()
            .then((countries) => {
                this.countries = countries.data.data
            })
            .catch(error => Promise.reject(error))
            .finally(() => {
                this.setLoading(false)
            });
    },

    fetchProvinces(){
        this.setLoading(true)

        return Profile.get_provinces()
            .then((provinces) => {
                this.provinces = provinces.data.data
            })
            .catch(error => Promise.reject(error))
            .finally(() => {
                this.setLoading(false)
            });
    },

    fetchGenders(){
        this.setLoading(true)

        return Profile.get_gender()
            .then((genders) => {
                this.genders = genders.data.data
            })
            .catch(error => Promise.reject(error))
            .finally(() => {
                this.setLoading(false)
            });
    }
}
})