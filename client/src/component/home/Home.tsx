import React from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import MenuBar from "./menu-bar/MenuBar";

function Home() {
  return (
    <React.Fragment>
      <Header />
      <Row className="gx-0">
        <Col lg="2">
          <MenuBar />
        </Col>
        <Col lg="10" className="my-2 pe-2 mh-100">
          <Outlet />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Home;
