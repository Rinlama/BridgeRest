import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import RolePanel from "./panel/RolesPanel/RolesPanel";
import UserInfo from "./panel/UserInfo/UserInfo";
import UserMangementPanel from "./panel/UserManagementPanel/UserManagementPanel";

function UserManagement() {
  const [taskMessageHandler, setTaskMessageHandler] = useState({
    type: "",
    data: {},
  });

  return (
    <div className="">
      <div className="border p-3 w-100">
        <p className="fw-semibold m-0">User Management</p>
      </div>

      <Row className="my-2">
        <Col lg="4" style={{ overflow: "auto" }}>
          <UserMangementPanel
            taskMessageHandler={taskMessageHandler}
            setTaskMessageHandler={setTaskMessageHandler}
          />
        </Col>
        <Col lg="8" style={{ paddingLeft: 0 }}>
          <RolePanel
            taskMessageHandler={taskMessageHandler}
            setTaskMessageHandler={setTaskMessageHandler}
          />
        </Col>
        <Col lg="4" style={{ overflow: "auto", marginTop: "10px" }}>
          <UserInfo />
        </Col>
      </Row>
    </div>
  );
}

export default UserManagement;
