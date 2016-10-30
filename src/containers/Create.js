import React from 'react';
import Footer from '../containers/Footer';
import CreateDialog from '../components/CreateDialog';
import '../styles/create-hub.css';
import '../styles/grid.css';
import ReactDOM from 'react-dom';
import HubContent from './HubContent.js';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/hubcreated.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

const STATUS_NAME_HUB = 1;
const STATUS_DESCRIBE_HUB = 2;
const STATUS_FIND_HUB = 3;
const STATUS_ENTER_URL = 4;
const STATUS_FINISHED = 5;
const STATUS_ERROR = 6;










class Create extends React.Component {

    constructor(props) {
     super(props);
     this.state = { status: STATUS_NAME_HUB, nameInputValue: '', nameInputReadonly: false }
     this.renderDialogSpecificToStatus = this.renderDialogSpecificToStatus.bind(this);
     this.updateNameInputValue = this.updateNameInputValue.bind(this);

    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }



    onNext(statusInt){

    }
    componentDidUpdate(){
        if(this.state.status == STATUS_DESCRIBE_HUB){
            ReactDOM.findDOMNode(this.refs.describeInput).focus();
        }
    }
    validateText(text){
        if(/\S/.test(text)) {
            return true;
        }else{
            return false;
        }
    }

    onNamedButton(){
        console.log('he?');
        console.log(this.state.nameInputValue);

        var isValid = this.validateText(this.state.nameInputValue);
        if(isValid){

            this.setState({...this.state, status: STATUS_DESCRIBE_HUB, nameInputReadonly: true});
        }else{
            this.setState({...this.state, status: STATUS_ERROR})
        }
    }

    onDescriptionButton(){}

    updateNameInputValue(event) {

        this.setState({
            nameInputValue: event.target.value
        });

    }




    renderDialogSpecificToStatus(status) {

    console.log(status);
     switch(status) {
          case STATUS_NAME_HUB:

              return (
                  <div key={1} className='createbubble dialog triangle-isosceles top ripple-effect walkthrough shadow'>
                      <h5 className='smooth'>Name Your Hub</h5>
                      <p className='smooth'>Let&#39;s give your hub a name that matches its personality (purpose)</p>
                      <button onClick={ () => {this.onNamedButton()} } className='next-btn1 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Continue</button>
                  </div>
              );

          case STATUS_DESCRIBE_HUB:

              return (
                  <div key={2} className='createbubble dialog triangle-isosceles top ripple-effect walkthrough shadow'>
                      <h5 className='smooth'>Describe Your Hub</h5>
                      <p className='smooth'>What is {`this`} hub going to be used for?</p>
                      <button onClick={ () => this.setState({status: STATUS_FIND_HUB}) }  className='next-btn1 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Continue</button>
                  </div>
          );

          case STATUS_FIND_HUB:
              return (
                  <div key={3} className="customurl dialog shadow triangle-isosceles top">
                      <h5 className='smooth'>Find Your Hub</h5>
                      <div className='url-input'></div>
                      <p className='smooth'>Would you like to create a custom URL for easy sharing?</p>
                      <div className='customurl-btns'>
                          <button onClick={ () => this.setState({status: STATUS_FINISHED}) } className='next-btn3 mdl-button mdl-js-button mdl-button--raised ripple-effect'>Skip</button>
                          <button onClick={ () => this.setState({status: STATUS_ENTER_URL}) }className='next-btn4 mdl-button mdl-js-button mdl-button--raised ripple-effect mdl-button--accent'>Yes</button>
                      </div>
                  </div>
          );
          case STATUS_ENTER_URL:
              return (
                  <div key={4} className="customurl dialog shadow triangle-isosceles top">
                      <h5 className='smooth'>Find Your Hub</h5>
                      <div className="url-input">
                          <span className="fieldlabel smooth">{`venos.co`}/</span>
                          <input type="text" className="customurl-input" name="huburl" />
                          <div className="urlfield-btns">
                              <button onClick={ () => this.setState({status: STATUS_FIND_HUB}) } className="next-btn5 mdl-button mdl-js-button mdl-button--raised ripple-effect">CANCEL</button>
                              <button onClick={ () => this.setState({status: STATUS_FINISHED}) } className="next-btn6 mdl-button mdl-js-button mdl-button--raised ripple-effect mdl-button--accent">FINISH</button>
                          </div>
                      </div>
                  </div>
          );
          case STATUS_FINISHED:

              this.props.actions.createHub(
                  {
                      name: "test",
                      url: "url.de",
                      ownerUid: "fsdf",
                      isPublic: true,
                      destructionTimeInHours: 5

                  });


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
              case STATUS_ERROR:
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
    var nameInput = {};
    if( this.state.nameInputReadonly) {
       nameInput['readOnly'] = 'readOnly';
    }
    var descriptionInput = {};
    if( this.state.descriptionInputReadonly) {
       descriptionInput['readOnly'] = 'readOnly';
    }
    return(
        <div className="content">
            <div className="hub-jumbo jumbo-nonav">
                <div className="max-width">
                    <div className="jumbo-content">
                        <div className="jumbo-info">
                            <form action="demo_form.asp">
                                <input {...nameInput} onChange={this.updateNameInputValue} className="hub-title" ref="nameInput" type="text" name="username" placeholder="Name Here"/>
                                <br/>
                                <input {...descriptionInput} onChange={this.updateDescriptionInputValue} className="hub-description"  ref="descriptionInput" type="text" name="description" placeholder="Describe Here"/>

                            </form>
                        </div>
                        <div className="overlaywrapper"></div>
                            <div className="jumbo-buttons">
                                <a className="mdl-button mdl-js-button mdl-button--raised create-drop">
                                    Create Drop
                                </a>
                                <button id="link-copier" className="mdl-button mdl-js-button copy-link">
                                    Copy Link
                                </button>
                            </div>
                        </div>
                        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                            <header className="mdl-layout__header">
                                <div className="mdl-layout__tab-bar">
                                    <a href="#" className="customtab">Drops</a>
                                    <a href="#" className="customtab">Bio</a>
                                    <a href="#" className="customtab">Discuss</a>
                                </div>
                            </header>
                            <main className="mdl-layout__content">
                                <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-3">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-4">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-5">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-6">
                                    <div className="page-content"></div>
                                </section>
                            </main>
                        </div>
                    </div>
                </div>

            <HubContent examples="5"/>





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

export default Create;
