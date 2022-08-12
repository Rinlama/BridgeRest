import { createSlice } from "@reduxjs/toolkit";
export interface IGatewayState {
  mediaValet: {
    id_token: string;
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  };
  docusign: {
    id_token: string;
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  };
}

const initialState: IGatewayState = {
  mediaValet: {
    id_token: "",
    access_token: "",
    expires_in: 0,
    token_type: "",
    scope: "",
  },
  docusign: {
    id_token: "",
    access_token: "",
    expires_in: 0,
    token_type: "",
    scope: "",
  },
};

export const GatewaySlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {
    setGateway: (state, { payload }) => {
      if (payload.mediaValet) state.mediaValet = payload.mediaValet;
      if (payload.docusign) state.docusign = payload.docusign;
      localStorage.setItem("gateway", JSON.stringify(state));
    },
    removeGateway: (state, { payload }) => {
      state.mediaValet = initialState.mediaValet;
      state.docusign = initialState.docusign;
      localStorage.removeItem("gateway");
    },
  },
  extraReducers: (builder) => {},
});
export const { setGateway, removeGateway } = GatewaySlice.actions;
