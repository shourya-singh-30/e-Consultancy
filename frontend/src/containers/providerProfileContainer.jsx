import React from "react";
import * as getApprovedProviders from "../actions/getAllProvidersActions";
import ProviderProfile from "../components/ProviderProfile/ProviderProfile";
import * as getproviderUpdate from "../actions/providerupdateAction";
import * as getBuisnessTypes from "../actions/getBusinessTypesAction";
import * as getFinancialService from "../actions/getFinancialServiceAction";
import * as providerUpdate from "../actions/updateProvider";
import * as updateProviderExpertise from "../actions/updateProviderExpertise";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class ProviderProfileContainer extends React.Component {
  render() {
    return (
      <ProviderProfile
        getAllProvider={this.props.getAllProvider}
        providerUpdate={this.props.providerUpdate}
        updateData={this.props.updateData}
        getFinancialServiceList={this.props.getFinancialServiceList}
        updateService={this.props.updateService}
        updateExpertise={this.props.updateExpertise}
        getExpertise={this.props.getExpertise}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    updateData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllProvider: getApprovedProviders.getAllProviders,
      providerUpdate: getproviderUpdate.providerUpdate,
      getFinancialServiceList: getFinancialService.getFinancialServiceList,
      updateService: providerUpdate.providerServiceUpdate,
      updateExpertise: updateProviderExpertise.providerExpertiseUpdate,
      getExpertise: getBuisnessTypes.getBusinessTypes,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderProfileContainer);
