import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Switch,
    withRouter
  } from 'react-router-dom'
import {
    toggleSideBarButton,
    fetchContentIfNeeded,
    invalidateStores,
    toggleStoreCreateButton, createStore, initStoreDelete, selectStore
} from '../actions/manager';
import { SideBar, ChildBar } from '../components/ToolBars';
import ManagerContainer from './ManagerContainer';
import IntroContainer from './IntroContainer';
import UIContainer from "./UIContainer" ;

class App extends Component {
    constructor(props) {
        super(props);

    }

    /*componentDidUpdate(prevProps) {
        if(this.props.selectedStore !== prevProps.selectedStore) {
            const { dispatch, selectedStore } = this.props;
            dispatch(fetchStore(selectedStore));
        }
    }

    handleChange(nextStore) {
        this.props.dispatch(selectStore(nextStore));
        this.props.dispatch(fetchStore(nextStore));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedStore } = this.props;
        dispatch(invalidateStores())
        dispatch(fetchStoresIfNeeded())
    }
    

    <SideBar onButtonClick={onButtonClick}/>
                <ChildBar isOpen={childBarOpen}
                          barContent={childBarContent}
                          storeState={storeState}
                          onCreateStoreFormToggle={onCreateStoreFormToggle}
                          createStore={createStore}
                          deleteStore={deleteStore}
                          selectStore={selectStore}/>
                          <Switch>
                    <Route exact path="/" component={ManagerContainer}/>
                    <Route path="/" render={props =>
                        loginSuccess ? (
                            <ManagerContainer {...props} />
                        ) : null
                    }/>
                </Switch>
    */

    render() {
        const { childBarOpen,
            childBarContent,
            storeState,
            onButtonClick,
            onCreateStoreFormToggle,
            createStore,
            deleteStore,
            selectStore,
            loginSuccess
        } = this.props;
        return (
            <div className="main-container page-high" style={{ width: "100%"}}>
                <UIContainer/>
                
                <Switch>
                    <Route path="/login" component={IntroContainer}/>
                    <Route path="/" component={ManagerContainer}/>
                </Switch>
                
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: barContent => {
            dispatch(toggleSideBarButton(barContent));
            dispatch(fetchContentIfNeeded(barContent));
        },
        fetchStore: () => {
            dispatch(fetchContentIfNeeded('STORES'));
        },
        onCreateStoreFormToggle: state => {
            dispatch(toggleStoreCreateButton(state));
        },
        createStore: storeName => {
            dispatch(createStore(storeName));
        },
        deleteStore: store => {
            dispatch(initStoreDelete(store))
        },
        selectStore: store => {
            dispatch(selectStore(store))
        }
    }
}

function mapStateToProps(state) {
    const { isOpen: childBarOpen, content: childBarContent } = state.toolbar;
    return {
        loginSuccess: state.auth.loginSuccess,
        childBarOpen,
        childBarContent,
        storeState: state.storeState
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))