import React  from "react";
import {Route,Redirect} from "react-router-dom"
import  {getCurrentUser} from "../services/authService"
const ProtectedRoute = ({ component : Component,render ,...rest}) =>(
        <Route
            {...rest}
            render={ props => {
                if (!getCurrentUser()) return <Redirect to={{
                    pathname:"/login",
                    state:{
                        from:props.location
                    }
                }} />
                return Component ? <Component {...props} /> : render()
            }}
        />
    )


export default ProtectedRoute;