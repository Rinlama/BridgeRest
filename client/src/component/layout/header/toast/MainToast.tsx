import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  dismissAllMessages,
  dismissMessage,
  IToastState,
} from "../../../../store/reducers/toast.reducer";
import { IState } from "../../../../store/store";
import Toast from "react-bootstrap/Toast";

function MainToast() {
  const toast = useSelector((state: IState) => state?.toasts as IToastState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: any = null;

    if (toast.toasts.length > 0) {
      timeout = setTimeout(() => {
        dispatch(dismissMessage(toast.toasts.length - 1));
      }, 3000);
    }
    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, [toast]);

  const MessageTypeElement = (messageType: number) => {
    switch (messageType) {
      case 0:
        return { color: "white", background: "#ff6b6b" };
      case 1:
        return { color: "white", background: "#2ecc71" };
      case 2:
        return { color: "white", background: "#3498db" };
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {toast.toasts.length > 0 ? (
        <div className="d-flex">
          <div className="d-flex flex-column justify-center fixed-top w-25 overflow-auto h-100">
            {toast.toasts.map((message: any, index: number) => (
              <Toast
                key={index}
                className="animate__animated animate__backInLeft animate__faster shadow my-1"
                onClose={() => {
                  dispatch(dismissMessage(index));
                }}
              >
                <Toast.Header style={MessageTypeElement(message.type)}>
                  <strong className="me-auto">{message.data.title}</strong>
                </Toast.Header>
                <Toast.Body>{message.data.description}</Toast.Body>
              </Toast>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default MainToast;
