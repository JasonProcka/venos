import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';






class HubHeader extends React.Component {
  render() {
    return(
      <div>
        <header className="hub-header">
          <div>
            <div className="hub-head-informations">
              <h3 className="hub-title">{this.props.hub.name}</h3>
              <p className="hub-description">{this.props.hub.description}</p>
            </div>
            <div className="hub-buttons">
              <RaisedButton style={{
                marginRight: "1em"
              }} id="button-create-drop" secondary={true} label="Create Drop" onClick={() => {
                this.onOpenClick();
              }}/>
              <FlatButton id="button-copy" style={{
                color: "#FFF"
              }} label="Copy Link" />
            </div>
          </div>
          <Tabs className="tabs" tabTemplateStyle={{
            fontWeight: 400,
            width: "auto"
              }} tabItemContainerStyle={{
                backgroundColor: "transparent",
                fontWeight: 400
              }} inkBarStyle={{
                background: "transparent"
              }} onChange={this.handleChange} value={this.state.slideIndex}>
              <Tab style={{
                  fontWeight: 400
              }} label="Drops" value={0}/>
              <Tab style={{
                  fontWeight: 400
              }} label="Bio" value={1}/>
          </Tabs>
        </header>
      </div>
    );
  }
}

export default HubHeader;
