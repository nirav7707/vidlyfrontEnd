import http from './httpService';

export default function(user){
    return http.post("/users",{
        email:user.username,
        password:user.password,
        name:user.name
    });
}