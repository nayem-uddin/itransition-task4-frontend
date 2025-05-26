import { useEffect, useRef, useState } from "react";
export default function DisplayMessage({ message, usersList }) {
  const [displayMessage, setDisplayMessage] = useState(message);
  useEffect(() => {
    setTimeout(() => {
      setDisplayMessage("");
    }, 3000);
  }, []);
  return (
    <>
      <p className="text-center">{displayMessage}</p>
    </>
  );
}
