import { defineStore } from 'pinia'
import DocumentTypes from '@/api/document-types'

export const useDocumentTypesStores = defineStore('document-types',{

    state: () => ({
        data: {}
    }),
    getters:{
        getData(): any {
            return this.data
        }
    },
    actions: {
        fetchDocumentTypes() {
            return DocumentTypes.get()
                .then((response) => {
                    this.data = response.data.data
                }).catch(error => {
                    return Promise.reject(error)
                })            
        }
    }
})