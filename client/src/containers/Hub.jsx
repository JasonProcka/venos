
// --- Imports ------------------------------------------------------


// React
import React from 'react';

// Modules
import Dropzone from 'react-dropzone';
import Database from '../actions/database'
import request from 'superagent';
import SwipeableViews from 'react-swipeable-views'; // From https://github.com/oliviertassinari/react-swipeable-views

// Redux
import {bindActionCreators} from 'redux'
import * as Actions from '../actions';
import {connect} from 'react-redux';

// Styles
import '../styles/hub.css'

// Testing
import util from 'util';

// Material UI
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CircularProgress from 'material-ui/CircularProgress';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Snackbar from 'material-ui/Snackbar';


class Drop extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{
                backgroundImage: `url(${this.props.src})`
            }} className="drop">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}




class Hub extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            files: [],
            slideIndex: 0,
            isInfiniteLoading: false,
            htmlElements: []
        };

        // --- File dragging ----------------------------------------------------
        // window.addEventListener("dragover",function(e){
        //     e = e || event;
        //     e.preventDefault();
        // },false);
        // window.addEventListener("drop",function(e){
        //     e = e || event;
        //     e.preventDefault();
        //     alert('use the content to drag files, feature will be added for sidebar');
        // },false);

    }


    componentDidMount() {
        request.
        get('/files').
        query({'hubid': this.props.hub.id}).
        end(
            (err, res) => {
                if(!err){
                    var files = this.state.files; // get current files
                    var responseArray = JSON.parse(res.text); // get from server an array containing the file locations, for example `/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/rkOc4pA7e.JPG`

                    let fileArray = responseArray.map((e) =>{
                        return {preview: `/file?file=${e}`, location: e}    // make an object for every file response and store them in an array
                    });
                    this.setState({files: this.state.files.concat(fileArray)});  // add new fetched files with already added files
                }else{
                    // TODO what should happen when requesting files didn't work?
                }
            }
        );
    }

    onDrop(acceptedFiles) {
        this.props.actions.uploadFiles(acceptedFiles, this.props.hub); // upload Files
        this.setState({files: this.state.files.concat(acceptedFiles)}); // add new accepted files with already added files
    }

    onOpenClick() {
        this.dropzone.open();
    }

    makeFiles() {
        var i = 0;

        return (
            <div className="hub-grid">
                {this.state.files.map((file) => <Drop key={i++} src={file.preview}>Filename</Drop>)}
            </div>
        );

    }



    elementInfiniteLoad = () => {
        return <div className="infinite-list-item">
            <CircularProgress/>
        </div>;
    }

    createFiles = () => {
        var that = this;
        this.setState({isInfiniteLoading: false});
        // setTimeout(() => {
        //
        //     // console.log("test");
        //     // var elemLength = that.state.elements.length;
        //     // if((elemLength + 6) > this.state.files.length){
        //     //     var newElements = that.buildElements(elemLength, elemLength + this.state.files.length - elemLength);
        //     // }else if(elemLength < this.state.files.length){
        //     //     var newElements = that.buildElements(elemLength, elemLength + 6);
        //     // }else{
        //     //     var newElements = [];
        //     // }
        //     var elemLength = that.state.elements.length;
        //     var newElements;
        //     if(elemLength < that.state.files.length){
        //         newElements = that.buildElements(elemLength, elemLength + 1);
        //         that.setState({isInfiniteLoading: false, elements: that.state.elements.concat(newElements)});
        //     }else{
        //         that.setState({isInfiniteLoading: false});
        //     }
        //
        // }, 2500);
    }

    // <div className="hub-grid">
    //     {this.state.files.slice(0, 5 * i).map((file) => <Drop key={i++} src={file.preview}>Filename</Drop>)}
    // </div>

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

        const tilesData = [
            {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Breakfast',
                author: 'jill111'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6g.jpg',
                title: 'Tasty burger',
                author: 'pashminu'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Camera',
                author: 'Danson67'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Morning',
                author: 'fancycrave1'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Hats',
                author: 'Hans'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Honey',
                author: 'fancycravel'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Vegetables',
                author: 'jill111'
            }, {
                img: '/file?file=/user/M1vl02oSuzfcAAwWWTPqqH75qsJ3/files/HJgALe6Wg.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki'
            }
        ];

        console.log(this.state.files.length);

        var items = this.state.htmlFiles;
        let snackbar;
        if(this.props.file.successful){
            snackbar = (<Snackbar
                            open={true}
                            message="Files Uploaded Successfully"
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                            />);
        }else{
            snackbar = (<Snackbar
                            open={true}
                            message="Files Upload Error"
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                            />);
        }
        return (
            <div className="small-wrapper">
                <Dropzone disableClick={true} style={{
                    width: '100%'
                }}
                ref={(node) => {
                    this.dropzone = node;
                }}
                onDrop={this.onDrop}>

                    <header className="hub-header">
                        <IconMenu style={{position: "absolute", right: 0, top: 0}} iconButtonElement={< IconButton > <MoreVertIcon/> < /IconButton>} anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
                        }} targetOrigin={{
                            horizontal: 'right',
                            vertical: 'top'
                        }}>
                            <MenuItem primaryText="Refresh"/>
                            <MenuItem primaryText="Send feedback"/>
                            <MenuItem primaryText="Settings"/>
                            <MenuItem primaryText="Help"/>
                            <MenuItem primaryText="Sign out"/>
                        </IconMenu>
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
                                }} label="Copy Link"/>
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

                    <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>


                        <div>

                        </div>

                        <div>
                            slide n°2
                        </div>

                    </SwipeableViews>

                </Dropzone>
                {snackbar}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Hub);
