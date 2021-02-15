import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import SystemUpdateAltRoundedIcon from "@material-ui/icons/SystemUpdateAltRounded";
import { Link } from "react-router-dom";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import AlternateEmailRoundedIcon from "@material-ui/icons/AlternateEmailRounded";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(0.5),
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openn, setOpen] = React.useState(false);
  const handleIt = () => {
    setOpen(true);
  };
  const handleCls = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copy = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    handleIt();
  };

  // console.log(window.location.protocol,"//",window.location.host,"/","ooooooooo")

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <SystemUpdateAltRoundedIcon
        aria-describedby={id}
        onClick={handleClick}
        style={{ fontSize: "12px", transform: "rotateX(180deg)" }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {/* {window.location.href=="http://localhost:3000/" || window.location.href=="http://localhost:3000/provider/profile" 
          ? */}
          {/* ( */}
          <span>
            {/* {window.location.href=="http://localhost:3000/" 
            ? */}
            {/* ( */}
            <span>
              <input
                type="text"
                value={window.location.host + "/" + props.brand}
                id="myInput"
                style={{ position: "fixed", top: "-1000px" }}
              />
            </span>
            {/* ) */}
            {/* :
              (<span><input type="text" value={"http://localhost:3000"+props.brand} id="myInput" style={{position: 'fixed', top: '-1000px'}}/></span>)
              } */}
          </span>
          {/* ) */}
          {/* :
            (<span>{window.location.href=="http://3.94.90.131:3000/" 
            ?
              (<span><input type="text" value={"http://3.94.90.131:3000/"+props.brand} id="myInput" style={{position: 'fixed', top: '-1000px'}}/></span>)
            :
              (<span><input type="text" value={"http://3.94.90.131:3000"+props.brand} id="myInput" style={{position: 'fixed', top: '-1000px'}}/></span>)
              }
            </span>)
          } */}

          <Button onClick={copy} style={{ fontSize: "12px" }}>
            <AlternateEmailRoundedIcon />
            &nbsp;Copy Link
          </Button>
        </Typography>
      </Popover>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openn}
        autoHideDuration={2500}
        onClose={handleCls}
        message="Link Copied"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCls}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
