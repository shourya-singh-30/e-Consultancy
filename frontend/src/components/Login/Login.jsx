import React from "react";
import Skeleton from "react-loading-skeleton";
import HeaderContainer from "../../containers/headerContainer";
import "./Login.css";
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
  CircularProgress,
} from "@material-ui/core";
import { history, store } from "../../store";

import { Link } from "react-router-dom";

import logo from "../../assets/img/Logo.png";
import Background from "../../assets/img/meeting.jpg";

var button_style = {
  backgroundColor: "#0099cc",
  color: "#fff",
  padding: "10px 0px 10px 0px",
  width: "80%",
  borderRadius: "1px",
};

export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      email: "",
      password: "",
      errorMessage: "",
      open: false,
      errors: {
        email: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    document.title = "Yolo - Login";
    this.setState({ isLoading: false });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  navigateToRegister = () => {
    history.push("/register");
  };

  login = (e) => {
    e.preventDefault();
    this.props.userLogin(this.state.email, this.state.password);
    store.subscribe(() => {
      if (store.getState().userLogin.error) {
        this.setState({
          open: true,
        });
        this.setState({
          errorMessage: store.getState().userLogin.error,
        });
      }
      if (store.getState().userLogin.success.status === true) {
        localStorage.setItem("token", store.getState().userLogin.success.token);
        this.setState({
          open: false,
        });

        localStorage.setItem("userProfile", true);
        localStorage.setItem(
          "userName",
          store.getState().userLogin.success.name
        );
        localStorage.setItem(
          "userId",
          store.getState().userLogin.success.userId
        );
        localStorage.setItem(
          "phoneNumber",
          store.getState().userLogin.success.phone_number
        );
        localStorage.setItem(
          "emailId",
          store.getState().userLogin.success.email
        );
        window.location.reload(false);
        history.push("/");
      }
    });
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
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      return null;
    });
  };

  render() {
    return (
      <div>
        <div>
          <HeaderContainer />

          <div class="section box_shadow">
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
              <div class="login_background">
                <div class="sub_login_background">
                  <div class="sub_section_content_login_background">
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
                <Skeleton count={2} height={20} width={300} />
              </div>
            ) : (
              <div class="sub_section">
                <div class="login_section">
                  <img src={logo} />

                  <br />
                  <br />

                  <Typography
                    variant="caption"
                    style={{ fontSize: "18px", color: "#4dd4d4d" }}
                  >
                    Welcome Back User
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
                        name="email"
                        type="email"
                        fullWidth
                        className="labelRoot"
                        variant="outlined"
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
                        name="password"
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="password"
                        error={this.state.errors.password}
                        helperText={this.state.errors.password}
                        required
                        onChange={(e) => this.change(e)}
                        style={{ marginBottom: 50 }}
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
                        Login
                      </Button>
                    </form>
                  </CardContent>
                  {this.state.open ? (
                    <p style={{ color: "Red" }}> Invalid Credentials</p>
                  ) : null}
                </div>

                <div class="forget_section">
                  <Link style={{ color: "#4d4d4d" }} to={"./feedback"}>
                    Having Login Issues! Give Feedback
                  </Link>
                  <br />
                  <Link style={{ color: "#4d4d4d" }} to={"./register"}>
                    {" "}
                    Don't have an account ?&nbsp;Sign Up
                  </Link>
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
