import React from "react";
import HeaderContainer from "../../containers/headerContainer";
import "./ProviderLogin.css";
import {
  Grid,
  Container,
  Card,
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Snackbar,
  Button,
  Typography,
} from "@material-ui/core";
import { history, store } from "../../store";
import log from "../../utils/logger.service";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.png";
import Skeleton from "react-loading-skeleton";

var button_style = {
  backgroundColor: "#0099cc",
  color: "#fff",
  padding: "10px 0px 10px 0px",
  width: "80%",
  borderRadius: "1px",
};

export default class ProviderLogin extends React.Component {
  constructor(props) {
    super();

    this.state = {
      email: "",
      setemail: "", // unused
      password: "",
      errorMessage: "",
      open: false,
      confirmPassword: "",
      password: "",
      phoneNumber: "",
      errors: {
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
      },
      isLoading: true,
      forgot: false,
      change: false,
    };
  }

  componentDidMount() {
    document.title = "Yolo - Provider Login";
    this.setState({ isLoading: false });
    log("User is on Provider Login");
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  change = (e) => {
    const { name, value } = e.target;

    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
          ? ""
          : "Invalid Email Address";
        break;
      case "password":
        errors.password = value.match(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        )
          ? ""
          : "Invalid Password";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          this.state.password === value
            ? ""
            : "Confirm Password should be equal to password";
        break;
      case "phoneNumber":
        errors.phoneNumber = value.match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
          ? ""
          : "Invalid phone number.";
        break;
      default:
        break;
    }
    if (
      errors.email == "" &&
      errors.password == "" &&
      errors.confirmPassword == "" &&
      errors.phoneNumber == "" &&
      this.state.email != "" &&
      this.state.password != "" &&
      this.state.confirmPassword != "" &&
      this.state.phoneNumber != ""
    ) {
      this.setState({ errors, [name]: value, open: false, change: true });
    } else {
      this.setState({ errors, [name]: value, open: false, change: false });
    }
  };

  login = (e) => {
    e.preventDefault();

    this.props.providerLogin(this.state.email, this.state.password);
    setTimeout(() => {
      if (this.props.data.providerLogin.error) {
        this.setState({
          open: true,
        });
        this.setState({
          errorMessage: this.props.data.providerLogin.error,
        });
      } else {
        localStorage.setItem(
          "token",
          this.props.data.providerLogin.success.token
        );
        // setName(this.props.data.providerLogin.success[0].name);
        localStorage.setItem("providerProfile", true);
        //window.localStorage.setItem('setemail',this.props.data.providerLogin.success.email);
        localStorage.setItem(
          "providerId",
          this.props.data.providerLogin.success.partnerId
        );
        localStorage.setItem(
          "providerName",
          this.props.data.providerLogin.success.name
        );
        //console.log("provider id  is-----",this.props.data.providerLogin.success.providerId);
        // window.localStorage.setItem('providerData',JSON.stringify(this.props.data.providerLogin.success.partnerData));
        //    setTimeout(()=>{history.push(`/provider/profile?id=${localStorage.getItem('providerId')}`)},1000)

        history.push(
          `/provider/profile?id=${localStorage.getItem("providerId")}`
        );
      }
    }, 1000);
  };
  handleForgotPassword = () => {
    this.setState({ forgot: true });
  };
  closeForgot = () => {
    this.setState({
      forgot: false,
      email: "",
      password: "",
      errors: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
      phoneNumber: "",
      confirmPassword: "",
    });
  };
  update = async () => {
    // console.log("hiiii1");
    const response = await this.props.providerUpdate(
      this.state.email,
      this.state.name,
      this.state.phoneNumber,
      this.state.password,
      this.state.providerImg,
      this.state.providerData.partnerId
    );

    // this.handleClose();
    console.log(
      "success msg -- ",
      this.props.updateData.providerUpdate.success.message
    );
    if (this.props.updateData.providerUpdate.error) {
      this.setState({
        open: true,
        open1: true,
        errorMessage: this.props.updateData.providerUpdate.error,
      });
      // this.setState({
      //   open1: true,
      //   errorMessage: this.props.updateData.providerUpdate.error,
      // });
    } else {
      console.log("else conditions ---");
      console.log(store.getState().providerUpdate.success);
      // console.log("update profile--->",this.statupdateData.provider                     // console.log(this.propsupdateData.provider                      this.setState({open: true});

      // overriding token and name with new token
      // console.log("jjjj",this.props.updateData);

      console.log("updated ---- Store  ", store.getState());

      localStorage.setItem(
        "token",
        store.getState().providerUpdate.success.token
      );
      localStorage.setItem(
        "providerName",
        store.getState().providerUpdate.success.name
      );
      localStorage.setItem(
        "providerId",
        store.getState().providerUpdate.success.partnerId
      );
      // setTimeout(()=>{this.providerDetail()},500);
      // this.props.getUserDetails();
      // setTimeout(()=>{
      //     console.log(this.props.userDetails);
      // },1000)

      // this.setState({
      //   open1: true,
      //   errorMessage: this.props.updateData.providerUpdate.success.message,
      // });
      setTimeout(() => {
        history.replace(
          `/provider/profile?id=${localStorage.getItem("providerId")}`
        );
        window.location.reload();
        // this.providerDetail();
      }, 100);
    }

    // console.log("hiiii2");

    // console.log("hii3");
    // console.log(this.props.updateData.providerUpdate);

    // this.providerDetail();
    // setTimeout(()=>{this.providerDetail()},500);
  };

  render() {
    console.log(history);
    return (
      <div>
        <div>
          <HeaderContainer />

          <div className="section box_shadow">
            {this.state.isLoading ? (
              <div
                class="login_background"
                style={{ marginTop: "20px", textAlign: "left" }}
              >
                <div style={{ marginLeft: "10px" }}>
                  <Skeleton height={40} width={80} />
                  <br />
                  <br />
                  <Skeleton
                    height={30}
                    width={400}
                    count={2}
                    style={{ marginTop: "10px" }}
                  />
                  <br />
                  <br />
                  <Skeleton
                    height={20}
                    width={400}
                    count={3}
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            ) : (
              <div className="login_background">
                <div className="sub_login_background">
                  <div className="sub_section_content_login_background">
                    <br />
                    <Typography variant="h5">
                      Yoloj{" "}
                      <img
                        src={logo}
                        style={{ width: "16px", height: "16px" }}
                      />
                    </Typography>

                    <br />
                    <br />
                    <Typography variant="body" style={{ fontSize: "24px" }}>
                      Manage your
                      <br /> personal & professional Identity
                    </Typography>
                    <br />
                    <br />

                    <Typography varian="subtitle1" style={{ fontSize: "13px" }}>
                      Yolos delivers you the exquisite service by providing you
                      the platform
                      <br />
                      to build your peronal & professional identity to manage
                      your individual and business
                      <br />
                      expertises all over the world.
                    </Typography>
                  </div>
                </div>
              </div>
            )}

            {this.state.isLoading ? (
              <div class="sub_section" style={{ marginTop: "20px" }}>
                <Skeleton height={50} width={40} />
                <br />
                <Skeleton height={50} width={200} />
                <br />
                <Skeleton count={3} height={50} width={300} />
                <br />
                <br />
                <br />
                <Skeleton height={20} width={300} />
              </div>
            ) : (
              <div className="sub_section">
                <div className="login_section">
                  <img src={logo} />

                  <br />
                  <br />

                  <Typography
                    variant="caption"
                    style={{ fontSize: "18px", color: "#4dd4d4d" }}
                  >
                    Welcome Back Provider
                  </Typography>

                  <CardContent>
                    <form
                      noValidate
                      autoCapitalize="off"
                      onSubmit={(e) => this.login(e)}
                    >
                      <TextField
                        id="email"
                        label="Enter your Email Address"
                        variant="outlined"
                        name="email"
                        type="email"
                        size="small"
                        error={this.state.errors.email}
                        helperText={this.state.errors.email}
                        autoFocus
                        required
                        onChange={(e) => this.change(e)}
                        value={this.state.email}
                        style={{
                          marginBottom: 15,
                          width: "80%",
                          borderRadius: "1px",
                        }}
                      />

                      <TextField
                        id="password"
                        label="Enter your password"
                        variant="outlined"
                        name="password"
                        fullWidth
                        size="small"
                        type="password"
                        error={this.state.errors.password}
                        helperText={this.state.errors.password}
                        required
                        onChange={(e) => this.change(e)}
                        value={this.state.password}
                        style={{
                          marginBottom: 15,
                          width: "80%",
                          borderRadius: "1px",
                        }}
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        style={button_style}
                      >
                        SIGN IN
                      </Button>
                    </form>
                    <Link onClick={this.handleForgotPassword}>
                      &nbsp;Forgot your password?
                    </Link>
                  </CardContent>
                </div>

                {/* ------testing code starts-------------- */}

                <Dialog
                  open={this.state.forgot}
                  onClose={this.closeForgot}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Verify Credentials
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Enter The Asked Details
                    </DialogContentText>

                    <br />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      error={this.state.errors.email}
                      helperText={this.state.errors.email}
                      value={this.state.email}
                      onChange={(e) => {
                        this.change(e);
                      }}
                      fullWidth
                    />

                    <TextField
                      // autoFocus
                      margin="dense"
                      id="phoneno"
                      label="phoneno"
                      type="phoneno"
                      name="phoneNumber"
                      error={this.state.errors.phoneNumber}
                      helperText={this.state.errors.phoneNumber}
                      value={this.state.phoneNumber}
                      onChange={(e) => {
                        this.change(e);
                      }}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="password"
                      placeholder="Write new password"
                      fullWidth
                      label="Write new password"
                      type="password"
                      name="password"
                      error={this.state.errors.password}
                      helperText={this.state.errors.password}
                      onChange={(e) => this.change(e)}
                      value={this.state.password}
                    />
                    <TextField
                      margin="dense"
                      id="confirmPassword"
                      placeholder="Re-enter Password"
                      fullWidth
                      type="password"
                      required
                      name="confirmPassword"
                      label="Confirm Password"
                      error={this.state.errors.confirmPassword}
                      helperText={this.state.errors.confirmPassword}
                      onChange={(e) => this.change(e)}
                      value={this.state.confirmPassword}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>

                    <Button
                      onClick={this.update}
                      color="primary"
                      disabled={!this.state.change}
                    >
                      Update
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* --------------------tesing ends------------ */}
                <div className="forget_section">
                  <label>Don't have an account ?</label>
                  <Link to={"./register"}>&nbsp;Sign Up</Link>
                </div>
              </div>
            )}
          </div>

          <br />
          <br />
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={(e, r) => this.handleClose(e, r)}
          message={this.state.errorMessage}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={(e, r) => this.handleClose(e, r)}
              >
                Hide
              </Button>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}
