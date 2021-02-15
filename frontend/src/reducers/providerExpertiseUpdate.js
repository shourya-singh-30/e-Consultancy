import {
    PROVIDER_UPDATE_EXPERTISE
} from '../types/provider';

let defaultState = {
    isLoading: false,
    error: '',
    success: ''
}

const providerUpdateExpertiseReducer=(state=defaultState,action)=>{
    if(action.type==PROVIDER_UPDATE_EXPERTISE)
    {
        return {...state,success:action.payload}
    }

    return state;
}

export default providerUpdateExpertiseReducer;