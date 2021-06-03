import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nozama-backend.herokuapp.com/' //   The API (cloud function) URL
});

export default instance
