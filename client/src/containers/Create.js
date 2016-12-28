
// --- Imports ----

// >>> React
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// >>> Redux
import {Field, reduxForm} from 'redux-form';

// >>> Components
import CreateDialog from '../components/CreateDialog';

// >>> Containers
import Footer from './Footer';
import HubContent from './HubContent.js';

// >>> Styles/CSS
import '../styles/app.css'
import '../styles/create-hub.css';







import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
const STATUS_ENTER_DETAILS = 1;
const STATUS_CREATED_HUB = 2;
const STATUS_CREATED_ERROR = 3;
import Firebase from 'firebase';
import shortid from 'shortid';

import Toggle from 'material-ui/Toggle';

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = "Please enter a name.";
    } else {
        errors.name = "";
    }

    if (!values.description || !(/\S/.test(values.description))) {
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
        this.state = {
            isswitch: false,
            name: "",
            description: "",
            submitDisabled: true,
            status: STATUS_ENTER_DETAILS,
            hubCustomId: shortid.generate()
        }
        this.renderDialogSpecificToStatus = this.renderDialogSpecificToStatus.bind(this);
        this.enterName = this.enterName.bind(this);
        this.enterDescription = this.enterDescription.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
        if (this.state.hubcreated)
            this.setState({
                ...this.state,
                status: STATUS_CREATED_HUB
            })

    }

    handleFormSubmit = (values) => {
console.log("test");
        values.customurl = values.customurl
            ? values.customurl
            : this.state.hubCustomId;

        var m = {
            name: this.state.name,
            description: this.state.description,
            url: values.customurl,
            isPublic: true,
            destructionTimeInHours: 48

        };
        console.log(m);

        this.props.createHub(m);

    };

    renderAuthenticationError() {
        if (this.props.authenticationError) {
            return <div className="alert alert-danger">{this.props.authenticationError}</div>
        }
        return <div></div>
    }

    getHint() {
        if (this.state.isswitch) {
            return "your-custom-url";
        } else {
            return this.state.hubCustomId;
        }
    }

    enterName(e) {
         console.log(e);
         console.log("test");
             this.setState({...this.state, name: e.target.value});
             console.log(this.state.name);

    }
    enterDescription(e) {
        console.log(e);
        this.setState({
            ...this.state,
            description: e.target.value
        });
        console.log(this.state.description);
    }

    disableSubmit() {
        console.log("test5435");
        if (this.state.name && this.state.name.length > 0 && this.state.description && this.state.description.length > 0) {
            return false;
        }
        return true;

    }

    renderDialogSpecificToStatus(status) {

        switch (status) {
            case STATUS_ENTER_DETAILS:
                var style = {
                    fontFamily: "Roboto"
                };
                return (
                    <div className="dialog-special created shadow">
                        <div className="foyer-header">
                            <h3>Create Hub Now</h3>
                        </div>
                        <div className="clearfix foyer-wrapper">
                            {this.renderAuthenticationError()}

                            <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                                <TextField hintText="AwesomeHub" disabled={false} value={this.state.name} floatingLabelText="Name" onChange={this.enterName} key={1} name="name" type="text"/>
                                <TextField onChange={this.enterDescription} value={this.state.description} key={2} floatingLabelText="Description" hintText="A cool hub that is cool" name="description"  type="text"/>
                                <div id="optional" className="clearfix">
                                    <Toggle onToggle={(toggled) => {
                                        this.setState({
                                            ...this.state,
                                            isswitch: !this.state.isswitch
                                        });
                                        console.log(!this.state.isswitch);
                                    }} style={{
                                        width: "auto",
                                        display: "inline-block"
                                    }}/>
                                    <span style={style}>{`venos.co/`}</span><TextField key={3} hintText={(() => {
                        return this.getHint()
                    })()} disabled={!this.state.isswitch} name="customurl" type="text" style={style}/>
                                </div>

                                <RaisedButton disabled={(() => {return this.disableSubmit();})()} type="submit" label="Submit" primary={true}/>
                            </form>
                        </div>
                    </div>
                );

            case STATUS_CREATED_HUB:

                return (
                    <div className="dialog-special created shadow">
                        <div className="foyer-header">
                            <div className="linkarea">
                                <input className="copy-hublink mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" value="Copy"/>
                                <span className="hublink">
                                    <a href="#">venos.co/yournewhub</a>
                                </span>
                            </div>
                        </div>
                        <div className="foyer-wrapper">
                            <h4>Hub Creation Successful</h4>

                            <div className="foyer-interior">
                                <p>Congrats, your hub was successfully created.</p>
                                <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay"/>
                            </div>
                        </div>
                    </div>
                )
            case STATUS_CREATED_ERROR:
                return (
                    <div className="dialog-special created shadow">
                        <div className="foyer-header"></div>
                        <div className="foyer-wrapper">
                            <h4>Something unexpected happend</h4>

                            <div className="foyer-interior">
                                <p>{`An error occured, maybe you did not fill in everything correctly?`}</p>
                                <input className="panel-finish mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Okay"/>
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
        return (
            <div id="create-wrapper" className="wrapper">
                <ReactCSSTransitionGroup transitionName="dialog" transitionEnterTimeout={1000} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={1000}>
                    {dialog}
                    <div className="overlay"></div>
                </ReactCSSTransitionGroup>


            </div>

        );
    }
}

function mapStateToProps(state) {
    return {authenticationError: state.auth.error, hubCreated: state.hub.created}
}

export default connect(mapStateToProps, Actions)(reduxForm({form: 'createhub', validate})(Create));
