// CONSTANTS
const SET_PUBLIC_KEY='SET_PUBLIC_KEY';
const SET_PRIVATE_KEY='SET_PRIVATE_KEY';
const SET_BUFFER='SET_BUFFER';
const SET_PATH='SET_PATH';
const SET_NOTIF='SET_NOTIF';
const SET_LOADING='SET_LOADING';
const SET_WEB3='SET_WEB3';
const SET_ACCOUNTS='SET_ACCOUNTS';
const SET_CONTRACT='SET_CONTRACT';

// REDUCER
const Reducer = (state, action) => {
  switch(action.type) {
    case SET_PUBLIC_KEY:
      return {...state, publicKey: action.payload}
    case SET_PRIVATE_KEY:
      return {...state, privateKey: action.payload}
    case SET_BUFFER:
      return {...state, buffer: action.payload}
    case SET_PATH:
      return {...state, path: action.payload}
    case SET_NOTIF:
      return {...state,
        msg: action.payload.msg,
        success: action.payload.success}
    case SET_LOADING:
      return {...state, loading: action.payload}
    case SET_WEB3:
      return {...state, web3: action.payload}
    case SET_ACCOUNTS:
      return {...state, accounts: action.payload}
    case SET_CONTRACT:
      return {...state, contract: action.payload}
    default:
      return state
  }
}

export default Reducer;
