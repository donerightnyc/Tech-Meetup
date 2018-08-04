import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt from 'jwt-js';
import Events from './components/Events';
import Navbar from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Event from './components/Event';
import EditEvent from './components/EditEvent';
import CreateEvent from './components/CreateEvent';
// import EventForm from './components/EventForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Mapbox from './components/Mapbox';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentUser: null,
      likes: []
    }
    this.findEvent = this.findEvent.bind(this);
    this.findLikes = this.findLikes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }
//fetch calls for events
  fetchEvents() {
    fetch('/api/events')
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();
      }).then(data => this.setState ({
          events: data.data
      })).catch(err => console.log(`error: ${err}`))
  }

  findEvent(id) {
    const event = this.state.events.filter(t => (t.id === parseInt(id, 10)));
    return event[0];
  }

  createEvent(event) {
    fetch('/api/events/new', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resBody => {
      this.setState((prevState, props) => {
        return {
          events: prevState.event.concat(resBody.data)
        }
      })
    })
  }

  updateEvent(event) {
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    };
    const URL = `/api/events/${event.id}`;
    fetch(URL, options).then(resp => {
      if (!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
  }

  deleteEvent(id) {
    fetch(`/api/events/${id}`, {
      method: 'DELETE'
    })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState((prevState, props) => {
        return {
          events: prevState.events.filter(event => event.id !== id)
        }
      })
    })
  }
  //fetch calls for likes
  fetchLikes() {
    fetch('/api/like')
      .then(resp => {
        if (!resp.ok) {
          throw Error('oops: ', resp.message);
        }
        return resp.json();
      }).then(data => this.setState ({
          likes: data.data
      })).catch(err => console.log(`error: ${err}`))
  }

  findLikes(id) {
    const like = this.state.likes.filter(t => (t.events_id === parseInt(id, 10)));
    return like;
  }
  deleteLike(id) {
    fetch(`/api/like/${id}`, {
      method: 'DELETE'
    })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusMessage);
      return resp.json();
    })
    .then(respBody => {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes.filter(like => like.id !== id)
        }
      })
    })
  }
  createLike(like) {
    fetch('/api/like/new', {
      method: 'POST',
      body: JSON.stringify(like),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resBody => {
      console.log('RESPBODY: ', resBody)
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes.concat(resBody.data)
        }
      })
    })
  }
  //auth section
  checkToken() {
    const authToken = localStorage.getItem('authToken');
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.mesage);
      return resp.json();
    })
    .then(respBody => {
      this.setState({
        currentUser: respBody.user
      })
    })
    .catch(err => {
      console.log('not logged in');
      localStorage.removeItem('authToken');
      this.setState({
        currentUser: null
      })
    })
  }

  loginRequest(creds) {
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(respBody => {
        console.log(respBody);
        localStorage.setItem('authToken', respBody.token);
        this.setState({
          currentUser: jwt.decodeToken(respBody.token).payload
        })
      })
  }

  registerRequest(creds) {
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => {
        if (!resp.ok) throw new Error(resp.statusMessage);
        return resp.json();
      })
      .then(respBody => {
        console.log(respBody);
        localStorage.setItem('authToken', respBody.token);
        this.setState({
          currentUser: jwt.decodeToken(respBody.token).payload
        })
      })
  }

  handleLogin(creds) {
    this.loginRequest(creds);
  }

  handleRegister(creds) {
    this.registerRequest(creds);
  }

  handleDelete(id) {
    this.deleteEvent(id);
    window.location.reload();
  }

  handleLogout() {
    this.setState({currentUser: null});
  }
  handleDislike(id) {
    this.deleteLike(id);

    // console.log('link to app.js HDL works: ', id)
    // window.location.reload();
  }
  handleLike(like) {
    this.createLike(like);
    window.location.reload();
  }
  componentDidMount() {
    this.fetchEvents();
    this.checkToken();
    this.fetchLikes();
  }

  render() {
    console.log(this.state.likes)
    return (
      <div className="App">
        <Navbar user={this.state.currentUser}/>

        <Switch>

          <Route exact path='/api/events/new'
          component={() => (
            <CreateEvent
              onSubmit={this.createEvent.bind(this)}
              user={this.state.currentUser}
            /> )} />

          <Route exact path='/api/events/:id/edit' component={(props) => (
            <EditEvent
              {...props}
              event={this.findEvent(props.match.params.id)}
              onSubmit={this.updateEvent.bind(this)}
               user={this.state.currentUser}
            /> )} />

          <Route path='/api/events/:id' component={(props) => (
            <Event
              {...props}
              task={this.findEvent(props.match.params.id)}
              del={() => this.handleDelete(props.match.params.id)}
              likes={this.findLikes(props.match.params.id)}
              user={this.state.currentUser}
              handledisLike={(a) => this.handleDislike(a)}
              handleLike={(a) => this.handleLike(a)}
            /> )} />

          <Route exact path='/api/events' component={(props) => (
              <Events
                {...props}
                events={this.state.events}
              /> )} />

          <Route exact path='/api/auth/login' component={(props) => (
            <LoginForm
              {...props}
                handleLogin={this.handleLogin}
                handleLogOut={this.handleLogout}
                currentUser={this.state.currentUser}
            /> )} />

          <Route exact path='/api/auth/register' component={(props) => (
            <RegisterForm
              {...props}
                handleRegister={this.handleRegister}
            /> )} />

          <Route path='/' component={(props) => (
            <Home
              {...props}
              name={this.state.currentUser}
              events={this.state.events}
              likes={this.state.likes}
            /> )} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
