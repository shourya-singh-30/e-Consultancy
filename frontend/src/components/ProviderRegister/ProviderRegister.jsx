import React from "react";
import HeaderContainer from "../../containers/headerContainer";
import "./ProviderRegister.css";
import { default as RSelect } from "react-select";
import makeAnimated from "react-select/animated";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import data from "../../assets/businessTypes.json";
import data1 from "../../assets/businessType2.json";
import Skeleton from "react-loading-skeleton";
// import cities from '../../assets/city.json';
import {
  Container,
  InputLabel,
  Icon,
  StepLabel,
  Step,
  ExpansionPanelSummary,
  Stepper,
  TextField,
  Grid,
  Typography,
  Paper,
  Select,
  Avatar,
  MenuItem,
  Chip,
  ExpansionPanel,
  ExpansionPanelActions,
  Snackbar,
  Button,
  ExpansionPanelDetails,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { history, store } from "../../store";
import log from "../../utils/logger.service";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Multiselect } from "multiselect-react-dropdown";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { enableRipple } from "@syncfusion/ej2-base";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import GroupIcon from "@material-ui/icons/Group";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";

import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import WorkIcon from "@material-ui/icons/Work";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import StepConnector from "@material-ui/core/StepConnector";

import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CancelIcon from "@material-ui/icons/Cancel";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    zIndex: 1,
    color: "#0099cc",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-5px",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(0, 191, 255) 0%, rgb(0, 153, 204) 50%, rgb(0, 134, 179) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    color: "#fff",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(0, 230, 230) 0%, rgb(0, 179, 179) 50%, rgb(0, 153, 153) 100%)",
    color: "#fff",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon style={{ width: "15px", height: "15px" }} />,
    2: <GroupAddIcon style={{ width: "15px", height: "15px" }} />,
    3: <VideoLabelIcon style={{ width: "15px", height: "15px" }} />,
    4: <WorkIcon style={{ width: "15px", height: "15px" }} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

enableRipple(true);

//from ramids
const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos" },
    ],
  },
];

var stepper_style = {
  backgroundImage:
    "linear-gradient( 136deg, rgb(0, 191, 255) 0%, rgb(0, 179, 179) 50%, rgb(0, 230, 230) 100%)",
  color: "#fff",
};

export default class ProviderRegister extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeStep: 0,
      steps: [
        "Partner Details",
        "Organization Details",
        "Services Details",
        "Service Type Details",
      ],
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      City: "Delhi",
      // AllCities: cities,
      Fees: "",
      ALine1: "",
      ALine2: "",
      PinCode: "",
      imgUpload: false,

      field: {
        dataSource: this.countries,
        id: "id",
        parentID: "pid",
        text: "name",
        hasChildren: "hasChild",
      },
      indNodes: [],

      busNodes: [],

      indChecked: [],
      indExpanded: [],
      busChecked: [],
      busCheckedForAPI: [],
      indCheckedForAPI: [],
      busExpanded: [],
      checked: [],
      expanded: [],
      selectedBusinesses: [],
      services: [],
      servivesList: [],
      selectedServices: [],
      actualServices: [],
      expertise: [],
      expertiseList: [],
      confirmPassword: "",
      phoneNumber: "",
      country_code: "+91",
      errorMessage: "",
      OrgName: "",
      base64: "",
      OrgAddress: "",
      OrgPINType: "",
      OrgCountry: "India",
      OrgCity: "Delhi",
      selectedCountry: "",
      importedCity: [],
      OrgRegNumber: "",
      OrgServiceType: "",
      OrgExpertise: [],
      open: false,
      showAlert: false,
      value: 0,
      errors: {
        firstName: "",
        lastName: "",
        OrgName: "",
        OrgAddress: "",
        OrgCountry: "",
        OrgRegNumber: "",
        OrgPINType: "",
        password: "",
        email: "",
        confirmPassword: "",
        phoneNumber: "",
      },
      indStat: false,
      busStat: false,
      others: false,
      countries: [],
      partnerDetails: false,
      organizationDetails: false,
      servicesDetails: false,
      serviceTypeDetails: false,
      isLoading: true,
    };
  }

  // name = (e) => {
  //     const file=e.target.files[0]
  //     const fileName=file.name
  //     console.log(file)
  //     var idxDot = fileName.lastIndexOf(".") + 1;
  //     var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  //     if (!(extFile=="jpg" || extFile=="jpeg" || extFile=="png")){
  //         alert("Only jpg/jpeg and png files are allowed!");
  //         e.target.value=""

  //     }else if(file.size>3145728){
  //         alert("Image size greater than 3mb not allowed!");
  //         e.target.value=""

  //     }else{
  //         console.log("file read")
  //         let reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onloadend = () => {
  //             console.log("file entered")
  //             this.setState({
  //                 base64: reader.result,
  //                 imgUpload: true
  //         });
  //         this.change(e);
  //         console.log(this.state.base64,"base64",this.state.imgUpload)
  //     };
  //     }

  // }

  classes = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

  //   const [value, setValue] = React.useState(0);

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleDelete = (name) => {
    if (this.state.services.length === 1) {
      this.setState({
        showAlert: true,
      });
      return null;
    }
    this.setState({
      services: this.state.services.filter((item) => item.name !== name.name),
    });
  };

  change = (e) => {
    e.preventDefault();

    if (e.target.id === "raised-button-file") {
      if (e.target.files[0] == undefined) {
        this.setState({
          imgUpload: false,
        });
      }
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const fileName = file.name;

        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (!(extFile == "jpg" || extFile == "jpeg" || extFile == "png")) {
          alert("Only jpg/jpeg and png files are allowed!");
          e.target.value = "";
          this.setState({
            imgUpload: false,
          });
        } else if (file.size > 3145728) {
          alert("Image size greater than 3mb not allowed!");
          e.target.value = "";
          this.setState({
            imgUpload: false,
          });
        } else {
          console.log("file read");
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            console.log("file entered");
            this.setState({
              base64: reader.result,
              imgUpload: true,
            });
            console.log(this.state.base64, "base64", this.state.imgUpload);
          };
        }
      }
    }
    const { name, value } = e.target;
    let errors = this.state.errors;
    switch (name) {
      case "firstName":
        console.log(value);
        errors.firstName =
          value.length < 3 || value.match(/[0-9 \W]/)
            ? "First Name should be min 3 characters long and only contain alphabets"
            : null;
        break;
      case "lastName":
        errors.lastName =
          value.length < 3 || value.match(/[0-9 \W]/)
            ? "Last name should be min 3 characters long and only contain alphabets"
            : null;
        break;
      case "email":
        errors.email = value.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
          ? null
          : "Invalid Email Address";
        break;
      case "password":
        errors.password = value.match(
          /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/
        )
          ? null
          : "Password should be atleast 7 characters with alphanumeric characters and atleast 1 special character Eg: @example7";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          this.state.password === value
            ? null
            : "Confirm Password should be equal to password";
        break;
      case "phoneNumber":
        errors.phoneNumber = value.match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
          ? null
          : "Invalid phone number.";
        break;
      case "OrgName":
        errors.OrgName =
          value.length < 3
            ? "Organization name should be 3 characters long"
            : null;
        break;
      case "OrgAddress":
        errors.OrgAddress =
          value.length < 3 ? "Ivalid Organization address" : null;
        break;
      case "OrgRegNumber":
        errors.OrgRegNumber =
          value.length == 0 || value.match(/[\W]/)
            ? "Organization registration number is required"
            : null;
        break;
      case "OrgPINType":
        errors.OrgPINType =
          value.length == 0 || value.match(/[\W]/)
            ? "PIN type is required"
            : null;
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      return null;
    });
    if (
      this.state.errors.firstName == null &&
      this.state.errors.lastName == null &&
      this.state.errors.email == null &&
      this.state.errors.password == null &&
      this.state.errors.confirmPassword == null &&
      this.state.errors.phoneNumber == null
    ) {
      this.setState({ partnerDetails: true });
    } else {
      this.setState({ partnerDetails: false });
    }
    setTimeout(() => {
      console.log("image settimeout", this.state.imgUpload);
      if (
        this.state.errors.OrgName == null &&
        this.state.errors.OrgAddress == null &&
        this.state.errors.OrgRegNumber == null &&
        this.state.errors.OrgPINType == null
      ) {
        console.log("image upload", this.state.imgUpload);

        if (
          this.state.Fees != "" &&
          this.state.PinCode != "" &&
          this.state.ALine1 != "" &&
          this.state.ALine2 != "" &&
          this.state.imgUpload
        ) {
          this.setState({ organizationDetails: true });
        } else {
          this.setState({ organizationDetails: false });
        }
      } else {
        this.setState({ organizationDetails: false });
      }
    }, 1000);
  };

  componentDidMount() {
    console.log("User is on Provider Register Page");
    document.title = "Yolo- Partner Register";
    this.props.getFinancialServiceList();
    this.props.getBusinessTypeList();
    this.props.getCountriesList();
    this.setState({
      indNodes: data,
    });
    this.setState({
      busNodes: data1,
    });
    this.setState({ isLoading: false });

    // this.setState({
    //     AllCities: cities

    // })

    store.subscribe(() => {
      this.setState({
        expertiseList: store.getState().getBusinessTypes.success,
        countries: store.getState().getCountries.countries,
        services: store.getState().getFinancialService.success,
      });
    });
    setTimeout(() => {
      this.state.services.map((item) => {
        var joined = this.state.servivesList.concat(item.name);
        this.setState({ servivesList: [...new Set(joined)] });
      });
      this.setState({
        expertise: Array.from(
          new Set(this.state.expertiseList.map((a) => a.name))
        ).map((name) => {
          return this.state.expertiseList.find((a) => a.name === name);
        }),
      });
    }, 5000);
    // this.setState();
    this.CitySelect();
  }

  others = () => {
    this.setState({ others: true });
  };

  othersFalse = () => {
    this.setState({ others: false });
  };

  storeSelectedservices = (value) => {
    if (value.length === 0) {
      this.setState({
        showAlert: true,
      });
      return null;
    } else {
      this.setState({
        actualServices: Array.from(new Set(value.map((a) => a))).map((name) => {
          return this.state.services.find((a) => a.name === name);
        }),
      });
      this.setState({ showAlert: false });
    }
  };

  handleNext = () => {
    this.CitySelect();
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    window.location.reload();
  };

  handleAccessCode = (e) => {
    this.setState({ country_code: e.target.getAttribute("data-value") });
  };

  CitySelect = () => {
    var join = [];
    var finalCity = [];
    this.state.countries.map((item) => {
      if (item.name === this.state.OrgCountry) {
        join = item.cities;
        for (let city of join) {
          if (city.substr(0, 6) == "Others") {
            finalCity.push(city.substr(7));
          } else {
            finalCity.push(city);
          }
        }
        finalCity = finalCity.sort();
        this.setState({ importedCity: finalCity });
      }
    });
  };

  handleCountrySelect = (e) => {
    this.setState({
      OrgCountry: e.target.getAttribute("data-value"),
      selectedCountry: e.target.getAttribute("data-value"),
    });

    setTimeout(() => {
      this.CitySelect();
    }, 1000);
  };

  handleCitySelect = (e) => {
    this.setState({
      OrgCity: e.target.getAttribute("data-value"),
      City: e.target.getAttribute("data-value"),
    });
  };

  handleOtherCitySelect = (e) => {
    let cityValue = e.target.value;
    let otherCity = cityValue.charAt(0).toUpperCase() + cityValue.slice(1);
    if ((e.target.id = "otherCitiesLabel")) {
      otherCity = "Others-" + otherCity;
    }
    this.setState({
      OrgCity: otherCity,
      City: otherCity,
    });
  };

  handleSelectedexpertise = (e, value) => {
    this.setState({ OrgExpertise: value });

    this.handleServicesDetails();
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  createOrganization = async (e) => {
    e.preventDefault();
    let companyName = this.state.OrgName.toLowerCase();
    companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
    let createdOn = new Date();
    await this.props.registerProvider(
      this.state.firstName + " " + this.state.lastName,
      this.state.password,
      this.state.email,
      this.state.phoneNumber,
      this.state.Fees,
      this.state.OrgCountry,
      this.state.City,
      this.state.ALine1,
      this.state.ALine2,
      this.state.PinCode,
      companyName,
      this.state.OrgAddress,
      this.state.OrgRegNumber,
      this.state.OrgPINType,
      this.state.actualServices,
      this.state.base64,
      this.state.OrgExpertise,
      this.state.indCheckedForAPI,
      this.state.busCheckedForAPI,
      createdOn
    );
    if (this.state.others == true) {
      this.props.updateCity(this.state.City, this.state.OrgCountry);
    }
    await store.subscribe(() => {
      console.log(
        "error message-------->",
        store.getState().registerProvider.error
      );
      console.log(
        "success message-------->",
        store.getState().registerProvider.success
      );
      if (store.getState().registerProvider.error) {
        this.setState({
          open: true,
          errorMessage: store.getState().registerProvider.error,
        });

        //alert(this.state.errorMessage)
      }
      if (store.getState().registerProvider.success) {
        // alert("registration successful");
        this.setState({
          errorMessage: store.getState().registerProvider.success,
        });
      }
    });
    // TESTING CODE FROM LOGIN
    if (store.getState().registerProvider.success) {
      console.log("EMAIL ", " PASS ", this.state.email, this.state.password);
      await this.props.providerLogin(this.state.email, this.state.password);

      if (this.props.data.providerLogin.error) {
        console.log(this.props.data.providerLogin.error);
        this.setState({
          open: true,
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
          `/provider/profile?id=${localStorage.getItem("providerId")}`,
          { from: "device detail page" }
        );
      }
    }
  };

  handleSelectedservices = (event, value) => {
    this.setState({
      selectedServices: [...this.state.selectedServices, value],
    });
    this.handleServicesDetails();
    this.storeSelectedservices(value);
  };

  handleServicesDetails = () => {
    setTimeout(() => {
      if (
        this.state.selectedServices.length != 0 &&
        this.state.OrgExpertise.length != 0
      ) {
        this.setState({ servicesDetails: true });
      } else {
        this.setState({ servicesDetails: false });
      }
    }, 100);
    setTimeout(() => {
      console.log(this.state.actualServices);
    }, 5000);
  };

  renderMultiSelect = (options) => {
    const animatedComponents = makeAnimated();
    return (
      <RSelect
        className="multi-select"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={this.multiSelectGetValues}
      ></RSelect>
    );
  };

  multiSelectGetValues = (...vv) => {
    this.setState({
      selectedBusinesses: vv[0],
    });
  };

  treeParse = (nodes, checkedArray) => {
    const checked = [];
    nodes.forEach((node) => {
      if (node.children) {
        const chdd = [];
        node.children.forEach((child) => {
          if (child.children) {
            const grans = [];
            child.children.forEach((grand) => {
              if (checkedArray.indexOf(grand.label) > -1)
                grans.push({
                  label: grand.label,
                  value: grand.label,
                });
            });
            chdd.push({
              value: child.label,
              label: child.label,
              children: grans,
            });
          }
        });
        checked.push({
          value: node.label,
          label: node.label,
          children: chdd,
        });
      }
    });
    console.log("checked ", checked);
    return checked;
  };

  treeValidation = (array, busCh) => {
    setTimeout(() => {
      console.log(array);
      console.log(busCh);
      if (busCh == false) {
        if (array.length != 0) {
          this.setState({ indStat: true });
        } else {
          this.setState({ indStat: false });
        }
      }
      if (busCh == true) {
        if (array.length != 0) {
          this.setState({ busStat: true });
        } else {
          this.setState({ busStat: false });
        }
      }
      if (this.state.indStat == true && this.state.busStat == true) {
        this.setState({ serviceTypeDetails: true });
      } else {
        this.setState({ serviceTypeDetails: false });
      }
      console.log(this.state.indStat);
      console.log(this.state.busStat);
    }, 100);
  };

  checkTreeProperty = (checkedArray, busCh) => {
    console.log("bbgg ", checkedArray);
    if (busCh) {
      this.setState({ busChecked: checkedArray });
      this.setState({
        busCheckedForAPI: this.treeParse(this.state.busNodes, checkedArray),
      });
    } else {
      this.setState({ indChecked: checkedArray });
      this.setState({
        indCheckedForAPI: this.treeParse(this.state.indNodes, checkedArray),
      });
    }
    this.treeValidation(checkedArray, busCh);
  };
  businessTreeCheck = () => {
    return (
      <CheckboxTree
        nodes={this.state.busNodes}
        checked={this.state.busChecked}
        expanded={this.state.busExpanded}
        onCheck={(checked) => this.checkTreeProperty(checked, true)}
        onExpand={(expanded) => this.setState({ busExpanded: expanded })}
        icons={{
          check: <span className="rct-icon rct-icon-check" />,
          uncheck: <span className="rct-icon rct-icon-uncheck" />,
          halfCheck: <span className="rct-icon rct-icon-half-check" />,
          expandClose: <span className="rct-icon rct-icon-expand-close" />,
          expandOpen: <span className="rct-icon rct-icon-expand-open" />,
          expandAll: <span className="rct-icon rct-icon-expand-all" />,
          collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
          parentClose: null,
          parentOpen: null,
          leaf: null,
        }}
      />
    );
  };

  indTreeCheck = () => {
    return (
      <CheckboxTree
        nodes={this.state.indNodes}
        checked={this.state.indChecked}
        expanded={this.state.indExpanded}
        onCheck={(ch) => this.checkTreeProperty(ch, false)}
        onExpand={(expanded) => this.setState({ indExpanded: expanded })}
        icons={{
          check: <span className="rct-icon rct-icon-check" />,
          uncheck: <span className="rct-icon rct-icon-uncheck" />,
          halfCheck: <span className="rct-icon rct-icon-half-check" />,
          expandClose: <span className="rct-icon rct-icon-expand-close" />,
          expandOpen: <span className="rct-icon rct-icon-expand-open" />,
          expandAll: <span className="rct-icon rct-icon-expand-all" />,
          collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
          parentClose: null,
          parentOpen: null,
          leaf: null,
        }}
      />
    );
  };

  getStepperContent = () => {
    if (this.state.activeStep === 3) {
      return (
        <div class="form_container">
          <div style={{ height: "10px", display: "block" }}></div>

          <GridContainer>
            <GridItem>
              <ExpansionPanel style={{ width: "90%", marginLeft: "5%" }}>
                <ExpansionPanelSummary
                  expandIcon={
                    <Icon className="fa fa-sort-desc" aria-hidden="true" />
                  }
                >
                  <Typography>{"For Individual"}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelSummary>
                  {this.indTreeCheck()}
                </ExpansionPanelSummary>
              </ExpansionPanel>
            </GridItem>
          </GridContainer>
          <div style={{ height: "10px", display: "block" }}></div>

          <GridContainer>
            <GridItem>
              <ExpansionPanel style={{ width: "90%", marginLeft: "5%" }}>
                <ExpansionPanelSummary
                  expandIcon={
                    <Icon className="fa fa-sort-desc" aria-hidden="true" />
                  }
                >
                  <Typography>{"For business"}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelSummary>
                  <div>{this.businessTreeCheck()}</div>
                </ExpansionPanelSummary>
              </ExpansionPanel>
            </GridItem>
          </GridContainer>

          <div style={{ height: "30px", display: "block" }}></div>
          <Button
            disabled={this.state.activeStep === 0}
            onClick={this.handleBack}
            style={{ marginRight: 30 }}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            onClick={this.handleReset}
            variant="outlined"
            color="secondary"
            style={{ marginRight: 30 }}
          >
            Reset
          </Button>
          <br />
          <br />
          <Button
            onClick={this.createOrganization}
            disabled={!this.state.serviceTypeDetails}
            variant="contained"
            style={{ backgroundColor: "#006699", color: "#fff" }}
          >
            Create your Provider Account
          </Button>
        </div>
      );
    }

    if (this.state.activeStep === 2) {
      return (
        <div class="form_container">
          <div className={this.classes.root}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="primary"
              centered
              size="small"
            >
              <Tab
                size="small"
                style={{ fontSize: "10px" }}
                label="Select your service Type"
              />
              <Tab
                size="small"
                style={{ fontSize: "10px" }}
                label="Select your Expertise"
              />
            </Tabs>
          </div>
          {this.state.value !== 1 ? (
            <div style={{ display: "inline-flex", marginBottom: 50 }}>
              <div style={{ width: "100%" }}>
                {this.state.showAlert ? (
                  <Alert severity="warning">
                    Cannot delete. Atleast one expertise required
                  </Alert>
                ) : null}

                <br />
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  value={this.state.selectedServices[0]}
                  options={this.state.servivesList}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  onChange={(event, value) =>
                    this.handleSelectedservices(event, value)
                  }
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </React.Fragment>
                  )}
                  className="dropDown"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select your service Type"
                      placeholder="services"
                    />
                  )}
                />
              </div>
              <br />
              <br />
            </div>
          ) : (
            <div style={{ display: "inline-flex", marginBottom: 50 }}>
              <div>
                <br />
                <br />
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  size="small"
                  value={this.state.OrgExpertise}
                  options={this.state.expertise}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    this.handleSelectedexpertise(event, value)
                  }
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  className="dropDown"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Please Select your Expertise"
                      placeholder="Expertise"
                    />
                  )}
                />
              </div>
            </div>
          )}
          <br />
          <br />
          <Button
            disabled={this.state.activeStep === 0}
            onClick={this.handleBack}
            style={{ marginRight: 30 }}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            disabled={!this.state.servicesDetails}
            variant="outlined"
            color="primary"
            onClick={this.handleNext}
            style={{ marginRight: 30 }}
          >
            {this.state.activeStep === this.state.steps.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>
      );
    }

    if (this.state.activeStep === 0) {
      return (
        <div>
          {this.state.isLoading ? (
            <div>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div style={{ marginRight: "10px" }}>
                  <Skeleton height={30} width={250} />
                </div>
                <div>
                  <Skeleton height={30} width={250} />
                </div>
              </div>
              <Skeleton height={30} width={500} />
              <div
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <Skeleton height={30} width={250} />
                </div>
                <div>
                  <Skeleton height={30} width={250} />
                </div>
              </div>
              <Skeleton height={30} width={500} />
            </div>
          ) : (
            <div class="form_container">
              <Container maxWidth="sm" style={{ marginBottom: 30 }}>
                <form noValidate autoCapitalize="off">
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        First Name <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        id="firstName"
                        placeholder="Enter First Name.."
                        fullWidth
                        type="text"
                        required
                        name="firstName"
                        size="small"
                        error={this.state.errors.firstName}
                        helperText={this.state.errors.firstName}
                        autoFocus
                        onChange={(e) => this.change(e)}
                        value={this.state.firstName}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PermIdentityIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Last Name <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        id="lastName"
                        placeholder="Enter Last Name"
                        fullWidth
                        size="small"
                        type="text"
                        required
                        name="lastName"
                        error={this.state.errors.lastName}
                        helperText={this.state.errors.lastName}
                        onChange={(e) => this.change(e)}
                        value={this.state.lastName}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <GroupIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <div style={{ height: "10px", display: "block" }}></div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <span style={{ float: "left" }}>
                        Email Address <sup style={{ color: "red" }}>*</sup>
                      </span>
                      <TextField
                        id="email"
                        placeholder="Enter Email Address"
                        fullWidth
                        size="small"
                        type="email"
                        required
                        name="email"
                        error={this.state.errors.email}
                        helperText={this.state.errors.email}
                        onChange={(e) => this.change(e)}
                        value={this.state.email}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <MailIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <div style={{ height: "10px", display: "block" }}></div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Password <sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        id="password"
                        placeholder="Enter Password"
                        fullWidth
                        size="small"
                        type="password"
                        required
                        name="password"
                        error={this.state.errors.password}
                        helperText={this.state.errors.password}
                        onChange={(e) => this.change(e)}
                        value={this.state.password}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <span style={{ float: "left" }}>
                        Re-Enter Password <sup style={{ color: "red" }}>*</sup>
                      </span>

                      <TextField
                        id="confirmPassword"
                        placeholder="Re-enter Password"
                        fullWidth
                        size="small"
                        type="password"
                        required
                        name="confirmPassword"
                        error={this.state.errors.confirmPassword}
                        helperText={this.state.errors.confirmPassword}
                        onChange={(e) => this.change(e)}
                        value={this.state.confirmPassword}
                        variant="outlined"
                        inputProps={{ style: { fontSize: 12 } }}
                      />
                    </GridItem>
                  </GridContainer>

                  <div style={{ height: "10px", display: "block" }}></div>
                  <GridContainer>
                    <GridItem xs={6} sm={6} md={6}>
                      <span style={{ float: "left" }}>
                        Phone Number <sup style={{ color: "red" }}>*</sup>
                      </span>
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <Select
                        fullwidth
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-sßelect"
                        value={this.state.country_code}
                        variant="outlined"
                        style={{ minWidth: 120, height: "40px" }}
                      >
                        {this.state.countries && this.state.countries.length ? (
                          this.state.countries.map((item, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={item.dial_code}
                                onClick={(e) => this.handleAccessCode(e)}
                              >
                                {item.dial_code}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <span>Loading</span>
                        )}
                      </Select>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={9}>
                      <TextField
                        id="phone_number"
                        placeholder="Enter Phone number.."
                        name="phoneNumber"
                        fullWidth
                        size="small"
                        type="number"
                        error={this.state.errors.phoneNumber}
                        helperText={this.state.errors.phoneNumber}
                        required
                        onChange={(e) => this.change(e)}
                        value={this.state.phoneNumber}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon style={{ color: "#006699" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </form>
              </Container>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={this.handleBack}
                style={{ marginRight: 30 }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                disabled={!this.state.partnerDetails}
                variant="outlined"
                color="primary"
                onClick={this.handleNext}
                style={{ marginRight: 30 }}
              >
                {this.state.activeStep === this.state.steps.length - 1
                  ? "Finish"
                  : "Next"}
              </Button>
            </div>
          )}
        </div>
      );
    }

    if (this.state.activeStep === 1) {
      return (
        <div class="form_container">
          <Container maxWidth="sm" style={{ marginBottom: 50 }}>
            <form noValidate autoCapitalize="off">
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Organization Name <sup style={{ color: "red" }}>*</sup>
                  </span>

                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    autoFocus
                    required
                    placeholder="Enter Organization Name (As per goverment fillings)"
                    id="OrgName"
                    name="OrgName"
                    error={this.state.errors.OrgName}
                    helperText={this.state.errors.OrgName}
                    autoFocus
                    variant="outlined"
                    onChange={(e) => this.change(e)}
                    value={this.state.OrgName}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>
              <div style={{ height: "10px", display: "block" }}></div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Organization Address <sup style={{ color: "red" }}>*</sup>
                  </span>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter Organization Address"
                    type="text"
                    required
                    id="OrgAddress"
                    name="OrgAddress"
                    variant="outlined"
                    error={this.state.errors.OrgAddress}
                    helperText={this.state.errors.OrgAddress}
                    onChange={(e) => this.change(e)}
                    value={this.state.OrgAddress}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>
              <div style={{ height: "10px", display: "block" }}></div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <span style={{ float: "left" }}>
                    Fee<sup style={{ color: "red" }}>*</sup>
                  </span>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter your Fees"
                    type="number"
                    required
                    variant="outlined"
                    id="Fees"
                    name="Fees"
                    onChange={(e) => this.change(e)}
                    value={this.state.Fees}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <span style={{ float: "left" }}>
                    Pincode<sup style={{ color: "red" }}>*</sup>
                  </span>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter Your Pincode.."
                    type="number"
                    required
                    id="PinCode"
                    name="PinCode"
                    variant="outlined"
                    onChange={(e) => this.change(e)}
                    value={this.state.PinCode}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>

              <div style={{ height: "10px", display: "block" }}></div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <span style={{ float: "left" }}>
                    Country<sup style={{ color: "red" }}>*</sup>
                  </span>

                  <Select
                    id="countriesLabel"
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    size="small"
                    fullWidth
                    value={this.state.OrgCountry}
                    style={{ height: "40px" }}
                  >
                    {this.state.countries && this.state.countries.length ? (
                      this.state.countries.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item.name}
                            onClick={(e) => this.handleCountrySelect(e)}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <span>Loading...</span>
                    )}
                  </Select>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <span style={{ float: "left" }}>
                    City<sup style={{ color: "red" }}>*</sup>
                  </span>
                  <Select
                    id="citiesLabel"
                    hidden={this.state.others}
                    labelId="demo-simple-select-label"
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={this.state.OrgCity}
                    style={{ height: "40px" }}
                  >
                    {this.state.importedCity &&
                    this.state.importedCity.length ? (
                      this.state.importedCity.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={item}
                            onClick={(e) => this.handleCitySelect(e)}
                          >
                            {item}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <span>Loading...</span>
                    )}
                    <MenuItem onClick={this.others}>Others</MenuItem>
                  </Select>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="otherCitiesLabel"
                      style={{ height: "40px" }}
                      hidden={!this.state.others}
                      startAdornment={
                        <InputAdornment position="start">
                          Others-
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <span onClick={this.othersFalse}>
                            <CancelIcon />
                          </span>
                        </InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                      labelWidth={0}
                      onKeyUp={(e) => this.handleOtherCitySelect(e)}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>

              <div style={{ height: "10px", display: "block" }}></div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Address Line 1<sup style={{ color: "red" }}>*</sup>
                  </span>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Address Line 1"
                    type="text"
                    required
                    id="ALine1"
                    name="ALine1"
                    onChange={(e) => this.change(e)}
                    value={this.state.ALine1}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>

              <div style={{ height: "10px", display: "block" }}></div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Address Line 2<sup style={{ color: "red" }}>*</sup>
                  </span>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Address Line 2"
                    type="text"
                    required
                    id="ALine2"
                    name="ALine2"
                    onChange={(e) => this.change(e)}
                    value={this.state.ALine2}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>

              <div style={{ height: "10px", display: "block" }}></div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Organization Registation Number
                    <sup style={{ color: "red" }}>*</sup>
                  </span>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Enter your Organization Registation Number"
                    type="text"
                    required
                    id="OrgRegNumber"
                    name="OrgRegNumber"
                    error={this.state.errors.OrgRegNumber}
                    helperText={this.state.errors.OrgRegNumber}
                    onChange={(e) => this.change(e)}
                    value={this.state.OrgRegNumber}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>

              <div style={{ height: "10px", display: "block" }}></div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <span style={{ float: "left" }}>
                    Organization Pin Type<sup style={{ color: "red" }}>*</sup>
                  </span>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Enter Organization Pin Type"
                    type="text"
                    required
                    name="OrgPINType"
                    error={this.state.errors.OrgPINType}
                    helperText={this.state.errors.OrgPINType}
                    onChange={(e) => this.change(e)}
                    style={{ marginBottom: 40 }}
                    value={this.state.OrgPINType}
                    inputProps={{ style: { fontSize: 12 } }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem>
                  <span style={{ float: "left" }}>
                    Upload profile picture with size less than 3mb.
                  </span>
                  <br />
                  <input
                    accept=".jpg,.jpeg,.png"
                    id="raised-button-file"
                    name="ProfilePicture"
                    style={{ float: "left" }}
                    helperText="Image size greater than 3mb not allowed."
                    type="file"
                    required
                    onChange={(e) => {
                      this.change(e);
                    }}
                  />
                </GridItem>
              </GridContainer>
            </form>
          </Container>
          <Button
            disabled={this.state.activeStep === 0}
            onClick={this.handleBack}
            style={{ marginRight: 30 }}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            disabled={!this.state.organizationDetails}
            variant="outlined"
            color="primary"
            onClick={this.handleNext}
            style={{ marginRight: 30 }}
          >
            {this.state.activeStep === this.state.steps.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <HeaderContainer />

        <div class="full_data_container box_shadow ">
          <Stepper
            activeStep={this.state.activeStep}
            alternativeLabel
            elevation={0}
            style={stepper_style}
          >
            {this.state.steps.map((items, index) => {
              return (
                <Step key={items}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Typography variant="caption" style={{ color: "#fff" }}>
                      {items}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <div className="shrink">
            <GridContainer
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <GridItem xs={12} sm={12} md={8}>
                {this.getStepperContent()}
              </GridItem>
            </GridContainer>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={(e, r) => this.handleClose(e, r)}
            message={
              this.state.errorMessage.name == "MongoError"
                ? "This mobile no. is already registered and Upload the pic again too"
                : this.state.errorMessage
                ? `${this.state.errorMessage} and Upload the pic again too`
                : ""
            }
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
      </div>
    );
  }
}
