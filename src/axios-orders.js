import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e3851.firebaseio.com/'
});

export default instance;