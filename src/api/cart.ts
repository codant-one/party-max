import axios from '@axios'

class Cart
{

    show_cart(id: Number)
    {
        return axios.get(`shopping-cart/show/${id}`)
    }

    add_cart(data: object)
    {
        return axios.post('shopping-cart/add', data)
    }

    delete_cart(data: object)
    {
        return axios.delete('shopping-cart/delete',data)
    }
}

const cart = new Cart();

export default cart;