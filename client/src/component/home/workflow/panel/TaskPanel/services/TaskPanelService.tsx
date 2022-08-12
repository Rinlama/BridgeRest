import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorsMessageHandler } from "../../../../../../helper/ErrorMessageHandler";
import { setBusy } from "../../../../../../store/reducers/spinner.reducer";
import Api from "../../../../../../utility/Api";

function TaskPanelService(
  access_token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const GetTask = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/task`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  const PostMany = async (body: any) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).post(`/task/postmany`, body);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  const DeleteTask = async (_id: any) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).delete(`/task?id=${_id}`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  return { PostMany, GetTask, DeleteTask };
}

export default TaskPanelService;
