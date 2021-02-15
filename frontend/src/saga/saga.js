import login from '../api/index'
import {takeLatest,put,call, takeEvery} from'redux-saga/effects';

function* providerLogin(){
const response=yield call(login,("abhi@gmail.com","ma@123"));
yield put({action:'PROVIDER_LOGIN_IS_SUCCESS_ASYNC',payload:response})
}

export default function* providerloginAction(action){
    console.log("yes")
yield takeLatest( 'PROVIDER_LOGIN_IS_SUCCESS',providerLogin)

}