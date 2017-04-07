import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'

import App from './components/App'
import reducers from './reducers'

import 'onsenui'
// Onsen UI Styling and Icons
require('onsenui/css/onsenui.css')
require('onsenui/css/onsen-css-components.css')

/* CORDOVA ONLY (uncomment  this)
document.addEventListener('deviceready', ()=>{
  // Cordova sensitive stuff (like plugin usage)
})
// fake deviceready call when using preview (chrome/firefox)
if(!window.device){
  window.setTimeout(function() {
    var e = document.createEvent('Events')
    e.initEvent("deviceready", true, false)
    document.dispatchEvent(e)
  }, 100)
}
*/
// create store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(/*Middleware goes here*/))

// START DOM
const rootElement = document.getElementById('app')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
