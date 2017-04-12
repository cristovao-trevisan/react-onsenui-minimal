import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/lib/ReactTestUtils'
import $ from 'jquery'
import App from './App'
import reducers from '../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// fix so the next tests won't try to register duplicated elements
document.registerElement = () => {}

describe('App component', () => {
  var store
  beforeEach(() => {
    store = createStore(reducers)
  })

  it('should render correctly', () => {
    var component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <App />
      </Provider>
    )
    var element = ReactDOM.findDOMNode(component)
    expect(element).not.toBeNull()
    // render toolbar
    expect($(element).find('ons-toolbar .center').html()).toEqual('React Onsen (with Redux) Minimal List')
    // render MessageList
    expect($(element).find('.page__content div ons-list').length).toEqual(1)
  })
})
