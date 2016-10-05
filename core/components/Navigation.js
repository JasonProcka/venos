import React from 'react'




export default React.createClass({
   render(){
       return (
           <nav class="nav-custom">
    <div class="upper-nav">
        <a class="nav-profile no-decoration" href="#"><i class="flaticon-user-3"></i></a>
        <a class="venos-logo" href="hubs.html"><img src="http://s13.postimg.org/jpy33hcfr/venos_logo_1.png"/></a>
        <a class="nav-search no-decoration" href="#"><i class="flaticon-search"></i></a>
    </div>
    <div class="inner-nav">
    <ul class="upper-items smooth">
        <li class="label">NAVIGATE</li>
        <li class="link smooth"><a href="" class="ripple"><i class="material-icons">home</i> Dashboard<div class="ripple-container"></div></a></li>
        <li class="link smooth"><a href=""><i class="material-icons">fingerprint</i> Creations</a></li>
        <li class="link smooth"><a href=""><i class="material-icons">notifications</i> Notifications</a></li>
        <li class="link smooth"><a href=""><i class="material-icons">cloud</i> Synced Files</a></li>
        <li class="link smooth"><a href=""><i class="material-icons">create</i> Create Hub</a></li>
    </ul>
    <ul class="upper-items smooth">
        <li class="label">RECENT</li>
        <li class="link"><a href=""><i class="material-icons">folder</i> Jason's Vacation 2016</a></li>
        <li class="link"><a href=""><i class="material-icons">folder</i> San Haven Roadtrip</a></li>
        <li class="link selected"><a href=""><i class="material-icons">folder</i> Bismarck Roadtrip</a></li>
    </ul>
    <ul class="upper-items smooth">
        <li class="label">ACCOUNT</li>
        <li class="link"><a href=""><i class="material-icons">folder</i> Profile</a></li>
        <li class="link"><a href=""><i class="material-icons">folder</i> Settings</a></li>
        <li class="link selected"><a href=""><i class="material-icons">folder</i> Upgrade</a></li>
    </ul>
    </div>
    <div class="nav-push-div"></div>
</nav>
       );
   }  
});