import React from 'react';
import Dropzone from 'react-dropzone';
import Database from '../actions/database'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions';
import { connect } from 'react-redux';
import request from 'superagent';
import '../styles/hub.css'
import util from 'util';

class Hub extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.hub);
        this.state = {
            files: []
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
    request.get('/files').query({'hubid': this.props.hub.id}).end((err, res) => {
       console.log("err: " + err);
       console.log("resp: " + res);
       var files = this.state.files;
       var e = [];
       if(this.state.files != undefined && this.state.files.length > 0){
           console.log("e");
           for(var i = 0; i < this.state.files.length; i++){
           e.push(this.state.files[i]);
           }
       }
       var array = JSON.parse(res.text);
       for(var i = 0; i < array.length; i++){
           e.push({preview: `/file?file=${array[i]}`});
       }
       this.setState({files: e});
       console.log(util.inspect(res, { showHidden: true, depth: null }));
   });

    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles);
        this.props.actions.uploadFiles(acceptedFiles, this.props.hub);
        var e = [];
        for(var i = 0; i < acceptedFiles.length; i++){
            e.push(acceptedFiles[i]);
        }
        if(this.state.files != undefined && this.state.files.length > 0){
            console.log("e");
            for(var i = 0; i < this.state.files.length; i++){
            e.push(this.state.files[i]);
            }
        }
        console.log("test1: " + util.inspect(acceptedFiles, { showHidden: true, depth: null }))
        console.log("test2: " + util.inspect(this.state, { showHidden: true, depth: null }));
        console.log("e: " + util.inspect(e, { showHidden: true, depth: null }));
        this.setState({files: e});

// caution, type form is required




    }

    onOpenClick() {
        this.dropzone.open();
    }

    makeFiles(){
        console.log("kp: " + this.state.files.length)
            var i = 0;
            return (
            <div className="hub-grid grid-full">
                { this.state.files.map((file)  =>
                    <div key={i++} className="col-4">
                        <div className="col">
                            {() => {console.log(file.preview);}}
                            <div className="hub-card demo-card-image mdl-card shadow-light" style={{backgroundImage: `url(${file.preview})`}} >
                                <div className="mdl-card__title mdl-card--expand">
                                </div>
                                <div className="mdl-card__actions">
                                    <span className="demo-card-image__filename">{`Desert-Night-Desktop-Wallpaper.png`}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
            );


    }




    render() {
        console.log(this.state.files.length);
        return (
            <Dropzone disableClick={true} style={{width: '100%'}} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                <div className="hub-content">
                    <div className="hub-jumbo">
                        <div className="max-width">
                            <div className="jumbo-content">
                                <div className="jumbo-info">
                                    <h3 className="jumbo-title">{this.props.hub.name}</h3>
                                    <p className="jumbo-description">{this.props.hub.description}</p>
                                </div>
                                <div className="jumbo-buttons">
                                    <button type="button" onClick={() => {this.onOpenClick()}} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent create-drop">
                                        Create Drop
                                    </button>
                                    <button id="link-copier" className="mdl-button mdl-js-button mdl-js-ripple-effect" style={{color: '#FFF'}}>
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                                <header className="mdl-layout__header">
                                    <div className="mdl-layout__tab-bar">
                                        <a href="#scroll-tab-1" className="mdl-layout__tab is-active">Drops</a>
                                        <a href="#scroll-tab-2" className="mdl-layout__tab">Bio</a>
                                    </div>
                                </header>
                                <main className="mdl-layout__content">
                                    <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                                        <div className="page-content"></div>
                                    </section>
                                    <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                                        <div className="page-content"></div>
                                    </section>
                                </main>
                            </div>
                        </div>
                    </div>
                    <div className="lower-content">
                        <div className="sub-content">
                            {this.makeFiles()}

                        </div>
                    </div>
                </div>
            </Dropzone>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Hub);
