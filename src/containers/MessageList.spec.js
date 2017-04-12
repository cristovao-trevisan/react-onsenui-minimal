import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/lib/ReactTestUtils'
import $ from 'jquery'
import ons from 'onsenui'
import MessageList from './MessageList'
import reducers from '../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { addMessage } from '../actions'
// fix so the next tests won't try to register duplicated elements
document.registerElement = () => {}

describe('MessageList container', () => {
  var store
  beforeEach(() => {
    store = createStore(reducers)
  })

  it('should render correctly', () => {
    var component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <MessageList />
      </Provider>
    )
    var element = ReactDOM.findDOMNode(component)
    expect(element).not.toBeNull()
    // render list
    expect($(element).find('ons-list').length).toEqual(1)
    // render fab with + icon
    expect($(element).find('ons-fab ons-icon').attr('icon')).toEqual('md-plus')
  })

  it('should render messages', () => {
    var component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <MessageList />
      </Provider>
    )
    var element = ReactDOM.findDOMNode(component)
    expect(element).not.toBeNull()

    store.dispatch(addMessage('Hey'))
    expect($(element).find('ons-list').children().length).toEqual(1)
    expect($(element).find('ons-list').children()[0].children[0].innerHTML).toEqual('Hey')

    store.dispatch(addMessage('Ho'))
    expect($(element).find('ons-list').children().length).toEqual(2)
    expect($(element).find('ons-list').children()[1].children[0].innerHTML).toEqual('Ho')

    store.dispatch(addMessage('Let\' go'))
    expect($(element).find('ons-list').children().length).toEqual(3)
    expect($(element).find('ons-list').children()[2].children[0].innerHTML).toEqual('Let\' go')
  })

  it('should call addMessage when fab is clicked', (done) => {
    var component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <MessageList />
      </Provider>
    )
    var element = ReactDOM.findDOMNode(component)
    expect(element).not.toBeNull()
    // save prompt
    var notificationPrompt = ons.notification.prompt
    // expected state after add message
    store.subscribe(() => {
      expect(store.getState().messages).toEqual(['Awesome Message!'])
      // undo prompt overwrite
      ons.notification.prompt = notificationPrompt
      done()
    })
    // overwrite prompt
    spyOn(ons.notification, 'prompt').and.returnValue(new Promise((resolve) => {
      resolve('Awesome Message!')
    }))
    // simulate click
    ReactTestUtils.Simulate.click($(element).find('ons-fab')[0])
    // prompt call
    expect(ons.notification.prompt).toHaveBeenCalled()
  })
})
