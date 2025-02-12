import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { history } from "./store";
import ProtectedRoute from "./utils/guards";
import LoginContainer from "./containers/userLoginContainer";
import RegisterContainer from "./containers/userRegisterContainer";
import ProviderLoginContainer from "./containers/providerLoginContainer";
import ProviderRegisterContainer from "./containers/providerRegisterContainer";
import GoogleForms from "./components/GoogleForms/GoogleForms";
import ProviderDashboardContainer from "./containers/providerDashboardContainer";
import AdminLoginContainer from "./containers/adminLoginContainer";
import NotFound from "./components/NotFound/NotFound";
import HomeContainer from "./containers/homeContainer";
import AdminDashboardContainer from "./containers/adminDashboardContainer";
import Dashboard from "./components/Dashboard/Dashboard";
import ProviderProfileContainer from "./containers/providerProfileContainer";
import "./App.css";
import log from "./utils/logger.service";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Home/Search";
import ChooseLoginRegister from "./components/Home/LoginRegisterChoose";
import ViewMore from "./components/Home/ViewMore";
import ProfilesViewed from "./components/Dashboard/ProfilesViewed";
import Contactus from "./components/Contact/contactus";

function App() {
  var str;
  fetch("https://api.ipify.org?format=jsonp?callback=?", {
    method: "GET",
    headers: {},
  })
    .then((res) => {
      return res.text();
    })
    .then((ip) => {
      str = "Request from IP: " + ip;
    })
    .then(() => {
      var module = {
        options: [],
        header: [
          navigator.platform,
          navigator.userAgent,
          navigator.appVersion,
          navigator.vendor,
          window.opera,
        ],
        dataos: [
          { name: "Windows Phone", value: "Windows Phone", version: "OS" },
          { name: "Windows", value: "Win", version: "NT" },
          { name: "iPhone", value: "iPhone", version: "OS" },
          { name: "iPad", value: "iPad", version: "OS" },
          { name: "Kindle", value: "Silk", version: "Silk" },
          { name: "Android", value: "Android", version: "Android" },
          { name: "PlayBook", value: "PlayBook", version: "OS" },
          { name: "BlackBerry", value: "BlackBerry", version: "/" },
          { name: "Macintosh", value: "Mac", version: "OS X" },
          { name: "Linux", value: "Linux", version: "rv" },
          { name: "Palm", value: "Palm", version: "PalmOS" },
        ],
        databrowser: [
          { name: "Chrome", value: "Chrome", version: "Chrome" },
          { name: "Firefox", value: "Firefox", version: "Firefox" },
          { name: "Safari", value: "Safari", version: "Version" },
          { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
          { name: "Opera", value: "Opera", version: "Opera" },
          { name: "BlackBerry", value: "CLDC", version: "CLDC" },
          { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
        ],
        init: function () {
          var agent = this.header.join(" "),
            os = this.matchItem(agent, this.dataos),
            browser = this.matchItem(agent, this.databrowser);

          return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
          var i = 0,
            j = 0,
            html = "",
            regex,
            regexv,
            match,
            matches,
            version;

          for (i = 0; i < data.length; i += 1) {
            regex = new RegExp(data[i].value, "i");
            match = regex.test(string);
            if (match) {
              regexv = new RegExp(data[i].version + "[- /:;]([\\d._]+)", "i");
              matches = string.match(regexv);
              version = "";
              if (matches) {
                if (matches[1]) {
                  matches = matches[1];
                }
              }
              if (matches) {
                matches = matches.split(/[._]+/);
                for (j = 0; j < matches.length; j += 1) {
                  if (j === 0) {
                    version += matches[j] + ".";
                  } else {
                    version += matches[j];
                  }
                }
              } else {
                version = "0";
              }
              return {
                name: data[i].name,
                version: parseFloat(version),
              };
            }
          }
          return { name: "unknown", version: 0 };
        },
      };

      var e = module.init(),
        debug = "";

      debug += "os.name = " + e.os.name + ",";
      debug += "browser.name = " + e.browser.name + ",";

      log(str + ", " + debug);
    });

  return (
    <div className="App">
      <div className="App-intro">
        <Router history={history}>
          <Switch>
            <Route exact path="/viewMore" component={ViewMore} />
            <Route exact path="/profilesViewed/:id" component={ProfilesViewed} />
            <Route exact path="/" component={HomeContainer} />
            <Route
              exact
              path="/register"
              render={() => {
                return localStorage.getItem("providerId") ||
                  localStorage.getItem("userId") ? (
                  <Redirect to="/" />
                ) : (
                  <RegisterContainer />
                );
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return localStorage.getItem("providerId") ||
                  localStorage.getItem("userId") ? (
                  <Redirect to="/" />
                ) : (
                  <LoginContainer />
                );
              }}
            />
            <Route exact path="/feedback" component={GoogleForms} />
            <Route exact path="/search" component={Search} />
            <Route
              exact
              path="/chooseLoginRegister"
              component={ChooseLoginRegister}
            />

            <Route
              path="/provider/profile"
              component={ProviderProfileContainer}
            />

            <Route
              exact
              path="/provider/login"
              render={() => {
                return localStorage.getItem("providerId") ||
                  localStorage.getItem("userId") ? (
                  <Redirect to="/" />
                ) : (
                  <ProviderLoginContainer />
                );
              }}
            />
            <Route
              exact
              path="/provider/register"
              render={() => {
                return localStorage.getItem("providerId") ||
                  localStorage.getItem("userId") ? (
                  <Redirect to="/" />
                ) : (
                  <ProviderRegisterContainer />
                );
              }}
            />
            <Route exact path="/admin/login" component={AdminLoginContainer} />
            <ProtectedRoute exact path="/profile" component={Dashboard} />
            <Route
              exact
              path="/provider/dashboard"
              component={ProviderDashboardContainer}
            />
            <ProtectedRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboardContainer}
            />

            <Route exact path="/contact" component={Contactus} />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
