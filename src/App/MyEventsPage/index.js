import React, { Component } from 'react';
import EventsPage from '../EventsPage';
import {base} from '../../base';

class MyEventsPage extends Component {
  constructor() {
    super();

    this.state={
      // attendeeList:[],
      events:[],
    }
  }

componentDidMount() {
  this.eventsRef = base.syncState('events', {
      context: this,
      state: 'events',
      asArray: true,
      queries: {
        orderByChild: 'userId',
        equalTo: this.props.userId,
      }
  });
}

  componentWillUnmount() {
      base.removeBinding(this.eventsRef);
  }

  render() {
    return (
      <div>
        <h1 className="center">
          My Events
        </h1>
        <EventsPage showEmail={true} events={this.state.events} { ...this.props }/>
        {this.state.events.length === 0 && 
          <h1 className="center">
            No Events Found
            To create a Event, Visit the Create Events tab
          </h1>
        }
        
      </div>
    );
  }
}

export default MyEventsPage;