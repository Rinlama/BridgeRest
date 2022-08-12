import React, { useEffect, useState } from "react";
import {
  Card,
  Form as BootstrapForm,
  InputGroup,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IState } from "../../../../../store/store";

function UserInfo() {
  const { auth } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card className="rounded-0" style={{ height: "365px", overflow: "auto" }}>
      <Card.Header className="py-3 fw-semibold" style={{ width: "100%" }}>
        <span>Current Login</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div>
          <Table responsive="sm" hover={true}>
            <thead>
              <tr>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{auth.data.email}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserInfo;
