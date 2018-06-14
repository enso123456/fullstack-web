import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider  } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY)
console.log('STRIPE KEY IS', process.env.NODE_ENV)

ReactDom.render(
	<Provider store={store}><App /></Provider>
, document.querySelector('#root'));

