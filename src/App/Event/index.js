import React from 'react';
import moment from 'moment';
import Gmap from '../Map';
import { button } from 'bootstrap';
import { Redirect, Link } from 'react-router-dom';

import {
  DateBox,
  DateWord,
  TitleText,
} from './styled';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(this.props.startDate).format('MMM D'),
      lat: this.props.latitude,
      long: this.props.longitude,
      collapsed: this.props.focused ? 'collapse show' : 'collapse',
      showEmail: this.props.showEmail ? this.props.showEmail : false,
      eventsPageRedirect: false,
      eventName: "",
      count: 0,
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

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      eventsPageRedirect:true,
      eventName:this.props.eventName,
    });
  }


  render() {
        return (
          <div className="card">
            <div className="card-header" data-toggle="collapse" data-target={'#'+this.props.index} aria-expanded="false">
              <DateBox> <DateWord style={{'font-size':'small'}}> {moment(this.props.startDate).format('MMM D')} </DateWord> </DateBox>
              <TitleText onChange={this.handleChange} location={this.props.location} name="eventName" > {this.props.eventName} </TitleText>
            </div>
            <div className={`${this.state.collapsed} multi-collapse`} id={this.props.index}>
              <div className="card card-body">
                  <div className="card card-body" style={{overflow:'auto'}}>
                    <div align="right"><Gmap lat={this.state.lat} long={this.state.long}/></div>
                    <p className="card-text" style={{position:'absolute', top:10, 'padding-right':260, 'word-break':'break-word'}}> {this.props.eventDescription}</p>
                    <h1 className="bg-light border pl-4" data-toggle="collapse" data-target={"#lodgers"+this.props.index}>Lodgers:</h1>
                    <div className="mt-4 pl-4 collapse multi-collapse" id={"lodgers"+this.props.index}>
                      {
                        this.props.attendeeList
                        .map((attendee, index) => {
                          if (attendee.eventName === this.props.eventName) {
                            return (
                              <p key={index}> {attendee.firstName} {attendee.lastName} {this.state.showEmail && attendee.email}</p>
                            );
                          }
                        })
                      }
                      
                    </div>
                  </div>
                  <Link
                    className="btn btn-lavender btn-lg btn-block"
                    to={`/register/${this.props.eventName}`}>Attend</Link>
                  <div className="container" align="right">
                    </div>
              </div>
            </div>
          </div>
        );
    }
}
export default Event;
