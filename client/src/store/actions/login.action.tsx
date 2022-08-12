import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utility/Api";

export interface ILogin {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk<void, ILogin>(
  "users/login",
  async (login, thunkAPI) => {
    try {
      const { data } = await Api().post("/auth/login", login);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response.data);
    }
  }
);
