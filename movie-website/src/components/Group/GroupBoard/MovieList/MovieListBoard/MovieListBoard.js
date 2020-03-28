import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMovieList } from "../../../../../actions/movieListActions";

class MovieListBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMovieList(id, this.props.history);
  }

  render() {
    const { id } = 1;

    return (
      <div className="movieListBoard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="" //{`/groupBoard/${this.state.movieGroupID}`}
                className="btn btn-light"
              >
                Back to Group Board
              </Link>
              <h1 className="display-4 text-center">
                {this.props.movieList.movieListName}
              </h1>

              <h3 className="text-center">
                {this.props.movieList.description}
              </h3>
              <Link
                to={`/groupBoard/movieListBoard/addMovie/${id}`}
                className="btn btn-lg btn-info"
              >
                Add a Movie
              </Link>
              <br />

              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieListBoard.protoTypes = {
  getMovieList: PropTypes.func.isRequired,
  movieList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movieList: state.movieList.movieList
});

export default connect(mapStateToProps, { getMovieList })(MovieListBoard);
