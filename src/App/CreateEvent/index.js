import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './style.css'

import 'react-datepicker/dist/react-datepicker.css';

class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: moment().format(),
			eventName: "",
			eventDescription: "",
			latitude: null,
			longitude: null,
			isGeocoding: false,
			errorMessage: '',
			address: '',
			formValid : true,
			userId: this.props.userId,
		};

		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeDate(date){
		this.setState({
			startDate: date.format()
		});
	}

	handleChange(event) {
		event.preventDefault();

		const inputName = event.target.name;
		const inputValue = event.target.value;

		const state = {};

		state[inputName] = inputValue;
		this.setState({
			[inputName]: inputValue
		});
	}



	handleSubmit(event) {
		event.preventDefault();

		//Form validation
		if( this.state.eventName === "" ||
			this.state.eventDescription === "" ||
			this.state.latitude === null ||
			this.state.longitude === null){

			this.setState({formValid:false});
		}
		else{
			this.props.addtoEvents(this.state);
			this.props.history.push('/events')
		}
	}

	// GMaps AutoComplete methods
  handleAddressChange = (address) => {
    this.setState({
      address,
    });
  }

  handleSelect = (address) => {
    this.setState({ isGeocoding: true });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        // console.error('Error', error);
      });
  }
	// End of GMaps AutoComplete methods

	render() {
		const { address, isGeocoding, errorMessage} = this.state;

		return(
			<div className = "container" style={{width:'50%','minWidth':'50%', 'borderLeft':'1px solid #D8D8D8', 'borderRight':'1px solid #D8D8D8', 'borderBottom':'1px solid #D8D8D8', 'borderTop':'1px solid #D8D8D8'}}>
				<br/>
				<h2 className ="center" style={{color:'#450045'}}>New Event</h2>
				<br/>
				{!this.state.formValid &&
					<div className="alert alert-danger" role="alert">
				  		Please fill out all the information.
					</div>
				}
				<form onSubmit={this.handleSubmit} style={{'textAlign':'center'}}>
					<div className="form-group row">
						<input
							className="form-control col-10"
							type="text"
							name="eventName"
							id="event-name"
							placeholder="Event name..."
							value={this.state.eventName}
							onChange={this.handleChange}
							style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
						/>
					</div>
					<div className="form-group row">
						<textarea
							className="form-control col-10"
							type="text"
							name="eventDescription"
							id="description"
							placeholder="Description..."
							value={this.state.eventDescription}
							onChange={this.handleChange}
							style={{'font-size':'16px', overflow:'auto', margin:'auto', padding:'6px', 'vertical-align':'middle', height:100}}
						/>
					</div>

					<div className="form-group row" style={{'font-size':'16px', margin:'auto', padding:'6px', display:'inline-block', 'vertical-align':'middle'}}>
						<DatePicker
							selected={moment(this.state.startDate)}
							onChange={this.handleChangeDate}
							minDate={moment()}
						/>
					</div>

					<div className="form-group row" style={{'font-size':'16px', margin:'auto', padding:'6px', display:'inline-block', 'vertical-align':'middle'}}>
						<PlacesAutocomplete
		          value={address}
		          onChange={this.handleAddressChange}
		          onSelect={this.handleSelect}
		        >
		          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
		            <div>
		              <input
		                {...getInputProps({
		                  placeholder: 'Search Places ...',
		                  className: 'location-search-input'
		                })}
		              />
		              <div className="autocomplete-dropdown-container" style={{'borderLeft':'1px solid #D8D8D8', 'borderRight':'1px solid #D8D8D8', 'borderBottom':'1px solid #D8D8D8', 'borderTop':'1px solid #D8D8D8'}}>
		                {suggestions.map(suggestion => {
		                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
		                  // inline style for demonstration purpose
		                  const style = suggestion.active
		                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
		                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
		                  return (
		                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
		                      <span>{suggestion.description}</span>
		                    </div>
		                  )
		                })}
		              </div>
		            </div>
		          )}
		        </PlacesAutocomplete>
					</div>
					<button className="btn btn-lavender btn-lg" type="submit">Create Event</button>
				</form>
				<br/>
			</div>
		);
	}
}

export default CreateEvent;
