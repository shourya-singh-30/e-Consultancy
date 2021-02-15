import React from 'react';
import { Component, Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Typography, LinearProgress, FormGroup } from '@material-ui/core';
import HeaderContainer from '../../containers/headerContainer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { store, history } from '../../store';
import "./Home.css";

class ChooseLoginRegister extends Component {

    state = {
        url :"",
        loading : false,
        redirect : false,
        cartItems : []
    }
    handleProfile = () => {
        if (localStorage.getItem("userProfile")) {
          localStorage.setItem("userProfile", false);
          history.push("/dashboard");
        }
        if (localStorage.getItem("providerProfile")) {
          localStorage.setItem("providerProfile", false);
          // history.push('/provider/dashboard');
          history.replace(
            `/provider/profile?id=${localStorage.getItem("providerId")}`
          );
          window.location.reload();
        }
      };
    logout = () => {
        if(localStorage.getItem("userProfile")){
            localStorage.removeItem("token");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("providerProfile");
            localStorage.removeItem("providerName");
            localStorage.removeItem("providerId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            history.push("/login");
        }else if(localStorage.getItem("providerProfile")){
            localStorage.removeItem("token");
            localStorage.removeItem("userProfile");
            localStorage.removeItem("providerProfile");
            localStorage.removeItem("providerName");
            localStorage.removeItem("providerId");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            history.push("/provider/login");
        }
        
        //   sessionStorage.removeItem("ProviderProfile")
        //   window.location.reload(false);
        
      };

    render() {

        return (
            <div>
                {this.loading &&
                <LinearProgress/>}
                <HeaderContainer />
                {localStorage.getItem("userId") == undefined && localStorage.getItem("providerId") == undefined ? (
                    <Grid style={{margin:"10px"}}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem class="shadow-sm text-left option p-2 mb-2" button onClick={()=>{return history.push('/login')}}>
                       
                        <ListItemText class="pl-3" primary="User Login" />
                        </ListItem>
                        <ListItem class="shadow-sm text-left option p-2 mb-2" button onClick={()=>{return history.push('/register')}}>
                        
                        <ListItemText class="pl-3" primary="User Register" />
                        </ListItem>
    
                        <ListItem class="shadow-sm text-left option p-2 mb-2" button onClick={()=>{return history.push('/provider/login')}}>
                       
                        <ListItemText class="pl-3" primary="Provider Login" />
                        </ListItem>
                        <ListItem class="shadow-sm text-left option p-2 mb-2" button onClick={()=>{return history.push('/provider/register')}}>
                        
                        <ListItemText class="pl-3" primary="Provider Register" />
                        </ListItem>
                    </List>
                    </Grid>
                ):(
                    <Grid style={{margin:"10px"}}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={this.logout}>
                   
                    <ListItemText primary="Logout " />
                    </ListItem>
                    <ListItem button onClick={this.handleProfile}>
                    
                    <ListItemText primary={
                        <React.Fragment>
                            {localStorage.getItem("userId") !=undefined ? (
                                "Welcome "+localStorage.getItem("userName")
                            ):("Welcome "+localStorage.getItem("providerName"))}
                        </React.Fragment>
                    } />
                    </ListItem>

                </List>
                </Grid>
                )}
                
                </div>
        );
    }
}

export default ChooseLoginRegister;