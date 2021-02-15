/**
 * @fileoverview Reducer for approving an unapproved provider from admin side.
 */

import {
    GET_PROVIDER_BY_ID,
    GET_PROVIDER_BY_ID_IS_FAILURE, 
    GET_PROVIDER_BY_ID_IS_SUCCESS
} from '../types/provider';

let defaultState = {
    isLoading: false,
    error: '',
    success: ''
}

const getProviderByIdReducer = (state=defaultState, action) => {
    
    if(action.type === GET_PROVIDER_BY_ID){
        return {
            ...state
        }
    }
    if(action.type === GET_PROVIDER_BY_ID_IS_FAILURE) {
        return {
            ...state,
            error: action.payload
        }
    }
    if(action.type === GET_PROVIDER_BY_ID_IS_SUCCESS) {
        return {
            ...state,
            success: action.payload
        }
    }
    return state;
}

export default getProviderByIdReducer;