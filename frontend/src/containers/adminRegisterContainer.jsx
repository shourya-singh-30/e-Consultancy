import React from 'react';
import { connect } from 'react-redux';
import * as adminRegisterReducer from '../actions/registerAdminAction';
import * as getCountriesReducer from '../actions/getUtilsAction';

import AdminRegister from '../components/AdminRegister/AdminRegister';
import { bindActionCreators } from 'redux';

class AdminRegisterContainer extends React.Component {
    render() {
        return <AdminRegister 
            AdminRegister={this.props.AdminRegister}
            getCountries={this.props.getCountriesList}
        />
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       AdminRegister: adminRegisterReducer.registerAdmin,
       getCountriesList: getCountriesReducer.getCountriesList,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(AdminRegisterContainer);