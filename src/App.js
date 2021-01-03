import React, { Component } from "react";
import {   Redirect, Route, Switch } from "react-router-dom";
import Customer from "./component/customer";
import Login from "./component/login";
import Movie from "./component/movieComponent";
import Movieform from "./component/MovieForm";
import Navbar from "./component/navbar";
import Register from "./component/register";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./App.css";
import Logout from "./component/logout";
import {getCurrentUser} from "./services/authService";
import ProtectedRoute from "./component/protectedRoute";

class App extends Component{
  state = {}

  componentDidMount(){
    const user = getCurrentUser();
    this.setState({user});
  };
  render(){
    return (
      <div className="App">
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
        <Navbar user={this.state.user} />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute path="/customer" component={Customer} />
          <ProtectedRoute path="/movie/:id"
            component = {Movieform}
          />
          <Route path="/movies" render={props => <Movie {...props} user={this.state.user} />} />
          <Redirect to="/movies" />
        </Switch>
      </div>
    );
  }
}


export default App;
