import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://riskassessmentapp.firebaseio.com/'
});

export default instance;