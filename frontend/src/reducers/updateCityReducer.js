/**
 * @fileoverview Reducer for city update.
 */

import {
    UPDATE_CITY_LIST,
    UPDATE_CITY_LOADING_TOGGLE,
    UPDATE_CITY_NETWORK_ACCESS_SUCCESS,
    UPDATE_CITY_NETWORK_ACCESS_FAILURE
} from '../types/utils';

let defaultState = {
    isLoading: false,
    success: '',
    error: ''
}

const updateCityReducer = (state = defaultState, action) => {
    console.log("reducer")
    if (action.type === UPDATE_CITY_LIST) {
        return {
            ...state
        }
    }
    if (action.type === UPDATE_CITY_LOADING_TOGGLE) {
        return {
            ...state,
            isLoading: action.payload
        }
    }
    if (action.type === UPDATE_CITY_NETWORK_ACCESS_FAILURE) {
        return {
            ...state,
            error: action.payload

        }
    }
    if (action.type === UPDATE_CITY_NETWORK_ACCESS_SUCCESS) {
        return {
            ...state,
            success: action.payload
        }
    }
    return state;
}

export default updateCityReducer;