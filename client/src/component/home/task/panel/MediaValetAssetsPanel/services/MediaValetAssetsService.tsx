import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { setBusy } from "../../../../../../store/reducers/spinner.reducer";
import {
  MessageType,
  showMessage,
} from "../../../../../../store/reducers/toast.reducer";
import { MessageConverter } from "../../../../../../utility/MessageConverter";

function MediaValetAssetsService(
  navigate: NavigateFunction,
  dispatch: Dispatch<AnyAction>
) {
  const GetAssets = async (MediaValetToken: string, camera_id: string) => {
    try {
      dispatch(setBusy(true));
      const { data } = await axios.get(
        `https://api.mediavalet.com/assets?search='${camera_id}'`,
        {
          headers: {
            authorization: "Bearer " + MediaValetToken,
            "Ocp-Apim-Subscription-Key": "03e0a3d8270a432d9ede6e2cfca073dd",
          },
        }
      );
      dispatch(setBusy(false));
      return data;
    } catch (errors: any) {
      dispatch(setBusy(false));
      dispatch(
        showMessage({
          type: MessageType.error,
          show: true,
          data: {
            title: "Error",
            description: MessageConverter(
              errors?.response?.data || errors?.response?.statusText
            ),
            timer: 3000,
          },
        })
      );
    }
  };

  return { GetAssets };
}

export default MediaValetAssetsService;
