import { configureStore, EnhancedStore, Reducer } from "@reduxjs/toolkit";
import { AuthSlice, IAuthState } from "./reducers/auth.reducer";
import { ConfirmTaskSlice } from "./reducers/confirmtask.reducer";
import { GatewaySlice, IGatewayState } from "./reducers/gateway.reducer";
import { ISpinnerState, SpinnerSlice } from "./reducers/spinner.reducer";
import { IToastState, ToastSlice } from "./reducers/toast.reducer";

export interface IState {
  auth: IAuthState;
  toasts: IToastState;
  spinner: ISpinnerState;
  gateway: IGatewayState;
  confirmTask: any;
}

const Store: EnhancedStore<IState> = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    toasts: ToastSlice.reducer,
    spinner: SpinnerSlice.reducer,
    gateway: GatewaySlice.reducer,
    confirmTask: ConfirmTaskSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
