import { defineStore } from 'pinia'
import Home from '@/api/home'

export const useHomeStores = defineStore('home', {
    state: () => ({
        data: {},
        loading: false
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
        fetchData() {
           
            return Home.home()
                .then((response) => {
                    this.data = response.data.data
                })
                .catch(error => console.log(error))
                .finally(() => {
                    this.setLoading(false)
                })
            
        }
    }
})

