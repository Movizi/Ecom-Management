import "./login.css";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRootContext } from "../../hooks/useRootContext";
import { useAuthAlertContext } from "../../hooks/useAuthAlertContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { login } from "../../interface/login.interface";
import { isAxiosError } from "axios";

function Login() {
  const rootContext = useRootContext();
  const alertContext = useAuthAlertContext();

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const mutation = useMutation(async (userData: login) =>
    rootContext?.authFetch<login>(
      rootContext?.apiUrl + "/Account/login",
      userData
    )
  );

  function onFinish(values: login) {
    mutation.mutate(values, {
      onSuccess: (res): void => {
        localStorage.setItem("accessToken", res?.token);
        localStorage.setItem("tokenExpires", res?.expiration);
        rootContext?.setAccessToken(localStorage.getItem("accessToken"));
        rootContext?.setTokenExpires(localStorage.getItem("tokenExpires"));
        alertContext?.setIsAlertOpen(true);
        alertContext?.setAlertType("success");
        alertContext?.setMessage("User authorized successfully!");
        setTimeout(() => {
          form.resetFields();
          navigate("/portal/overview");
        }, 1500);
      },
      onError: (err): void => {
        if (isAxiosError(err)) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenExpires");
          rootContext?.setAccessToken(null);
          rootContext?.setTokenExpires(null);
          alertContext?.setIsAlertOpen(true);
          alertContext?.setAlertType("error");
          alertContext?.setMessage("Unauthorized user!");
        }
      },
    });
  }

  return (
    <div className="login">
      <div className="login-logo d-flex flex-column align-items-center">
        <img src="/logo.svg" alt="login-logo" title="Loopin logo" />
        <h1>login</h1>
        <p>Welcome to Loopin! Please log in to access your account.</p>
      </div>
      <div className="login-form-container">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
            className="input"
              prefix={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_7576)">
                    <path d="M4 22C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14C14.1217 14 16.1566 14.8429 17.6569 16.3431C19.1571 17.8434 20 19.8783 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_7576">
                      <rect width={24} height={24} />
                    </clipPath>
                  </defs>
                </svg>
              }
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
                        className="input"

              prefix={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8ZM11 15.732V18H13V15.732C13.3813 15.5119 13.6793 15.1721 13.8478 14.7653C14.0162 14.3586 14.0458 13.9076 13.9319 13.4823C13.8179 13.057 13.5668 12.6813 13.2175 12.4132C12.8682 12.1452 12.4403 11.9999 12 11.9999C11.5597 11.9999 11.1318 12.1452 10.7825 12.4132C10.4332 12.6813 10.1821 13.057 10.0681 13.4823C9.9542 13.9076 9.98376 14.3586 10.1522 14.7653C10.3207 15.1721 10.6187 15.5119 11 15.732ZM16 8V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8H16Z" />
                </svg>
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className="button login-button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
          <div className="login-link">
            <p>
              if you don't have an account yet,&nbsp;
              <Link className="link" to="/register">
                register here.
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
