import http from './httpService';
import jwtDecode from 'jwt-decode'


export default async function login (username,password){
    const jwt = await http.post('/login',{email:username,password});
    localStorage.setItem('token',jwt.data)
}

export function logout (){
    localStorage.removeItem("token");
}
export function loginWithJwt(jwt){
    localStorage.setItem("token",jwt)
}
export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    } catch (error) {
        return null
    }
}

export function register(){

}