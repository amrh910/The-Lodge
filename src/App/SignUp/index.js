import {doCreateUserWithEmailAndPassword} from '../Auth';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = ({ history }) =>
  <div className="container"  style={{width:'50%','minWidth':'50%', 'borderLeft':'1px solid #D8D8D8', 'borderRight':'1px solid #D8D8D8', 'borderBottom':'1px solid #D8D8D8', 'borderTop':'1px solid #D8D8D8'}}>
    <br/>
    <h1 className="center" style={{color:'#450045'}}>Sign Up</h1>
    <br/>
    <SignUpForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/events');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      (reg.test(this.state.email) !== true) ||
      passwordOne.length < 8
      ;

    return (
      <div className="container" style={{'textAlign':'center'}}>
        {this.props.history.location.search && 
          <div className="alert alert-info" role="alert">
              Please make an account in order to create a event
          </div>}
        {error && 
          <div className="alert alert-danger" role="alert">
              {error.message}
          </div>
        }
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <input
              className="form-control col-10"
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              placeholder="Full Name"
              value={username}
              name="firstName"
              id="fullName"
              type="text"
              style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
            />
          </div>
          <div className="form-group row">
            <input
              className="form-control col-10"
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              placeholder="Email Address"
              value={email}
              name="email"
              type="text"
              id="email"
              style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
            />
          </div>
          <div className="form-group row">
            <input
              className="form-control col-10"
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              placeholder="Password (minimum 8 characters)"
              value={passwordOne}
              name="passwordOne"
              id="passwordOne"
              type="password"
              style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
            />
          </div>
          <div className="form-group row">
            <input
              className="form-control col-10"
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              placeholder="Confirm Password"
              value={passwordTwo}
              name="passwordTwo"
              id="passwordTwo"
              type="password"
              style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
            />
          </div>
          <button disabled={isInvalid} type="submit" className="btn btn-lg btn-lavender">Sign Up</button>
          
        </form>
        <br/>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p style={{'font-size':'small'}}>
    Don't have an account?
    {' '}
    <Link to={'/signup'}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};