import React, { Component } from "react";
import { vote } from "../../../../actions/eventAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class VoteItem extends Component {
  onVoteClick = (eventId, movieId) => {
    this.props.vote(eventId, movieId);
  };

  render() {
    const movie = this.props.movie;
    const count = this.props.count;
    const eventId = this.props.eventId;
    const voteEndTime = this.props.voteEndTime;
    const voteStartTime = this.props.voteStartTime;

    var currentTime = new Date();
    var voteStart = new Date(voteStartTime);
    var voteEnd = new Date(voteEndTime);
    let voteButton;

    if (currentTime > voteStart && currentTime < voteEnd) {
      voteButton = (
        <button
          className="btn btn-info btn-lg"
          onClick={this.onVoteClick.bind(this, eventId, movie.id)}
        >
          Vote
        </button>
      );
    } else {
      voteButton = "";
    }

    if (voteEndTime)
      return (
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="card mb-1 bg-light">
                <div className="card-header text-primary">
                  Name: {movie.name}
                </div>
                <div className="card-body bg-light">
                  <h5 className="card-title">
                    Description: {movie.description}
                  </h5>

                  <li>
                    <a href={movie.reviewLink}>Watch the trailer</a>
                  </li>
                  <li>
                    <a href={movie.reviewLink}>Watch the review</a>
                  </li>
                </div>
              </div>
            </div>

            <div className="col-2">
              <h5>Current Votes: {count}</h5>
            </div>

            <div className="col-2">{voteButton}</div>
          </div>
        </div>
      );
  }
}

VoteItem.protoTypes = {
  event: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event.event,
});

export default connect(mapStateToProps, { vote })(VoteItem);
