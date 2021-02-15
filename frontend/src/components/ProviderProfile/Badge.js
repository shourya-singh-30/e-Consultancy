import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function SimpleBadge({ viewers, children }) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{
        float: "right",
        cursor: "pointer",
      }}
    >
      <Badge badgeContent={viewers} color="error">
        {children}
      </Badge>
    </div>
  );
}
