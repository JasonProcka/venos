import React from 'react'
import { Link } from 'react-router'
export default React.createClass({
  render() {
    return <div className="content">
    <div className="container">
        <div className="venos_logo display-inline-block">
            <a href="dashboard" className="link txt-center"><img src="http://s12.postimg.org/vmv84im7h/venos_logo.png" style={{width: '50px', height: '50px', marginLeft: '5px'}}/></a>
        </div>
    <div className="info-wrapper">
        <h2 className="header-top txt-white txt-center smooth">Welcome To Venos!</h2>
        <h3 className="header-bottom txt-white txt-center smooth very-light">Quick Sharing for Planet Earth</h3>
        <div className="content-buttons">
            <a className="buttons top-button btn btn-lg btn-wide bg-white txt-gray no-border" href="" role="button">Learn More</a>
            <a className="buttons bottom-button btn btn-primary btn-lg btn-wide txt-white bg-blue no-border" href="/create" role="button">Create Hub</a>
        </div>
        <div className="skip-btn">
            <a href="/login" className="smooth txt-white txt-center link">Login</a><span>or</span>
            <a href="/signup" className="smooth txt-white txt-center link">Register</a>
            <Link to="/dashboard" className="smooth txt-white txt-center link">Dashboard</Link>
        </div>
    </div>
    </div>
</div>
  }
})