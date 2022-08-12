import React from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IState } from "../../../store/store";
import "./menu-bar.css";

function MenuBar() {
  const { auth } = useSelector((state: IState) => state);

  const roles = auth.data.roles.filter((d: any) => d.name === "Admin_Role");

  return (
    <React.Fragment>
      <ListGroup
        as="ol"
        className="vh-90 border w-20 "
        style={{ height: "100vh", position: "fixed", width: "16%" }}
      >
        <ListGroup.Item className="border-0 rounded-0 border-bottom list-hover">
          <NavLink to="/home/task" className="text-decoration-none text-dark">
            <div className="d-flex py-1">
              <i className="bi bi-list-task mx-2"></i>
              <div className="fw-semibold">Task</div>
            </div>
          </NavLink>
        </ListGroup.Item>
        {roles.length == 1 ? (
          <React.Fragment>
            <ListGroup.Item className="border-0 rounded-0 border-bottom list-hover">
              <NavLink
                to="/home/workflow"
                className="text-decoration-none text-dark"
              >
                <div className="d-flex py-1">
                  <i className="bi bi-cpu mx-2"></i>
                  <div className="fw-semibold">Workflow</div>
                </div>
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 rounded-0 border-bottom list-hover">
              <NavLink
                to="/home/usermanagement"
                className="text-decoration-none text-dark"
              >
                <div className="d-flex py-1">
                  <i className="bi bi-people-fill mx-2"></i>
                  <div className="fw-semibold">Users Management</div>
                </div>
              </NavLink>
            </ListGroup.Item>
          </React.Fragment>
        ) : (
          ""
        )}
        <ListGroup.Item className="border-0 rounded-0 border-bottom list-hover">
          <NavLink
            to="/home/authentication"
            className="text-decoration-none text-dark"
          >
            <div className="d-flex py-1">
              <i className="bi bi-signpost-2-fill mx-2"></i>
              <div className="fw-semibold">Gateway</div>
            </div>
          </NavLink>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
}

export default MenuBar;
