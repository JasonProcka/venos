import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import '../styles/join.css';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';

const validate = values => {
  const errors = {};

  if(!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if(!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
}


class SignUp extends React.Component {
  handleFormSubmit = (values) => {
      console.log('test');
      console.log(values);
    this.props.signUpUser(values);
  };


  renderField = ({ id, input, label, type, meta: { touched, error } }) => (
    <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${touched && error ? 'has-error' : ''}`}>
        <input {...input} className="mdl-textfield__input" type={type} id={id} />
        <label className="mdl-textfield__label" htmlFor={id}>{label}</label>
        {touched && error && <div className="help-block">{error}</div>}
    </div>
  );

  renderAuthenticationError() {
    if(this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>
    }
    return <div></div>
  }


  render() {
    return (
        <div className="loginWrapper pink">
          <Link to="/login">
            <FlatButton label="Login" className="changePortal" />
          </Link>
          <div className="loginContent">
              { this.renderAuthenticationError() }
              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <div className=""><Field
                  key={1}
                  placeholder="Email"
                  className="loginEmail"
                  id="sample3"
                  name="email"
                  component={TextField}
                  type="text"
                  /><br />
                <Field
                  key={2}
                  placeholder="Password"
                  className="loginPassword"
                  id="sample4"
                  name="password"
                  component={TextField}
                  type="password"
                  /><br />
                <Field
                  key={3}
                  placeholder="Repeat Password"
                  className="loginPassword repeatPassword"
                  id="sample4"
                  name="password"
                  component={TextField}
                  type="password"
                  /></div><br />
                <RaisedButton
                  className="loginSubmit blue"
                  type="submit"
                  label="Join"
                />
                  <Checkbox
                    className="loginRemember"
                    labelPosition="left"
                    label="Remember me"
                  />
            </form>
          </div>
        </div>
    );
  }

}

/* Old code
<div className="join shadow">
    <div className="foyer-header">
        <Link className="switch-method-sign-in-link" to="/signin"><button className="form-join mdl-button mdl-js-button mdl-js-ripple-effect mld-text--blue">
            Login
        </button></Link>
        <button className="mdl-button mdl-js-button mdl-button--icon">
            <i className="material-icons">help_outline</i>
        </button>
        <h4>Venos SignUp</h4>
    </div>
    <div className="foyer-wrapper">
        { this.renderAuthenticationError() }
        <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
          <Field key={1} id="sample3" name="email" component={this.renderField} type="text" placeholder="Email" />
          <Field key={2} id="sample4" name="password" component={this.renderField}  type="password" placeholder="Password"/>

          <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
            <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" checked />
            <span className="mdl-checkbox__label">Remember me</span>
          </label>
          <input className="form-login mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Sign Up" />
      </form>
    </div>
  </div>
*/


function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'signup',
  validate
})(SignUp));
