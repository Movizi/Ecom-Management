import "./auth-layout.css";
import AuthAlertContextProvider from "../../context/AuthAlertContextProvider";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AuthAlert from "../../components/auth-alert/AuthAlert";
import { useEffect } from "react";

function AuthLayout() {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpires");
  }, [])

  return (
    <AuthAlertContextProvider>
      <Container fluid>
        <Row className="auth-layout">
          <Col
            className="auth-illustration-container d-flex flex-column justify-content-center align-items-center"
            lg={6}
          >
            <h1 className="welcome-title">
              Welcome to Loopin: Your Ultimate E-Commerce Product Management
              Solution!
            </h1>
            <img
              className="auth-illustration img-fluid"
              width={300}
              height={500}
              src="/src/assets/illustrations/auth.svg"
              alt="login-illustration"
            />
          </Col>
          <Col
            className="auth-route d-flex justify-content-center align-items-center"
            lg={6}
          >
            <Outlet />
          </Col>
          <AuthAlert />
        </Row>
      </Container>
    </AuthAlertContextProvider>
  );
}

export default AuthLayout;
