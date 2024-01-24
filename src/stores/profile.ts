import { defineStore } from 'pinia'
import Profile from '@/api/profile'

export const useProfileStores = defineStore('profile',{
    state: () => ({
        countries: {},
        provinces: {},
        genders: {}
    }),
    getters:{
        getCountries(): any {
            return this.countries
        },
        getProvinces(): any  {
            return this.provinces
        },
        getGenders(): any  {
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
        change_phone(data:object) {
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
        change_avatar(data: object) {       
            return Profile.change_avatar(data)
                .then((response) => {
                    return Promise.resolve(response.data)
                }).catch(error => {
                    return Promise.reject(error)
                })
        },
        fetchCountries(){  
            return Profile.get_countries()
                .then((countries) => {
                    this.countries = countries.data.data
                })
                .catch(error => Promise.reject(error))
            
        },
        fetchProvinces(){
            return Profile.get_provinces()
                .then((provinces) => {
                    this.provinces = provinces.data.data
                })
                .catch(error => Promise.reject(error))
                
        },
        fetchGenders(){

            return Profile.get_gender()
                .then((genders) => {
                    this.genders = genders.data.data
                })
                .catch(error => Promise.reject(error))
                
        }
    }
})