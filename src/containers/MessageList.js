import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Fab, Icon } from 'react-onsenui'
import { addMessage } from '../actions'
import ons from 'onsenui'

class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  onAddClick () {
    console.log(this)
    ons.notification.prompt({
      cancelable: true,
      title: 'What\'s the message?',
      message: ' '
    }).then((message) => {
      if (message) {
        this.props.addMessage(message)
      }
    }).catch(() => {})
  }

  renderMessage (message, index) {
    return (
      <ListItem key={index}>
        <div className='center'>
          {message}
        </div>
      </ListItem>
    )
  }

  render () {
    return (
      <div>
        <List
          style={{marginTop: '10px'}}
          dataSource={this.props.messages}
          renderRow={this.renderMessage}
          />
        <Fab position='bottom right' onClick={::this.onAddClick}>
          <Icon icon='md-plus' />
        </Fab>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addMessage: (message) => dispatch(addMessage(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)
