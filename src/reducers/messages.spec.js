import reducer from './messages'

describe('messages reducer', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_MSG', () => {
    var state = reducer([], {type: 'ADD_MSG', text: 'Hey'})
    expect(state).toEqual(['Hey'])

    state = reducer(state, {type: 'ADD_MSG', text: 'Ho'})
    expect(state).toEqual(['Hey', 'Ho'])

    state = reducer(state, {type: 'ADD_MSG', text: "Let's go"})
    expect(state).toEqual(['Hey', 'Ho', "Let's go"])
  })
})
