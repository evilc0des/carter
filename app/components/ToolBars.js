import React, { Component } from 'react'

export class SideBar extends Component {
    render() {
        const { onButtonClick } = this.props

        return (
            <div id="sidebar" className="page-high">
                <div className="nav1">
                    <img src="/img/logo_main.png" alt="" className="main-logo"/>
                    <img src="/img/store.png" alt="" className="nav-item" id="store-nav-button" onClick={e => onButtonClick("STORES")}/>
                    <img src="/img/payment.png" alt="" className="nav-item" id="payments-nav-button" onClick={e => onButtonClick("PAYMENTS")}/>
                </div>
                <div className="nav2">
                    <img src="/img/settings-icon.png" alt="" className="nav-item"/>
                    <img src="/img/user.png" alt="" className="nav-item"/>
                </div>
            </div>
        )
    }
}

class StoreBar extends Component {
    constructor(props) {
        super(props);
        this.state = {createStoreName: ''};

        this.handleCreateStoreNameChange = this.handleCreateStoreNameChange.bind(this);
        this.handleCreateStoreSubmit = this.handleCreateStoreSubmit.bind(this);
    }

    handleCreateStoreNameChange(event) {
        this.setState({createStoreName: event.target.value});
    }

    handleCreateStoreSubmit(event) {
        event.preventDefault();

        if(this.state.createStoreName)
            this.props.createStore(this.state.createStoreName);
    }

    render() {
        const { storeState, onCreateStoreFormToggle, deleteStore, selectStore } = this.props;
        console.log(storeState);
        return (
            <div>
                <h1>STORES</h1>
                <button id="create-store-form-open" className={storeState.createStoreFormOpen ? 'hidden' : ''} onClick={e => onCreateStoreFormToggle(true)}>CREATE STORE</button>
                <form id="create-store-form" onSubmit={this.handleCreateStoreSubmit} className={storeState.createStoreFormOpen ? 'active' : ''}>
                    <input type="text" placeholder="STORE NAME" value={this.state.createStoreName} onChange={this.handleCreateStoreNameChange}/>
                    <button type="submit">CREATE</button>
                    <button onClick={e => onCreateStoreFormToggle(false)}>X</button>
                </form>
                <ul>
                    {storeState.stores.map(store => {
                        return (
                            <li key={store._id} onClick={ e => selectStore(store._id)}>
                                {store.title}
                                <button onClick={
                                    e => {
                                        e.stopPropagation();
                                        deleteStore(store._id);
                                    }
                                }>DELETE</button>
                            </li>)
                    })}
                </ul>
            </div>
        )
    }
}

class PaymentBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen } = this.props;
        return (
            <div>
                <h1>PAYMENTS</h1>
            </div>
        )
    }
}
export class ChildBar extends Component {

    resolveContent(contentType) {

        switch(contentType){
            case 'STORES':
                return <StoreBar onCreateStoreFormToggle={this.props.onCreateStoreFormToggle}
                                 storeState = {this.props.storeState}
                                 createStore={this.props.createStore}
                                 deleteStore={this.props.deleteStore}
                                 selectStore={this.props.selectStore}/>
            case 'PAYMENTS':
                return <PaymentBar/>

        }

    }
    render() {
        const { isOpen, barContent } = this.props;

        return (
            <div id="sidebar-open" className={"page-high" + ( isOpen ? ' active' : '')}>
                { this.resolveContent(barContent) }
            </div>
        )
    }
}