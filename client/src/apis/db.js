import axios from 'axios';

// create instance of AXIOS that connects to API root address 
export default axios.create({ 
    baseURL: process.env.REACT_APP_baseURL
 });