import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DomRouter from "./router/DomRouter";
import { initAuth } from "./store/reducers/auth.reducer";
import {
  initConfirmTask,
  setConfirmTask,
} from "./store/reducers/confirmtask.reducer";
import { setGateway } from "./store/reducers/gateway.reducer";

function App() {
  const dispatch = useDispatch();

  const [authLoad, setAuthLoad] = useState(false);

  let load = true;
  useEffect(() => {
    if (load) {
      try {
        const storageStorage = localStorage.getItem("auth");
        const gatewayStorage = localStorage.getItem("gateway");
        const confirmTask = localStorage.getItem("confirmTask");
        if (storageStorage) {
          const auth = JSON.parse(storageStorage);
          dispatch(initAuth(auth));
        }

        if (gatewayStorage) {
          const gateway = JSON.parse(gatewayStorage);
          dispatch(setGateway(gateway));
        }
        if (confirmTask) {
          const confirm = JSON.parse(confirmTask);
          dispatch(initConfirmTask(confirm));
        }
        setAuthLoad(true);
      } catch (error) {
        localStorage.removeItem("auth");
        localStorage.removeItem("gateway");
        setAuthLoad(true);
      }
    }
    return () => {
      load = false;
    };
  }, [load]);

  return <React.Fragment>{authLoad ? <DomRouter /> : ""}</React.Fragment>;
}

export default App;
