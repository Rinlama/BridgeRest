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
import UserPanelService from "./services/RoleService";

interface IRolePanel {
  taskMessageHandler: any;
  setTaskMessageHandler: any;
}

function RolePanel(props: IRolePanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);

  const { GetRolesByUserId } = UserPanelService(token, navigate, dispatch);

  useEffect(() => {
    if (taskMessageHandler.type === "SurveyMessage") {
      // console.log(taskMessageHandler.data.roles);
      setRoles(taskMessageHandler.data.roles);
    }
  }, [taskMessageHandler]);

  return (
    <Card className="rounded-0" style={{ height: "365px", overflow: "auto" }}>
      <Card.Header className="py-3 fw-semibold" style={{ width: "100%" }}>
        <span>User Roles</span>
      </Card.Header>
      <Card.Body className="p-0">
        <div>
          <InputGroup size="sm" className="mb-1 rounded-0">
            <InputGroup.Text>Search</InputGroup.Text>
            <BootstrapForm.Control className="rounded-0" />
          </InputGroup>

          <Table responsive="sm" hover={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((d: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{d.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RolePanel;
