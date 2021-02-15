import React from 'react';
import UserProfile from '../components/userProfile/userProfile';
import * as updateUserAction from '../actions/userUpdateAction';
import * as getUserDetailsAction from '../actions/getUserDetailsAction';
import * as getCountriesReducer from '../actions/getUtilsAction';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserProfileContainer extends React.Component {
    render() {
        return(
            <UserProfile 
                getUserDetails = {this.props.getUserDetails}
                getCountries={this.props.getCountriesList}
                userDetails={this.props.userDetails}
                userUpdate = {this.props.userUpdate}
            />
        )
    }
}

const mapStateToProps = (state)=>{
    return {
    userDetails: state
}
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        userUpdate: updateUserAction.userUpdate,
        getUserDetails: getUserDetailsAction.getUserDetails,
        getCountriesList: getCountriesReducer.getCountriesList,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
