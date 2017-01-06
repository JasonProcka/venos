import React from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import * as action from '../actions';
import '../styles/access/login.css';
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
    // if(!values.customurl || !(/\S/.test(values.customurl)) ) {
    //   errors.customurl = "Please enter a custom url.";
    // }
    return errors;
}



class Login extends React.Component {

  handleFormSubmit = (values) =>{
    this.props.action.signInUser(values);
  };


  render() {
    return (
      <div className="loginWrapper blue">
        <Link to="/join">
          <FlatButton label="Join" className="changePortal" href="/join" />
        </Link>
        <div className="loginContent">

            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
              <Field
                key={1}
                placeholder="Email/Username"
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


const selector = formValueSelector('signin') // <-- same as form name

function mapStateToProps(state) {
	// or together as a group
	const { email, password } = selector(state, 'email', 'password')
	return {
		email,
		password,
		submitDisabled: (() => {
			if (email && email.trim().length > 0 && password && password.trim().length > 0)
					return false;
			return true;

	  })()
  }
}
function mapDispatchToProps(dispatch){
	return {
		action: bindActionCreators(action, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signin',
  validation
})(Login));
