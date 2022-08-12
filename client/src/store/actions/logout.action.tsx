import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../utility/Api";

interface ILogout {
  token: string;
}

export const logoutAction = createAsyncThunk<void, ILogout>(
  "users/logout",
  async (token, thunkAPI) => {
    try {
      const { data } = await Api(token).post("/auth/logout");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response.data);
    }
  }
);
