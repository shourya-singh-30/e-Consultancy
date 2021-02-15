import React from "react";

import HeaderContainer from "../../containers/headerContainer";

import {
  Button,
  Snackbar,
  Grid,
  Card,
  Avatar,
  CardActionArea,
} from "@material-ui/core";

import classNames from "classnames";

import { Rating } from "@material-ui/lab";
import { store } from "../../store";
import CardErrorBoundary from "../shared/CardErrorBoundary";
import log from "../../utils/logger.service";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Link, Redirect } from "react-router-dom";
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
import Sharefunctionality from "../Home/Sharefunctionality";
import WorkIcon from "@material-ui/icons/Work";
import Tooltip from "@material-ui/core/Tooltip";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Contact_modal from "../Home/Contact_modal";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

import Topprofiles from "../Home/Topprofiles.jsx";
import { connect } from "react-redux";

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

export default function ProviderCard(props) {
  const handleLike = () => {};
  const recents = () => {
    let givenDate = new Date(props.itemz.createdOn);
    let current = new Date();
    let yearDiff = current.getFullYear() - givenDate.getFullYear();
    let monthDiff = current.getMonth() - givenDate.getMonth();
    let dateDiff = current.getDate() - givenDate.getDate();
    let hrsDiff = current.getHours() - givenDate.getHours();
    let minsDiff = current.getMinutes() - givenDate.getMinutes();
    let secsDiff = current.getSeconds() - givenDate.getSeconds();
    console.log(
      "CHECHK THISS....",

      // givenDate,
      // monthDiff,
      // dateDiff,
      current,
      givenDate,

      props.itemz.fullName,
      "  ",
      givenDate.getHours(),
      givenDate.getMinutes(),
      givenDate.getSeconds()
      // minsDiff,
      // secsDiff
    );
    return (
      <Typography
        style={{ marginLeft: "10px" }}
        variant="caption"
        color="textSecondary"
      >
        <strong>
          {yearDiff > 0
            ? `Registered ${yearDiff} ${yearDiff == 1 ? "Year" : "Years"} ago`
            : monthDiff > 0
            ? `Registered ${monthDiff} ${
                monthDiff == 1 ? "Month" : "Months"
              } ago`
            : dateDiff > 0
            ? `Registered ${dateDiff} ${dateDiff == 1 ? "Day" : "Days"} ago`
            : hrsDiff > 0
            ? `Registered ${hrsDiff} ${hrsDiff == 1 ? "Hour" : "Hours"} ago`
            : minsDiff > 0
            ? `Registered ${minsDiff} ${
                minsDiff == 1 ? "Minute" : "Minutes"
              } ago`
            : secsDiff > 0
            ? `Registered Few Moments ago`
            : ""}
        </strong>
      </Typography>
    );
  };
  return (
    <div>
      <div class="carddd" style={{ backgroundColor: "#FFF" }}>
        <div class="header_element">
          <div class="left_header">
            <img src={props.itemz.providerIdentityImg} style={media}></img>
            <br />

            {props.itemz.approved == true ? (
              <CheckCircleIcon
                style={{
                  backgroundColor: "#fff",
                  color: "#0077b3",
                  fontSize: "16px",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                  marginTop: "-22px",
                }}
              />
            ) : (
              <span style={{ marginTop: "-22px" }}>.</span>
            )}
          </div>

          <div class="right_header">
            <Typography
              variant="body2"
              color="textprimary"
              style={{ fontSize: "14px" }}
            >
              {props.itemz.fullName}&nbsp;
              <span style={{ display: "none" }}>
                {(share_link = `provider/profile?id=${props.itemz.partnerId}`)}
              </span>
              <span style={{ display: "none" }}>
                {(share_link_2 = `?id=${props.itemz.partnerId}`)}
              </span>
              <Link
                style={{
                  float: "right",
                  marginRight: "15px",
                  color: "#4d4d4d",
                }}
              >
                <Sharefunctionality
                  b1={share_link_2}
                  brand={share_link}
                  style={{ fontSize: "12px" }}
                />
              </Link>
            </Typography>

            <Typography
              variant="caption"
              component="p"
              style={{ fontSize: "12px", color: "#808080" }}
            >
              <WorkIcon style={{ fontSize: "11px", marginTop: "-2px" }} />
              &nbsp;
              {props.itemz.OrganizationName.substr(0, 11)}
              {props.itemz.OrganizationName.length > 8 ? (
                <HtmlTooltip
                  placement="top-start"
                  title={
                    <React.Fragment>
                      {props.itemz.OrganizationName}
                    </React.Fragment>
                  }
                >
                  <Link
                    underlineNone
                    class="link_hover"
                    style={{ color: "#0077b3", textDecoration: "none" }}
                  >
                    ...
                  </Link>
                </HtmlTooltip>
              ) : (
                ""
              )}
              <br />
              <LocationOnOutlinedIcon style={{ fontSize: "12px" }} />{" "}
              {props.itemz.country}
            </Typography>
          </div>
        </div>

        <div class="cardd_paddingg">
          <Typography
            variant="body2"
            color="textPrimary"
            style={{ fontSize: "13px" }}
          >
            {props.itemz.partnerId}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {props.itemz.partnerType[0].name}
            {props.itemz.partnerType.length > 1 ? (
              <HtmlTooltip
                placement="top-start"
                title={
                  <React.Fragment>
                    {props.itemz.partnerType != undefined &&
                      props.itemz.partnerType.map((expertise) => {
                        return <span>{expertise.name},&nbsp;</span>;
                      })}
                  </React.Fragment>
                }
              >
                <Link
                  underlineNone
                  style={{ color: "#0077b3", textDecoration: "none" }}
                >
                  &nbsp; & more
                </Link>
              </HtmlTooltip>
            ) : (
              ""
            )}
          </Typography>
          <Typography
            variant="caption"
            component="p"
            style={{ fontSize: "12px", color: "#595959" }}
          >
            Fees {props.itemz.Fees} &nbsp;
          </Typography>
          <br />
          <Link
            underlineNone
            class="link_hover"
            style={{ color: "#4d4d4d" }}
            to={`/provider/profile?id=${props.itemz.partnerId}`}
          >
            View Profile
          </Link>
          &nbsp;&nbsp;
          <Link
            underlineNone
            class="link_hover"
            style={{ color: "#4d4d4d", textDecoration: "none" }}
          >
            <span style={{ display: "none" }}>
              {(modal_data_1 = props.itemz.email)}
            </span>
            <span style={{ display: "none" }}>
              {(modal_data_2 = props.itemz.mobileNumber)}
            </span>
            <span style={{ display: "none" }}>
              {(modal_data_3 = props.itemz.country)}
            </span>
            {/* MODAL_DATA_4 WAS INITIALLY TO FILTER AND SHOW CONTACT DETAILS OF APPROVED PROVIDERS ONLY
            , WHICH WAS NOT GOOD UX AS CONTACT INFO OF ANY PROVIDER SHOULD BE VISISBLE*/}
            <span style={{ display: "none" }}>{(modal_data_4 = true)}</span>
            <span style={{ display: "none" }}>
              {(modal_data_5 = props.itemz.City)}
            </span>

            <span style={{ display: "none" }}>
              {(modal_data_6 = props.itemz.ALineOne)}
            </span>
            <span style={{ display: "none" }}>
              {(modal_data_7 = props.itemz.ALineTwo)}
            </span>
            <span style={{ display: "none" }}>
              {(modal_data_8 = props.itemz.PinCode)}
            </span>

            <Contact_modal
              m1={modal_data_1}
              m2={modal_data_2}
              m3={modal_data_3}
              m4={modal_data_4}
              m5={modal_data_5}
              m6={modal_data_6}
              m7={modal_data_7}
              m8={modal_data_8}
            />
          </Link>
          <Link
            to={localStorage.getItem("userId") ? "" : "/login"}
            onClick={handleLike}
          >
            {props.itemz.idType.length < 1 ? (
              <FavoriteBorderIcon
                style={{
                  float: "right",
                  fontSize: "14px",
                  color: "#666666",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              />
            ) : (
              <FavoriteIcon
                style={{
                  float: "right",
                  fontSize: "14px",
                  color: "#0077b3",
                  cursor: "pointer",
                  marginTop: "7px",
                }}
              />
            )}
          </Link>
        </div>
        {console.log("recents", props.recents)}
        <div>{props.recents ? recents() : ""}</div>
      </div>
    </div>
  );
}
