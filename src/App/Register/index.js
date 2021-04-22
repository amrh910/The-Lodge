import React from 'react';
import './style.css'
import { Redirect } from 'react-router-dom'


class Register extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			count: 1,
			firstName: "",
			lastName: "",
			email: "",
			formValid:true,
			eventsPageRedirect:false,
			firstName: "",
			lastName: "",
			email: "",
			eventName: this.props.match.params.eventName,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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



	onclick(type){
    this.setState(prevState => {
      return {count: type ==='add' ? prevState.count + 1: prevState.count - 1}
    })
  }

	handleSubmit(event){
		event.preventDefault();
		this.props.addtoAttendeeList(this.state);
		//Form validation
		if( this.state.firstName === "" ||
			this.state.lastName === "" ||
			this.state.email === ""){

			this.setState({formValid:false});
		}
		else{
			this.setState({eventsPageRedirect:true})
		}
	}

    render() {
        return (
            <div className="container">
				<h1 className="center">{this.state.eventName}</h1>
			  	{!this.state.formValid &&
					<div className="alert alert-danger" role="alert">
				  		Please fill out all the information.
					</div>
				}
	            <form onSubmit={this.handleSubmit}>
					<div className="form-group row">
						<label
							className="col-sm-2 col-form-label"
							htmlFor="first"
						>First Name:</label>
						<input
							className="form-control col-10"
							type="text"
							id="firstName"
							name="firstName"
							placeholder="First Name"
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group row">
						<label
							className="col-sm-2 col-form-label"
							htmlFor="lastName"
						>Last Name:</label>
						<input
							className="form-control col-10"
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Last Name"
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group row">
						<label
							className="col-sm-2 col-form-label"
							htmlFor="email"
						>Email:</label>
						<input
							className="form-control col-10"
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group row">
						<label
							className="col-sm-2 col-form-label"
							htmlFor="count"
						>People In Party:</label>
						<input
							className="form-control col-10"
							type="number"
							id="count"
							name="count"
							placeholder="1"
							step="1"
							min="1"
							max="20"
							value={this.state.count}
							onChange={this.handleChange}
						/>
					</div>
					<button type="button" className="btn btn-lavender" onClick={this.handleSubmit} >Register</button>

				</form>
				{this.state.eventsPageRedirect && (
	                <Redirect to={{
	                	pathname: '/events',
	                	state: {count: this.state.count}
	                }}/>
	            )}
			</div>
        );
    }
}

export default Register;
