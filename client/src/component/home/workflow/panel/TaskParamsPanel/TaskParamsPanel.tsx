import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form as BootstrapForm,
  Form,
  InputGroup,
  ListGroup,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../../../store/store";
import TaskParmsService from "./services/TaskParamsService";

function TaskPanelParams(props: any) {
  const { taskMessageHandler, setTaskMessageHandler, users } = props;
  const { email, token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [task, setTask] = useState<any>([]);

  const { GetTaskById, GetTask, PostMany, DeleteTask } = TaskParmsService(
    token,
    navigate,
    dispatch
  );

  const [selectedTask, setSelectedTask] = useState<any>([]);

  useEffect(() => {
    if (taskMessageHandler.type === "WorkflowMessage") {
      setSelectedTask(taskMessageHandler.data);
      GetTaskParamsPanel(taskMessageHandler.data._id);
    }
  }, [taskMessageHandler]);

  const GetTaskParamsPanel = async (_id: string) => {
    const data = await GetTaskById(_id);
    setTask(data);
  };

  const onSave = async () => {
    const taskBody = task.filter((d: any) => (d.blur && d.name ? d : ""));
    const data = await PostMany(taskBody);
    GetTaskParamsPanel(selectedTask._id);
  };

  return (
    <Card className="rounded-0" style={{ height: "725px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>{`${selectedTask.name || ""} `} Task Parameters</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between m-3">
          <div>
            <Button
              disabled={!taskMessageHandler.data._id}
              variant="primary"
              size="sm"
              onClick={() => {
                setTask([
                  ...task,
                  ...[
                    {
                      name: "",
                      blur: false,
                      updated_by: email,
                      created_by: email,
                      Task: selectedTask._id,
                    },
                  ],
                ]);
              }}
            >
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
          <Button
            disabled={!taskMessageHandler.data._id}
            variant="primary mx-2"
            size="sm"
            onClick={() => {
              onSave();
            }}
          >
            <i className="bi bi-save"></i>
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th> <th>Distribution</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task &&
              task.map((d: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <InputGroup size="sm" className="mb-3">
                      <Form.Control
                        value={d.name}
                        aria-label="Small"
                        onChange={(event: any) => {
                          const value = event.target.value;
                          const data = task.map((current: any, i: number) => {
                            if (index === i) {
                              current = {
                                ...current,
                                name: value,
                                blur: true,
                                updated_by: email,
                                created_by: email,
                                Task: selectedTask._id,
                              };
                              return current;
                            }
                            return current;
                          });
                          setTask(data);
                        }}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <InputGroup size="sm" className="mb-3">
                      <Form.Select
                        value={d.distribution}
                        aria-label="Small"
                        onChange={(event: any) => {
                          const value = event.target.value;
                          const data = task.map((current: any, i: number) => {
                            if (index === i) {
                              current = {
                                ...current,
                                distribution: value,
                                blur: true,
                                updated_by: email,
                                created_by: email,
                                Task: selectedTask._id,
                              };
                              return current;
                            }
                            return current;
                          });
                          setTask(data);
                        }}
                      >
                        <option value="">Select Distribution</option>
                        {users.map((u: any) => {
                          return <option value={u.email}>{u.email}</option>;
                        })}
                      </Form.Select>
                    </InputGroup>
                  </td>

                  <td>
                    <Button
                      variant="danger mx-2"
                      size="sm"
                      onClick={async () => {
                        if (d._id) {
                          try {
                            const data = await DeleteTask(d._id);
                            GetTaskParamsPanel(selectedTask._id);
                          } catch (error: any) {
                            throw new Error(error.message);
                          }
                        } else {
                          setTask(
                            task.filter((d: any, index: number) => {
                              if (index != task.length - 1) {
                                return d;
                              }
                            })
                          );
                        }
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default TaskPanelParams;
