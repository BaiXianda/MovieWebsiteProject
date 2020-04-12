import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEventNotification } from "../../actions/eventNotificationActions";

class EventNotification extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEventNotification(id);
  };

  render() {
    const { notification } = this.props;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-body bg-light">
          In your group {notification.groupName} have a new event created:{" "}
          {notification.eventName}
          <br />
          <button
            className="fas fa-times"
            onClick={this.onDeleteClick.bind(this, notification.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

EventNotification.protoTypes = {
  deleteEventNotification: PropTypes.func.isRequired,
};

export default connect(null, { deleteEventNotification })(EventNotification);
