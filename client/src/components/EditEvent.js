import React, { Component } from 'react';
import EventForm from './EventForm';

export default class EditEvent extends Component {
  render() {
    return (
      <div>
        <h1>EditEvent # {this.props.event.id}</h1>
        <EventForm
          event={this.props.event} 
          id='edit'
          func={this.props.onSubmit}
          user={this.props.user}
        />
      </div> //EventForm.js contains the forms used to edit and create events
    )
  }
}
