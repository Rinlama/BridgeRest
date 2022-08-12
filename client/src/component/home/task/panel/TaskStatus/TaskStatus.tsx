import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form as BootstrapForm,
  Form,
  InputGroup,
  ListGroup,
  Modal,
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

function TaskStatus(props: ITaskPanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { token, email, roles } = useSelector(
    (state: IState) => state.auth.data
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [survey, setSurvey] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const [selectedTask, setSelectedTask] = useState<any>();

  // task panel services
  const [task, setTask] = useState<any>([]);
  const { GetTask, PostMany, DeleteTask } = TaskPanelService(
    token,
    navigate,
    dispatch
  );

  const { GetTaskStatus } = TaskStatusService(token, navigate, dispatch);

  const [taskStatus, setTaskStatus] = useState<any>([]);

  // modal
  const [show, setShow] = useState<boolean>(false);

  let load = true;
  useEffect(() => {
    if (load) {
      GetTaskStatusForm();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const GetTaskStatusForm = async () => {
    // const data = await GetSurvey();

    const data = await GetTaskStatus();
    setTaskStatus(data);
  };

  useEffect(() => {
    const pageMD: any = {};
    if (taskMessageHandler.type === "ReloadTask") {
      GetTaskStatusForm();
    }
  }, [taskMessageHandler]);

  const isAdmin = roles.filter((d) => d.name === "Admin_Role").length === 1;

  const TaskListItem = (d: any) => (
    <div className="d-flex justify-content-between">
      <label>
        <p className="my-0 fw-semibold fs-6">Name : {d?.task?.name}</p>
        <p className="opacity-75 my-0">Created: {d?.created_at}</p>
        <p className="opacity-75 my-0">Camera: {d?.survey.camera_id}</p>
        <p className="opacity-75 my-0">Project: {d?.survey.project_name}</p>
        <p className="opacity-75 my-0">
          Current Status:
          {d?.current_position?.status != "pending"
            ? " All tasks completed"
            : d?.current_position.status}
        </p>
        <p className="opacity-75 my-0">
          {d?.current_position?.status == "pending"
            ? "    Current Distribution: " +
              d?.current_position?.taskParams?.distribution
            : ""}
        </p>
      </label>
      <div className="d-flex flex-column">
        {d?.current_position?.assets?.status}
        <Button
          size="sm"
          className="bi bi-arrow-right-circle-fill"
          disabled={d?.current_position?.taskParams?.distribution != email}
          onClick={() => {
            setTaskMessageHandler({
              type: "TaskStatusMessage",
              data: d,
            });
          }}
        />
        <Button
          size="sm"
          variant="light"
          className="bi bi-info-circle-fill text-info my-2"
          onClick={() => {
            setTaskMessageHandler({
              type: "TaskViewer",
              data: d,
            });
          }}
        />
      </div>
    </div>
  );

  return (
    <Card className="rounded-0" style={{ height: "365px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>Tasks</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div>
          <InputGroup size="sm" className="mb-1 rounded-0">
            <InputGroup.Text>Search</InputGroup.Text>
            <BootstrapForm.Control className="rounded-0" />
          </InputGroup>
          <ListGroup
            variant="flush"
            style={{ overflow: "auto", height: "274px" }}
          >
            {taskStatus.map((d: any) => (
              <ListGroup.Item key={d._id}>
                {!isAdmin &&
                d.current_position?.taskParams?.distribution === email &&
                d
                  ? TaskListItem(d)
                  : ""}
                {isAdmin && d ? TaskListItem(d) : ""}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Task Params</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {selectedSurvey &&
              Object.entries(selectedSurvey).map((d: any, index: any) => {
                if (
                  d[0] !== "attachments" &&
                  d[0] != "geometry" &&
                  d[0] != "__v"
                )
                  return (
                    <p className="text-capitalize" key={index}>
                      {d[0]} :{d[1]}
                    </p>
                  );
              })}
            <hr />
            <label> Assign Task</label>
            <Form.Select
              size="sm"
              onChange={(e: any) => {
                setSelectedTask(e.target.value);
              }}
            >
              <option value=""></option>
              {task.map((d: any) => {
                return (
                  <option value={d._id} key={d._id}>
                    {d.name}
                  </option>
                );
              })}
            </Form.Select>
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
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setShow(false);
              }}
            >
              Activate Task
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default TaskStatus;
