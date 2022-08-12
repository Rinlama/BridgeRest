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
import UserPanelService from "./services/UserPanelService";

interface IUserMangementPanel {
  taskMessageHandler: any;
  setTaskMessageHandler: any;
}

function UserMangementPanel(props: IUserMangementPanel) {
  const { taskMessageHandler, setTaskMessageHandler } = props;
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  let load = true;
  useEffect(() => {
    if (load) {
      GetUserManagementPanel();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetUsers } = UserPanelService(token, navigate, dispatch);

  const GetUserManagementPanel = async () => {
    const data = await GetUsers();
    setUsers(data);
  };

  return (
    <Card className="rounded-0" style={{ height: "365px", overflow: "auto" }}>
      <Card.Header className="py-3 fw-semibold" style={{ width: "100%" }}>
        <span>Users</span>
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
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>
              {users.map((d: any, index: number) => (
                <tr
                  key={index}
                  onClick={() => {
                    setTaskMessageHandler({
                      type: "SurveyMessage",
                      data: d,
                    });
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{d.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserMangementPanel;
