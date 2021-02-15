import React from 'react';
import Topprofiles from '../components/Home/Topprofiles';
import { connect } from 'react-redux';
import * as searchProviderByName from '../actions/searchByNameAction';
import * as getApprovedProviders from '../actions/getAllProvidersActions';
import * as getFinancialService from '../actions/getFinancialServiceAction';
import * as getBusinessType from '../actions/getBusinessTypesAction';
import * as getCountriesReducer from '../actions/getUtilsAction';
import { bindActionCreators } from 'redux';
class Topprofilescontainer extends React.Component {
    render() {
        return <Topprofiles
            searchByName = {this.props.searchByName}
            getAllProvider = {this.props.getAllProvider}
            getAllService = {this.props.getAllService}
            getAllBusinessType = {this.props.getAllBusinessType}
            getCountriesList={this.props.getCountriesList}
        />
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        searchByName: searchProviderByName.searchProviderByName,
        getAllProvider: getApprovedProviders.getAllProviders,
        getAllService: getFinancialService.getFinancialServiceList,
        getAllBusinessType: getBusinessType.getBusinessTypes,
        getCountriesList: getCountriesReducer.getCountriesList
    }, dispatch)
} 

export default connect(null, mapDispatchToProps)(Topprofilescontainer)