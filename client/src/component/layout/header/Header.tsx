import React from "react";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../../store/actions/logout.action";
import { IState } from "../../../store/store";
import MainSpinner from "./spinner/Spinner";
import MainToast from "./toast/MainToast";

function Header() {
  const token = useSelector((state: IState) => state.auth.data.token);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div style={{ height: "46px" }}>
        <Nav className="d-flex justify-content-between border py-1 fixed-top shadow">
          <Nav.Item>
            <NavLink className="text-decoration-none" to="/">
              <div className="p-2 mx-2 fw-semibold">BridgeRest</div>
            </NavLink>
          </Nav.Item>
          <div className="d-flex">
            {token ? (
              <React.Fragment>
                <NavLink className="text-decoration-none" to="/">
                  <div className="p-2 mx-2">Home</div>
                </NavLink>
                <NavLink
                  className="text-decoration-none"
                  to="#"
                  onClick={() => {
                    dispatch(logoutAction({ token }) as any);
                  }}
                >
                  <div className="p-2 mx-2">Logout</div>
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="text-decoration-none" to="/auth/login">
                  <div className="p-2 mx-2">Login</div>
                </NavLink>
                <NavLink className="text-decoration-none" to="/auth/register">
                  <div className="p-2 mx-2">Register</div>
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </Nav>
      </div>
      <MainToast />
      <MainSpinner />
    </React.Fragment>
  );
}

export default Header;
