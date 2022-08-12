import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/login.action";
import { logoutAction } from "../actions/logout.action";
import { registerAction } from "../actions/register.action";

export interface IAuthState {
  data: {
    email: string;
    id: string;
    token: string;
    roles: Array<{ name: string }>;
  };
  message: string;
  isSuccess: boolean;
}

const initialState: IAuthState = {
  data: {
    email: "",
    id: "",
    token: "",
    roles: [{ name: "" }],
  },
  message: "",
  isSuccess: true,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth: (state, { payload }) => {
      if (payload) {
        const auth = payload as IAuthState;
        state.data = auth.data;
        state.message = auth.message;
        state.isSuccess = auth.isSuccess;
      }
    },
  },
  extraReducers: (builder) => {
    // ********************************* Login Action ****************************************
    builder.addCase(
      loginAction.fulfilled,
      (state: IAuthState, { payload }: any) => {
        // if customer login
        if (payload) {
          const auth = payload as IAuthState;
          state.data = auth.data;
          state.message = auth.message;
          state.isSuccess = auth.isSuccess;

          localStorage.setItem("auth", JSON.stringify(state));
        }
      }
    ); // ********************************* Logout Action ****************************************
    builder.addCase(
      logoutAction.fulfilled,
      (state: IAuthState, { payload }: any) => {
        state.data = initialState.data;
        state.message = initialState.message;
        state.isSuccess = initialState.isSuccess;

        localStorage.removeItem("auth");
        localStorage.removeItem("gateway");
      }
    );
  },
});
export const { initAuth } = AuthSlice.actions;
