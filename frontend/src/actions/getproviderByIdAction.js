/**
 * @fileoverview Action for getting user details after login.
 */

import { 
    GET_PROVIDER_BY_ID_IS_LOADING,
    GET_PROVIDER_BY_ID_IS_SUCCESS,
    GET_PROVIDER_BY_ID_IS_FAILURE,
} from '../types/provider';
// http://localhost:3000/provider/dashboard
export function getProviderById() {
    return (dispatch) => {
        dispatch(loading(true));
        return fetch('/api/provider/login',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':localStorage.getItem('token')
            }
        }).then(res=> {
            if(res.status === 200){
                return res.json().then(res=> {
                    dispatch(loading(false));
                    dispatch(isSuccess(res));
                })
            } else if(res.status === 500) {
                dispatch(loading(false));
                dispatch(isError('Something went wrong from our end. Please try again later.'))
            } else {
                dispatch(loading(false));
                dispatch(isSuccess(res));
            }
        }).catch(err=> {
            dispatch(loading(false));
            dispatch(isError(err));
        })
    }
}

export function loading(loading) {
    return {
        type: GET_PROVIDER_BY_ID_IS_LOADING,
        payload: loading
    }
}

export function isSuccess(success) {
    return {
        type: GET_PROVIDER_BY_ID_IS_SUCCESS,
        payload: success
    }
}

export function isError(err) {
    return {
        type: GET_PROVIDER_BY_ID_IS_FAILURE,
        payload: err
    }
}