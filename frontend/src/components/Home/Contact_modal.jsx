import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { Link } from "react-router-dom";
import PermPhoneMsgRoundedIcon from "@material-ui/icons/PermPhoneMsgRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import Background from "../../assets/img/newbg.jpg";

import "./Home.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    width: "300px",
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Link style={{ color: "#4d4d4d" }} onClick={handleOpen}>
        Contact Me
      </Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {props.m4 == true ? (
            <div className={classes.paper}>
              <div
                class="modal_header"
                style={{ backgroundImage: `url(${Background})` }}
              >
                <br />
                Contact Details
              </div>

              <div class="modal_content">
                <div class="inner_modal_content">
                  <div class="inner_content">
                    <EmailRoundedIcon
                      style={{ fontSize: "12px", color: "#00b3b3" }}
                    />
                    &nbsp;
                    {props.m1}
                  </div>

                  <div class="inner_content">
                    <PermPhoneMsgRoundedIcon
                      style={{ fontSize: "12px", color: "#00b3b3" }}
                    />
                    &nbsp;
                    {props.m2}
                  </div>

                  <div class="inner_content">
                    <LocationOnRoundedIcon
                      style={{ fontSize: "12px", color: "#00b3b3" }}
                    />
                    &nbsp;
                    {props.m6},&nbsp;{props.m7}&nbsp;,{props.m5},{props.m3}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;,Pin Code - {props.m8}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Fade>
      </Modal>
    </span>
  );
}
