import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../../../store/store";
import TaskPanelService from "./services/TaskPanelService";

function TaskPanel(props: any) {
  const { setTaskMessageHandler } = props;
  const { email, token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [task, setTask] = useState<any>([]);

  const { GetTask, PostMany, DeleteTask } = TaskPanelService(
    token,
    navigate,
    dispatch
  );

  let load = true;
  useEffect(() => {
    if (load) {
      GetTaskPanel();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const GetTaskPanel = async () => {
    const data = await GetTask();
    setTask(data);
  };

  const onSave = async () => {
    const taskBody = task.filter((d: any) => (d.blur && d.name ? d : ""));
    const data = await PostMany(taskBody);
    GetTaskPanel();
  };

  return (
    <Card className="rounded-0" style={{ height: "725px" }}>
      <Card.Header className="py-3 fw-semibold">
        <span>Task</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="d-flex justify-content-between m-3">
          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setTask([
                  ...[
                    {
                      name: "",
                      blur: false,
                      updated_by: email,
                      created_by: email,
                    },
                  ],
                  ...task,
                ]);
              }}
            >
              <i className="bi bi-plus-circle"></i>
            </Button>
          </div>
          <Button
            variant="primary mx-2"
            size="sm"
            onClick={() => {
              onSave();
            }}
          >
            <i className="bi bi-save"></i>
          </Button>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th> <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((d: any, index: number) => (
              <tr>
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

                <td className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="danger mx-2"
                    size="sm"
                    onClick={async () => {
                      if (d._id) {
                        try {
                          const data = await DeleteTask(d._id);
                          GetTaskPanel();
                          if (d._id)
                            setTaskMessageHandler({
                              type: "WorkflowMessage",
                              data: d,
                            });
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
                  <Button
                    disabled={!d._id}
                    variant="light-outline"
                    size="sm"
                    onClick={() => {
                      if (d._id)
                        setTaskMessageHandler({
                          type: "WorkflowMessage",
                          data: d,
                        });
                    }}
                  >
                    <i className="bi bi-arrow-right-circle-fill text-primary"></i>
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

export default TaskPanel;
