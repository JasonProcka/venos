import React from 'react';
import Dropzone from 'react-dropzone';
import Database from '../actions/database'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions';
import {connect} from 'react-redux';
import request from 'superagent';
import '../styles/hub.css'
import util from 'util';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import CircularProgress from 'material-ui/CircularProgress';
import Infinite from 'react-infinite';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
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

var ListItem = React.createClass({
    getDefaultProps: function() {
        return {height: 50, lineHeight: "50px"}
    },
    render: function() {
        return <div className="infinite-list-item" style={{
            height: this.props.height,
            lineHeight: this.props.lineHeight,
            overflow: 'scroll'
        }}>
            <div style={{
                height: 50
            }}>
                List Item {this.props.index}
            </div>
        </div>;
    }
});

var InfiniteList = React.createClass({
    getInitialState: function() {
        return {
            elements: this.buildElements(0, 50),
            isInfiniteLoading: false
        }
    },

    buildElements: function(start, end) {
        var elements = [];
        for (var i = start; i < end; i++) {
            elements.push(<ListItem key={i} index={i}/>)
        }
        return elements;
    },

    handleInfiniteLoad: function() {
        var that = this;
        this.setState({isInfiniteLoading: true});
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 100);
            that.setState({isInfiniteLoading: false, elements: that.state.elements.concat(newElements)});
        }, 2500);
    },

    elementInfiniteLoad: function() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    },

    render: function() {
        return <Infinite elementHeight={50} containerHeight={window.innerHeight} infiniteLoadBeginEdgeOffset={200} onInfiniteLoad={this.handleInfiniteLoad} loadingSpinnerDelegate={this.elementInfiniteLoad()} isInfiniteLoading={this.state.isInfiniteLoading} timeScrollStateLastsForAfterUserScrolls={1000}>
            {this.state.elements}
        </Infinite>;
    }
});

class Hub extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.hub);
        this.state = {
            files: [],
            slideIndex: 0,
            isInfiniteLoading: false,
            htmlElements: []
        };
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.makeFiles = this.makeFiles.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.buildElements = this.buildElements.bind(this);
        this.createFiles = this.createFiles.bind(this);
        // window.addEventListener("dragover",function(e){
        //     e = e || event;
        //     e.preventDefault();
        // },false);
        // window.addEventListener("drop",function(e){
        //     e = e || event;
        //     e.preventDefault();
        //     alert('use the content to drag files, feature will be added for sidebar');
        // },false);
        console.log('hubid:' + this.props.hub.id);

    }

    componentDidMount() {
        request.get('/files').query({'hubid': this.props.hub.id}).end((err, res) => {

            var files = this.state.files;
            var e = [];
            if (this.state.files != undefined && this.state.files.length > 0) {

                for (var i = 0; i < this.state.files.length; i++) {
                    e.push(this.state.files[i]);
                }
            }
            var array = JSON.parse(res.text);
            for (var i = 0; i < array.length; i++) {
                e.push({preview: `/file?file=${array[i]}`});
            }
            this.setState({
                files: e,
                elements: this.buildElements(e, 0, e.length)
            });

        });
    }

    onDrop(acceptedFiles) {
        this.props.actions.uploadFiles(acceptedFiles, this.props.hub);
        var e = [];
        for (var i = 0; i < acceptedFiles.length; i++) {
            e.push(acceptedFiles[i]);
        }
        if (this.state.files != undefined && this.state.files.length > 0) {
            for (var i = 0; i < this.state.files.length; i++) {
                e.push(this.state.files[i]);
            }
        }
        var newElements = this.addElement(e);
        this.setState({
            ...this.state,
            files: e,
            elements: this.state.elements.concat(newElements)
        });

        // caution, type form is required

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
    buildElements(start, end) {
        var elements = [];
        for (var i = start; i < end || i < this.state.files.length; i++) {
            elements.push(<Drop key={i} index={i} src={this.state.files[i].preview}/>)
        }
        return elements;
    }
    buildElements(files, start, end) {
        var elements = [];
        for (var i = start; i < end || i < files.length; i++) {
            elements.push(<Drop key={i} index={i} src={files[i].preview}/>)
        }
        return elements;
    }

    addElement(file) {
        return [< Drop key = {
                this.state.files.length + 1
            }
            index = {
                this.state.files.length + 1
            }
            src = {
                file.preview
            } />];
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

                        <Infinite elementHeight={50} containerHeight={window.innerHeight} infiniteLoadBeginEdgeOffset={2000} onInfiniteLoad={this.createFiles} loadingSpinnerDelegate={this.elementInfiniteLoad()} isInfiniteLoading={this.state.isInfiniteLoading} timeScrollStateLastsForAfterUserScrolls={1000}>
                            {this.state.elements}
                        </Infinite>

                        <div>
                            slide n°2
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

export default connect(null, mapDispatchToProps)(Hub);
