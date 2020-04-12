import React, { Component } from "react";
import Invitation from "./Invitation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInvitations } from "../../actions/invitationActions";
import { getEventNotifications } from "../../actions/eventNotificationActions";
import EventNotification from "./EventNotification";

class Message extends Component {
  componentDidMount() {
    this.props.getInvitations();
    this.props.getEventNotifications();
  }

  render() {
    const invitations = this.props.invitation.invitations;
    const notifications = this.props.notifications;

    return (
      <div>
        {invitations.map((invitation) => (
          <Invitation key={invitation.id} invitation={invitation} />
        ))}

        {notifications.map((notification) => (
          <EventNotification
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    );
  }
}

Message.propTypes = {
  invitation: PropTypes.object.isRequired,
  getEventNotifications: PropTypes.func.isRequired,
  getInvitations: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  invitation: state.invitation,
  notifications: state.notification.notifications,
});

export default connect(mapStateToProps, {
  getInvitations,
  getEventNotifications,
})(Message);
