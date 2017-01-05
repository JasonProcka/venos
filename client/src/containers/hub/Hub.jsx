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

// >>> Drops
import DropList from './DropList';
import Drop from './Drop';

// >>> Modules
import request from 'superagent';
import util from 'util';
import {FileC} from '../../shared/models';

// >>> Material-UI
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SwipeableViews from 'react-swipeable-views'; // From https://github.com/oliviertassinari/react-swipeable-views
import CircularProgress from 'material-ui/CircularProgress';


// >>> Styles
import '../../styles/hub/hub.css';
import '../../styles/grid.css';

class Hub extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			hub: null,
            files: null,
            currentTab: 0
        };


    }

    componentWillMount() {

		this.props.action.fetchHubByUrl(this.props.routeParams.name);

        // console.log(this.props.location.pathname);
        // let req = request.get('/files').query({'url': this.props.location.pathname}).end((err, res) => {
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

		if(this.props.hub)
			this.setState({files: this.props.hub.files})

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
		this.setState({fetching: acceptedFiles})
        this.props.action.uploadFiles(acceptedFiles, this.props.hub);

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

    handleChange = (value) => {
        this.setState({
            ...this.state,
            slideIndex: value
        });
    };



	componentWillReceiveProps(nextProps) {
		let array1 = [];
		if(nextProps.file && nextProps.file.files)
			for(let property in nextProps.file.files){

				let x = {
					id: property,
					file: nextProps.file.files[property]
				};

				array1.push(x);
			}
let array2 = [];
		if(nextProps.hub && nextProps.hub.files){
			for(let property in nextProps.hub.files){
				array2.push(
					{
						id: property,
						file: nextProps.hub.files[property]
					}
				)
			}
		}
		this.setState({files: array2, newFiles: array1});


  }

    render() {

        const styles = {

            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto'
            }
        };



		// let dummyData = (() => {
		// 	var array = [];
		// 	for(let i = 0; i < 3000; i++)
		// 		array.push({id: i, src: `https://unsplash.it/200/300/?random&x=${i}`})
		// 	return array;
		// })()

















		if(this.props.hub)
        return (

            <div className="hubWrapper">

				{this.props.file.uploading ? <CircularProgress size={500} thickness={30} /> : undefined}
              <HubHeader title={this.props.hub.name} description={this.props.hub.description} currentTab={this.state.currentTab} onTabChange={this.onTabChange} onAddFileClick={() => this.dropzone.open()} location={this.props.location.pathname} />
              <Dropzone disableClick={true} style={{
                  width: '100%'
                }} ref={(node) => {
                    this.dropzone = node;
                }} onDrop={this.onDrop.bind(this)}>
                  <SwipeableViews index={this.state.currentTab} onChangeIndex={this.handleChange}>
                       <DropList newDrops={this.state.newFiles} drops={this.state.files}></DropList>
                      <div className="hubBio">this is random text</div>
                      <div className="hubQuickShare">This is the quickshare page.</div>
                  </SwipeableViews>
              </Dropzone>
            </div>
        )
		else
			return(
        <div className="loadingWrapper">
          <div className="hubLoadingWrapper">
            <CircularProgress className="hubLoading" size={40} thickness={4} />
          </div>
        </div>
      );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

const mapStateToProps = (state, ownProps) => {

	return {
		hub: state.hub.hub,
		user: state.auth.user,
		file: state.file
	}
 }

export default connect(mapStateToProps, mapDispatchToProps)(Hub);
