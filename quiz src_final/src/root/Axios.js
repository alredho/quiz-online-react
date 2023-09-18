
import axios from 'axios';

let Axios = axios.create({
  baseURL: 'https://quizserver.000webhostapp.com',
  timeout: 10000,
});


export default Axios;