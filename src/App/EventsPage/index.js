import Event from '../Event';
import React from 'react';

class EventsPage extends React.Component {

		constructor(props){
			super(props);
			this.state = {
				sortVal: '',
        		query: '',
			};
			this.handleChange = this.handleChange.bind(this);
		}

	handleChange(e) {
		const tempVar = e.target.value;


    if (e.target.type === "text") {
      this.setState({
        query: tempVar
      })
    } else {
      this.setState ({
        sortVal: tempVar
      });
    }
	}

  render() {
    return (
      <div className="container">
      <input className="" type="text" placeholder="search" onChange={this.handleChange} value={this.state.query}/>
        <p align="right">Sort By: &nbsp;
          <select onChange={this.handleChange}>
            <option value="newest">Newest</option>
            <option value="alpha">A-Z</option>
            <option value="date">Date</option>
          </select>
        </p>
    		{Object.keys(this.props.events)
    			.map((eventName) => this.props.events[eventName])
    			.sort((eventA, eventB) => {
          	console.log("okay");
  					switch(this.state.sortVal) {
  						case 'date':
  							return eventA.startDate.localeCompare(eventB.startDate)
				   		case 'alpha':
								return eventA.eventName.localeCompare(eventB.eventName)
							case 'newest':
								return eventA.key < eventB.key
							default:
								return eventA.startDate.localeCompare(eventB.startDate)
				  		}
    				}
    			)
          .filter((event, query, eventName) => {
            query = this.state.query.toLowerCase();
            eventName = event.eventName.toLowerCase();
            return eventName.indexOf(query) > -1;
          })
			    .map((event, index) => {
					  return <Event
	                  key={index}
	                  index={index}
	                  eventName={event.eventName}
	                  eventDescription={event.eventDescription}
	                  startDate={event.startDate}
	                  latitude={event.latitude}
	                  longitude={event.longitude}
	                  userEmail={this.props.userEmail}
                  	{ ...this.props }
                  	/>;
  				})
			  }
		  </div>
		)
	}
}
export default EventsPage;
