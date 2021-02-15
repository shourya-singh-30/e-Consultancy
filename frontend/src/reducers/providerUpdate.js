import {
    PROVIDER_UPDATE_SERVICE
} from '../types/provider';

let defaultState = {
    isLoading: false,
    error: '',
    success: ''
}

const providerUpdateServiceReducer=(state=defaultState,action)=>{
    if(action.type==PROVIDER_UPDATE_SERVICE)
    {
        return {...state,success:action.payload}
    }

    return state;
}

export default providerUpdateServiceReducer;