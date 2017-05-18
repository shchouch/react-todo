import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/todo.js';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers/index';

const store = createStore(rootReducer);


ReactDOM.render(
    <Provider store={store}>
        <Todo />
    </Provider>
    , document.getElementById("app"));