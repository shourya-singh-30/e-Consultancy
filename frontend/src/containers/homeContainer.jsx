import React from "react";
import Home from "../components/Home/Home";
import { connect } from "react-redux";
import * as searchProviderByName from "../actions/searchByNameAction";
import * as getApprovedProviders from "../actions/getAllProvidersActions";
import * as getFinancialService from "../actions/getFinancialServiceAction";
import * as getBusinessType from "../actions/getBusinessTypesAction";
import * as getCountriesReducer from "../actions/getUtilsAction";
import * as getAllProvidersDetails from "../actions/getAllProvidersDetailsAction";
import { bindActionCreators } from "redux";
class HomeContainer extends React.Component {
  render() {
    return (
      <Home
        searchByName={this.props.searchByName}
        getAllProvider={this.props.getAllProvider}
        getAllService={this.props.getAllService}
        getAllBusinessType={this.props.getAllBusinessType}
        getCountriesList={this.props.getCountriesList}
        getAllProvidersDetails={this.props.getAllProvidersDetails}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchByName: searchProviderByName.searchProviderByName,
      getAllProvider: getApprovedProviders.getAllProviders,
      getAllService: getFinancialService.getFinancialServiceList,
      getAllBusinessType: getBusinessType.getBusinessTypes,
      getCountriesList: getCountriesReducer.getCountriesList,
      getAllProvidersDetails: getAllProvidersDetails.getAllProvidersDetails,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(HomeContainer);
