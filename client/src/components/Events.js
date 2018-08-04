import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Events extends Component {
  render() {
    return (
      <div className="events-list-div">
        <br />
        <h2>Events List</h2>

        {this.props.events.map(event => (

          <div key={event.id} className='event-list'>
              <Link to ={`events/${event.id}`}>
                <div key={event.id} >
                  {event.id}
                  <p>{event.event}</p>
                  <p>{event.text}</p>
                  <img src={event.img_url} alt='no pic'/>
                </div>
              </Link>

          </div> // make the whole section of each event clickable
      ))}
    </div>
    )
  }
}
