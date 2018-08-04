import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import EventForm from './EventForm';

export default class CreateEvent extends Component {
		render(){
			const loggedIn = this.props.user;
			const logConfirm = loggedIn ? (

				<EventForm
					id='create'
					func={this.props.onSubmit}
					user={this.props.user} />
			) : (<Link to='/api/auth/login'><h1 class="login-prompt">Please log in!</h1></Link>);
			// if the user is logged in, the form shows up when when clicking on "new" to create an event. otherwise, it asks the user to log in

		return(
			<div>
				{logConfirm}
			</div>
		)
	}
}
