import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMovieList } from "../../../../actions/movieListActions";

class MovieListItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteMovieList(id);
  };

  render() {
    const { movieList } = this.props;

    const currentUser = this.props.currentUser;
    const moderator = this.props.moderator;

    let create;

    if (currentUser === moderator) {
      create = (
        <React.Fragment>
          <Link
            to={`/groupBoard/updateMovieList/${movieList.id}`}
            className="btn btn-info ml-4"
          >
            Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(this, movieList.id)}
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
        <div className="card-header text-primary">ID: {movieList.id}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">Name : {movieList.movieListName}</h5>
          <p className="card-text text-truncate ">{movieList.description}</p>
          <Link
            to={`/groupBoard/movieListBoard/${movieList.id}/${moderator}`}
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

MovieListItem.protoTypes = {
  deleteMovieList: PropTypes.func.isRequired,
  moderator: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: state.security.user.username,
  moderator: state.group.group.moderator,
});

export default connect(mapStateToProps, { deleteMovieList })(MovieListItem);
