import { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthenticationServices from "../services/AuthenticationServices";
import { IState } from "../../../../store/store";

function Docusign() {
  const { auth, gateway } = useSelector((state: IState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [docuSignCredentails, setDocuSignCredentails] = useState({
    client_id: "",
    client_redirect_uri: "",
    client_secret: "",
  });

  let load = true;
  useEffect(() => {
    if (load) {
      GetDocuSignCredentials();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetDocuSignCredentails } = AuthenticationServices(
    auth.data.token,
    navigate,
    dispatch
  );

  const GetDocuSignCredentials = async () => {
    const { data } = await GetDocuSignCredentails();
    setDocuSignCredentails(data);
  };

  return (
    <div>
      <Card className="rounded-0" style={{ height: "300px" }}>
        <Card.Header className="py-3 fw-semibold">
          <span>DocuSign</span>
        </Card.Header>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          {gateway?.docusign?.access_token ? (
            <Alert variant="primary">DocuSign has authorized consent</Alert>
          ) : (
            ""
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (docuSignCredentails) {
                const url = `https://account-d.docusign.com/oauth/auth?response_type=code&client_id=${docuSignCredentails.client_id}&scope=signature&redirect_uri=${docuSignCredentails.client_redirect_uri}`;
                window.location.href = url;
              }
            }}
          >
            Authentication DocuSign
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Docusign;
