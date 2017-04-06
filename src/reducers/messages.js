const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MSG':
      var {text} = action
      return [
        ...state,
        text
      ]
    default:
      return state
  }
}

export default messages
