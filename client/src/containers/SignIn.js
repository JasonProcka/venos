import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import * as Actions from '../actions';
import '../styles/access/login.css';
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


class Login extends React.Component {
  handleFormSubmit = (values) => {
    this.props.signInUser(values);
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
      <div className="loginWrapper blue">
        <Link to="/join">
          <FlatButton label="Join" className="changePortal" href="/join" />
        </Link>
        <div className="loginContent">
            { this.renderAuthenticationError() }
            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
              <Field
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
              <RaisedButton
                className="loginSubmit pink"
                type="submit"
                label="Login"
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


function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'signin',
  validate
})(Login));
