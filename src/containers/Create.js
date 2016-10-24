import React from 'react';
import Footer from '../containers/Footer';
import CreateDialog from '../components/CreateDialog';
import '../styles/create-hub.css';
import '../styles/grid.css';
import ReactDOM from 'react-dom';



class Create extends React.Component {

    componentDidMount(){

    }


    setNameInput(){
        ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }
    setDescribeInput(){
        ReactDOM.findDOMNode(this.refs.describeInput).focus();
    }

    onNext(){
        
    }

    render() {
    return(
        <div className="content">
            <div className="hub-jumbo jumbo-nonav">
                <div className="max-width">
                    <div className="jumbo-content">
                        <div className="jumbo-info">
                            <form action="demo_form.asp">
                                <input className="hub-title" ref="nameInput" type="text" name="usrame" placeholder="Name Here"/>
                                <br/>
                                <input className="hub-description"  ref="describeInput" type="text" name="usrname" placeholder="Describe Here"/>

                            </form>
                        </div>
                        <div className="overlaywrapper"></div>
                            <div className="jumbo-buttons">
                                <a className="mdl-button mdl-js-button mdl-button--raised create-drop">
                                    Create Drop
                                </a>
                                <button id="link-copier" className="mdl-button mdl-js-button copy-link">
                                    Copy Link
                                </button>
                            </div>
                        </div>
                        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                            <header className="mdl-layout__header">
                                <div className="mdl-layout__tab-bar">
                                    <a href="#" className="customtab">Drops</a>
                                    <a href="#" className="customtab">Bio</a>
                                    <a href="#" className="customtab">Discuss</a>
                                </div>
                            </header>
                            <main className="mdl-layout__content">
                                <section className="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-2">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-3">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-4">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-5">
                                    <div className="page-content"></div>
                                </section>
                                <section className="mdl-layout__tab-panel" id="scroll-tab-6">
                                    <div className="page-content"></div>
                                </section>
                            </main>
                        </div>
                    </div>
                </div>
                <div className="lower-content">
                    <div className="sub-content">
                        <div className="hub-grid grid-full">
                            <div className="col-4">
                                <div className="col">
                                    <div className="hub-card demo-card-image mdl-card shadow-light">
                                        <div className="mdl-card__title mdl-card--expand"></div>
                                        <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="col">
                                <div className="hub-card demo-card-image mdl-card shadow-light">
                                    <div className="mdl-card__title mdl-card--expand"></div>
                                    <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="col">
                                <div className="hub-card demo-card-image mdl-card shadow-light">
                                    <div className="mdl-card__title mdl-card--expand"></div>
                                    <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="col">
                                <div className="hub-card demo-card-image mdl-card shadow-light">
                                    <div className="mdl-card__title mdl-card--expand"></div>
                                    <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="col">
                                <div className="hub-card demo-card-image mdl-card shadow-light">
                                    <div className="mdl-card__title mdl-card--expand"></div>
                                    <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="col">gg
                                <div className="hub-card demo-card-image mdl-card shadow-light">
                                    <div className="mdl-card__title mdl-card--expand"></div>
                                    <div className="mdl-card__actions">
                                        <span className="demo-card-image__filename">Drop</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateDialog nameInput={ () => this.setNameInput() } setDescribeInput={ () => this.setDescribeInput() } onNext={ () => this.onNext() }/>
            <div className="overlay"></div>
        </div>

    );
  }
}

export default Create;
