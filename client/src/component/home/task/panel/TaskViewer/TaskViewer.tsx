import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form as BootstrapForm,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../../../store/store";
import TaskPanelService from "../../../workflow/panel/TaskPanel/services/TaskPanelService";
import TaskStatusService from "../SurveyPanel/services/TaskStatusService";

interface ITaskPanel {
  taskMessageHandler: any;
  setTaskMessageHandler: any;
}

function TaskViewer(props: ITaskPanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { token, email } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [survey, setSurvey] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const [selectedTaskParams, setSelectedTaskParams] = useState<any>();

  // task panel services
  const [task, setTask] = useState<any>([]);
  const { GetTask, PostMany, DeleteTask } = TaskPanelService(
    token,
    navigate,
    dispatch
  );

  const [taskStatus, setTaskStatus] = useState<any>([]);

  // modal
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const pageMD: any = {};
    if (taskMessageHandler.type === "TaskViewer") {
      setTaskStatus(taskMessageHandler.data.history);
      console.log(taskMessageHandler.data);
    }
  }, [taskMessageHandler]);

  return (
    <Card className="rounded-0" style={{ height: "365px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>Tasks Viewer</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <ListGroup horizontal>
            {taskStatus.map((d: any) => (
              <ListGroup.Item>
                <span className="d-flex justify-content-center">
                  {d.status === "completed" ? (
                    <Button
                      variant="success"
                      size="sm"
                      className="text-capitalize my-0"
                      onClick={() => {
                        setShow(true);
                        setSelectedTaskParams(d);
                        console.log(d);
                      }}
                    >
                      {d.taskParams.name} <br></br>
                      {d.status}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="text-capitalize my-0"
                      onClick={() => {
                        setShow(true);
                        setSelectedTaskParams(d);
                      }}
                    >
                      {d.taskParams.name} <br></br>
                      {d.status}
                    </Button>
                  )}

                  <i className="bi bi-arrow-right-circle-fill fs-2 ms-2 text-danger"></i>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <Modal
          size="lg"
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Task Status</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Name : {selectedTaskParams?.taskParams.name}</p>
            <p>Status : {selectedTaskParams?.status}</p>
            <p className="text-capitalize">
              Updated at : {selectedTaskParams?.taskParams.updated_at}
            </p>
            <p>
              {selectedTaskParams?.status === "pending"
                ? "Assign to"
                : "Approved by"}
              : {selectedTaskParams?.taskParams.distribution}
            </p>

            <Row>
              <Col>
                <div className="my-2 fs-7 fw-semibold">Approved Images</div>
                {selectedTaskParams?.assets.map((img: any) =>
                  img.status ? (
                    <div className="my-2">
                      <img src={img.media.medium} style={{ width: "300px" }} />
                    </div>
                  ) : (
                    ""
                  )
                )}
              </Col>
              <Col>
                <div className="my-2 fs-7 fw-semibold">Rejected Images</div>
                {selectedTaskParams?.assets.map((img: any) =>
                  !img.status ? (
                    <div className="my-2">
                      <img src={img.media.medium} style={{ width: "300px" }} />
                    </div>
                  ) : (
                    ""
                  )
                )}
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default TaskViewer;
