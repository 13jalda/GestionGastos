import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";


const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/about" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/create" activeClassName="nav-link-active">
            Create
          </NavLink>
        </div>

      </div>

      <div className="right-side">
        JON ALDA
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);