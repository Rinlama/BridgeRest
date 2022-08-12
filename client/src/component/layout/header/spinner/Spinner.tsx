import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IState } from "../../../../store/store";
import { ISpinnerState } from "../../../../store/reducers/spinner.reducer";
import { Spinner } from "react-bootstrap";

function MainSpinner() {
  const spinner = useSelector(
    (state: IState) => state?.spinner as ISpinnerState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      {spinner.busy ? (
        <React.Fragment>
          <div className="bg-light opacity-50  d-flex align-items-center justify-content-center fixed-top vw-100 vh-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}

export default MainSpinner;
