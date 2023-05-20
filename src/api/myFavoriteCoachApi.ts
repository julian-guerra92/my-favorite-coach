
import axios from 'axios';

const myFavoriteCoachApi = axios.create({
   baseURL: 'http://localhost:8081/api'
})

export default myFavoriteCoachApi;