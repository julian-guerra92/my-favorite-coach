
import axios from 'axios';

const myFavoriteCoachNextApi = axios.create({
   baseURL: '/api'
})

export default myFavoriteCoachNextApi;