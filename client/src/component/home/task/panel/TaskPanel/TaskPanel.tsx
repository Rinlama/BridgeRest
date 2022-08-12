import React, { useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../../../store/store";
import TaskPanelService from "./services/TaskPanelService";

interface ITaskPanel {
  taskMessageHandler: any;
  setTaskMessageHandler: any;
}

function TaskPanel(props: ITaskPanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [task, setTask] = useState([]);

  let load = true;
  useEffect(() => {
    if (load) {
      GetTaskPanel();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetTasks } = TaskPanelService(token, navigate, dispatch);

  const GetTaskPanel = async () => {
    const data = await GetTasks();
    setTask(data);
  };

  return (
    <Card className="rounded-0" style={{ height: "365px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>Recent Tasks</span>
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
            {task.map((d: any) => (
              <ListGroup.Item key={d.objectid}>
                <div className="d-flex justify-content-between">
                  <label>
                    <p className="my-0 fw-semibold fs-6">
                      Project : {d.project_name}
                    </p>
                    <p className="opacity-75 my-0">Created: {d.created_at}</p>
                    <p className="opacity-75 my-0">Camera: {d.camera_id}</p>
                  </label>
                  <div className="d-flex flex-column">
                    <i
                      className="bi bi-arrow-right-circle-fill fs-4 text-success"
                      onClick={() => {
                        setTaskMessageHandler({
                          type: "TaskMessage",
                          data: d,
                        });
                      }}
                    ></i>
                    <i className="bi bi-info-circle-fill fs-4 text-info"></i>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskPanel;
