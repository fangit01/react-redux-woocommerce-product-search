import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import {createLogger} from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './reducers/allReducers.js';

const logger = createLogger();

const store = createStore(
    allReducers, applyMiddleware(logger,ReduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App /></Provider>
    , document.getElementById('root'));
registerServiceWorker();
