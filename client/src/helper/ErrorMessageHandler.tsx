import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { MessageType, showMessage } from "../store/reducers/toast.reducer";

import { MessageConverter } from "../utility/MessageConverter";

export const ErrorsMessageHandler = (
  errors: any,
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) => {
  if (errors?.response?.data) {
    dispatch(
      showMessage({
        type: MessageType.error,
        show: true,
        data: {
          title: "Error",
          description: MessageConverter(errors?.response?.data),
          timer: 3000,
        },
      })
    );
  }
  if (errors?.response?.status == 401) {
    navigate("/auth/login");
  }
};
