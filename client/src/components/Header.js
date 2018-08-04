import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    const loggedIn = this.props.user;
    const logConfirm = loggedIn ? "Logout" : "Login"
    return (
      <nav className="nav-bar">
        <ul>
          <Link to='/'>
            <img className="logo" src='https://files.slack.com/files-pri/T0351JZQ0-FAMD93QBG/logomakr_9ufv8t.png' alt="h@ckup"/>
          </Link>
          <Link to='/'>
            <li className="nav-li">Home</li>
          </Link>

          <Link to='/api/events'>
            <li className="nav-li">EVENTS</li>
          </Link>

          <Link to='/api/events/new'>
            <li className="nav-li">New</li>
          </Link>

          <Link to='/api/auth/login'>
            <li className="nav-li">{logConfirm}</li>
          </Link>

          <Link to='/api/auth/register'>
            <li className="nav-li">Register</li>
          </Link>

        </ul>
      </nav>
    )
  }
}
