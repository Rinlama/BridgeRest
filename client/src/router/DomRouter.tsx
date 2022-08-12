import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthDocusign from "../component/auth/docusign/AuthDocusign";
import Login from "../component/auth/login/Login";
import Register from "../component/auth/register/Register";
import Authentication from "../component/home/authentication/Authentication";
import DocusignRedirect from "../component/home/docusign-redirect/DocusignRedirect";
import Home from "../component/home/Home";
import Task from "../component/home/task/Task";
import UserManagement from "../component/home/user-management/UserManagement";
import Workflow from "../component/home/workflow/Workflow";
import { IState } from "../store/store";

function DomRouter() {
  const state = useSelector((state: IState) => state);

  const PrivateRoute = (children: any) => {
    if (state.auth.data.token) {
      return children;
    }
    return <Navigate to="/auth/login"></Navigate>;
  };

  const PublicRoute = (children: any) => {
    if (!state.auth.data.token) {
      return children;
    }
    return <Navigate to="/"></Navigate>;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Router */}
        <Route path="/" element={<Navigate to="home" />}></Route>
        {/* Home Router */}
        <Route path="home" element={PrivateRoute(<Home />)}>
          <Route path="task" element={PrivateRoute(<Task />)}></Route>
          <Route
            path="authentication"
            element={PrivateRoute(<Authentication />)}
          ></Route>
          <Route path="workflow" element={PrivateRoute(<Workflow />)}></Route>
          <Route
            path="usermanagement"
            element={PrivateRoute(<UserManagement />)}
          />
          <Route
            path="docusign-redirect"
            element={PrivateRoute(<DocusignRedirect />)}
          />
        </Route>

        {/* Auth Routes */}
        <Route path="auth">
          <Route path="login" element={PublicRoute(<Login />)} />
          <Route path="register" element={PublicRoute(<Register />)} />
          <Route path="docusign/callback" element={<AuthDocusign />} />
        </Route>

        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default DomRouter;
