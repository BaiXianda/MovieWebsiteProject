import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroup } from "../../../actions/groupActions";
import { getMovieLists } from "../../../actions/movieListActions";
import MovieListItem from "./MovieList/MovieListItem";
import EventItem from "./Event/EventItem";
import { getEvents } from "../../../actions/eventAction";

class GroupBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getGroup(id, this.props.history);
    this.props.getMovieLists(id);
    this.props.getEvents(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { movieLists } = this.props.movieList;
    const { events } = this.props.event;
    const currentUser = this.props.security.user.username;
    const moderator = this.props.group.moderator;

    let create;
    let eventButton;

    if (currentUser === moderator) {
      create = (
        <div>
          <Link
            to={`/groupBoard/addMovieList/${id}`}
            className="btn btn-info btn-lg"
          >
            <i className="fas fa-plus-circle"> Create Movie List</i>
          </Link>

          <hr />

          <Link
            to={`/groupBoard/inviteUser/${moderator}/${this.props.group.groupID}`}
            className="btn btn-info btn-lg"
          >
            <i className="fas fa-plus-circle"> Invite User Into Group</i>
          </Link>

          <hr />
          <Link
            to={`/groupBoard/pullMovieList/${id}`}
            className="btn btn-info btn-lg"
          >
            <i className="fas fa-plus-circle"> Pull a Movie List</i>
          </Link>
        </div>
      );

      eventButton = (
        <div>
          <Link
            to={`/groupBoard/addEvent/${id}`}
            className="btn btn-info btn-lg"
          >
            <i className="fas fa-plus-circle"> Create a Event</i>
          </Link>
        </div>
      );
    } else {
      eventButton = "";
      create = "";
    }

    var currentTime = new Date();

    let upcomingEvents = [];
    let passEvents = [];

    events.map((event) => {
      var eventTime = new Date(event.eventTime);
      if (eventTime > currentTime) {
        upcomingEvents.push(event);
      } else {
        passEvents.push(event);
      }
    });

    return (
      <div className="groupBoard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-2 text-center">
                {this.props.group.groupName}
              </h1>
              <hr />
              <h3 className="text-center">{this.props.group.description}</h3>
              <Tabs
                variant="pills"
                fill
                defaultActiveKey="movieLists"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="movieLists" title="Movie Lists">
                  <div className="row mt-4">
                    <div className="col-md">
                      {movieLists.map((movieList) => (
                        <MovieListItem
                          key={movieList.id}
                          movieList={movieList}
                        />
                      ))}
                    </div>
                    <div className="col-md ">
                      {create}
                      <hr />
                      <Link
                        to={`/groupBoard/searchPage/${id}`}
                        className="btn btn-info btn-lg"
                      >
                        <i className="fas fa-search"> Search Movie</i>
                      </Link>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="upcomingEvents" title="Upcoming Events">
                  <div className="row mt-4">
                    <div className="col-md">
                      {upcomingEvents.map((event) => (
                        <EventItem key={event.id} event={event} />
                      ))}
                    </div>

                    <div className="col-md">{eventButton}</div>
                  </div>
                </Tab>
                <Tab eventKey="passedEvents" title="Passed Events">
                  {passEvents.map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupBoard.protoTypes = {
  group: PropTypes.object.isRequired,
  getGroup: PropTypes.func.isRequired,
  getMovieLists: PropTypes.func.isRequired,
  movieList: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group.group,
  movieList: state.movieList,
  security: state.security,
  event: state.event,
});

export default connect(mapStateToProps, { getGroup, getMovieLists, getEvents })(
  GroupBoard
);
