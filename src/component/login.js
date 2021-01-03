import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import login, {getCurrentUser} from '../services/authService';
import {Redirect} from"react-router-dom"

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit= async ()=>{
    try{
      const {data} =this.state
      await login(data.username,data.password);
      const {state} = this.props.location
      window.location = state ? state.from.pathname : "/" ;
    }
    catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to="/" />
    return (
      <div className="row">
        <form className="form-group col-md-6" onSubmit={this.handleSubmit}>
        {this.renderInput("username","Username")}
        {this.renderInput("password","Password","password")}
        {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default Login;
