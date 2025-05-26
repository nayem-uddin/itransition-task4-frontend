import { useState } from "react";

export default function PassInput({ updateInfo }) {
  const [fieldValue, setFieldValue] = useState("");
  const [type, setType] = useState("password");
  function handleChange(event) {
    setFieldValue(event.target.value);
    updateInfo("password", event.target.value);
  }
  function handleCheck(event) {
    const ifChecked = event.target.checked;
    if (ifChecked) {
      setType("text");
    } else {
      setType("password");
    }
  }
  return (
    <>
      <label htmlFor="password" className="text-capitalize">
        password:{" "}
      </label>
      <input
        type={type}
        name="password"
        value={fieldValue}
        onChange={handleChange}
        className="form-control"
        required
      />
      <label htmlFor="show-pass">
        <input
          type="checkbox"
          name="show-pass"
          id="show-pass"
          onChange={handleCheck}
        />
        &nbsp;show password
      </label>
    </>
  );
}
