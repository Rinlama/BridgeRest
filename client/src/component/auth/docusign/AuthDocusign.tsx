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
import { useLocation, useNavigate } from "react-router-dom";
import { setGateway } from "../../../store/reducers/gateway.reducer";
import { IState } from "../../../store/store";
import AuthenticationServices from "../../home/authentication/services/AuthenticationServices";
import Header from "../../layout/header/Header";
function AuthDocusign() {
  const { token } = useSelector((state: IState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [docuSignCredentails, setDocuSignCredentails] = useState({
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
      GetDocuSignToken();
    }
    return () => {
      load = false;
    };
  }, [load]);

  const { GetDocuSignAuth } = AuthenticationServices(token, navigate, dispatch);

  const GetDocuSignToken = async () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code) {
      const { data } = await GetDocuSignAuth(code);
      dispatch(
        setGateway({
          docusign: data,
        })
      );
      navigate("/home/authentication");
    }
  };
  return (
    <div>
      <Header />
    </div>
  );
}

export default AuthDocusign;
