/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer.js";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from '@material-ui/icons/Close';
import Button from "../CustomButtons/Button";
import { store } from "../../store";
import city from "../../../src/assets/countryCity.json";
import { connect } from "react-redux";
import { history } from "../../store";
class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProvider: [],
      filterValue: { country: "India", city: "Delhi", name: "" },
      allServices: [],
      allExpertise: [],
      searchBox: [],
      selectedCountry: "India",
      selectedCity: "", // unused
      selectedSearchByValue: "",
      searchValues: [],
      filterValueField: "",
      searchByName: false,
      searchByOrg: false,
      orgNames: [],
      names: [],
      country: [],
      city: [],
      searchByValue: [
        "All",
        "Name",
        "Organization Name",
        "Services",
        "Expertise",
      ],
      searchFilter:false,
      loginName:"",
    };
  }

  componentDidMount() {
    this.setState({
      allProvider: this.props.getAllProvider,
      allServices: this.props.getAllService,
      allExpertise: this.props.getAllExpertise,
      country: this.props.getAllCountries,
      searchFilter:this.props.searchFilter,
    });
    // this.filterArray();
    if(localStorage.getItem("userId") != undefined){
      this.setState({loginName: localStorage.getItem("userName")})
    }else if(localStorage.getItem("providerId") != undefined){
      this.setState({loginName: localStorage.getItem("providerName")})
    }
    setTimeout(() => {
      let orgNameUnique = [];
      let nameUnique = [];
      let spellFlag = true;
      console.log(this.props.providerData, "yes");
      for (let obj of this.props.providerData) {
        if (orgNameUnique.length > 0) {
          for (let org of orgNameUnique) {
            if (org.toUpperCase() != obj.OrganizationName.toUpperCase()) {
              spellFlag = true;
            } else {
              spellFlag = false;
              break;
            }
          }
        } else {
          spellFlag = true;
        }

        if (spellFlag) {
          orgNameUnique.push(obj.OrganizationName);
          nameUnique.push(obj.fullName);
          console.log("inserted org");
        }
      }
      console.log(orgNameUnique, "orgName");
      orgNameUnique = orgNameUnique.filter(function (item, pos) {
        return orgNameUnique.indexOf(item) == pos;
      });
      nameUnique = nameUnique.filter(function (item, pos) {
        return nameUnique.indexOf(item) == pos;
      });
      this.setState({
        names: nameUnique,
        orgNames: orgNameUnique,
        searchBox: this.props.getAllService,
      });
    }, 1000);
    console.log(this.state.names, "names");
    setTimeout(() => {
      this.props.filterFunction({ ...this.state.filterValue }, "All");

      this.citySelect();
    }, 2500);
  }
  getNames = () => {
    let orgNameUnique = [];
    let nameUnique = [];
    let spellFlag = true;
    // document.getElementById("SearchByField").value = "";
    for (let obj of this.props.providerData) {
      if (
        obj.City == this.state.filterValue.city ||
        obj.City.substr(7, obj.length) == this.state.filterValue.city
      ) {
        nameUnique.push(obj.fullName);
      }
      if (orgNameUnique.length > 0) {
        for (let org of orgNameUnique) {
          if (org.toUpperCase() != obj.OrganizationName.toUpperCase()) {
            spellFlag = true;
          } else {
            spellFlag = false;
            break;
          }
        }
      } else {
        spellFlag = true;
      }

      if (
        spellFlag &&
        (obj.City == this.state.filterValue.city ||
          obj.City.substr(7, obj.length) == this.state.filterValue.city)
      ) {
        orgNameUnique.push(obj.OrganizationName);
      }
    }
    console.log(orgNameUnique, "orgName");
    console.log(nameUnique);
    // orgNameUnique = orgNameUnique.filter(function (item, pos) {
    //   return orgNameUnique.indexOf(item) == pos;
    // });
    // nameUnique = nameUnique.filter(function (item, pos) {
    //   return nameUnique.indexOf(item) == pos;
    // });
    this.setState({
      names: nameUnique,
      orgNames: orgNameUnique,
      // searchBox: this.props.getAllService,
    });
  };
  citySelect = () => {
    var cityValue = [];
    var finalCity = [];
    console.log(this.state.filterValue.country, "first");
    this.props.getAllCountries.map((item) => {
      if (item.name === this.state.filterValue.country) {
        cityValue = item.cities;
        for (let city of cityValue) {
          if (city.substr(0, 6) == "Others") {
            finalCity.push(city.substr(7));
          } else {
            finalCity.push(city);
          }
        }
        finalCity = finalCity.sort();
        console.log(finalCity);
        this.setState({ city: finalCity });
      }
    });
  };
  clear = () => {
    window.location.reload();
  }
  filterData = (e, value) => {
    const { filterValue } = this.state;
    // console.log(e.target, " ----e.target");

    if (e != null) {
      console.log("HERE----- targetvalue ", value);
      console.log("HERE----- targetType ", e.target.type);
      // console.log("HERE--- TARGETinputvalue ", e.target.inputValue);

      // if (e != null && e!=undefined) {
      // if (e.target.innerText != undefined && e.target.innerText != null) {
      if (e.target.id.substring(0, 2) == "co") {
        this.setState({
          filterValue: { ...filterValue, country: e.target.innerText },
          selectedCountry: e.target.innerText,
          selectedSearchByValue: "",
          filterValueField: "",
        });
        this.props.filterFunction(
          { ...this.state.filterValue, country: e.target.innerText },
          this.state.filterValueField
        );
        setTimeout(() => {
          this.citySelect();
        }, 500);
      } else if (e.target.id.substring(0, 2) == "ci") {
        this.setState({
          filterValue: { ...filterValue, city: value },
          selectedCity: value,
          selectedSearchByValue: "",
          filterValueField: "",
        });
        this.props.filterFunction(
          { ...this.state.filterValue, city: value },
          this.state.filterValueField
        );
      } else {
        switch (this.state.filterValueField) {
          case "Name":
            this.setState({
              filterValue: { ...filterValue, name: value },
              selectedSearchByValue: value,
            });
            // this.props.filterFunction(
            //   { ...this.state.filterValue, name: value },
            //   this.state.filterValueField
            // );
            break;
          case "Services":
            this.setState({
              filterValue: { ...filterValue, service: value },
              selectedSearchByValue: value,
            });
            // this.props.filterFunction(
            //   { ...this.state.filterValue, service: value },
            //   this.state.filterValueField
            // );

            break;
          case "Organization Name":
            this.setState({
              filterValue: { ...filterValue, orgName: value },
              selectedSearchByValue: value,
            });
            // this.props.filterFunction(
            //   { ...this.state.filterValue, orgName: value },
            //   this.state.filterValueField
            // );
            break;
          case "Expertise":
            this.setState({
              filterValue: {
                ...filterValue,
                expertise: value,
              },
              selectedSearchByValue: value,
            });
            // this.props.filterFunction(
            //   { ...this.state.filterValue, expertise: value },
            //   this.state.filterValueField
            // );
            break;
        }
      }
    }
  };

  searchByFilter = (e, value) => {
    //this.setState({filterValueField:e.target.innerHTML})
    // console.log(e.target.innerText);
    // document.getElementById("SearchByField").value = "";
    // this.setState({ selectedSearchByValue: "" });
    if (e != null) {
      if (value === "") {
        this.setState({
          selectedSearchByValue: "",
          searchBox: this.props.getAllService,
          searchByName: false,
          searchByOrg: false,
          filterValueField: "",
        });
      }
      if (e.target.innerText == "Services") {
        this.setState({
          selectedSearchByValue: "",
          searchBox: this.props.getAllService,
          searchByName: false,
          searchByOrg: false,
          filterValueField: "Services",
        });
      } else if (e.target.innerText == "Expertise") {
        this.setState({
          selectedSearchByValue: "",
          searchBox: this.props.getAllExpertise,
          searchByName: false,
          searchByOrg: false,
          filterValueField: "Expertise",
        });
      } else if (e.target.innerText == "Name") {
        this.getNames();
        this.setState((prev) => ({
          selectedSearchByValue: "",
          searchBox: prev.names,
          searchByName: true,
          searchByOrg: false,
          filterValueField: "Name",
        }));
      } else if (e.target.innerText == "Organization Name") {
        this.getNames();
        this.setState((prev) => ({
          selectedSearchByValue: "",
          searchBox: prev.orgNames,
          searchByOrg: true,
          searchByName: false,
          filterValueField: "Organization Name",
        }));
      } else if (e.target.innerText == "All") {
        this.getNames();
        this.setState((prev) => ({
          selectedSearchByValue: "",
          searchBox: prev.names,
          searchByOrg: true,
          searchByName: false,
          filterValueField: "All",
        }));
        this.props.filterFunction({ ...this.state.filterValue }, "All");
      }
      console.log(this.state.searchBox, "--------search boxs");
    }
  };

  filterArray = () => {
    this.props.filterFunction(
      this.state.filterValue,
      this.state.filterValueField
    );
  };

  render() {
    console.log(this.props.providerData);
    return (
      <React.Fragment>
        {/* shourya changes */}
        {this.props.searchFilter ? (
          <div className="d-md-none">
          {/* end */}
            {/* <GridContainer> */}
  
            <div class="mb-1 mb-md-0">
              <GridItem xs={6} sm={6} md={2}>
                <Autocomplete
                  onChange={(event) => this.filterData(event)}
                  style={{
                    width: 200,
                    background: "#fff",
                    borderColor: "#fff",
                    borderRadius: 2,
                  }}
                  id="country"
                  options={this.props.getAllCountries}
                  // value={this.state.filterValue.country}
                  getOptionLabel={(option) => {
                    return option.name;
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        placeholder="Select Country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        // value={this.state.filterValue.country}
                        variant="outlined"
                      />
                    );
                  }}
                />
              </GridItem>
            </div>
  
            <div class="mb-1 mb-md-0">
              <GridItem xs={6} sm={6} md={2}>
                <Autocomplete
                  onInputChange={(event, value) => {
                    this.filterData(event, value);
                  }}
                  style={{
                    width: 200,
                    background: "#fff",
                    borderColor: "#fff",
                    borderRadius: 2,
                  }}
                  id="city"
                  options={this.state.city}
                  inputValue={this.state.selectedCity}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select City"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      variant="outlined"
                      // value={this.state.filterValue.city}
                    />
                  )}
                />
              </GridItem>
            </div>
  
            <div class="mb-1 mb-md-0">
              <GridItem xs={6} sm={6} md={2}>
                <Autocomplete
                  onInputChange={(event, value) => {
                    this.searchByFilter(event, value);
                  }}
                  style={{
                    width: 200,
                    background: "#fff",
                    borderColor: "#fff",
                    borderRadius: 2,
                  }}
                  options={this.state.searchByValue}
                  inputValue={this.state.filterValueField}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      placeholder="Search By"
                      // value={this.state.filterValueField}
                      variant="outlined"
                    />
                  )}
                />
              </GridItem>
            </div>
  
            <div>
              <GridItem xs={12} sm={12} md={6}>
                <Autocomplete
                  onInputChange={(event, value) => this.filterData(event, value)}
                  style={{
                    width: 200,
                    background: "#fff",
                    borderColor: "#fff",
                    borderRadius: 2,
                  }}
                  options={this.state.searchBox}
                  getOptionLabel={(option) =>
                    this.state.searchByOrg
                      ? option
                      : this.state.searchByName
                      ? option
                      : option.name
                  }
                  id="SearchByField"
                  inputValue={this.state.selectedSearchByValue}
                  // value={this.state.selectedSearchByValue}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // id="SearchByField"
                      // value={this.state.selectedSearchByValue}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      placeholder="Type to search"
                      variant="outlined"
                    />
                  )}
                />
              </GridItem>
            </div>
  
            <div style={{paddingLeft:"31px"}}>
              <GridItem xs={2} sm={2} md={2}>
                <Button onClick={this.filterArray} color="warning" size="md">
                  Search
                  <SearchIcon style={{marginLeft:"2px"}} class="text-primary" />
                </Button>
              </GridItem>
            </div>
            <div style={{paddingLeft:"35px"}}>
              <GridItem xs={2} sm={2} md={2}>
                <Button onClick={this.clear} color="warning" size="md">
                  Clear
                  <CloseIcon style={{marginLeft:"2px"}} class="text-primary"/>
                </Button>
              </GridItem>
            </div>
  
            {/* </GridContainer> */}
          </div>
        ):this.state.loginName==""?(""):(
          <div class="d-md-none">Welcome {this.state.loginName}</div>
        )}
        <div className="d-none d-md-flex">
        {/* end */}
          {/* <GridContainer> */}

          <div class="mb-1 mb-md-0">
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onChange={(event) => this.filterData(event)}
                style={{
                  width: 200,
                  background: "#fff",
                  borderColor: "#fff",
                  borderRadius: 2,
                }}
                id="country"
                options={this.props.getAllCountries}
                // value={this.state.filterValue.country}
                getOptionLabel={(option) => {
                  return option.name;
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      // value={this.state.filterValue.country}
                      variant="outlined"
                    />
                  );
                }}
              />
            </GridItem>
          </div>

          <div class="mb-1 mb-md-0">
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onInputChange={(event, value) => {
                  this.filterData(event, value);
                }}
                style={{
                  width: 200,
                  background: "#fff",
                  borderColor: "#fff",
                  borderRadius: 2,
                }}
                id="city"
                options={this.state.city}
                inputValue={this.state.selectedCity}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select City"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    variant="outlined"
                    // value={this.state.filterValue.city}
                  />
                )}
              />
            </GridItem>
          </div>

          <div class="mb-1 mb-md-0">
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onInputChange={(event, value) => {
                  this.searchByFilter(event, value);
                }}
                style={{
                  width: 200,
                  background: "#fff",
                  borderColor: "#fff",
                  borderRadius: 2,
                }}
                options={this.state.searchByValue}
                inputValue={this.state.filterValueField}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    placeholder="Search By"
                    // value={this.state.filterValueField}
                    variant="outlined"
                  />
                )}
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={12} sm={12} md={6}>
              <Autocomplete
                onInputChange={(event, value) => this.filterData(event, value)}
                style={{
                  width: 200,
                  background: "#fff",
                  borderColor: "#fff",
                  borderRadius: 2,
                }}
                options={this.state.searchBox}
                getOptionLabel={(option) =>
                  this.state.searchByOrg
                    ? option
                    : this.state.searchByName
                    ? option
                    : option.name
                }
                id="SearchByField"
                inputValue={this.state.selectedSearchByValue}
                // value={this.state.selectedSearchByValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // id="SearchByField"
                    // value={this.state.selectedSearchByValue}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    placeholder="Type to search"
                    variant="outlined"
                  />
                )}
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={2} sm={2} md={2}>
              <Button onClick={this.filterArray} color="warning" size="lg">
                Search
                <SearchIcon style={{marginLeft:"2px"}} class="text-primary" />
              </Button>
            </GridItem>
          </div>
          <div>
            <GridItem xs={2} sm={2} md={2}>
            <Button onClick={this.clear} color="warning" size="lg">
                Clear
                <CloseIcon style={{marginLeft:"2px"}} class="text-primary"/>
            </Button>
            </GridItem>
          </div>

          {/* </GridContainer> */}
        </div>
      </React.Fragment>
    );
  }
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

const searchByValue = [
  "All",
  "Name",
  "Organization Name",
  "Services",
  "Expertise",
];
// const mapStateToProp=(state)=>{
//   return {
//     providerData:state.getAllProvidersDetails.success
//   }
// }
export default Country;
