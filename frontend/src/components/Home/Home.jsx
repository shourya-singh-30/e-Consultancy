import React from "react";
import HeaderContainer from "../../containers/headerContainer";
import ProviderCard from "../Card/providerCard";
import {
  Button,
  Snackbar,
  Grid,
  Card,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import "./Home.css";
import classNames from "classnames";
import { Rating } from "@material-ui/lab";
import { store } from "../../store";
import CardErrorBoundary from "../shared/CardErrorBoundary";
import log from "../../utils/logger.service";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Link } from "react-router-dom";
import { classList } from "@syncfusion/ej2-base";
import Parallax from "../Parallax/Parallax";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/components.js";
import CountrySelect from "../select/country1";
import ResponsivecountrySelect from "../select/responsivecountry";
import HomeProviders from "../Home/HomeProviders";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import Sharefunctionality from "./Sharefunctionality";
import WorkIcon from "@material-ui/icons/Work";
import Tooltip from "@material-ui/core/Tooltip";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Contact_modal from "./Contact_modal";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Topprofiles from "./Topprofiles.jsx";
import { connect } from "react-redux";
import LoginPopUp from "../shared/LoginPopUp/LoginPopUp";
import Skeleton from "react-loading-skeleton";
import { history } from "../../store";

var media = {
  height: "70px",
  width: "70px",
  borderRadius: "50%",
  align: "center",
  border: "3px solid #f2f2f2",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
};

var share_link = {};
var share_link_2 = {};

var modal_data_1 = {};
var modal_data_2 = {};
var modal_data_3 = {};
var modal_data_4 = {};
var modal_data_5 = {};
var modal_data_6 = {};
var modal_data_7 = {};
var modal_data_8 = {};

var store_your_city_name_through_google_api = "Bengaluru";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    padding: "2px 5px 2px 5px",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

class Home extends React.Component {
  constructor(props) {
    super();
    this.loadingAnimation = [1, 2, 3, 4];
    this.state = {
      open: false,
      allProfile: false,
      errorMessage: "",
      providerData: [], //unused
      allProviderData: [],
      filteredData: [], //unused`
      location: "", //unused
      dialogOpen: false, //unused
      name: "", //unused
      allService: [],
      allExpertise: [],
      allCountry: [],
      allProvidersDetails: [],
      searchedResult: [],
      city: "",
      test: false,
      loading: true,
      searchFilter: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentDidMount() {
    document.title = "Welcome to Yolo Network";
    localStorage.setItem("searchFilter","false");
    this.props.getAllProvider();
    this.props.getAllService();
    this.props.getAllBusinessType();
    this.props.getCountriesList();
    this.props.getAllProvidersDetails();

    store.subscribe(() => {
      console.log(store.getState(), " ---------store ");
      if (store.getState().getAllApprovedProvider.error) {
        this.setState({
          open: true,
          errorMessage: String(store.getState().getAllApprovedProvider.error),
        });
      } else {
        (async () => {
          await this.setState({
            // providerData: this.props.providerData,
            allProviderData: store.getState().getAllApprovedProvider.success,
            allService: store.getState().getFinancialService.success,
            allExpertise: store.getState().getBusinessTypes.success,
            allCountry: store.getState().getCountries.countries,
            allProvidersDetails: store.getState().getAllProvidersDetails
              .success,
            // allProfile: false,
            city: "Delhi",
          });
          this.filterFunction(
            { country: "India", city: "Delhi", name: "" },
            "All"
          );
        })();
      }
    });

    console.log("allProvidersDetails/////  ", this.state.allProvidersDetails);
  }
  toggleSearch = ()=>{
    document.documentElement.scrollTop = 0;
    this.setState({searchFilter: !this.state.searchFilter});
  }
  filterFunction = (filterValue, field) => {
    this.testing("false");
    this.setState({ city: filterValue.city });

    let filterArr = [];
    let searchData = [];
    console.log("filter value and field ", filterValue, field);

    if (filterValue.country != null && filterValue.city == null) {
      this.state.allProvidersDetails.map((obj) => {
        if (obj.country == filterValue.country) {
          filterArr.push(obj);
        }
      });
    } else if (filterValue.country != null && filterValue.city != null) {
      this.setState({ city: filterValue.city });
      if (this.state.allProvidersDetails.length > 0) {
        this.state.allProvidersDetails.map((obj) => {
          if (
            obj.country == filterValue.country &&
            (obj.City == filterValue.city ||
              obj.City.substr(7, filterValue.city.length) == filterValue.city)
          ) {
            filterArr.push(obj);
          }
        });
      }
    } else if (filterValue.city == null && filterValue.country == null) {
      this.state.allProvidersDetails.map((obj) => {
        filterArr.push(obj);
      });
    }

    if (field == "Name") {
      console.log(filterArr, " field--name");
      for (let obj of filterArr) {
        if (obj.fullName == filterValue.name) {
          searchData.push(obj);
        }
      }
    } else if (field == "Organization Name") {
      console.log(filterArr, " field--orgName");
      for (let obj of filterArr) {
        if (
          obj.OrganizationName.toUpperCase() ==
          filterValue.orgName.toUpperCase()
        ) {
          searchData.push(obj);
        }
      }
    } else if (field == "Services") {
      for (let obj of filterArr) {
        for (let service of obj.servicesOffered) {
          if (service.name == filterValue.service) {
            searchData.push(obj);
          }
        }
      }
    } else if (field == "Expertise") {
      for (let obj of filterArr) {
        for (let expertise of obj.partnerType) {
          if (expertise.name == filterValue.expertise) {
            searchData.push(obj);
          }
        }
      }
    } else if (field == "All") {
      searchData = filterArr;
    }

    if (searchData.length == 0) {
      this.setState({ searchedResult: [], loading: false });
    } else {
      console.log(searchData, " search data");
      this.setState({ searchedResult: searchData, loading: true });
    }
  };

  change = (e) => {
    // unused function
    const { name, value } = e.target;
    switch (name) {
      case "location":
        this.setState({ location: value });
        break;
      case "name":
        this.setState({ name: value });
        break;
      default:
        break;
    }
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };
  viewAllProfile = () => {
    this.setState({ allProfile: true });
  };

  allProfile = () => {
    //unused function
    let arr = [];
    arr = this.state.allProvidersDetails.filter((provider) => {
      let myCity = provider.City;
      if (myCity.includes("Others-")) {
        myCity = myCity.replace("Others-", "");
      }
      if (myCity == this.state.city) {
        return true;
      }
    });
    console.log(arr, "HERE..........");
    this.setState({ searchedResult: arr });
  };
  testing = (param) => {
    if (param == "true" && this.state.test == false) {
      this.setState({ test: true });
    } else if (param == "false" && this.state.test == true) {
      this.setState({ test: false });
    }
  };
  viewMore = () => {
    history.push(`/viewMore`, { criterion: this.state.searchedResult });
    // window.location.reload();
  };
  logic_for_profiles_based_on_city = () => {
    console.log(this.state.allproviderDetails, "home2233");
    var fullname_array = [];
    console.log(this.state.allproviderDetails, "outside");
    console.log("YAHAA ", this.state.searchedResult);
    return (
      <div>
        {this.state.searchedResult != [] &&
        this.state.searchedResult.length > 0 ? (
          this.state.searchedResult.map((itemz, index) => {
            if (this.state.searchedResult.length > 7) {
              this.testing("false");
            } else {
              this.testing("true");
            }
            console.log(itemz, "inside");
            return (
              <div>
                <div>
                  <span style={{ display: "none" }}>
                    {!fullname_array.includes(itemz.fullName)
                      ? fullname_array.push(itemz.fullName)
                      : ""}
                  </span>

                  {index < 7 || this.state.test ? (
                    <div>
                      <ProviderCard itemz={itemz} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })
        ) : this.state.loading ? (
          //shourya changes
          <div class="d-md-flex">
          {/* end */}
            {this.loadingAnimation.map((i) => {
              return (
                <div>
                  <div style={{ marginRight: "5px" }}>
                    <span
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      <Skeleton circle={true} height={80} width={80} />
                    </span>
                    <Skeleton height={80} width={150} />
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                    <Skeleton height={10} width={120} />
                    <br />
                    <Skeleton height={10} width={120} />
                    <br />
                    <Skeleton height={10} width={120} />
                    <br />
                  </div>
                  <Skeleton height={20} width={200} />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="carddd"
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              height: "215px",
            }}
          >
            <br />
            <br />
            <CancelOutlinedIcon style={{ color: "#006699" }} />
            <br />

            <Link
              style={{ cursor: "default", textDecoration: "none" }}
              variant="caption"
            >
              Sorry! No Profiles Found For This Search
              <br />
              {/* {this.state.city} */}
              <br />
              {this.props.rcn}
            </Link>
            <br />
          </div>
        )}
        {!this.state.test && this.state.searchedResult.length > 0 ? (
          <div
            className="carddd"
            style={{
              textAlign: "center",
              backgroundColor: "#fff",
              height: "215px",
              cursor: "pointer",
            }}
            onClick={this.viewMore}
          >
            <br />
            <br />
            <CheckCircleOutlinedIcon style={{ color: "#006699" }} />
            <br />
            {/* <Link
              onClick={() => {
                this.viewMore();
              }}
              variant="caption"
            > */}
            View More
            <br />
            {/* {this.state.city} */}
            <br />
            {this.props.rcn}
            {/* </Link> */}
            <br />
          </div>
        ) : (
          ""
        )}
      </div>
    ); /*end of return  statement*/
  };
  getRecentProfiles = () => {
    let l = this.state.allProvidersDetails.length - 1;
    let i = this.state.allProvidersDetails.length - 1;
    let arr = [];
    while (i > l - 4 && i >= 0) {
      arr.push(this.state.allProvidersDetails[i]);
      i--;
    }
    return (
      <div>
        {arr.length ? (
          <div>
            {arr.map((item, index) => {
              if (item.partnerId != localStorage.getItem("providerId")) {
                return (
                  <div>
                    <ProviderCard recents={true} itemz={item} />
                  </div>
                );
              } else {
                return "";
              }
            })}
          </div>
        ) : (
          //shourya changes
          <div class="d-md-flex">
          {/* end */}
            {this.loadingAnimation.map((i) => {
              return (
                <div>
                  <div style={{ marginRight: "5px" }}>
                    <span
                      style={{ display: "inline-block", marginRight: "3px" }}
                    >
                      <Skeleton circle={true} height={80} width={80} />
                    </span>
                    <Skeleton height={80} width={150} />
                  </div>
                  <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                    <Skeleton height={10} width={120} />
                    <br />
                    <Skeleton height={10} width={120} />
                    <br />
                    <Skeleton height={10} width={120} />
                    <br />
                  </div>
                  <Skeleton height={20} width={200} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  render() {
    console.log(this.state.allproviderDetails, "check me");
    const { classes } = this.props;
    return (
      <div>
        <HeaderContainer toggleSearchFunc={this.toggleSearch}/>
        <Parallax image={require("../../assets/img/newbg.jpg")}>
          <div className={classes.container} class="window_search mx-auto">
            <LoginPopUp />

            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <CountrySelect
                    searchFilter={this.state.searchFilter}
                    getAllProvider={this.state.allProviderData}
                    getAllService={this.state.allService}
                    getAllExpertise={this.state.allExpertise}
                    getAllCountries={this.state.allCountry}
                    filterFunction={this.filterFunction}
                    providerData={this.state.allProviderData} //this
                  />
                </div>
              </GridItem>
            </GridContainer>
          </div>

          {/* <div class="mobile_search">
            <ResponsivecountrySelect
              getAllProvider={this.state.allProviderData}
              getAllService={this.state.allService}
              getAllExpertise={this.state.allExpertise}
              getAllCountries={this.state.allCountry}
              filterFunction={this.filterFunction}
            />
          </div> */}
        </Parallax>

        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{ padding: 2, backgroundColor: "#F8F8F8" }}
        >
          <br />
          <br />

          <Grid container spacing={2} xs={12} style={{ marginTop: 70 }}>
            <div class="profiles_based_on_city">
              <div style={{ paddingLeft: "15px" }}>
                Profiles based on {this.state.city}
              </div>
              <br />
              <br />
              {this.logic_for_profiles_based_on_city()}
            </div>
          </Grid>
          {/*end of div of profile based city*/}

          <Grid container spacing={2} xs={12} style={{ marginTop: 70 }}>
            <div class="profiles_based_on_city">
              <div style={{ paddingLeft: "15px" }}>Recently Added Profiles</div>
              <br />
              <br />

              {this.getRecentProfiles()}
            </div>
          </Grid>

          <Grid container spacing={2} xs={12} style={{ marginTop: 70 }}>
            <div class="grid_roww">
              <div style={{ textAlign: "left", paddingLeft: "15px" }}>
                All Profiles
              </div>
              <br />
              <br />
              {this.state.allproviderDetails != [] &&
              this.state.allProvidersDetails.length ? (
                this.state.allProvidersDetails.map((itemz, index) => {
                  return (
                    <div>
                      {index < 7 || this.state.allProfile ? (
                        <div>
                          <ProviderCard itemz={itemz} />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              ) : (
                //shourya changes
                <div class="d-md-flex">
                {/* end */}
                  {this.loadingAnimation.map((i) => {
                    return (
                      <div>
                        <div style={{ marginRight: "5px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              marginRight: "3px",
                            }}
                          >
                            <Skeleton circle={true} height={80} width={80} />
                          </span>
                          <Skeleton height={80} width={150} />
                        </div>
                        <div
                          style={{ marginTop: "10px", marginBottom: "20px" }}
                        >
                          <Skeleton height={10} width={120} />
                          <br />
                          <Skeleton height={10} width={120} />
                          <br />
                          <Skeleton height={10} width={120} />
                          <br />
                        </div>
                        <Skeleton height={20} width={200} />
                      </div>
                    );
                  })}
                </div>
              )}
              {!this.state.allProfile &&
              this.state.allProvidersDetails.length > 0 ? (
                <div
                  class="carddd"
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    height: "215px",
                  }}
                >
                  <br />
                  <br />
                  <CheckCircleOutlinedIcon style={{ color: "#006699" }} />
                  <br />
                  <Link onClick={this.viewAllProfile} variant="caption">
                    See all profiles <br />
                    <br />
                    {this.props.rcn}
                  </Link>
                  <br />
                </div>
              ) : (
                ""
              )}
            </div>
          </Grid>
        </div>
        {/*end of content div*/}

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

export default withStyles(styles, { withTheme: true })(Home);
