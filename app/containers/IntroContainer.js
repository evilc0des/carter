import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LoginForm } from "../components/Login";
import {
    Redirect
  } from 'react-router-dom'
import {
    login
} from '../actions/auth';

class IntroContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { loginSuccess, attemptingLogin, onLoginSubmit} = this.props;

        if(loginSuccess){
            window.location.href = '/';
        }

        return (
            <div className="page-high grid-container intro-container" style={{ width: "100%"}}>
                <img className="logo-img" src="/img/logo_main_h.png"/>
                <LoginForm loginSuccess={loginSuccess} attemptingLogin={attemptingLogin} loginSubmit={onLoginSubmit}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    const { attemptingLogin, loginSuccess } = state.auth;

    return {
        attemptingLogin,
        loginSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginSubmit: (email, pass) => {
            dispatch(login(email, pass));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroContainer)