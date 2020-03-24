import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovieLists } from "../../actions/projectAction";
import CreateMovieButton from "./CreateMovieButton";

class MovieListView extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       id: "1"
  //     };
  //   }

  componentDidMount() {
    this.props.getMovieLists();
  }

  render() {
    const { movieLists } = this.props.movieList;
    return (
      <div className="movie-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Movie List</h1>
              <br />
              <CreateMovieButton />

              <br />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieListView.protoTypes = {
  movieList: PropTypes.object.isRequired,
  getMovieLists: PropTypes.func.isRequired
};

export default connect(null, { getMovieLists })(MovieListView);
