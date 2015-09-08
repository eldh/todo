import React from 'react'
import { createStore, combineReducers,
	applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { batchedUpdatesMiddleware } from 'redux-batched-updates'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import invariant from 'redux-immutable-state-invariant'
import logger from 'redux-logger'
import './styles/style.scss'
import { devTools, persistState } from 'redux-devtools'
import App from './components/App'

import * as reducers from './reducers'

const reducer = combineReducers(reducers)

const middleware = [thunk, promise, batchedUpdatesMiddleware, logger, invariant()]

let storeCreator
if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
	const { devTools, persistState } = require('redux-devtools')
	storeCreator = compose(
		applyMiddleware(...middleware),
		devTools(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	)(createStore)
} else {
	storeCreator = applyMiddleware(...middleware)(createStore)
}

const store = storeCreator(reducer)

const component = <Provider store={store}>{() => <App /> }</Provider>
const dest = document.getElementById('root')

if (__DEVTOOLS__) {
	const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
	React.render(<div>
		{component}
		<DebugPanel top right bottom key="debugPanel">
			<DevTools store={store} monitor={LogMonitor}/>
		</DebugPanel>
	</div>, dest)
	window.React = React // enable debugger
} else {
	React.render(component, dest)
}
