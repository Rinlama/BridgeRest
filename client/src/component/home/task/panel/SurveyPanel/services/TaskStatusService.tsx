import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorsMessageHandler } from "../../../../../../helper/ErrorMessageHandler";
import { setBusy } from "../../../../../../store/reducers/spinner.reducer";
import Api from "../../../../../../utility/Api";

function TaskStatusService(
  access_token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const PostTaskStatus = async (body: any) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).post(`/taskstatus`, body);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  const UpdateTaskStatus = async (body: any) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).put(`/taskstatus`, body);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  const GetTaskStatus = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/taskstatus`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  return { PostTaskStatus, GetTaskStatus, UpdateTaskStatus };
}

export default TaskStatusService;
