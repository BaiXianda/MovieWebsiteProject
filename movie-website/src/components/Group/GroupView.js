import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteGroup } from "../../actions/groupActions";

class GroupView extends Component {
  onDeleteClick = (id) => {
    this.props.deleteGroup(id);
  };

  render() {
    const { group } = this.props;

    const currentUser = this.props.currentUser;
    const moderator = group.moderator;

    let create;

    if (currentUser === moderator) {
      create = (
        <React.Fragment>
          <Link to={`/updateGroup/${group.groupID}`}>
            <li className="list-group-item update">
              <i className="fa fa-edit pr-1"> Update Group Info</i>
            </li>
          </Link>

          <li
            className="list-group-item delete"
            onClick={this.onDeleteClick.bind(this, group.groupID)}
          >
            <i className="fa fa-minus-circle pr-1"> Delete Group</i>
          </li>
        </React.Fragment>
      );
    } else {
      create = "";
    }

    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{group.groupID}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{group.groupName}</h3>
              <p>{group.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/groupBoard/${group.groupID}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Group Board </i>
                  </li>
                </Link>
                {create}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupView.protoTypes = {
  deleteGroup: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.security.user.username,
});

export default connect(mapStateToProps, { deleteGroup })(GroupView);
