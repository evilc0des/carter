import React, { Component } from 'react'
import {
    Redirect
  } from 'react-router-dom'

export class LoginForm extends Component {

    
    constructor(props) {
        super(props);
        this.state = {email: '', pass: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }
    handleSubmit(event) {
        //alert(`A name was submitted: ${this.state.email} with password ${this.state.pass}`);
        event.preventDefault();
        this.props.loginSubmit(this.state.email, this.state.pass);
    }

    render() {
        
        const { attemptingLogin, loginSuccess } = this.props;
        
        /*if(loginSuccess){
            return <Redirect to="/"/>
        }*/

        let spinner;
        if(attemptingLogin) {
            spinner = <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
        }
        else {
            spinner = null;
        }

        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <input name="email" className="form-field" id="email-field" type="email" value={this.state.email} onChange={this.handleChange} placeholder="EMAIL ADDRESS" />
                    <br/>
                    <input name="pass" className="form-field" id="password-field" type="password" placeholder="PASSWORD" value={this.state.pass} onChange={this.handleChange} />
                    <br/>
                    <button className="submit-btn" type="submit">LOGIN</button>
                </form>
                { spinner }
            </div>
        )
    }
}