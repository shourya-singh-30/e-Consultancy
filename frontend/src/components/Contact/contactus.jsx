import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './contactstyle.css' ;
import {
    Button, Snackbar, Grid, TextField,
    Card, Avatar, CardActionArea, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Background from '../../assets/img/newbg.jpg';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

var photo_heading={
    color:'#fff', fontSize:'30px', fontWeight: 'bold'
}
var white_content={
    color: '#fff',fontSize: '14px'
}
var contact_button={
    color: '#4d4d4d', background:'#fff'
}
var black_heading={
    color: '#4d4d4d', fontSize: '22px' 
}
var white_heading={
    color: '#fff', fontSize: '22px' 
}
var icon_style={
    color: '#fff', fontSize: '25px', marginLeft: '10px'
}

export default class Home extends React.Component {

   
   state={name:'',email:'',nameError:'',emailError:'',open:false}

   
   shareUs=(e)=>{
    e.preventDefault()
    this.setState({open:true})
    this.setState({successMessage:"Thanks for sharing with us",name:'',email:'',})
    }

   handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
    };

   
    onHandleChange(event)
    {
let value=event.target.value;
let name=event.target.name;
let regex=/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/
let emailregex=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/
switch(name)
{
    case 'name': 
        if(value.length<3)
        {
            this.setState({nameError:"Name should be greater than 3"});
        }
        else if(!regex.test(value)){
            this.setState({nameError:"Name should only contain alphabets"});
        }
        else{
            this.setState({nameError:''})
        }
        break;
     case 'email':
         if(!emailregex.test(value)){
            this.setState({emailError:'Invalid Email Address'});
        }
        else{
            this.setState({emailError:''})
        }
}
    }
    render(){
        return(
            <div>

                <HeaderContainer />

                <div style={{width: '100%', height: '300px', backgroundImage: `url(${Background})`, backgroundSize: '100% 100%'}}>

                    <div class="over_the_image">
                        
                        <div style={{paddingTop: '100px'}}></div>
                        <Typography variant="body" style={photo_heading}>Get in touch with us</Typography>
                        <br/><br/>
                        <Typography variant="body" style={white_content}>
                            We are bound to give you any kind of support, you seek from us.
                        </Typography>
                        <br/><br/>
                        <Button variant="contained" size="small" style={contact_button}>Be with us</Button>

                    </div>

                  
                </div>




                <div class="whole_row">

                    <div class="left_row">

                        <div class="sub_div box_shadow">

                            <div class="padding_div">
                                <Typography variant="body" style={black_heading}>Contact Us</Typography>
                                <br/><br/>
                                <Typography variant="body" style={{color: '#4d4d4d', fontSize: '13px'}}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                    <br/><br/>
                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                    remaining essentially unchanged. 
                                </Typography>
                                <br/><br/>
                                
                            </div>

                        </div>

                        <br/><br/>

                        <div class="sub_div box_shadow">

                            <div class="padding_div">


                                <Typography variant="body" style={black_heading}>
                                    <Link style={{color: '#4d4d4d'}} to={'./feedback'}>
                                        Have Queries! Give Feedback
                                    </Link>
                                </Typography>

                                <br/><br/>
                            
                                {/* <form  autoCapitalize="off" onSubmit={(e)=>this.shareUs(e)}>
                                    <TextField 
                                        id="name"
                                        label="Enter your Name"
                                        name="name"
                                        fullWidth
                                        type="text"
                                        size="small"
                                        variant="outlined"
                                        required
                                        onChange={(event)=>{this.onHandleChange(event)}}
                                        inputProps={{style: {fontSize: 12}}}
                                        style={{marginBottom: 15,width: '40%',borderRadius: '1px'}}
                                    />
                                    <TextField
                                        id="email"
                                        label="Enter your email"
                                        name="email"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="email"
                                        autoFocus
                                        onChange={(event)=>this.onHandleChange(event)}
                                        required
                                        inputProps={{style: {fontSize: 12}}}
                                        style={{marginBottom: 15,width: '40%',marginLeft:'2.5%', borderRadius: '1px'}}
                                    />
                                    
                                    <Row>
                                                            <Col md={5} className='text-danger'>
                                                                <Form.Label>{this.state.nameError}</Form.Label>
                                                            </Col>

                                                            <Col md={6} className='text-danger'>
                                                                <Form.Label>{this.state.emailError}</Form.Label>
                                                            </Col>
                                                        </Row>
                                    <textarea 
                                        placeholder="Please leave us your query"
                                        style={{marginBottom: 15,width: '82.5%', padding: '20px 10px 20px 10px',borderRadius: '1px', border:'1px solid #4d4d4d'}}>

                                    </textarea>

                                    <br/>
                                    <Button variant="contained" size="small" type="submit" style={{backgroundColor: 'rgb(255, 117, 26)', color: '#fff'}}>Share with us</Button>

                                </form> */}
                                
                            </div>

                        </div>

                    </div>



                    <div class="right_row box_shadow">

                        <div class="padding_div">
                            <Typography variant="body" style={black_heading}>Connect with us</Typography>
                            <br/><br/>
                            
                            <Typography variant="body" style={{fontSize: '13px'}}>
                                For support and queries emails us : 
                                <Typography color="primary" style={{fontSize: '13px'}}>yoloj_support@gmail.com</Typography>
                            </Typography>

                            <br/><br/>
                            <Typography variant="body" style={{fontSize: '13px'}}>
                                Meet us here: <br/>

                                Block 52, Road 21, 
                                Street 23, Bangalore
                                India, Pin 829362 

                            </Typography>

                            <br/><br/>
                            <Typography variant="body" style={{fontSize: '13px'}}>
                                Call support at: <br/>

                                +91 7362933882, +91 362938839 

                            </Typography>

                        </div>    

                    </div> 



                </div>


                <br/><br/><br/>

                <div class="footer_div">

                    <div class="padding_footer">

                        <Typography variant="body" style={white_heading}>
                            Build & manage your professional identity, all over your world 
                        </Typography>
                        <br/><br/>
                        <FacebookIcon style={icon_style}/>
                        <InstagramIcon style={icon_style}/>
                        <TwitterIcon style={icon_style}/>

                    </div>

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e,r)=>this.handleClose(e,r)}
                    message={this.state.successMessage}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={(e,r)=>this.handleClose(e,r)}>
                        Hide
                        </Button>
                    </React.Fragment>
                    }
                />
            </div>
        )    
    }    
}