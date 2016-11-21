import React from 'react';





class HubContent extends React.Component {


    constructor(props) {
        super(props);
    }
    examples(count){
        var examples = [];
        console.log(count);

        for(var i = 0; i < count; i++){
           examples.push(<div key={i} className="hub-grid grid-full" style={{marginTop: '40px'}}>
               <div className="col-4" style={{marginBottom: '40px', height: '190px'}}>
                   <div className="col" style={{paddingLeft: '40px', height: '190px'}}>
                       <div className="hub-card demo-card-image mdl-card shadow-light" style={{height: '190px', width: '190px'}}>
                           <div className="mdl-card__title mdl-card--expand"></div>
                           <div className="mdl-card__actions">
                               <span className="demo-card-image__filename">Drop</span>
                           </div>
                       </div>
                   </div>
               </div>
           </div>);
           console.log(examples);
        }
        console.log(examples);
        return examples;
    }

    render() {



    const examples = this.examples(this.props.examples);
    return <div className="lower-content">
        <div className="sub-content" style={{marginRight: '40px'}}>



            {examples}
        </div>
    </div>;
  }
}

export default HubContent;
