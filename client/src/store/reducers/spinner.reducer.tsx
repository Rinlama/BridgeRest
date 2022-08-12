import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/login.action";
import { logoutAction } from "../actions/logout.action";
import { registerAction } from "../actions/register.action";

export interface ISpinnerState {
  busy: boolean;
}

const initialState: ISpinnerState = {
  busy: false,
};

export const SpinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    setBusy: (state, { payload }) => {
      state.busy = payload;
    },
  },
  extraReducers: (builder) => {
    // ********************************* Login Action ****************************************
    builder.addCase(
      loginAction.pending,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = true;
      }
    );
    builder.addCase(
      loginAction.rejected,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );
    builder.addCase(
      loginAction.fulfilled,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );
    // ********************************* Register Action ****************************************
    builder.addCase(
      registerAction.pending,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = true;
      }
    );
    builder.addCase(
      registerAction.rejected,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );
    builder.addCase(
      registerAction.fulfilled,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );

    // ********************************* Logout Action ****************************************
    builder.addCase(
      logoutAction.pending,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = true;
      }
    );
    builder.addCase(
      logoutAction.rejected,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );
    builder.addCase(
      logoutAction.fulfilled,
      (state: ISpinnerState, { payload }: any) => {
        state.busy = false;
      }
    );
  },
});

export const { setBusy } = SpinnerSlice.actions;
