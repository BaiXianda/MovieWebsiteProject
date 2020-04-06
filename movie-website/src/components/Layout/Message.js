import React, { Component } from "react";
import Invitation from "./Invitation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInvitations } from "../../actions/invitationActions";

class Message extends Component {
  componentDidMount() {
    this.props.getInvitations();
  }

  render() {
    const invitations = this.props.invitation.invitations;

    return (
      <div>
        {invitations.map((invitation) => (
          <Invitation key={invitation.id} invitation={invitation} />
        ))}
      </div>
    );
  }
}

Message.propTypes = {
  invitation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  invitation: state.invitation,
});

export default connect(mapStateToProps, { getInvitations })(Message);
