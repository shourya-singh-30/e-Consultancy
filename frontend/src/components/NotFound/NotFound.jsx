import React from 'react';
import HeaderContainer from '../../containers/headerContainer';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import './NotFound.css';
import { 
    Button, Snackbar, Grid,
    Card, Avatar, CardActionArea, Typography,
} from '@material-ui/core';

import {Link} from 'react-router-dom';

var smiley_style={fontSize: '100px', color: '#0099cc'}
var button_style={color: '#fff', backgroundColor: '#0099cc'}

export default class NotFound extends React.Component {

    render() {
        return(
            <div>
                <HeaderContainer />


                <div style={{marginTop:100, width: '80%',marginLeft: '10%'}} >
                    <SentimentVeryDissatisfiedIcon style={smiley_style}/>
                    <br/>
                    <span class="not_found_heading">OOPS</span>
                    <br/>
                    <Typography>Error : 404 , Page Not Found</Typography>
                    <br/>
                    <Typography variant="body">We looked everywhere, looks like the page your are requesting does not exist</Typography>
                    <br/><br/>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <Button variant="contained" style={button_style}>Visit Home</Button>
                    </Link>
                </div>


            </div>
        )
    }
}