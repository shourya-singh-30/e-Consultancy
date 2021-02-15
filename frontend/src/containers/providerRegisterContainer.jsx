import React from "react";
import ProviderRegister from "../components/ProviderRegister/ProviderRegister";
import { connect } from "react-redux";
import * as getFinancialService from "../actions/getFinancialServiceAction";
import * as getBusinessService from "../actions/getBusinessTypesAction";
import * as getCountriesReducer from "../actions/getUtilsAction";
import * as registerProvider from "../actions/registerProviderAction";
import * as updateCity from "../actions/updateCityAction";
import { bindActionCreators } from "redux";
import * as providerLoginAction from "../actions/loginProviderAction";

class ProviderRegisterContainer extends React.Component {
  render() {
    return (
      <ProviderRegister
        getFinancialServiceList={this.props.getFinancialServiceList}
        getBusinessTypeList={this.props.getBusinessTypeList}
        getCountriesList={this.props.getCountriesList}
        registerProvider={this.props.registerProvider}
        updateCity={this.props.updateCity}
        providerLogin={this.props.providerLogin}
        data={this.props.data}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getFinancialServiceList: getFinancialService.getFinancialServiceList,
      getBusinessTypeList: getBusinessService.getBusinessTypes,
      getCountriesList: getCountriesReducer.getCountriesList,
      registerProvider: registerProvider.providerRegister,
      providerLogin: providerLoginAction.providerLogin,
      updateCity: updateCity.cityUpdate,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderRegisterContainer);
