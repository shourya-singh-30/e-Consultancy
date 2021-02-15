import React from 'react';
import ProviderCard from "../Card/providerCard";
import Skeleton from "react-loading-skeleton";
import "./ProfilesViewed.css";
import {Grid} from "@material-ui/core";
import HeaderContainer from "../../containers/headerContainer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { Link } from "react-router-dom";
export default class ProfilesViewed extends React.Component{
    constructor(props){
        super();
        this.loadingAnimation = [1,2,3,4];
        this.state = {
            userData: {},
            providerArr: [],
            isLoading:true,
        }
    }
    userDetail = () => {
        let id = localStorage.getItem("userId");
        fetch("/api/user/userdata" ,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        }).then((res)=>{
            if(res.status==200){
                return res.json().then((res)=>{
                    let arr = [];
                    res.viewed.map((prov)=>{
                        arr.push(prov);
                    });
                    this.setState({
                        userData: res,
                        providerArr: arr,
                    });
                });
            }
        })
        .catch((err)=>{
            console.log(err,6666);
        })
    }
    componentDidMount(){
        console.log(localStorage.getItem("userId"));
        this.userDetail();
        setTimeout(()=>{
            this.setState({isLoading:false});
            console.log(this.state.userData.name+" User");
            console.log(this.state.providerArr);
        },500);
    }
    render(){
        return(
            <div>
              <HeaderContainer />
            <Grid container spacing={2} xs={12} style={{ marginTop: 70 }}>
            <div class="grid_roww shadow p-3 mb-5 bg-white rounded" style={{marginTop: "30px"}}>
              <div style={{ textAlign: "left", paddingLeft: "15px"}}>
                Profiles Viewed By You
              </div>
              <br />
              {this.state.isLoading  ? (
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
              ) : this.state.providerArr.length>0 ? (
                this.state.providerArr.map((itemz, index) => {
                    return (
                      <div>
                          <div>
                            <ProviderCard itemz={itemz} />
                          </div>  
                      </div>
                    );
                  })
              ):(
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

            <div style={{ color: "#006699" }}>
            Sorry! No Profiles Found
            </div>
              
              <br />
              {/* {this.state.city} */}
              <br />
              
            
            <br />
          </div>
              )}
              </div>
              </Grid>
            </div>
        )
    }
}