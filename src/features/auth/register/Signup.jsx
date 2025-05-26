import { useState } from "react";
import TextInput from "../../../components/TextInput";
import PassInput from "../../../components/PassInput";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../login/form-style.module.css";
import DisplayMessage from "../../../components/DisplayMessage";
export default function Signup() {
  const [userInfo, setUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function updateUserInfo(field, value) {
    setUserInfo({ ...userInfo, [field]: value });
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
        "https://itransition-task4-backend-gxbs.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...userInfo, lastLogin, status: "active" }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setErrorMessage("try again");
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} needs-validation`}
        noValidate
      >
        <fieldset>
          <legend className="text-center">Signup</legend>
          <TextInput
            type={"text"}
            updateInfo={updateUserInfo}
            field={"firstName"}
            labelName={"first name"}
          />
          <TextInput
            type={"text"}
            updateInfo={updateUserInfo}
            field={"lastName"}
            labelName={"last name"}
          />
          <TextInput
            type={"email"}
            updateInfo={updateUserInfo}
            field={"email"}
            labelName={"email"}
          />
          <PassInput updateInfo={updateUserInfo} />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>
          <p className="text-center mt-3">
            Already have an accout? <Link to="/">Login</Link> here.{" "}
          </p>
          {errorMessage && <DisplayMessage message={errorMessage} />}
        </fieldset>
      </form>
    </div>
  );
}
