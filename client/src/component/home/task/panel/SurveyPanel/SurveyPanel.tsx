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
import {
  MessageType,
  showMessage,
} from "../../../../../store/reducers/toast.reducer";
import { IState } from "../../../../../store/store";
import TaskPanelService from "../../../workflow/panel/TaskPanel/services/TaskPanelService";
import MediaValetAssetsService from "../MediaValetAssetsPanel/services/MediaValetAssetsService";
import SurveyService from "./services/SurveyService";
import TaskStatusService from "./services/TaskStatusService";

interface ITaskPanel {
  taskMessageHandler: any;
  setTaskMessageHandler: any;
}

function SurveyPanel(props: ITaskPanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { auth, gateway } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [survey, setSurvey] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState<any>();
  const [selectedTask, setSelectedTask] = useState<any>();

  // task panel services
  const [task, setTask] = useState<any>([]);
  const { GetTask, PostMany, DeleteTask } = TaskPanelService(
    auth.data.token,
    navigate,
    dispatch
  );

  const { PostTaskStatus } = TaskStatusService(
    auth.data.token,
    navigate,
    dispatch
  );

  // modal
  const [show, setShow] = useState<boolean>(false);

  const [assets, setAssets] = useState<any>([]);

  let load = true;
  useEffect(() => {
    if (load) {
      GetTaskPanel();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetSurvey } = SurveyService(auth.data.token, navigate, dispatch);

  const GetTaskPanel = async () => {
    const data = await axios.all([GetSurvey(), GetTask()]);

    setSurvey(data[0]);
    setTask(data[1]);
    console.log(data[1]);
  };

  const ActivateTask = async () => {
    const current_task = task.filter((d: any) => d._id === selectedTask)[0];
    const body = {
      created_by: auth.data.email,
      updated_by: auth.data.email,
      survey: selectedSurvey,
      task: selectedTask,
      history: current_task.task_params.map((d: any, i: number) => {
        if (i == 0) {
          return {
            taskParams: d,
            status: "pending",
            assets,
          };
        }
        return {
          taskParams: d,
          status: "pending",
        };
      }),
      current_position: {
        taskParams: current_task.task_params[0],
        status: "pending",
        assets,
      },
    };

    const data = await PostTaskStatus(body);
    setTaskMessageHandler({
      type: "ReloadTask",
      data: [],
    });
  };

  const { GetAssets } = MediaValetAssetsService(navigate, dispatch);

  const GetMediaValetAssets = async (camera_id: string) => {
    const access_token = gateway?.mediaValet?.access_token;
    if (access_token) {
      const data = await GetAssets(access_token, camera_id);
      // show modal
      if (data.payload.assets) {
        setShow(true);
        setAssets(data.payload.assets);
      }
    } else {
      dispatch(
        showMessage({
          type: MessageType.error,
          show: true,
          data: {
            title: "Error",
            description: "Mediavalet token not found.",
            timer: 3000,
          },
        })
      );
    }
  };

  const AssignTask = (d: any) => {
    setSelectedSurvey(d);
    GetMediaValetAssets(d.camera_id);
  };

  return (
    <Card className="rounded-0" style={{ height: "365px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>Recent Survey 123</span>
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
            {survey.map((d: any) => (
              <ListGroup.Item key={d._id}>
                <div className="d-flex justify-content-between">
                  <label>
                    <p className="my-0 fw-semibold fs-6">
                      Project : {d.project_name}
                    </p>
                    <p className="opacity-75 my-0">Created: {d.created_at}</p>
                    <p className="opacity-75 my-0">Camera: {d.camera_id}</p>
                  </label>
                  <div className="d-flex flex-column">
                    <Button
                      size="sm"
                      variant="success"
                      className="bi bi-arrow-right-circle-fill text-light my-2"
                      onClick={() => {
                        setTaskMessageHandler({
                          type: "SurveyMessage",
                          data: d,
                        });
                      }}
                    />
                    <Button
                      size="sm"
                      variant="info"
                      className="bi bi-info-circle-fill text-light my-2"
                      onClick={() => {
                        AssignTask(d);
                      }}
                    />
                  </div>
                </div>
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
            <Modal.Title>Survey Details</Modal.Title>
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
                ActivateTask();
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

export default SurveyPanel;
