import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      pw_digest: '',
      redirectHome: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // will change the state as you type in the input box
  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state);
    this.setState({
      username: '',
      email: '',
      pw_digest: '',
      redirectHome: true
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.handleLogOut();
  }

  render() {
    const selected = this.props.currentUser;
    const details = selected ?
    (<div className="form logout-page"><Link to='/'><button className="button" onClick={this.handleLogout}>Log Out</button></Link></div>) :
    (<form
      onSubmit={this.handleSubmit}
      className="login form"
      method="post">

      {this.state.redirectHome && <Redirect to='/'/>}
      <h2>Log In</h2>
      <label htmlFor="username">
        <input
          placeholder="Username"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.username}
          name="username" />
      </label>
      <br />
      <label htmlFor="Email">
        <input
          placeholder="Email"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.email}
          name="email" />
      </label>
      <br />
      <label htmlFor="password">
        <input
          placeholder="Password"
          type="password"
          onChange={this.handleInputChange}
          value={this.state.pw_digest}
          name="pw_digest" />
      </label>
      <br />
      <input
        className="button"
        type="submit"
        value="Login"
        onSubmit={this.handleSubmit} />
        <br />
        <Link to='/api/auth/register'><p>Not a user yet? Please register.</p></Link>
    </form>)

    return (
      <div>
        {details}
      </div>
    )
  }
}
