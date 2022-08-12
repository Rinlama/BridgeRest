import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IState } from "../../../store/store";
import MediaValetAssetsPanel from "./panel/MediaValetAssetsPanel/MediaValetAssetsPanel";
import SurveyPanel from "./panel/SurveyPanel/SurveyPanel";
import TaskStatus from "./panel/TaskStatus/TaskStatus";
import TaskViewer from "./panel/TaskViewer/TaskViewer";

function Task() {
  const [taskMessageHandler, setTaskMessageHandler] = useState({
    type: "",
    data: {},
  });

  const { auth } = useSelector((state: IState) => state);

  const roles = auth.data.roles.filter((d: any) => d.name === "Admin_Role");

  return (
    <div className="m-0 p-0">
      <div className="border p-3 w-100">
        <p className="fw-semibold m-0">Task</p>
      </div>
      {roles.length == 1 ? (
        <Row className="my-2 p-0 me-0">
          <Col lg="4">
            <SurveyPanel
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
          <Col lg="8" style={{ paddingLeft: 0 }}>
            <MediaValetAssetsPanel
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
          <Col lg="4" style={{ marginTop: "5px" }}>
            <TaskStatus
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
          <Col lg="8" style={{ marginTop: "5px", paddingLeft: 0 }}>
            <TaskViewer
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
        </Row>
      ) : (
        <Row className="my-2 p-0 me-0">
          <Col lg="4" style={{ marginTop: "5px" }}>
            <TaskStatus
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
          <Col lg="8" style={{ paddingLeft: 0 }}>
            <MediaValetAssetsPanel
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
          <Col lg="12" style={{ marginTop: "5px", paddingLeft: 0 }}>
            <TaskViewer
              taskMessageHandler={taskMessageHandler}
              setTaskMessageHandler={setTaskMessageHandler}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Task;
