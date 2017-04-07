import React from 'react'
import { Page, Toolbar } from 'react-onsenui'
import MessageList from '../containers/MessageList'

const renderToolbar = () => (
  <Toolbar>
    <div className='center'>React Onsen (with Redux) Minimal List</div>
  </Toolbar>
)

const App = () => (
  <Page renderToolbar={renderToolbar}>
    <MessageList />
  </Page>
)

export default App
