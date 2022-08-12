import { useFormik } from "formik";
import React, { useMemo } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/header/Header";
import * as yup from "yup";
import { ILogin, loginAction } from "../../../store/actions/login.action";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  let initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values: ILogin) => {
      const res = await dispatch(loginAction(values) as any);
      if (res.payload.isSuccess) {
        navigate("/");
      }
    },
  });

  return (
    <React.Fragment>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Card className="shadow" style={{ width: "350px" }}>
          <Card.Title className="text-center my-4">Login</Card.Title>
          <Card.Body>
            <Form
              noValidate
              onSubmit={(e: any) => {
                e.preventDefault();
                formik.handleSubmit(e);
              }}
            >
              <Form.Group aria-label="Small" className="mb-3">
                <Form.Label size="sm">Email address</Form.Label>
                <Form.Control
                  size="sm"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="sm"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="sm" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Login;
