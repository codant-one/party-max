import { defineStore } from 'pinia';
import { Openai } from '~/api/openai';

export const useOpenaiStores = defineStore('openai', {
    state: () => ({
        data: [] as any[],
    }),
    getters: {
        getData(): any {
            return this.data;
        },
    },
    actions: {
        show(data: object) {
            const { show } = Openai();
            return show(data)
                .then((response) => {
                    return Promise.resolve(response.data);
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        },
    },
});