import {
    GET_ALL_PROVIDERS,
    GET_ALL_PROVIDERS_IS_FAILURE, 
    GET_ALL_PROVIDERS_IS_SUCCESS
} from '../types/provider';

let defaultState = {
    isLoading: false,
    error: '',
    success: ''
}

const getAllProvidersDetailsReducer = (state=defaultState, action) => {
    if(action.type === GET_ALL_PROVIDERS){
        return {
            ...state
        }
    }
    if(action.type === GET_ALL_PROVIDERS_IS_FAILURE) {
        return {
            ...state,
            error: action.payload
        }
    }
    if(action.type === GET_ALL_PROVIDERS_IS_SUCCESS) {
        return {
            ...state,
            success: action.payload
        }
    }
    return state;
}

export default getAllProvidersDetailsReducer;