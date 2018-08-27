import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import {
    BrowserRouter as Router,
  } from 'react-router-dom'
import App from './AsyncApp'

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        )
    }
}