// post reducer
import _ from 'lodash';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return {..._.mapKeys(action.payload, '_id'), ...state };  
        case 'FETCH_POST':
            return {...state, [action.payload._id]: action.payload};  
        case 'EDIT_POST':
            return { ...state.posts, [action.payload._id]: action.payload } ;
        case 'WRITE_POST':
            return { ...state.posts, [action.payload._id]: action.payload };
        case 'DELETE_POST':
            return _.omit(state.posts, action.payload);
        case 'INCREASE_COMMENT':
            return { ...state, [action.payload._id]: action.payload };
        case 'INCREASE_LIKES':
            return { ...state, [action.payload._id]: action.payload };
        default:
            return state;
    }
}