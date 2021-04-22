import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import {base, auth} from '../base';

import Home from './Home';
import Register from './Register';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import SignOutLink from './SignOut';
import EventsPage from './EventsPage';
import CreateEvent from './CreateEvent';
import MyEventsPage from './MyEventsPage';

import { NavLink } from 'react-router-dom';

import {
  AppView,
  MainView,
} from './styled';

class App extends Component {
  constructor() {
    super();

    this.state={
      attendeeList: [],
      userEmail: null,
      authUser: null,
      message: null,
      userId: null,
      events:[],
    }

    this.addtoEvents = this.addtoEvents.bind(this);
    this.addtoAttendeeList = this.addtoAttendeeList.bind(this);
  }

  // registerPerson(registInfo) {
  //   for event in events:
  //     if event.id == registInfo.id:
  //       event.attendeeList.append(registInfo.firstName + " " + registInfo.lastName)
  //
  //   const events = this.state.events
  //   for (var i=0; i < events; i++){
  //     if (events[i].index == registInfo.id) {
  //       events[i].attendeeList.push()
  //     }
  //   }
  // }

  addtoEvents(event) {
    const events = this.state.events.concat(event);

    this.setState({
      events: events
    });
  }

  addtoAttendeeList(attendee) {
    const attendeeList = this.state.attendeeList.concat(attendee);

    this.setState({
      attendeeList: attendeeList,
    });

  }

  componentDidMount() {
    this.eventsRef = base.syncState('events', {
        context: this,
        state: 'events',
        asArray: true
    });

    this.attendeeListRef = base.syncState('attendeeList', {
        context: this,
        state: 'attendeeList',
        asArray: true
    })

    auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser: authUser, userId: authUser.uid, userEmail: authUser.email })
        : this.setState({ authUser: null, userId: null, userEmail:null });
    });
  }

  componentWillUnmount() {
      base.removeBinding(this.eventsRef);
      base.removeBinding(this.attendeeListRef);
  }

  render() {
    return (
      <AppView style={{overflow: 'auto'}}>
        <nav className="navbar navbar-expand navbar-light">
        <img src = './thelodge2.png' alt=""/>
        <Navigation authUser={this.state.userId}/>
        </nav>
        <MainView>
          <Switch>
            <Route exact path='/home' component={Home} />
            {!this.state.userId && <Route path='/signup' component={SignUpPage} />}
            {!this.state.userId && <Route path='/login' component={SignInPage}/>}
            {this.state.userId && <Route path='/create' render={() => <CreateEvent addtoEvents={this.addtoEvents} history={this.props.history}userId={this.state.userId} userEmail={this.state.userEmail} addtoEvents={this.addtoEvents}/>} />}
            {this.state.userId && <Route path='/myevents' render={() => <MyEventsPage attendeeList={this.state.attendeeList} userId={this.state.userId}/>}/>}
            <Route exact path={`/register/:eventName`} render={(props) =>
              <Register {...props}
                addtoAttendeeList={this.addtoAttendeeList}

              />}
            />
            <Route path='/events' render={() => <EventsPage userEmail={this.state.userEmail}attendeeList={this.state.attendeeList} events={this.state.events}/>} />
            {!this.state.userId && <Redirect from='/create' to='/signup?createUserFirst' />}
            <Redirect from='*' to='/home' />
          </Switch>
        </MainView>
      </AppView>
    );
  }
}

const Navigation = ({ authUser }) =>
  <div>
    { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </div>

  const NavigationAuth = () =>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to={"/home"} className="nav-link" href="#">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/events"} className="nav-link" href="#">Events</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/myevents"} className="nav-link" href="#">My Events</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/create"} className="nav-link" href="#">Create Event</NavLink>
      </li>
      <li>
        <SignOutLink />
      </li>
    </ul>

  const NavigationNonAuth = () =>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to={"/home"} className="nav-link" href="#">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/events"} className="nav-link" href="#">Events</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/signup"} className="nav-link" href="#">Sign Up</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/login"} className="nav-link" href="#">Login</NavLink>
      </li>
    </ul>

export default withRouter(App);
