import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-react-5d39a.firebaseio.com/'
})

export default instance;