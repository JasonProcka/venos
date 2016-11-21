import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import '../styles/home.css';
import '../styles/grid.css';


class Home extends React.Component {
   constructor(props) {
     super(props);
   }
  render() {
  return (
  <div className="home">
  <div className="introWrap">
    <div className="introTop">
      <div className="introContent">
        <h3>Venos</h3>
        <p>Store valuable resources in a collaborative location</p>
        <div className="introButtons">
          <FlatButton className="learn" label="Learn More" />
          <RaisedButton label="Create Hub" secondary={`true`} />
        </div>
      </div>
    </div>
  </div>
  </div>
  );
  }
}

export default Home;