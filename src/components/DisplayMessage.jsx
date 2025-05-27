import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearAtLogin } from "../features/admin access/userSlice";
export default function DisplayMessage({ message }) {
  const [displayMessage, setDisplayMessage] = useState(message);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <>
      <p className="text-center">{displayMessage}</p>
    </>
  );
}
