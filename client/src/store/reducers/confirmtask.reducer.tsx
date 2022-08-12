import { createSlice } from "@reduxjs/toolkit";
export interface IGatewayState {
  tasks: any;
}

const initialState: IGatewayState = {
  tasks: "",
};

export const ConfirmTaskSlice = createSlice({
  name: "confirmTask",
  initialState,
  reducers: {
    initConfirmTask: (state, { payload }) => {
      state.tasks = payload;
    },
    setConfirmTask: (state, { payload }) => {
      state.tasks = null;
      state.tasks = payload;
      localStorage.removeItem("confirmTask");
      localStorage.setItem("confirmTask", JSON.stringify(state));
    },
    removeConfirmTask: (state, { payload }) => {
      state.tasks = payload;
      localStorage.removeItem("confirmTask");
    },
  },
  extraReducers: (builder) => {},
});
export const { setConfirmTask, removeConfirmTask, initConfirmTask } =
  ConfirmTaskSlice.actions;
