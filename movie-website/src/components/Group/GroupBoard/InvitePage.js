import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { inviteUser } from "../../../actions/groupActions";

class InvitePage extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { groupID } = this.props.match.params;

    const invitation = {
      username: this.state.username,
      groupId: groupID,
    };

    this.props.inviteUser(invitation, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { groupID } = this.props.match.params;

    return (
      <div className="movieList">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/groupBoard/${groupID}`} className="btn btn-light">
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">
                Invite a user to the group
              </h4>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="User Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InvitePage.propTypes = {
  inviteUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { inviteUser })(InvitePage);
