/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../Grid/GridItem';
import GridContainer from "../Grid/GridContainer.js";
import SearchIcon from '@material-ui/icons/Search';
import Button from "../CustomButtons/Button";
import { store } from '../../store';
import city from '../../../src/assets/countryCity.json';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProvider: [],
      filterValue: [{ country: "", city: "", name: "", service: "", expertise: "", orgName: "" }],
      allServices: [],
      allExpertise: [],
      searchBox: [],
      searchValues: [],
      filterValueField: "",
      searchByName: false,
      searchByOrg: false,
      orgNames: [],
      names: [],
      country: [],
      city: []
    }
  }

  componentDidMount() {
    this.setState({
      allProvider: this.props.getAllProvider,
      allServices: this.props.getAllService,
      allExpertise: this.props.getAllExpertise,
      country: this.props.getAllCountries
    })

    setTimeout(() => {
      let orgNameUnique = []
      let nameUnique = []
      for (let obj of this.props.getAllProvider) {
        orgNameUnique.push(obj.OrganizationName)
        nameUnique.push(obj.fullName)
      }
      orgNameUnique = orgNameUnique.filter(function (item, pos) {
        return orgNameUnique.indexOf(item) == pos;
      });
      nameUnique = nameUnique.filter(function (item, pos) {
        return nameUnique.indexOf(item) == pos;
      });
      this.setState({
        names: nameUnique,
        orgNames: orgNameUnique
      })
    }, 750);

  }

  citySelect = () => {
    var cityValue = []
    var finalCity = []
    this.props.getAllCountries.map((item) => {
      if (item.name === this.state.filterValue.country) {
        cityValue = item.cities
        for (let city of cityValue) {
          if (city.substr(0, 6) == "Others") {
            finalCity.push(city.substr(7))
          }
          else {
            finalCity.push(city)
          }
        }
        finalCity = finalCity.sort()
        this.setState({ city: finalCity })
      }
    })
  }

  filterData = (e) => {
    const { filterValue } = this.state
    if (e.target.id.substring(0, 2) == "co") {
      this.setState({ filterValue: { ...filterValue, ["country"]: e.target.innerHTML } });
      setTimeout(() => {
        this.citySelect()
      }, 500);
    }
    else if (e.target.id.substring(0, 2) == "ci") {
      this.setState({ filterValue: { ...filterValue, ["city"]: e.target.innerHTML } });
    }
    else {
      this.setState({ filterValue: { ...filterValue, [this.state.filterValueField]: e.target.innerHTML } });
    }
  }

  searchByFilter = (e) => {
    if (e.target.innerHTML == "Services") {
      this.setState({ searchBox: this.props.getAllService, searchByName: false, searchByOrg: false, filterValueField: "service" })
    }
    else if (e.target.innerHTML == "Expertise") {
      this.setState({ searchBox: this.props.getAllExpertise, searchByName: false, searchByOrg: false, filterValueField: "expertise" })
    }
    else if (e.target.innerHTML == "Name") {
      this.setState({ searchBox: this.state.names, searchByName: true, searchByOrg: false, filterValueField: "name" })
    }
    else if (e.target.innerHTML == "Organization Name") {
      this.setState({ searchBox: this.state.orgNames, searchByOrg: true, searchByName: false, filterValueField: "orgName" })
    }
  }

  filterArray = () => {
    this.props.filterFunction(this.state.filterValue, this.state.filterValueField)
  }



  inputboxesonebyone(){

  

      return(

        <div>
             
            <Accordion style={{background: 'none', boxShadow: 'none', border: 'none'}}>

                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >

                  <div>

                  <Autocomplete
                    onChange={this.filterData}
                    style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                    id="country"
                    options={this.props.getAllCountries}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) =>
                      <TextField {...params} placeholder="Select Country" variant="outlined" />
                    }
                  />

                  </div>

                </AccordionSummary>

                <AccordionDetails style={{marginTop: '-20px'}}>
                      
                    <Autocomplete
                    onChange={this.filterData}
                    style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                    id="city"
                    options={this.state.city}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>
                      <TextField {...params} placeholder="Select City" variant="outlined" />
                    }
                    />
                    <br/><br/>

                    <Autocomplete
                    onChange={this.searchByFilter}
                    style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                    id="searchBy"
                    options={searchByValue}
                    getOptionLabel={(option) => option}
                    renderInput={(params) =>
                      <TextField {...params} placeholder="Search By" variant="outlined" />
                    }
                    />
                    <br/><br/>

                    <div>
                    <Autocomplete
                      onChange={this.filterData}
                      style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                      id="SearchByField"
                      options={this.state.searchBox}
                      getOptionLabel={(option) => this.state.searchByOrg ? option : (this.state.searchByName ? option : option.name)}
                      renderInput={(params) =>
                        <TextField {...params} placeholder="Type to search" variant="outlined" />
                      }
                    />
                    </div>

                </AccordionDetails>

            </Accordion>    


          </div>
      )

  }





  render() {

    return (

      <React.Fragment>
      <div className="d-flex justify-content-between">
        {/* <GridContainer> */}


          {this.inputboxesonebyone()}
          
      </div>

      <div>
      <GridItem xs={2} sm={2} md={2}>
        <Button onClick={this.filterArray} color="warning" size="lg">Search<SearchIcon class="text-primary" /></Button>
      </GridItem>
     </div>
      <div>
        <GridItem xs={2} sm={2} md={2}>
          <a href="" onClick={this.filterArray}>Clear All Fields</a>
        </GridItem>
      </div>

      {/* </GridContainer> */}

    </React.Fragment>
          
    )
  }
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

const searchByValue = ["All", "Name", "Organization Name", "Services", "Expertise"]

export default Country;