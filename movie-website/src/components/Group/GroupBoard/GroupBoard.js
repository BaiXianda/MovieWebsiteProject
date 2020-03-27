import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroup } from "../../../actions/groupActions";
import { getMovieLists } from "../../../actions/movieListActions";
import MovieListItem from "./MovieList/MovieListItem";

class GroupBoard extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getGroup(id, this.props.history);
    this.props.getMovieLists(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { movieLists } = this.props.movieList;

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
                      {movieLists.map(movieList => (
                        <MovieListItem
                          key={movieList.id}
                          movieList={movieList}
                        />
                      ))}
                    </div>
                    <div className="col-md ">
                      <Link
                        to={`/groupBoard/addMovieList/${id}`}
                        className="btn btn-info btn-lg"
                      >
                        <i className="fas fa-plus-circle"> Create Movie List</i>
                      </Link>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="currentEvents" title="Current Events">
                  TEST2
                </Tab>
                <Tab eventKey="passedEvent" title="Passed Events">
                  TEST3
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
  movieList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group.group,
  movieList: state.movieList
});

export default connect(mapStateToProps, { getGroup, getMovieLists })(
  GroupBoard
);
