import React from 'react';
import HubHeader from './HubHeader.js';
import HubContent from './HubContent.js';

class Hub extends React.Component {
    render() {
    return
    <div>
        <div className="hub-jumbo jumbo-nonav">
            <div className="max-width">
                <div className="jumbo-content">
                    <div className="jumbo-info">
                        <h3 className="jumbo-title">Mr. Prockas English 12</h3>
                        <p className="jumbo-description">Drop your recent slideshows here!</p>
                    </div>
                    <div className="jumbo-buttons">
                        <a className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent create-drop">
                            Create Drop
                        </a>
                        <button id="link-copier" className="mdl-button mdl-js-button mdl-js-ripple-effect" style="color: #FFF;">
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
        <HubContent />
    </div>
  }
}

export default Hub;
