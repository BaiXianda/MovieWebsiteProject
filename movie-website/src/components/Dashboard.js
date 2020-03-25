import React, { Component } from "react";
import GroupView from "./Group/GroupView";
import CreateGroupButton from "./Group/CreateGroupButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getGroups } from "../actions/groupActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

  render() {
    const { groups } = this.props.group;
    return (
      <div className="groups">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Groups</h1>
              <br />
              <CreateGroupButton />

              <br />
              <hr />

              {groups.map(group => (
                <GroupView key={group.id} group={group} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.protoTypes = {
  group: PropTypes.object.isRequired,
  getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(Dashboard);
