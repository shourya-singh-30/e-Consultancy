import React from "react";
import { connect } from "react-redux";
import * as userRegisterReducer from "../actions/registerUserAction";
import * as getCountriesReducer from "../actions/getUtilsAction";
// import { getCountriesList } from '../actions/getUtilsAction';
import * as userLogin from "../actions/userLoginAction";

import Register from "../components/Register/Register";
import { bindActionCreators } from "redux";

class RegisterContainer extends React.Component {
  render() {
    return (
      <Register
        userRegister={this.props.userRegister}
        getCountries={this.props.getCountriesList}
        userData={this.props.userData}
        userLogin={this.props.userLogin}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      userRegister: userRegisterReducer.registerUser,
      getCountriesList: getCountriesReducer.getCountriesList,
      userLogin: userLogin.userLogin,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
