// post reducer
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_USER_COMMENTS':
            return {..._.mapKeys(action.payload, '_id'), ...state.user_comments };  
        case 'FETCH_USER_COMMENT':
            return {...state.user_comments, [action.payload._id]: action.payload};  
        case 'EDIT_USER_COMMENT':
            return { ...state.user_comments, [action.payload._id]: action.payload } ;
        case 'WRITE_USER_COMMENT':
            return { ...state.user_comments, [action.payload._id]: action.payload };
        case 'DELETE_USER_COMMENT':
            return _.omit(state.user_comments, action.payload);
        default:
            return state;
    }
}