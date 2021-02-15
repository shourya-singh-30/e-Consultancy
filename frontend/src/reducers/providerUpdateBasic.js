
    import { 
        PROVIDER_UPDATE_IS_ERROR, 
        PROVIDER_UPDATE_IS_LOADING, 
        PROVIDER_UPDATE_IS_SUCCESS 
    } from '../types/provider';
    
    let defaultState = {
        isLoading: false,
        success: '',
        error: ''
    }
    
    const updateProviderReducer = (state=defaultState, action) => {
        if(action.type ===PROVIDER_UPDATE_IS_LOADING) {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        if(action.type === PROVIDER_UPDATE_IS_ERROR) {
            return {
                ...state,
                error: action.payload
    
            }
        }
        if(action.type ===  PROVIDER_UPDATE_IS_SUCCESS) {
            return {
                ...state,
                success: action.payload
            }
        }
        return state;
    }
    
    export default updateProviderReducer;
