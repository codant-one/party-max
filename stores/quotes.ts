import { add } from "date-fns";
import { defineStore } from "pinia";
import { Quotes } from "~/api/quotes";

export const useQuotesStores = defineStore("quotes", {

  state: () => ({
    data: [] as any[],
  }),
  getters: {
    getData(): any {
      return this.data;
    },
  },
  actions: {
    addQuote(data: object) {
      const { create } = Quotes();
      return create(data)
        .then((response) => {
          this.data.push(response.data.data.quote);
          return Promise.resolve(response.data.data.quote);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    showQuote(id: Number) {
      const { show } = Quotes();
      return show(id)
        .then((response) => {
          this.data = response.data.data.quote;
          return Promise.resolve(response.data.data.quote);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  }

});