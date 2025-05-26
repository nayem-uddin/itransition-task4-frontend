import { useState } from "react";

export default function TextInput({ field, updateInfo, type, labelName }) {
  const [fieldValue, setFieldValue] = useState("");
  function handleChange(event) {
    setFieldValue(event.target.value);
    updateInfo(field, event.target.value);
  }
  return (
    <>
      <label htmlFor={field} className="text-capitalize">
        {labelName}:{" "}
      </label>
      <input
        type={type}
        name={field}
        value={fieldValue}
        onChange={handleChange}
        className="form-control"
        required
      />
    </>
  );
}
