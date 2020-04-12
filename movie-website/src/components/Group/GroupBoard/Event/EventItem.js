import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../../../actions/eventAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EventItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const event = this.props.event;

    const currentUser = this.props.currentUser;
    const moderator = this.props.moderator;

    let create;

    if (currentUser === moderator) {
      create = (
        <React.Fragment>
          <Link
            to={`/groupBoard/updateEvent/${event.id}`}
            className="btn btn-info ml-5"
          >
            Update
          </Link>
          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(this, event.id)}
          >
            Delete
          </button>
        </React.Fragment>
      );
    } else {
      create = "";
    }

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">Name: {event.eventName}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">Description: {event.description}</h5>
          <h6>Event Time: {event.eventTime}</h6>
          <Link
            to={`/groupBoard/eventPage/${event.id}/${event.movieListId}`}
            className="btn btn-primary"
          >
            View
          </Link>

          {create}
        </div>
      </div>
    );
  }
}

EventItem.protoTypes = {
  deleteEvent: PropTypes.func.isRequired,
  moderator: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.security.user.username,
  moderator: state.group.group.moderator,
});

export default connect(mapStateToProps, { deleteEvent })(EventItem);
