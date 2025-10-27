import { defineStore } from 'pinia'

export const useCategoriesStores = defineStore('categories', {
    state: () => ({
       type: null,
       category: null,
       subcategory: null,
       fathercategory: null,
       colorId: null
    }),
    getters:{
        getType(): any {
            return this.type
        },
        getCategory(): any {
            return this.category
        },
        getSubcategory(): any {
            return this.subcategory
        },
        getFathercategory(): any {
            return this.fathercategory
        },
        getColorId(): any {
            return this.colorId
        }
    },
    actions: {
        setType(value: any){
            this.type = value
        },
        setCategory(value: any){
            this.category = value
        },
        setSubcategory(value: any){
            this.subcategory = value
        },
        setFathercategory(value: any){
            this.fathercategory = value
        },  
        setColorId(value: any){
            this.colorId = value
        },
        reset(){
            this.type = null
            this.category = null
            this.subcategory = null
            this.fathercategory = null
        },
        resetColorId(){
            this.colorId = null
        }
    }
})