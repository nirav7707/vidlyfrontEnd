import {logout} from '../services/authService'
import {Component} from 'react'

class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
