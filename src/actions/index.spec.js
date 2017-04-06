import * as actions from './index'

describe('todo actions', () => {
  it('addMessage should create ADD_MSG action', () => {
    expect(actions.addMessage('Use Redux')).toEqual({
      type: 'ADD_MSG',
      text: 'Use Redux'
    })
  })
})
