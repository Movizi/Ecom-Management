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
                  <path d="M13 14.062V22H4C3.99989 20.8649 4.24133 19.7428 4.70827 18.7083C5.1752 17.6737 5.85695 16.7503 6.70822 15.9995C7.55948 15.2487 8.56078 14.6876 9.64557 14.3536C10.7304 14.0195 11.8738 13.9201 13 14.062ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM17.793 19.914L21.328 16.379L22.743 17.793L17.793 22.743L14.257 19.207L15.672 17.793L17.792 19.914H17.793Z" />
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
                  <path d="M13 14.062V22H4C3.99989 20.8649 4.24133 19.7428 4.70827 18.7083C5.1752 17.6737 5.85695 16.7503 6.70822 15.9995C7.55948 15.2487 8.56078 14.6876 9.64557 14.3536C10.7304 14.0195 11.8738 13.9201 13 14.062ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM17.793 19.914L21.328 16.379L22.743 17.793L17.793 22.743L14.257 19.207L15.672 17.793L17.792 19.914H17.793Z" />
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
                  <path d="M13 14.062V22H4C3.99989 20.8649 4.24133 19.7428 4.70827 18.7083C5.1752 17.6737 5.85695 16.7503 6.70822 15.9995C7.55948 15.2487 8.56078 14.6876 9.64557 14.3536C10.7304 14.0195 11.8738 13.9201 13 14.062ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM17.793 19.914L21.328 16.379L22.743 17.793L17.793 22.743L14.257 19.207L15.672 17.793L17.792 19.914H17.793Z" />
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
                  <g clipPath="url(#clip0_1_494)">
                    <path d="M22 13.341C20.9317 12.9626 19.7781 12.8945 18.6727 13.1446C17.5674 13.3946 16.5554 13.9527 15.754 14.754C14.9527 15.5554 14.3946 16.5674 14.1446 17.6727C13.8945 18.7781 13.9626 19.9317 14.341 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V13.341ZM12.06 11.683L5.648 6.238L4.353 7.762L12.073 14.317L19.654 7.757L18.346 6.244L12.061 11.683H12.06ZM19 22L15.464 18.464L16.879 17.05L19 19.172L22.536 15.636L23.95 17.05L19 22Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_494">
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
                  <g clipPath="url(#clip0_1_7109)">
                    <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11 12.792V16H13V12.792C13.5264 12.5623 13.9576 12.1583 14.2212 11.648C14.4848 11.1377 14.5646 10.5522 14.4473 9.98994C14.3299 9.4277 14.0226 8.92302 13.5769 8.56075C13.1312 8.19847 12.5744 8.00071 12 8.00071C11.4256 8.00071 10.8688 8.19847 10.4231 8.56075C9.97744 8.92302 9.67008 9.4277 9.55273 9.98994C9.43539 10.5522 9.51521 11.1377 9.77878 11.648C10.0424 12.1583 10.4736 12.5623 11 12.792Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_7109">
                      <rect width={24} height={24} />
                    </clipPath>
                  </defs>
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
