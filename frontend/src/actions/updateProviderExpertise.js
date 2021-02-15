import { 
     PROVIDER_UPDATE_EXPERTISE
} from '../types/provider'

export function providerExpertiseUpdate(pid,expertise) {
    return(dispatch) => {
       
        return fetch('/api/provider/update/expertise/'+pid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify({

              expertise:expertise
         
            })
        }).then(res=> {
            if(res.status === 200) {
                return res.json().then(res=>{
                   
                    dispatch(isSuccess(res));
                })
            } else if (res.status === 500) {
                
                dispatch(isError(res.statusText));
            } else {
                
                return res.json().then(res=> {
                    dispatch(isError(res));
                })
            }
        }).catch(err=> {
           
            dispatch(isError(err));
        })
    }
}

export function isSuccess(success) {
    return {
        type: PROVIDER_UPDATE_EXPERTISE,
        payload: success
    }
}

export function isError(err) {
    return {
        type: "PROVIDER_UPDATE_IS_ERROR",
        payload: err
    }
}