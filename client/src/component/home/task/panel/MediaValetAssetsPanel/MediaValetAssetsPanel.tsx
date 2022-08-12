import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form as BootstrapForm,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setConfirmTask } from "../../../../../store/reducers/confirmtask.reducer";
import {
  MessageType,
  showMessage,
} from "../../../../../store/reducers/toast.reducer";
import { IState } from "../../../../../store/store";
import DocusignVerificationService from "../../../docusign-redirect/panel/services/DocusignVerificationService";
import MediaValetAssetsService from "./services/MediaValetAssetsService";

function MediaValetAssetsPanel(props: any) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { gateway, auth } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [assets, setAssets] = useState<any>([]);
  const { GetAssets } = MediaValetAssetsService(navigate, dispatch);

  const [pageMetaData, setPageMetaData] = useState<any>({
    title: "",
    message: "",
  });

  const [task, setTask] = useState<any>();

  useEffect(() => {
    const pageMD: any = {};
    if (taskMessageHandler.type === "SurveyMessage") {
      GetMediaValetAssets(taskMessageHandler.data.camera_id);
      pageMD.title = "MediaValet Assets";
      pageMD.message = "SurveyMessage";
      setPageMetaData(pageMD);
    }
    if (taskMessageHandler.type === "TaskStatusMessage") {
      pageMD.title = "MediaValet Assets Review";
      pageMD.message = "TaskStatusMessage";

      setTask(taskMessageHandler.data);
      console.log(taskMessageHandler.data);

      const history = JSON.parse(
        JSON.stringify(taskMessageHandler.data.history)
      );

      const next_assets = GetLatestAssetsFromDB(history.reverse())?.assets;
      if (next_assets) {
        setAssets(next_assets);
      } else {
        GetMediaValetAssets(taskMessageHandler.data.survey.camera_id);
      }

      setPageMetaData(pageMD);
    }
  }, [taskMessageHandler]);

  const GetLatestAssetsFromDB = (data: any) => {
    let found = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.status === "completed") {
        found = element;
        break;
      }
    }
    if (found.length === 0) {
      found = data[data.length - 1];
    }
    console.log(found);
    return found;
  };

  const GetMediaValetAssets = async (camera_id: string) => {
    const access_token = gateway?.mediaValet?.access_token;
    if (access_token) {
      const data = await GetAssets(access_token, camera_id);
      const assets = data.payload.assets;
      const assetCount = data.payload.assetCount;
      setAssets(assets);
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

  const { VerifyToken } = DocusignVerificationService(
    auth.data.token,
    navigate,
    dispatch
  );

  const Confirm = async () => {
    const data = await VerifyToken();
    if (!data.accessToken) {
      return;
    }

    if (assets.length != 0) {
      const new_task = {
        ...task,
        current_position: {
          ...task.current_position,
          assets,
          taskParams: {
            ...task.current_position.taskParams,
          },
        },
      };

      dispatch(setConfirmTask(new_task));
      window.location.href = `https://demo.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=62b714e6-5074-4ef6-b81c-2b3715b6b2cc&env=demo&acct=98fa0b7c-a830-4feb-9361-8359a2461d38&v=2&
Camera_id=${new_task.survey.camera_id}&Full%20Name=fulldemo&Email=${auth.data.email}&TaskID=${new_task.current_position.taskParams._id}&RecipientEmail=${auth.data.email}`;
    }
  };

  return (
    <Card className="rounded-0" style={{ height: "365px" }}>
      <Card.Header className="py-3 fw-semibold d-flex justify-content-between">
        <span>
          {pageMetaData.title ? pageMetaData.title : "Mediavalet Assets"}
        </span>
        <span>
          {pageMetaData.message === "TaskStatusMessage" ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                Confirm();
              }}
            >
              Confirm with DocuSign
            </Button>
          ) : (
            ""
          )}
        </span>
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
            {assets.map((d: any) => (
              <ListGroup.Item key={d.objectid}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <p className="my-0 fw-semibold fs-6">
                      <img src={d.media.medium} style={{ width: "300px" }} />
                    </p>
                    <div className="d-flex flex-column px-3">
                      <p className="opacity-75 my-0">Created: {d.createdAt}</p>
                      <p className="opacity-75 my-0">
                        Created By: {d.record.createdBy.username}
                      </p>

                      {pageMetaData.message === "TaskStatusMessage" ? (
                        <div className="d-flex py-3">
                          <p className="opacity-75 my-3"></p>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={d.status}
                              onChange={(event) => {
                                const val = event.target.checked;
                                const ar = assets.map((asset: any) => {
                                  if (asset.id === d.id) {
                                    return {
                                      ...asset,
                                      status: val,
                                    };
                                  }
                                  return asset;
                                });

                                setAssets(ar);
                              }}
                            />
                            <label className="form-check-label">
                              {d.status ? "Approve" : "Reject"}
                            </label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column">
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

export default MediaValetAssetsPanel;
