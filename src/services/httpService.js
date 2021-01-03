const axios = require('axios');
const {toast} = require("react-toastify")
const log =require("./logService")

axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

//Access-Control-Allow-Origin
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null,error=>{
    const expectedError = error.response && error.response.status >= 400 && error.response.status<500;
    if (!expectedError){
        log(error)
        toast("an unexpected error occured",{
            position:toast.POSITION.TOP_RIGHT
        });
    }

    return Promise.reject(error);
});

function setJwt(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
  } 

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    delete:axios.delete,
    setJwt

}