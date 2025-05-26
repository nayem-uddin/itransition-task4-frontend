import { useState } from "react";
import TextInput from "../../../components/TextInput";
import styles from "./form-style.module.css";
import PassInput from "../../../components/PassInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAtLogin } from "../../admin access/userSlice";
import DisplayMessage from "../../../components/DisplayMessage";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function updateUserInfo(field, value) {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const now = new Date();
    const lastLogin = now.toString();
    try {
      const res = await fetch(
        "https://itransition-task4-backend-gxbs.onrender.com/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...userInfo, lastLogin }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
      } else {
        sessionStorage.setItem("email", userInfo.email);
        navigate("/admin", { replace: true });
        dispatch(clearAtLogin());
      }
    } catch (err) {
      setErrorMessage("try again");
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} needs-validation`}
        noValidate
      >
        <fieldset>
          <legend className="text-center">Login</legend>
          <TextInput
            field="email"
            updateInfo={updateUserInfo}
            type="email"
            labelName={"email"}
          />
          <PassInput updateInfo={updateUserInfo} />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
          <p className="text-center mt-3">
            New user? <Link to="/register">Sign up</Link> instead.{" "}
          </p>
        </fieldset>
        {errorMessage && <DisplayMessage message={errorMessage} />}
      </form>
    </>
  );
}
