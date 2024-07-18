import { defineStore } from 'pinia'
import { Cart } from '~/api/cart'

export const useCartStores = defineStore('cart', {
    state: () => ({
        data: Array<Object>(),
        count: 0,
        wholesale: -1
    }),
    getters:{
        getData(): any {
            return this.data
        },
        getCount(): any {
            return this.count
        },
        getWholesale(): any {
            return this.wholesale
        }
    },
    actions: {
        setWholesale(value: any){
            this.wholesale = value
        },
        fetchCart() {   
            if (process.client) {
                let shoppingCart = localStorage.getItem('shoppingCart')
    
                shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []
    
                if (Array.isArray(shoppingCart)) {
                    const productColorIds = shoppingCart.map((item: { product_color_id: number }) => item.product_color_id)
                    const productColorIdsString = productColorIds.join(',')
                    const quantityIds = shoppingCart.map((item: { quantity: number }) => item.quantity)
                    const quantityIdsIdsString = quantityIds.join(',')
                    const wholesaleIds = shoppingCart.map((item: { wholesale: number }) => item.wholesale)
                    const wholesaleIdsString = wholesaleIds.join(',')
                    const params = { product_color_id: productColorIdsString, quantity: quantityIdsIdsString, wholesale:  wholesaleIdsString}
                    const { get } = Cart()  

                    return get(params)
                        .then((response) => {
                            this.data = response.data.data.cart
                            this.count = response.data.data.cart.length

                            if(this.count > 0)
                                this.wholesale = Number(wholesaleIdsString[0])
                            else 
                                this.wholesale = -1

                            return Promise.resolve(response.data.data)
                        })
                        .catch(error => {
                            return Promise.reject(error)
                        }) 
                }
            }
        },
        add(data: any) {
            try {
                if (process.client) {
                    this.count = 0
                    let shoppingCart = localStorage.getItem('shoppingCart')

                    shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []

                    if (!Array.isArray(shoppingCart))
                        return Promise.reject('Shopping cart is not an array')

                    const productIndex = 
                        shoppingCart.findIndex(
                            (item: { product_color_id: number }) => item.product_color_id === data.product_color_id
                        )

                    if (productIndex !== -1)
                        shoppingCart[productIndex].quantity = data.quantity
                    else
                        shoppingCart.push(data)

                    setTimeout(() => {
                        this.count = shoppingCart.length
                    }, 3000)
                   
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

                    return Promise.resolve(shoppingCart)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
        delete(data: any) {
            try {
                if (process.client) {
                    let shoppingCart = localStorage.getItem('shoppingCart')

                    shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []

                    if (!Array.isArray(shoppingCart))
                        return Promise.reject('Shopping cart is not an array')

                    const productIndex = 
                        shoppingCart.findIndex(
                            (item: { product_color_id: number }) => item.product_color_id === data.product_color_id
                        )

                    if (productIndex !== -1)
                        shoppingCart.splice(productIndex, 1)

                    setTimeout(() => {
                        this.count = shoppingCart.length
                    }, 1000)
                   
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

                    return Promise.resolve(shoppingCart)
                }
            } catch (error) {
                return Promise.reject(error)
            }
        },
        refreshData() {
            this.count = 0
        },
        checkAvailability() {  
            if (process.client) {
                let shoppingCart = localStorage.getItem('shoppingCart')
    
                shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []
    
                if (Array.isArray(shoppingCart)) {
                    const productColorIds = shoppingCart.map((item: { product_color_id: number }) => item.product_color_id)
                    const productColorIdsString = productColorIds.join(',')
                    const quantityIds = shoppingCart.map((item: { quantity: number }) => item.quantity)
                    const quantityIdsIdsString = quantityIds.join(',')
                   
                    const params = { product_color_id: productColorIdsString, quantity: quantityIdsIdsString}
                    const { checkAvailability } = Cart()  
      
                    return checkAvailability(params)
                        .then((response) => {
                            return Promise.resolve(response.data.data)
                        })
                        .catch(error => {
                            return Promise.reject(error)
                        }) 
                }
            }
        }
    }


})