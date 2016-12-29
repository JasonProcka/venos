
// --- Imports ----

// >>> React
import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';

// >>> Redux
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions';

// >>> Containers
import HubHeader from './HubHeader';

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






class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {itemCount: 0}
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
        console.log(this.props.hub);
        this.state = {
            files: [],
            slideIndex: 0
        };
        this.onOpenClick = this.onOpenClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.makeFiles = this.makeFiles.bind(this);
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

    componentDidMount(){
        request.get('/files').query({'hubid': this.props.hub.id}).end((err, res) => {
            console.log("err: " + err);
            console.log("resp: " + res);
            var files = this.state.files;
            var e = [];
            if (this.state.files != undefined && this.state.files.length > 0) {
                console.log("e");
                for (var i = 0; i < this.state.files.length; i++) {
                    e.push(this.state.files[i]);
                }
            }
            var array = JSON.parse(res.text);
            for (var i = 0; i < array.length; i++) {
                e.push({preview: `/file?file=${array[i]}`});
            }
            this.setState({files: e});
            console.log(util.inspect(res, {
                showHidden: true,
                depth: null
            }));
        });
    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles);
        this.props.actions.uploadFiles(acceptedFiles, this.props.hub);
        var e = [];
        for (var i = 0; i < acceptedFiles.length; i++) {
            e.push(acceptedFiles[i]);
        }
        if (this.state.files != undefined && this.state.files.length > 0) {
            console.log("e");
            for (var i = 0; i < this.state.files.length; i++) {
                e.push(this.state.files[i]);
            }
        }
        console.log("test1: " + util.inspect(acceptedFiles, {
            showHidden: true,
            depth: null
        }))
        console.log("test2: " + util.inspect(this.state, {
            showHidden: true,
            depth: null
        }));
        console.log("e: " + util.inspect(e, {
            showHidden: true,
            depth: null
        }));
        this.setState({...this.state, files: e});

        // caution, type form is required

    }

    onOpenClick() {
        this.dropzone.open();
    }

    makeFiles() {
        console.log("kp: " + this.state.files.length)
        var i = 0;

        return (
            <div className="hub-grid">
                {this.state.files.map((file) => <Drop key={i++} src={file.preview}>Filename</Drop>)}
            </div>
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
        return (
          <div className="small-wrapper">
            <Dropzone disableClick={true} style={{
                width: '100%'
              }} ref={(node) => {
                this.dropzone = node;
              }} onDrop={this.onDrop}>
              <HubHeader />
              <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>
                <div>
                  {this.makeFiles()}
                </div>
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
