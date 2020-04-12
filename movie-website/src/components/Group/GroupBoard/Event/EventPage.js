import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovieList } from "../../../../actions/movieListActions";
import { getMovies } from "../../../../actions/movieActions";
import { getEvent, getWinner } from "../../../../actions/eventAction";
import VoteItem from "./VoteItem";

class EventPage extends Component {
  componentDidMount() {
    const { eventID, movieListId } = this.props.match.params;
    this.props.getEvent(eventID, this.props.history);
    this.props.getMovieList(movieListId);
    this.props.getMovies(movieListId);
    this.props.getWinner(eventID);
  }

  render() {
    const movies = this.props.movies;
    const event = this.props.event;
    const movieList = this.props.movieList;
    const winnerMovie = this.props.movie;

    var currentTime = new Date();
    var voteEndTime = new Date(event.voteEndTime);

    let winner;

    if (currentTime > voteEndTime) {
      winner = (
        <div>
          <hr />
          <h2>The winner is: </h2>
          <VoteItem
            key={winnerMovie.id}
            movie={winnerMovie}
            count={
              event.counts[winnerMovie.id] ? event.counts[winnerMovie.id] : 0
            }
            eventId={event.id}
            voteEndTime={event.voteEndTime}
            voteStartTime={event.voteStartTime}
          />
          <hr />
          <h4>The voting count for all movies: </h4>
        </div>
      );
    } else {
      winner = "";
    }

    return (
      <div className="movieListBoard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link
                to={`/groupBoard/${event.eventGroupId}`}
                className="btn btn-light"
              >
                Back to Group Board
              </Link>
              <h1 className="display-4 text-center">{event.eventName}</h1>
              <h3 className="text-center">{event.description}</h3>

              <br />
              <hr />
              <h2>
                This event is choose a movie from movie list "
                {movieList.movieListName}"
              </h2>
              <h4>Event Time: {event.eventTime}</h4>
              <h4>Vote Starts: {event.voteStartTime}</h4>
              <h4>Vote Ends: {event.voteEndTime}</h4>

              {winner}
              <hr />
              {movies.map((movie) => (
                <VoteItem
                  key={movie.id}
                  movie={movie}
                  count={event.counts[movie.id] ? event.counts[movie.id] : 0}
                  eventId={event.id}
                  voteEndTime={event.voteEndTime}
                  voteStartTime={event.voteStartTime}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EventPage.protoTypes = {
  getMovieList: PropTypes.func.isRequired,
  movieList: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  getWinner: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movieList: state.movieList.movieList,
  movies: state.movie.movies,
  event: state.event.event,
  movie: state.movie.movie,
});

export default connect(mapStateToProps, {
  getMovieList,
  getMovies,
  getEvent,
  getWinner,
})(EventPage);
