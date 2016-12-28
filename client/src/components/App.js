// --- Imports ----

// >>> React
import React from 'react';

// >>> Containers
import Nav from '../containers/Nav';
import Footer from '../containers/Footer';

// >>> Styles/CSS
import '../styles/index.css';
import '../styles/components.css';
import '../styles/material.min.css';

// create default wrapper for our application which contains the <Nav>, the <Footer> and of course the content through {this.props.children}
export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Nav/>
				{this.props.children}
                <Footer />
            </div>
        );
    }

}
