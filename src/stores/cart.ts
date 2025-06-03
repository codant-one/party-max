import { defineStore } from 'pinia'
import Cart from '@/api/cart'

export const useCartStores = defineStore('cart', {
    state: () => ({
        data: Array<Object>(),
        count: 0,
        wholesale: -1,
        CURRENT_VERSION: '2.0.0'
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
        setWholesale(value: any) {
            this.wholesale = value
        },
        fetchCart() {
            
            const storedVersion = localStorage.getItem('shoppingCartVersion');

            if (!storedVersion || storedVersion !== this.CURRENT_VERSION) {
                localStorage.removeItem('shoppingCart');
                localStorage.setItem('shoppingCartVersion', this.CURRENT_VERSION);

                this.wholesale = -1
            }

            let shoppingCart = localStorage.getItem('shoppingCart')
    
            shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []
    
            if (Array.isArray(shoppingCart)) {
                const productColorIds = shoppingCart.map((item: { product_color_id: number }) => item.product_color_id)
                const productColorIdsString = productColorIds.join(',')
                const quantityIds = shoppingCart.map((item: { quantity: number }) => item.quantity)
                const quantityIdsIdsString = quantityIds.join(',')
                const servicesIds = shoppingCart.map((item: { service_id: number }) => item.service_id)
                const servicesIdsString = servicesIds.join(',')
                const cakeSizeIds = shoppingCart.map((item: { cake_size_id: number }) => item.cake_size_id)
                const cakeSizeIdsString = cakeSizeIds.join(',')
                const dateIds = shoppingCart.map((item: { date: string }) => item.date)
                const dateIdsString = dateIds.join(',')
                const flavorIds = shoppingCart.map((item: { flavor_id: number }) => item.flavor_id)
                const flavorIdsString = flavorIds.join(',')
                const fillingIds = shoppingCart.map((item: { filling_id: number }) => item.filling_id)
                const fillingIdsString = fillingIds.join(',')
                const fileIds = shoppingCart.map((item: { order_file_id: number }) => item.order_file_id)
                const fileIdsString = fileIds.join(',')
                const typeIds = shoppingCart.map((item: { type: number }) => item.type)
                const typeIdsString = typeIds.join(',')
                const wholesale = shoppingCart.map((item: { wholesale: number }) => item.wholesale)[0] ?? -1

                const wholesaleIds = shoppingCart.map((item: { wholesale: number }) => item.wholesale)
                const wholesaleIdsString = wholesaleIds.join(',')
                
                const params = { 
                    service_id: servicesIdsString,
                    cake_size_id: cakeSizeIdsString,
                    flavor_id: flavorIdsString,
                    filling_id: fillingIdsString,
                    order_file_id: fileIdsString,
                    date: dateIdsString,
                    product_color_id: productColorIdsString, 
                    quantity: quantityIdsIdsString, 
                    wholesale:  wholesaleIdsString,
                    type: typeIdsString
                }

                return Cart.get(params)
                    .then((response) => {
                        this.data = response.data.data.cart
                        this.count = response.data.data.cart.length
                        
                        if(this.count > 0)
                            this.wholesale = wholesale
                        else 
                            this.wholesale = -1

                        return Promise.resolve(response.data.data)
                    })
                    .catch(error => {
                        return Promise.reject(error)
                    }) 

            }
            
        },
        add(data: any) {
            try {

                this.count = 0
    
                let shoppingCart = localStorage.getItem('shoppingCart')

                shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []

                if (!Array.isArray(shoppingCart))
                    return Promise.reject('Shopping cart is not an array')

                var index = -1

                if(data.type === 0)
                    index = 
                        shoppingCart.findIndex(
                            (item: { product_color_id: number }) => item.product_color_id === data.product_color_id
                        )
                else 
                    index = 
                        shoppingCart.findIndex(
                            (item: { service_id: number }) => item.service_id === data.service_id
                    )

                if (index !== -1) {
                    if(data.type === 0)
                        shoppingCart[index].quantity = data.quantity
                    else {
                        shoppingCart[index].quantity = data.quantity
                        shoppingCart[index].cake_size_id = data.cake_size_id
                        shoppingCart[index].flavor_id = data.flavor_id
                        shoppingCart[index].filling_id = data.filling_id
                        shoppingCart[index].order_file_id = data.order_file_id
                        shoppingCart[index].date = data.date
                    }
                } else
                    shoppingCart.push(data)

                setTimeout(() => {
                    this.count = shoppingCart.length
                }, 3000)
                   
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

                return Promise.resolve(shoppingCart)
                
            } catch (error) {
                return Promise.reject(error)
            }
        },
        delete(data: any) {
            try {

                let shoppingCart = localStorage.getItem('shoppingCart')

                shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []

                if (!Array.isArray(shoppingCart))
                    return Promise.reject('Shopping cart is not an array')

                var index = -1

                if(data.type === 0)
                    index = 
                        shoppingCart.findIndex(
                            (item: { product_color_id: number }) => item.product_color_id === data.product_color_id
                        )
                else 
                    index = 
                        shoppingCart.findIndex(
                            (item: { service_id: number }) => item.service_id === data.service_id
                        )
                    
                if (index !== -1)
                    shoppingCart.splice(index, 1)

                setTimeout(() => {
                    this.count = shoppingCart.length
                    
                    if(this.count === 0) {
                        this.wholesale = -1
                    }
                }, 1000)
                   
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

                return Promise.resolve(shoppingCart)
                
            } catch (error) {
                return Promise.reject(error)
            }
        },
        refreshData() {
            this.count = 0
            this.wholesale = -1
        },
        checkAvailability(params: object) { 
            
            let shoppingCart = localStorage.getItem('shoppingCart')
    
            shoppingCart = shoppingCart ? JSON.parse(shoppingCart) : []
    
            if (Array.isArray(shoppingCart)) {
                const productColorIds = shoppingCart.map((item: { product_color_id: number }) => item.product_color_id)
                const productColorIdsString = productColorIds.join(',')
                const quantityIds = shoppingCart.map((item: { quantity: number }) => item.quantity)
                const quantityIdsIdsString = quantityIds.join(',')
                   
                const params = { product_color_id: productColorIdsString, quantity: quantityIdsIdsString}
      
                return Cart.checkAvailability(params)
                    .then((response) => {
                        return Promise.resolve(response.data.data)
                    })
                    .catch(error => {
                        return Promise.reject(error)
                    }) 
            }
        }
    }
})