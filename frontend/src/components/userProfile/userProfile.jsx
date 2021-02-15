import React from 'react';
import {
    Paper, Avatar, Icon,
    Container, Grid, Card, CardHeader, CardContent,
    TextField, Select, MenuItem, CardActions, Link, Button,Snackbar
} from '@material-ui/core';
import { store } from '../../store';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Skeleton from "react-loading-skeleton";
export default class UserProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tabValue: 0,
            userDetails: [],
            countries: [],
            name: '',
            email: '',
            photo:'',
            password: '',
            confirm_password: '',
            errorMessage: '',
            countries_code:'',
            phone_number: '',
            disableName: true,
            disableEmail: true,
            disableNumber: true,
            open:false,
            errors: {
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                phone_number: '',
                message: ''
            },
            updateDetails:true
        }
    }

    delay = (ms) => new Promise(resolve =>
        setTimeout(resolve, ms)
    );

    componentDidMount() {
        document.title = 'Yoloj - User Profile';
        this.props.getUserDetails();
        this.props.getCountries();
        setTimeout(()=>{
            console.log(this.props.userDetails);
            this.setState({
                userDetails: this.props.userDetails.getUserDetails.success
            })
            this.setState({
                countries: this.props.userDetails.getCountries.countries
            })
            if(localStorage.getItem('userProfile')==='false'){
                // setTimeout(() => {
                    this.setState({
                        name: this.state.userDetails[0].name,
                        email: this.state.userDetails[0].email,
                        phone_number: this.state.userDetails[0].phone_number.slice(-10,),
                        countries_code:this.state.userDetails[0].phone_number.slice(0,-10),
                    })
                // }, 1000);
            }
    },1000);
        
    }

    handleClose = (event, reason) => {
      
        if (reason === 'clickaway') {
          return;
        }
        
        this.setState({open: false});
    
       // window.location.reload();
    };

    change = (e) => {
        const { name, value } = e.target;
        // console.log(this.state.countries_code);
        let errors = this.state.errors;
        var regex=/^[A-z]{3,}$/
        switch (name) {

            case 'name':
                // errors.name = value.length < 3 ? 'Name should be more than 3 characters long': null;
                if (value.length < 3) {
                    errors.name = 'Name should be more than 3 characters long'
                }
                else if(!regex.test(value.replace(/\s/g,'')))
                {
                    errors.name="Name should contain only alphabets"
                }
                 else {
                    this.setState({ name: value });
                    errors.name = '';
                }
                break;
            case 'email':
                // errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                if (!value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/)) {
                    errors.email = 'Invalid Email Address';
                } else {
                    this.setState({ email: value });
                    errors.email = '';
                }
                break;
            case 'phone_number':
                // errors.phone_number = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '' : 'Invalid phone number.';
                if (!value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                    errors.phone_number = 'Invalid phone number.';
                } else {
                    this.setState({ phone_number: value });
                    errors.phone_number = '';
                }
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            return null;
        });
        this.handleUpdate();
    }

    //UI part is done need to work on put and 
    updateProfile=(e)=>{
        e.preventDefault();
        // console.log(this.state.userDetails[0]._id);
        this.props.userUpdate( this.state.email, this.state.name,this.state.phone_number,this.state.userDetails[0]._id,this.state.country_code,this.state.photo );
            // console.log(store.getState())
            setTimeout(()=>{
            if(this.props.userDetails.userUpdate.error) {
                this.setState({open: true});
                this.setState({
                    errorMessage: this.props.userDetails.userUpdate.error
                })
            } else{ 
                // console.log("update profile--->",this.state.userDetails)
                // console.log(this.props.userDetails);
                this.setState({open: true});
                this.setState({
                    errorMessage: this.props.userDetails.userUpdate.success.message,
                    disableName:true,
                    disableEmail:true,
                    disableNumber:true,
                    updateDetails: true
                })
                // overriding token and name with new token
                localStorage.setItem('token',this.props.userDetails.userUpdate.success.token);
                localStorage.setItem('userName',this.props.userDetails.userUpdate.success.name);
                this.props.getUserDetails();
                // setTimeout(()=>{
                //     console.log(this.props.userDetails);
                // },1000)
                
            }
        },1000);
        
    }

    handleUpdate =()=>{
        // console.log('inside func')
        if(this.state.disableName===false || this.state.disableEmail===false || this.state.disableNumber===false){
            
            if(this.state.errors.name == "" && this.state.errors.email == "" && this.state.errors.phone_number == ""){
                
                this.setState({updateDetails:false});
            }else{

                this.setState({updateDetails:true});
            }
        }
       
        
    }


    

    handleAccessCode = (e)=> {
        
        this.setState({countries_code:e.target.value});
    }

    render() {
        return (
            <div>
                    {!this.state.userDetails.length ? 
                        <div class="d-md-flex ml-md-5">
                            <div class="d-none col-md-3 text-left d-md-flex" style={{height:"60px"}}>
                                <Skeleton circle={true} height={50} width={50}/>
                                <Skeleton height={40} width={200} style={{marginLeft:"10px"}}/>
                            </div>
                            <div class="ml-3 col-10 col-md-8 text-left">
                                <Skeleton height={50} width={300} />
                                <br/>
                                <br/>
                                <Skeleton height={30} width={80}/>
                                <br/>
                                <Skeleton height={40} width={600}/>
                                <br/>
                                <br/>
                                <Skeleton height={30} width={80}/>
                                <br/>
                                <Skeleton height={40} width={600}/>
                                <br/>
                                <br/>
                                <Skeleton height={30} width={80}/>
                                <br/>
                                <Skeleton height={40} width={600}/>
                            </div>
                        </div> :
                            <div>
                            <div class="d-md-flex ml-md-5">
                                <div class="border d-none rounded-sm col-md-3 shadow-lg text-left d-md-flex" style={{height:"60px",backgroundColor:"white"}}>
                                    <AccountCircleTwoToneIcon
                                        color="primary"
                                        style={{ fontSize: 60 }}
                                    />
                                    <div style={{lineHeight:"60px"}}><span style={{display:"inline-block",fontSize:"12px"}}>Hello</span>, <strong style={{fontSize:"16px"}}>{this.state.name}</strong></div>
                                </div>
                                <div class="border rounded-sm ml-3 col-10 col-md-8 shadow-lg py-4" style={{backgroundColor:"white"}}>
                                    <h4 class="text-left mb-4">Personal Information</h4>
                                    <Form onSubmit={(e)=>{this.updateProfile(e)}}>
                                                    <Form.Group controlId="formGroupName">
                                                        <Row>
                                                            <Col xs={1} md={1}>
                                                                <Form.Label>Name</Form.Label>
                                                            </Col>
                                                        </Row>
                                                        <Row className="show-grid">
                                                            <Col xs={8} md={10}>
                                                                <Form.Control type="name"
                                                                    placeholder="Enter Name"
                                                                    name='name'
                                                                    value={this.state.name}
                                                                    disabled={this.state.disableName}
                                                                    onChange={(e) => this.change(e)} />
                                                            </Col>
                                                            <Col xs={2} md={2}>
                                                                <Button color="secondary" onClick={() => { this.setState({ disableName: false })}}>Edit</Button>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className='text-danger'>
                                                                <Form.Label>{this.state.errors.name}</Form.Label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group controlId="formGroupEmail">
                                                        <Row>
                                                            <Col xs={1} md={1}>
                                                                <Form.Label>Email</Form.Label>
                                                            </Col>
                                                        </Row>
                                                        <Row className="show-grid">
                                                            <Col xs={8} md={10}>
                                                                <Form.Control type="email"
                                                                    placeholder="Enter email"
                                                                    name='email'
                                                                    value={this.state.email}
                                                                    disabled={this.state.disableEmail}
                                                                    onChange={(e) => this.change(e)} />
                                                            </Col>
                                                            <Col xs={2} md={2}>
                                                                <Button color="secondary" onClick={() => { this.setState({ disableEmail: false })}}>Edit</Button>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col >
                                                                <Form.Label className='text-danger'>{this.state.errors.email}</Form.Label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <Form.Group controlId="formGroupPhoneNumber">
                                                        <Row>
                                                            <Col xs={1} md={1}>
                                                                <Form.Label>Phone</Form.Label>
                                                                {/* Phone Number */}
                                                            </Col>
                                                        </Row>
                                                        <Row className="show-grid">
                                                            <Col xs={8} md={10}>
                                                                <Row className="show-grid">
                                                                    <Col xs={4} md={2}>
                                                                        <Form.Control as="select" custom
                                                                         disabled={this.state.disableNumber}
                                                                         value={this.state.countries_code}
                                                                        onChange={this.handleAccessCode}
                                                                        >
                                                                            {
                                                                                (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                                                                    return <option key={index} value={item.dial_code} autoWidth={true}>{item.dial_code}</option>
                                                                                }) : <span>Loading</span>
                                                                            }
                                                                        </Form.Control>
                                                                       
                                                                    </Col>
                                                                    <Col xs={8} md={10}>
                                                                        <Form.Control
                                                                            type="number"
                                                                            name='phone_number'
                                                                            placeholder="Enter phone number"
                                                                            value={this.state.phone_number}
                                                                            disabled={this.state.disableNumber}
                                                                            onChange={(e) => this.change(e)} />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col xs={2} md={2}>
                                                                <Button color="secondary" onClick={() => { this.setState({ disableNumber: false }) }}>Edit</Button>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col >
                                                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                                <Form.Label className='text-danger'>{this.state.errors.phone_number}</Form.Label>
                                                            </Col>
                                                        </Row>
                                                    </Form.Group>
                                                    <br/>
                                                    <Button variant="contained" type="submit" color="primary" disabled={this.state.updateDetails} >Update</Button>
                                    </Form>
                                </div>
                            </div>
                            </div>
                    }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e,r)=>this.handleClose(e,r)}
                    message={this.state.errorMessage}
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
