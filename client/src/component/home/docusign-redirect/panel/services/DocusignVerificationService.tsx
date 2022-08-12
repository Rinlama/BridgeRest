import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorsMessageHandler } from "../../../../../helper/ErrorMessageHandler";
import { setBusy } from "../../../../../store/reducers/spinner.reducer";
import Api from "../../../../../utility/Api";

function DocusignVerificationService(
  access_token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const VerifyEnvelope = async (envelopeId: string) => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(
        `/docusign/getGrantToken?envelopeId=${envelopeId}`
      );
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  const VerifyToken = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/docusign/verify_token`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };
  return { VerifyEnvelope, VerifyToken };
}

export default DocusignVerificationService;
