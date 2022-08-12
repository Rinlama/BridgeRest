import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utility/Api";

interface IRegisterRequest {
  fistname: string;
  lastname: string;
  email: string;
  password: string;
}

export const registerAction = createAsyncThunk<void, IRegisterRequest>(
  "users/register",
  async (registerRequest, thunkAPI) => {
    try {
      const response = await Api().post("/auth/register", registerRequest);
      const { data } = response;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response.data);
    }
  }
);
