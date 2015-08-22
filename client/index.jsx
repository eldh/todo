import React from 'react'
import { createStore, combineReducers,
	applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { batchedUpdatesMiddleware } from 'redux-batched-updates'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import './styles/style.scss'

import App from './components/App'

import * as reducers from './reducers'

require('babel/polyfill')

const reducer = combineReducers(reducers)

const storeCreator = applyMiddleware(thunk, promise, batchedUpdatesMiddleware)(createStore)
const store = storeCreator(reducer)

React.render(
	<Provider store={store}>
		{() => <App /> }
	</Provider>,
	document.getElementById('root')
)
