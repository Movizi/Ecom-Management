import "./auth-alert.css";
import { useEffect } from "react";
import { useAuthAlertContext } from "../../hooks/useAuthAlertContext";
import { Alert } from "antd";

function AuthAlert() {
  const alertContext = useAuthAlertContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      alertContext?.setAlertType(undefined);
      alertContext?.setMessage("");
      alertContext?.setIsAlertOpen(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [alertContext]);

  return (
    <Alert
      className={`${alertContext?.isAlertOpen ? "" : "d-none"}`}
      message={alertContext?.message}
      type={alertContext?.alertType}
      showIcon
      closable
    />
  );
}

export default AuthAlert;
