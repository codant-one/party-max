import axios from '@axios'

class Favorite
{

    show_favorites(id: Number)
    {
        return axios.get(`favorites/show/${id}`)
    }

    add_favorite(data: object)
    {
        return axios.post('favorites/add', data)
    }

    delete_favorite(data: object)
    {
        console.log('enviando',data)
        return axios.post('favorites/delete',data)
    }
}

const favorite = new Favorite();

export default favorite;