import React from 'react';
import Footer from '../containers/Footer';
import CreateDialog from '../components/CreateDialog';
import '../styles/create-hub.css';
import '../styles/grid.css';
import ReactDOM from 'react-dom';
import HubContent from './HubContent.js';
import { Field, reduxForm } from 'redux-form';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/hubcreated.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const STATUS_ENTER_DETAILS = 1;
const STATUS_CREATED_HUB = 2;
const STATUS_CREATED_ERROR = 3;






const validate = values => {
  const errors = {};
  console.log('test');
console.log(values.name);
  if(!values.name  ) {
    errors.name = "Please enter a name.";
}else{
    errors.name = "";
}

  if(!values.description || !(/\S/.test(values.description)) ) {
    errors.description = "Please enter a description.";
  }

  // if(!values.customurl || !(/\S/.test(values.customurl)) ) {
  //   errors.customurl = "Please enter a custom url.";
  // }



  return errors;
}




class Create extends React.Component {

    constructor(props) {
     super(props);
     this.state = { status: STATUS_ENTER_DETAILS }
     this.renderDialogSpecificToStatus = this.renderDialogSpecificToStatus.bind(this);
     if(this.state.hubcreated)
        this.setState({status: STATUS_CREATED_HUB})

    }


    handleFormSubmit = (values) => {

        values.customurl = values.customurl ? values.customurl : "";

        this.props.createHub(
            {
                name: values.name,
                url: "test.de",
                ownerUid: "fsdf",
                isPublic: true,
                destructionTimeInHours: 5

            });





    };


    renderField = ({ id, hint, input, label, type, meta: { touched, error } }) => (

    <TextField
      hintText={hint}
      errorText={touched && error}
      floatingLabelText={label}
      {...input}
    />
    )


    renderAuthenticationError() {
      if(this.props.authenticationError) {
        return <div className="alert alert-danger">{ this.props.authenticationError }</div>
      }
      return <div></div>
    }








    renderDialogSpecificToStatus(status) {

    console.log(status);
     switch(status) {
          case STATUS_ENTER_DETAILS:

              return (
                  <div className="dialog-special created shadow">
                      <div className="foyer-header">
                          <h3 style={{fontSize: '2em', color: '#FFF', marginLeft: '10%'}}>Create Hub Now</h3>
                      </div>
                      <div className="foyer-wrapper">
                      { this.renderAuthenticationError() }

                      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                        <Field key={1} label="Name" hint="AwesomeHub" name="name" component={this.renderField} type="text"/>
                        <Field key={2} label="Description" hint="A cool hub that is cool"  name="description" component={this.renderField}  type="text" />
                        <p>Optional</p>
                        <span>{`venos.co/`}</span><Field key={3} hint="custom-url"  name="customurl" component={this.renderField}  type="text" />

                        <RaisedButton type="submit" label="Submit"  primary={true} />
                    </form>
                      </div>
                  </div>
              );




          case STATUS_CREATED_HUB:



              return (
                  <div className="dialog-special created shadow">
                      <div className="foyer-header">
                          <div className="linkarea">
                              <input className="copy-hublink mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" value="Copy" />
                              <span className="hublink"><a href="#">venos.co/yournewhub</a></span>
                          </div>
                      </div>
                      <div className="foyer-wrapper">
                          <h4>Hub Creation Successful</h4>

                          <div className="foyer-interior">
                              <p>Congrats, your hub was successfully created.</p>
                              <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay" />
                          </div>
                      </div>
                  </div>
              )
              case STATUS_CREATED_ERROR:
              return (
                  <div className="dialog-special created shadow">
                      <div className="foyer-header">

                      </div>
                      <div className="foyer-wrapper">
                          <h4>Something unexpected happend</h4>

                          <div className="foyer-interior">
                              <p>{`An error occured, maybe you did not fill in everything correctly?`}</p>
                              <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay" />
                          </div>
                      </div>
                  </div>
              )




          default:
              return <div>what</div>;

        }
    }




    render() {
const dialog = this.renderDialogSpecificToStatus(this.state.status);
    return(
        <div>
              <ReactCSSTransitionGroup
                  transitionName="dialog"
                  transitionEnterTimeout={1000}
                  transitionLeaveTimeout={500}
                  transitionAppear={true}
                  transitionAppearTimeout={500}>
                  {dialog}
                </ReactCSSTransitionGroup>



            <div className="overlay"></div>
        </div>

    );
  }
}





function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error,
    hubCreated : state.hub.created
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'createhub',
  validate
})(Create));
