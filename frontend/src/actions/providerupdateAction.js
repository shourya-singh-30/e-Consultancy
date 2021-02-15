/**
 * @fileoverview Action for user updates
 */

import {
  PROVIDER_UPDATE_IS_ERROR,
  PROVIDER_UPDATE_IS_LOADING,
  PROVIDER_UPDATE_IS_SUCCESS,
} from "../types/provider";

export function providerUpdate(
  email,
  name,
  phone_number,
  password,
  providerImg,
  provider_id
) {
  return (dispatch) => {
    dispatch(loading(true));
    return fetch("/api/provider/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone_number: phone_number,
        password: password,
        providerImg: providerImg,
        provider_id: provider_id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((res) => {
            console.log(res);
            dispatch(loading(false));
            dispatch(isSuccess(res));
          });
        } else if (res.status === 500) {
          dispatch(loading(false));
          dispatch(isError(res.statusText));
        } else {
          dispatch(loading(false));
          return res.json().then((res) => {
            dispatch(isError(res));
          });
        }
      })
      .catch((err) => {
        dispatch(loading(false));
        dispatch(isError(err));
      });
  };
}

export function loading(loading) {
  return {
    type: PROVIDER_UPDATE_IS_LOADING,
    payload: loading,
  };
}

export function isSuccess(success) {
  return {
    type: PROVIDER_UPDATE_IS_SUCCESS,
    payload: success,
  };
}

export function isError(err) {
  return {
    type: PROVIDER_UPDATE_IS_ERROR,
    payload: err,
  };
}
