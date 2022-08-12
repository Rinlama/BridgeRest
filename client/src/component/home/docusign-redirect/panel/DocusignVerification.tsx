import { ErrorsMessageHandler } from "../../../../helper/ErrorMessageHandler";
import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MessageType,
  showMessage,
} from "../../../../store/reducers/toast.reducer";
import { IState } from "../../../../store/store";
import TaskStatusService from "../../task/panel/SurveyPanel/services/TaskStatusService";
import DocusignVerificationService from "./services/DocusignVerificationService";

function DocusignVerification(props: any) {
  const location = useLocation();
  const { auth, confirmTask } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let load = true;
  useEffect(() => {
    if (load) {
      ExecuteProcess();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { VerifyEnvelope } = DocusignVerificationService(
    auth.data.token,
    navigate,
    dispatch
  );

  const { UpdateTaskStatus } = TaskStatusService(
    auth.data.token,
    navigate,
    dispatch
  );

  const ExecuteProcess = async () => {
    const params = new URLSearchParams(location.search);
    const envelopeId = params.get("envelopeId");
    if (!envelopeId) {
      return;
    }
    const { data } = await VerifyEnvelope(envelopeId);
    let verified = { flag: false, taskParamsId: "" };
    data.formData.map((d: any) => {
      if (d.name === "TaskID") {
        const value = d.value;
        if (confirmTask.tasks.tasks.current_position.taskParams._id == value) {
          verified = {
            flag: true,
            taskParamsId: value,
          };
        }
      }
    });
    if (verified.flag) {
      const old_Task = confirmTask.tasks.tasks;

      let x_old_Task = JSON.parse(JSON.stringify(old_Task));

      const new_Task = {
        ...x_old_Task,
        history: [
          ...x_old_Task.history.map((his: any) => {
            if (his.taskParams._id === verified.taskParamsId) {
              his.status = "completed";
              his.assets = x_old_Task.current_position.assets;
            }
            return his;
          }),
        ],
      };

      let current_position = {};
      for (var i = 0; i < new_Task.history.length; i++) {
        if (new_Task.history[i].status == "pending") {
          current_position = new_Task.history[i];
          break;
        }
      }
      const new_Task_2 = {
        ...new_Task,
        current_position,
      };

      try {
        const data = await UpdateTaskStatus(new_Task_2);
        dispatch(
          showMessage({
            type: MessageType.success,
            show: true,
            data: {
              title: "Info",
              description: "Task completed.",
              timer: 3000,
            },
          })
        );
        navigate("/home/task");
      } catch (error) {
        ErrorsMessageHandler(error, navigate, dispatch);
      }
    }
  };

  return (
    <div>
      <Card className="rounded-0" style={{ height: "365px" }}>
        <Card.Header className="py-3 fw-semibold d-flex justify-content-between">
          <span>Docusign</span>
        </Card.Header>
        <Card.Body className="p-0"></Card.Body>
      </Card>
    </div>
  );
}

export default DocusignVerification;
