import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteInvitation,
  accpetInvitation,
} from "../../actions/invitationActions";

class Invitation extends Component {
  onDeleteClick = (id) => {
    this.props.deleteInvitation(id);
  };

  onAcceptClick = (id) => {
    this.props.accpetInvitation(id);
  };

  render() {
    const { invitation } = this.props;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-body bg-light">
          {invitation.inviterName} invite you to join in his group{" "}
          <button
            className="far fa-check-circle"
            onClick={this.onAcceptClick.bind(this, invitation.id)}
          >
            Accept
          </button>
          <button
            className="fas fa-times"
            onClick={this.onDeleteClick.bind(this, invitation.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Invitation.protoTypes = {
  deleteInvitation: PropTypes.func.isRequired,
  accpetInvitation: PropTypes.func.isRequired,
};

export default connect(null, { deleteInvitation, accpetInvitation })(
  Invitation
);
