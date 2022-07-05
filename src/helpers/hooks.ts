type Action = {
  type: 'update';
  value: string;
}

export const walletReducer = (state: string, action: Action) => {
  let newState = state
  switch (action.type) {
    case 'update':
      newState = action.value
      break
    default:
      throw new Error()
  }
  return newState
}
