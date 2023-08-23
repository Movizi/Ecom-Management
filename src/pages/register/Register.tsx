import "./register.css";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRootContext } from "../../hooks/useRootContext";
import { useAuthAlertContext } from "../../hooks/useAuthAlertContext";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { register } from "../../interface/register.interface";
import { isAxiosError } from "axios";

function Register() {
  const rootContext = useRootContext();
  const alertContext = useAuthAlertContext();

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const mutation = useMutation(async (userData: register) =>
    rootContext?.authFetch<register>(
      rootContext?.apiUrl + "/Account/register-admin",
      userData
    )
  );

  function onFinish(values: register) {
    mutation.mutate(values, {
      onSuccess: (): void => {
        alertContext?.setIsAlertOpen(true);
        alertContext?.setAlertType("success");
        alertContext?.setMessage("User created successfully!");
        setTimeout(() => {
          form.resetFields();
        }, 1000);
      },
      onError: (err): void => {
        if (isAxiosError(err)) {
          let errorMessage = "";
          alertContext?.setIsAlertOpen(true);
          alertContext?.setAlertType("error");
          switch (err.response?.status) {
            case 500:
              errorMessage = err?.response?.data?.message;
              break;
            case 400:
              errorMessage = err?.response?.data.errors.Email[0];
              break;
            default:
              break;
          }
          alertContext?.setMessage(errorMessage);
        }
      },
    });
  }

  return (
    <div className="register">
      <h1>Register</h1>
      <p>
        Ready to take your online business to new heights? Register with Loopin
        to unlock powerful tools for seamless product management.
      </p>
      <div className="register-form-container">
        <Form
          form={form}
          name="normal_register"
          className="register-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
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
              placeholder="Enter FirstName"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input
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
              placeholder="Enter LastName"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
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
              placeholder="Enter Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_801_35)">
                    <path d="M2.243 6.85399L11.49 1.30999C11.6454 1.21674 11.8233 1.16748 12.0045 1.16748C12.1857 1.16748 12.3636 1.21674 12.519 1.30999L21.757 6.85499C21.8311 6.8994 21.8925 6.96227 21.9351 7.03746C21.9776 7.11264 22 7.19758 22 7.28399V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V7.28299C1.99998 7.19658 2.02236 7.11164 2.06495 7.03646C2.10753 6.96127 2.16888 6.8984 2.243 6.85399ZM18.346 8.24399L12.061 13.683L5.647 8.23799L4.353 9.76199L12.073 16.317L19.654 9.75699L18.346 8.24399V8.24399Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_801_35">
                      <rect width={24} height={24} />
                    </clipPath>
                  </defs>
                </svg>
              }
              placeholder="Enter Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
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
              placeholder="Enter Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className="button register-button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Register
              </Button>
            )}
          </Form.Item>
          <div className="register-link">
            <p>
              If you already have an account,&nbsp;
              <Link className="link" to="/">
                login here.
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
