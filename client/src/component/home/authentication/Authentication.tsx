import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGateway } from "../../../store/reducers/gateway.reducer";
import { IState } from "../../../store/store";
import AuthenticationServices from "./services/AuthenticationServices";

import jwt_decode from "jwt-decode";
import moment from "moment";
import Docusign from "./docusign/Docusign";

function Authentication() {
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mediaValetCredentails, setMediaValetCredentails] = useState({
    client_id: "",
    client_redirect_uri: "",
    client_secret: "",
  });
  const [codeGrant, setCodeGrant] = useState({
    code_grant: "",
    show: true,
    expired_date: "",
  });

  let load = true;
  useEffect(() => {
    if (load) {
      GetMediaValetCredentials();

      GetGateway();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetCredentails, GetMediaValetAuthorization } = AuthenticationServices(
    token,
    navigate,
    dispatch
  );

  const GetMediaValetCredentials = async () => {
    const { data } = await GetCredentails();
    setMediaValetCredentails(data);
  };

  const GetAuthorization = async () => {
    const { data } = await GetMediaValetAuthorization(codeGrant.code_grant);

    DecodeExpirationDate(data);

    dispatch(
      setGateway({
        mediaValet: data,
      })
    );
  };

  const GetGateway = () => {
    try {
      const gateway = localStorage.getItem("gateway");
      if (gateway) {
        const decodedJwt = jwt_decode(
          JSON.parse(gateway).mediaValet.access_token
        ) as any;
        if (decodedJwt) {
          const expired_date = moment
            .unix(decodedJwt.exp)
            .format("MMM DD YYYY, h:mm:ss a");

          setCodeGrant({
            ...codeGrant,
            expired_date,
          });
        }
      }
    } catch (error) {
      localStorage.removeItem("auth");
      localStorage.removeItem("gateway");
    }
  };

  const DecodeExpirationDate = (data: any) => {
    const decodedJwt = jwt_decode(data.access_token) as any;
    if (decodedJwt) {
      const expired_date = moment
        .unix(decodedJwt.exp)
        .format("MMM DD YYYY, h:mm:ss a");
      setCodeGrant({
        ...codeGrant,
        expired_date,
      });
    }
  };

  return (
    <div className="bg-light">
      <div className="border p-3 w-100">
        <p className="fw-semibold m-0">Gateway</p>
      </div>

      <Row className="my-2 p-0 me-0">
        <Col lg="4">
          <Card className="rounded-0" style={{ height: "300px" }}>
            <Card.Header className="py-3 fw-semibold">
              <span>MediaValet</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              {codeGrant.expired_date ? (
                <Alert variant="primary">
                  MediaValet token expired on {codeGrant.expired_date}
                </Alert>
              ) : (
                ""
              )}
              {codeGrant.show ? (
                <InputGroup className="mb-3" size="sm">
                  <Form.Control
                    placeholder="Code Grant Code"
                    onChange={(e) => {
                      const code_grant = e.target.value;
                      setCodeGrant({
                        ...codeGrant,
                        code_grant,
                      });
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      GetAuthorization();
                    }}
                  >
                    Submit
                  </Button>
                </InputGroup>
              ) : (
                ""
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (mediaValetCredentails) {
                    setCodeGrant({
                      ...codeGrant,
                      show: true,
                    });
                    const url = `https://login.mediavalet.com/connect/authorize?client_id=${mediaValetCredentails?.client_id}&response_type=code&scope=openid%20api&redirect_uri=${mediaValetCredentails?.client_redirect_uri}&state=state-296bc9a0`;
                    window.open(url);
                  }
                }}
              >
                Authentication MediaValet
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="4">
          <Docusign />
        </Col>
      </Row>
    </div>
  );
}

export default Authentication;
