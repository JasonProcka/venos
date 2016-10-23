import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/hubcreated.css';


const STATUS_NAME_HUB = "STATUS_NAME_HUB";
const STATUS_DESCRIBE_HUB = "STATUS_DESCRIBE_HUB";
const STATUS_FIND_HUB = "STATUS_FIND_HUB";
const STATUS_ENTER_URL = "STATUS_ENTER_URL";
const STATUS_FINISHED = "STATUS_FINISHED";

class CreateDialog extends React.Component {

  constructor(props) {
   super(props);
   this.state = { status: STATUS_NAME_HUB }
   this.renderDialogSpecificToStatus = this.renderDialogSpecificToStatus.bind(this);
  }
  componentDidMount(){
      this.props.setNameInput();
  }
  renderDialogSpecificToStatus(status) {

      console.log(status);

    switch(status) {
        case STATUS_NAME_HUB:
            return (
                <div key={1} className='createbubble dialog triangle-isosceles top ripple-effect walkthrough shadow'>
                    <h5 className='smooth'>Name Your Hub</h5>
                    <p className='smooth'>Let&#39;s give your hub a name that matches its personality (purpose)</p>
                    <button onClick={ () => this.setState({status: STATUS_DESCRIBE_HUB}) } className='next-btn1 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'>Continue</button>
                </div>
            );

        case STATUS_DESCRIBE_HUB:
            this.props.setDescribeInput();
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




        default:
            return <div>what</div>;

    }




  }
  componentDidUpdate(){
      this.props.onNext();
  }


  render() {

    const dialog = this.renderDialogSpecificToStatus(this.state.status);
    /*const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));*/

    return (
      <ReactCSSTransitionGroup
          transitionName="dialog"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          {dialog}
        </ReactCSSTransitionGroup>
    );
  }


}


export default CreateDialog;
