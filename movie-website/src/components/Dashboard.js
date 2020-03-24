import React, { Component } from "react";
import GroupView from "./Group/GroupView";
import CreateGroupButton from "./Group/CreateGroupButton";

class Dashboard extends Component {
  render() {
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
              <GroupView />
              {
                // map groups here
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
