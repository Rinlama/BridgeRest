import { createSlice } from "@reduxjs/toolkit";
import { MessageConverter } from "../../utility/MessageConverter";
import { loginAction } from "../actions/login.action";
import { logoutAction } from "../actions/logout.action";
import { registerAction } from "../actions/register.action";

export enum MessageType {
  error = 0,
  success = 1,
  info = 2,
}

export interface IMessageState {
  type: MessageType;
  show: boolean;
  timer: number;
  data: {
    title: string;
    description: string;
  };
}
export interface IToastState {
  toasts: Array<IMessageState>;
}

const initialState: IToastState = {
  toasts: [],
};

export const ToastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showMessage: (state, { payload }) => {
      state.toasts.push(payload);
    },
    dismissMessage: (state, { payload }) => {
      state.toasts.splice(payload, 1);
    },
    dismissAllMessages: (state) => {
      state.toasts = [];
    },
  },
  extraReducers: (builder) => {
    // ********************************* Login Action ****************************************
    builder.addCase(
      loginAction.rejected,
      (state: IToastState, { payload }: any) => {
        state.toasts.push({
          type: MessageType.error,
          show: true,
          timer: 3000,
          data: {
            title: "Error",
            description: MessageConverter(payload),
          },
        });
      }
    );

    // ********************************* Login Action ****************************************
    builder.addCase(
      registerAction.rejected,
      (state: IToastState, { payload }: any) => {
        state.toasts.push({
          type: MessageType.error,
          show: true,
          timer: 3000,
          data: {
            title: "Error",
            description: MessageConverter(payload),
          },
        });
      }
    );
    builder.addCase(
      registerAction.fulfilled,
      (state: IToastState, { payload }: any) => {
        state.toasts.push({
          type: MessageType.info,
          show: true,
          timer: 3000,
          data: {
            title: "Info",
            description: MessageConverter(payload),
          },
        });
      }
    );

    // ********************************* Logout  Action ****************************************
    builder.addCase(
      logoutAction.rejected,
      (state: IToastState, { payload }: any) => {
        state.toasts.push({
          type: MessageType.info,
          show: true,
          timer: 3000,
          data: {
            title: "Error",
            description: MessageConverter(payload),
          },
        });
      }
    );

    builder.addCase(
      logoutAction.fulfilled,
      (state: IToastState, { payload }: any) => {
        state.toasts.push({
          type: MessageType.info,
          show: true,
          timer: 3000,
          data: {
            title: "Info",
            description: MessageConverter(payload),
          },
        });
      }
    );
  },
});

export const { showMessage, dismissMessage, dismissAllMessages } =
  ToastSlice.actions;
