import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class EventForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectHome: false,
			event: Object.assign({
				event: '',
				text: '',
				img_url: '',
				location: '',
				user_id: this.props.user.id
			}, props.event)
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState((prevState, props) => ({
			event: {
				...prevState.event,
				[name]: value
			}
		}))
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.func(this.state.event);
		window.location.reload();
		this.setState({
			redirectHome: true
		});
	}
	render() {
		console.log(this.state.event);
		console.log(this.props.user);
		const { event, text, location, id, img_url} = this.state.event
		return (
			<div className="event-form-div">

				<h1>{id ? 'Edit this ' : 'Create an '}  event, {this.props.user.username}!</h1>

				<form onSubmit={this.handleSubmit.bind(this)} className={id ? 'edit' : 'create'}>
					{this.state.redirectHome && <Redirect to='/api/events' />}
					<label>
						<h3>Event</h3>
						<textarea rows='3' cols ='70'
							name='event'
							value={event}
							onChange={this.handleChange.bind(this)} />
					</label><br/>

					<label>
						<h3>Text</h3>
						<textarea rows='6' cols='70'
							name='text'
							value={text}
							onChange={this.handleChange.bind(this)} />
					</label><br/>

					<label>
						<h3>Location</h3>
						<textarea rows='2' cols='70'
							name='location'
							value={location}
							onChange={this.handleChange.bind(this)} />
					</label><br/>

					<label>
						<h3>Image URL</h3>
						<textarea rows='2' cols ='70'
							name='img_url'
							value={img_url}
							onChange={this.handleChange.bind(this)} />
					</label><br/>

					<button className='button' type='submit'>{id ? 'Edit' : 'Create'}</button>

				</form>
			</div>
		)
	}
}
