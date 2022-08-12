import { AnyAction } from "@reduxjs/toolkit";
import React, { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorsMessageHandler } from "../../../../../../helper/ErrorMessageHandler";
import { setBusy } from "../../../../../../store/reducers/spinner.reducer";
import Api from "../../../../../../utility/Api";

function SurveyService(
  access_token: string,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const GetSurvey = async () => {
    try {
      dispatch(setBusy(true));
      const { data } = await Api(access_token).get(`/survey`);
      dispatch(setBusy(false));
      return data;
    } catch (error: any) {
      dispatch(setBusy(false));
      ErrorsMessageHandler(error, navigate, dispatch);
    }
  };

  return { GetSurvey };
}

export default SurveyService;
