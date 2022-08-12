import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorsMessageHandler } from "../../../../helper/ErrorMessageHandler";
import { setBusy } from "../../../../store/reducers/spinner.reducer";

import Api from "../../../../utility/Api";

function AuthenticationServices(
  access_token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const GetCredentails = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/media-valet/credentials`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  const GetMediaValetAuthorization = async (code: string) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).post(
        `/media-valet/authorization`,
        {
          code,
        }
      );
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  const GetMediaValetRefresh = async (refresh_token: string) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).post(`/media-valet/refresh`, {
        refresh_token,
      });
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  // ***************************************************** Docu Sign **************************************
  const GetDocuSignCredentails = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/docusign/credentials`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  const GetDocuSignAuth = async (code: any) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).post(`/docusign/authorization`, {
        code,
      });
      console.log(data);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  return {
    GetCredentails,
    GetDocuSignCredentails,
    GetMediaValetAuthorization,
    GetMediaValetRefresh,
    GetDocuSignAuth,
  };
}

export default AuthenticationServices;
