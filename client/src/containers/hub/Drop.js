import React from 'react';

class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {itemCount: 0}
    }
    render() {
        return (
            <div style={{backgroundImage: `url(${this.props.src})`}} className="drop">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }

}


export default Drop;
