import {doSignInWithEmailAndPassword} from '../Auth';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { SignUpLink } from '../SignUp';
import './style.css'

const SignInPage = ({ history }) =>
  <div className="container" style={{width:'50%','minWidth':'50%', 'borderLeft':'1px solid #D8D8D8', 'borderRight':'1px solid #D8D8D8', 'borderBottom':'1px solid #D8D8D8', 'borderTop':'1px solid #D8D8D8'}}>
    <br/>
    <h1 className="center" style={{color:'#450045'}}>Sign In</h1>
    <br/>
    <SignInForm history={history} />
    <div style={{'textAlign':'center'}}><SignUpLink/></div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/events');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="container">
        {error && 
          <div className="alert alert-danger" role="alert">
              {error.message}
          </div>
        }
        <form onSubmit={this.onSubmit} style={{'textAlign':'center'}}>
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
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              placeholder="Password"
              value={password}
              name="password"
              id="password"
              type="password"
              style={{'font-size':'16px', margin:'auto', padding:'6px', 'vertical-align':'middle'}}
            />
          </div>
          <button disabled={isInvalid} type="submit" className="btn btn-lg btn-lavender">Sign In</button>
        </form>
        <br/>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};