// auth reducer

const INITIAL_STATE ={
    isSignedIn: null,
    userInfo: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {...state, isSignedIn: true, userInfo: action.payload };
        case 'LOG_OUT':
            return {...state, isSignedIn: false, userInfo: null };
        default:
            return state;
    }
}