import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class GroupView extends Component {
  render() {
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">Group ID</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>Group Name</h3>
              <p>Group Description</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <a href="">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Group Board </i>
                  </li>
                </a>
                <Link>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Group Info</i>
                  </li>
                </Link>

                <li className="list-group-item delete">
                  <i className="fa fa-minus-circle pr-1"> Delete Group</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupView;