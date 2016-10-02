import React from 'react';
import Navigation from './Navigation';
import * as firebase from 'firebase';

export const Dashboard = React.createClass({
   render(){
       return (
           <div>Dashboard <Navigation />
           
               <button><a href="/logout">Logout</a></button>
           
           
           </div>
           
           
       
       )
   }  
});

export const MyHubs = React.createClass({
   render(){
       return (
           <div>MyHubs<Navigation /></div>
       );
   }  
});


export const CreateHub = React.createClass({
     contextTypes: {
      router: React.PropTypes.object.isRequired  
    },
    getInitialState: function(){
        return {
            error: false
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
      /*  var email = this.refs.email.value;
        var 
        */
    },
   render(){
       var errors = this.state.error ? <p> {this.state.error} </p> : ' ';
       return (
           <div className="">
           <h1>Create Hub</h1>
            <form method="post" action="/chub">
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" name="name" type="text" placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label>Is Public</label>
                    <input type="radio" name="ispublic" value="public"/> Public<br/>
                    <input type="radio" name="ispublic" value="notpublic"/> Not public
                </div>
                <div className="form-group">
                    <label>Self Destruct Time</label>
                    <input type="number" name="selfdestruct" className="form-control" placeholder="Number"/>
                </div>
                <div className="form-group">
                    <label>URL</label>
                    <input  type="text" name="url" className="form-control" placeholder="Url(Optional)"/>
                </div>
                {errors}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>   
       );
   }  
});


export const SignUp = React.createClass({
    
    contextTypes: {
      router: React.PropTypes.object.isRequired  
    },
    getInitialState: function(){
        return {
            error: false
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
        var email = this.refs.email.value;
        var pw = this.refs.pw.value;
        
        firebase.auth().createUserWithEmailAndPassword(email, pw)
        .then(this.context.router.replace('/'))
        .catch(this.setState({error: e.message}));
    },
   render: function(){
       var errors = this.state.error ? <p> {this.state.error} </p> : ' ';
       return (
        <div className="">
           <h1>SignUp</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input ref="email" className="form-control" type="email" placeholder="Email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input ref="pw" type="password" className="form-control" placeholder="Password"/>
                </div>
                {errors}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>   
       )
   }  
});

export const SignIn = React.createClass({
   render(){
       return (
           <div>SignIn</div>
       );
   }  
});


export const Admin = React.createClass({
   render(){
       return (
           <div>Admin</div>
       );
   }  
});


export const Profile = React.createClass({
   render(){
       return (
           <div>Profile</div>
       );
   }  
});



