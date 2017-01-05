import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/drop.css';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {FileC, HubC} from '../../shared/models';
import request from 'superagent';

class Drop extends React.Component {
    constructor(props) {
        super(props);
		this.isImage = this.isFileImage(this.props.file);
    }

	isFileImage(file){
		let type = file[FileC.TYPE];

		if(type === 'image/jpeg' || type === 'image/pjpeg' || type === 'image/png' || type === 'image/webp' || type === 'image/tiff' || type === 'image/x-tiff'){
			return true;
		}
	}

	startDownload(url)
	{
		let link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
	}

    render() {
		let src;
	 	if(this.isImage)
			src = `/downloadfile?id=${this.props.file[FileC.ID]}`;
		else{
			src = "http://placehold.it/350x150";
		}

		const content = (
      <div className="col col-4">
        <div className="drop demo-card-image mdl-card mdl-shadow--2dp" style={{backgroundImage: `url(${src})`}}>
          <div className="mdl-card__title mdl-card--expand"></div>
          <div className="mdl-card__actions">
            <span className="demo-card-image__filename"><span className="dropName">{this.props.file[FileC.NAME_WIHOUT_EXTENSION]}</span><span className="dropExtension">{this.props.file[FileC.EXTENSION] ? `.${this.props.file[FileC.EXTENSION].toLowerCase()}` : ""}</span></span>
            <IconMenu className="dropOptions"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText="Download" onClick={
					  () => {
						 this.startDownload(`http://localhost:3100/downloadfile?id=${this.props.file[FileC.ID]}`);

					  }
				  } />
              <MenuItem primaryText="Sync" />
              <MenuItem primaryText="Share" />
			  <iframe id="my_iframe" style={{display:'none'}}></iframe>
            </IconMenu>
          </div>
        </div>
      </div>
    );
        return (
			<ReactCSSTransitionGroup
		 		transitionName="drop"
		 		transitionEnterTimeout={1500}
		 		transitionLeaveTimeout={1500}
				transitionEnter={true}
      			transitionLeave={true}
				transitionAppear={true}
	 			transitionAppearTimeout={1500}>
				{content}
			</ReactCSSTransitionGroup>
        );
    }

}


export default Drop;
