import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../store/store";
import UserPanelService from "../user-management/panel/UserManagementPanel/services/UserPanelService";
import TaskPanel from "./panel/TaskPanel/TaskPanel";
import TaskParamsPanel from "./panel/TaskParamsPanel/TaskParamsPanel";

function Workflow() {
  const [taskMessageHandler, setTaskMessageHandler] = useState({
    type: "",
    data: {},
  });
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  let load = true;
  useEffect(() => {
    if (load) {
      GetUserManagementPanel();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetUsers } = UserPanelService(token, navigate, dispatch);

  const GetUserManagementPanel = async () => {
    const data = await GetUsers();
    setUsers(data);
  };
  return (
    <div>
      <Row className="my-2 p-0 me-0">
        <Col lg="4">
          <TaskPanel
            users={users}
            taskMessageHandler={taskMessageHandler}
            setTaskMessageHandler={setTaskMessageHandler}
          />
        </Col>
        <Col lg="8" style={{ paddingLeft: 0 }}>
          <TaskParamsPanel
            users={users}
            taskMessageHandler={taskMessageHandler}
            setTaskMessageHandler={setTaskMessageHandler}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Workflow;
