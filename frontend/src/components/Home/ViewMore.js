import React, { useState, useEffect } from "react";
import { history } from "../../store";
import HeaderContainer from "../../containers/headerContainer";
import { Color } from "chalk";
import "./Home.css";
import ProviderCard from "../Card/providerCard";
import { Grid } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ViewMore() {
  const classes = useStyles();
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(11);
  const [pages, setPages] = useState(1);
  const [results, setResults] = useState([]);
  const loadingAnimation = [1, 2, 3, 4];
  useEffect(() => {
    if (history.location.state == undefined) {
      window.location.reload();
    } else {
      setResults(history.location?.state.criterion);
      setPages(Math.ceil(history.location?.state.criterion.length / 12));
    }
  }, []);

  const handleChange = (e, n) => {
    setN1(12 * (n - 1));
    setN2(12 * (n - 1) + 11);
  };
  const logic_for_profiles_based_on_city = () => {
    var fullname_array = [];
    return (
      <div>
        {results != [] && results.length > 0 ? (
          results.map((itemz, index) => {
            return (
              <div>
                <div>
                  <span style={{ display: "none" }}>
                    {!fullname_array.includes(itemz.fullName)
                      ? fullname_array.push(itemz.fullName)
                      : ""}
                  </span>

                  {index >= n1 && index <= n2 ? (
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
        ) : (
          <div style={{ display: "flex" }}>
            {loadingAnimation.map((i) => {
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
    ); /*end of return  statement*/
  };
  return (
    <div>
      <HeaderContainer />
      <div
        style={{
          padding: 1.5,
          backgroundColor: "#F8F8F8",
          marginTop: "100px",
          marginLeft: 25,
          marginRight: 25,
          paddingBottom: 30,
          display: "flex",
          flexDirection: "column",
          // marginBottom: 20,
        }}
      >
        {history.location?.state.viewers ? (
          <Grid
            container
            xs={12}
            spacing={3}
            style={{
              marginTop: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {results != [] && results.length > 0 ? (
              results.map((itemz, index) => {
                return (
                  <div className="viewer_card">
                    <Typography
                      variant="body2"
                      color="textprimary"
                      style={{ fontSize: "20px" }}
                    >
                      {itemz.name.toUpperCase()}&nbsp;
                    </Typography>

                    <Typography
                      variant="caption"
                      color="textSecondary"
                      style={{ fontSize: "15px" }}
                    >
                      {itemz.email}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      style={{ fontSize: "15px", color: "#595959" }}
                    >
                      {itemz.phone_number}
                    </Typography>
                  </div>
                );
              })
            ) : (
              <div style={{ display: "flex" }}>
                {loadingAnimation.map((i) => {
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
          </Grid>
        ) : (
          <Grid container spacing={2} xs={12} style={{ marginTop: 70 }}>
            <div className="profiles_based_on_city">
              <div style={{ paddingLeft: "15px" }}>
                Profiles Based On Your Search Criterion
              </div>
              <br />
              <br />
              {logic_for_profiles_based_on_city()}
            </div>
          </Grid>
        )}
        <div
          className={classes.root}
          style={{
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Pagination
            style={{ alignItems: "center", justifyContent: "center" }}
            count={pages}
            variant="outlined"
            color="primary"
            size="large"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewMore;
