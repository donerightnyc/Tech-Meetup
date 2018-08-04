import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Mapbox from './Mapbox';

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes,
      likeId: '',
      event: Object.assign({
        event: '',
        text: '',
        img_url: ''
      }, props.event)
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.checkiIfLike = this.checkiIfLike.bind(this);
  }

  handleLike() {
    const like = {
      "liker_id": this.props.user.id,
      "events_id": this.props.event.id
    }
    this.props.handleLike(like)
  }
  handleDislike() {
    this.props.handledisLike(this.state.likeId)
  }
  editEvent(id) {
    this.props.history.push(`/api/events/${id}`);
  }
  //this will be accessed with the onClick event on EditEvent.js
  checkiIfLike() {
    const likeIdVar = (this.state.likes).filter(t => (t.liker_id === this.props.user.id));
    const likeIdVarCheck = (!likeIdVar[0]) ? null : likeIdVar[0].id;
    console.log('likeIdVarcheck', likeIdVarCheck);
    (likeIdVarCheck === null) ? console.log('no change') : (this.setState({ likeId : likeIdVarCheck }))
    console.log(this.state.likeId)
  }

  componentDidMount() {
    this.checkiIfLike();
  }

  render() {
    const { event, text, id, img_url, location } = this.state.event;


    const likedByMe = (this.state.likeId > 0) ? "Dislike" : "like";

    const loaded = this.state.likes ? (
      <div className="event-form-div">
        <div className='form text-event'>
          <img src={img_url} className='img-event'/>
          <h3>Name:</h3>
          <p className="text-event">{event}</p>
          <h3>Description:</h3>
          <p className="text-event">{text}</p>
          <h3>Location:</h3>
          <p className="text-event">{location}</p>
        </div>
        <Mapbox />
        <hr />

        <button className="button" onClick={(likedByMe === "Unlike") ? this.handleDislike : this.handleLike}>{likedByMe} ({this.state.likes.length}♡)</button>

        <Link to={`/api/events/${id}/edit`}>
        <button className='button'>Edit</button>
        </Link>
        <Link to="/api/events">
        <button className='button' onClick={this.props.del} > DELETE</button>
        </Link>
      </div>
    ) : (
      <div>
        <h1>Loading . . . </h1>
      </div>
    );
    return (
      <div>
        {loaded}
      </div>
    )
  }
}
