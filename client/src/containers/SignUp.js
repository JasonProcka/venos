import React from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import * as action from '../actions';
import '../styles/join.css';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {bindActionCreators} from 'redux';
import {Checkbox, TextField} from 'redux-form-material-ui'




const validation = (values) => {
    const errors = {};

	if(!values.email) {
    	errors.email = "Please enter an email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    	errors.email = 'Invalid email address'
    }

    if(!values.password) {
    	errors.password = "Please enter a password.";
    }
	if(!values.passwordRepeat) {
    	errors.passwordRepeat = "Please repeat your password.";
    }


    // if(!values.customurl || !(/\S/.test(values.customurl)) ) {
    //   errors.customurl = "Please enter a custom url.";
    // }
    return errors;
}




class SignUp extends React.Component {
  handleFormSubmit = (values) => {
      console.log('test');
      console.log(values);
    this.props.action.signUpUser(values);
  };

  required(value){
	  console.log("test");
  	return value == null ? 'Required' : undefined
  }




  render() {
    return (
        <div className="loginWrapper pink">
          <Link to="/login">
            <FlatButton label="Login" className="changePortal" />
          </Link>
          <div className="loginContent">
              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <div className=""><Field
                  key={1}
                  placeholder="Email"
                  className="loginEmail"
                  id="sample3"
                  name="email"
                  component={TextField}
                  type="text"
				  validate={this.required}
                  /><br />
                <Field
                  key={2}
                  placeholder="Password"
                  className="loginPassword"
                  id="sample4"
                  name="password"
                  component={TextField}
                  type="password"
				  validate={this.required}
                  /><br />
                <Field
                  key={3}
                  placeholder="Repeat Password"
                  className="loginPassword repeatPassword"
                  id="sample4"
                  name="passwordRepeat"
                  component={TextField}
                  type="password"
				  validate={this.required}
                  /></div><br />
                <RaisedButton
                  className="loginSubmit blue"
                  type="submit"
                  label="Join"
				  disabled={this.props.submitDisabled}
                />

				<Field
                  key={4}

                  className="loginRemember"
                  name="remember"
                  component={Checkbox}
				  label="Remember me"
				  iconStyle={{fill: "#FFF"}}
				  labelPosition="left"
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
const selector = formValueSelector('signup') // <-- same as form name

function mapStateToProps(state) {




	// or together as a group
	const { email, password, passwordRepeat } = selector(state, 'email', 'password', 'passwordRepeat')
	return {
		email,
		password,
		passwordRepeat,
		submitDisabled: (() => {
			if (email && email.trim().length > 0 && password && password.trim().length > 0 && passwordRepeat && passwordRepeat.trim().length > 0 && password.trim().length === passwordRepeat.trim().length)
					return false;
			return true;

	  })()
  }





  return {
    authenticationError: state.auth.error
  }
}
function mapDispatchToProps(dispatch){
	return {
		action: bindActionCreators(action, dispatch)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  validation
})(SignUp));
