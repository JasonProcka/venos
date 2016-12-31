// --- Imports ----

// >>> React
import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// >>> Redux
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions';

// >>> Containers
import HubHeader from './HubHeader';



// >>> Drop
import DropList from './DropList';
import Drop from './Drop';

// >>> Modules
import request from 'superagent';
import util from 'util';

// >>> Material-UI
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SwipeableViews from 'react-swipeable-views'; // From https://github.com/oliviertassinari/react-swipeable-views

// >>> Styles
import '../../styles/hub/hub.css';

class Hub extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.hub);
        this.state = {
            files: new Map(),
            currentTab: 0
        };

    }

    componentWillMount() {
        // console.log(this.props.location.pathname);
        // let req = request.get('/files').query({'url': this.props.location.pathname}).end((err, res) => {
		//
        //     let array = JSON.parse(res.text);
        //     let fileMap = new Map();
        //     for (var i = 0; i < array.length; i++) {
        //         fileMap.set(i, {preview: `/file?file=${array[i]}`});
        //     }
        //     this.setState({
        //         files: new Map([
        //             ...this.state.files,
        //             ...fileMap
        //         ])
        //     });
        //     console.log(util.inspect(res, {
        //         showHidden: true,
        //         depth: null
        //     }));
        // });
    }

    componentDidMount() {
        // request.get('/files').query({'hubid': this.props.hub.id}).end((err, res) => {
        //     console.log("err: " + err);
        //     console.log("resp: " + res);
        //     var files = this.state.files;
        //     var e = [];
        //     if (this.state.files != undefined && this.state.files.length > 0) {
        //         console.log("e");
        //         for (var i = 0; i < this.state.files.length; i++) {
        //             e.push(this.state.files[i]);
        //         }
        //     }
        //     var array = JSON.parse(res.text);
        //     for (var i = 0; i < array.length; i++) {
        //         e.push({preview: `/file?file=${array[i]}`});
        //     }
        //     this.setState({files: e});
        //     console.log(util.inspect(res, {
        //         showHidden: true,
        //         depth: null
        //     }));
        // });
    }

    onDrop(acceptedFiles) {
        // console.log(acceptedFiles);
        // this.props.actions.uploadFiles(acceptedFiles, this.props.hub);
        // var e = [];
        // for (var i = 0; i < acceptedFiles.length; i++) {
        //     e.push(acceptedFiles[i]);
        // }
        // if (this.state.files != undefined && this.state.files.length > 0) {
        //     console.log("e");
        //     for (var i = 0; i < this.state.files.length; i++) {
        //         e.push(this.state.files[i]);
        //     }
        // }
        // console.log("test1: " + util.inspect(acceptedFiles, {
        //     showHidden: true,
        //     depth: null
        // }))
        // console.log("test2: " + util.inspect(this.state, {
        //     showHidden: true,
        //     depth: null
        // }));
        // console.log("e: " + util.inspect(e, {
        //     showHidden: true,
        //     depth: null
        // }));
        // this.setState({
        //     ...this.state,
        //     files: e
        // });

        // caution, type form is required

    }
	onTabChange = (e) => {
		this.setState({currentTab: e})
	}

    makeFiles() {
        console.log("kp: " + this.state.files.length)
        var i = 0;

        return (
            <div className="hub-grid"></div>
        );

    }

    handleChange = (value) => {
        this.setState({
            ...this.state,
            slideIndex: value
        });
    };

    render() {

        const styles = {

            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto'
            }
        };



		let dummyData = (() => {
			var array = [];
			for(let i = 0; i < 3000; i++)
				array.push({id: i, src: `https://unsplash.it/200/300/?random&x=${i}`})
			return array;
		})()
		console.log(dummyData.length);




        console.log(this.state.files.length);
        return (
            <div className="small-wrapper">
                <Dropzone disableClick={true} style={{
                    width: '100%'
                }} ref={(node) => {
                    this.dropzone = node;
                }} onDrop={this.onDrop}>
                    <HubHeader currentTab={this.state.currentTab} onTabChange={this.onTabChange} onAddFileClick={() => this.dropzone.open()} name={"Awesome Hub"} description={"That's amazing"} location={this.props.location.pathname}/>
                    <SwipeableViews index={this.state.currentTab} onChangeIndex={this.handleChange}>
                        <div className="drop-container clearfix"><DropList drops={dummyData}/></div>
                        <div>
                          <Card className="dropCard">

                            <div className="dropImage"></div>
                            <CardTitle className="dropTitle" title="pic_02.png" />
                          </Card>
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img class="activator" src="http://www.unoosa.org/res/timeline/index_html/space-2.jpg" />
                            </div>
                            <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                            </div>
                            <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                              <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div>
                          </div>
                        </div>
                    </SwipeableViews>
                </Dropzone>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		location: this.
// 	}
// }

export default connect(undefined, mapDispatchToProps)(Hub);
