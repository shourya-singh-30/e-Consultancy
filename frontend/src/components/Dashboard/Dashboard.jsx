import React from 'react';
import UserProfileContainer from '../../containers/userProfleContainer';
import LinearProgress from '@material-ui/core/LinearProgress';
import HeaderContainer from "../../containers/headerContainer";

export default class Dashboard extends React.Component {

    constructor(props) {
        super();
        this.state = {
            load:false,
        }
    }

    componentDidMount() {
        document.title = 'Yoloj - User Profile';
        if(localStorage.getItem('userProfile')==='true'){
            this.setState({
                load: true
            })
        }
    }

    render() {
        return(
            <div>
                { this.state.load ?
                    <LinearProgress color="secondary" />
                :<div>
                    <HeaderContainer />
                <div style={{paddingTop:100}}>
                    <UserProfileContainer />
                </div>
                </div>
                }
            </div>
        )
    }
}