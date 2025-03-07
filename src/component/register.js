import Joi from "joi-browser";
import React from "react";
import Form from "./form";
import register from '../services/userService'
import {loginWithJwt} from "../services/authService";
class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name:Joi.string().required().label("Name")
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers['x-auth-token'])
      window.location = '/';
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        const errors ={...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }
  };
  render() {
    return (
      <div className="row">
        <form className="form-group col-md-6" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password","password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
