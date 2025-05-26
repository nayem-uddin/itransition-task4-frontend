import { useEffect, useRef } from "react";
export default function DisplayMessage({ message, usersList }) {
  const toastRef = useRef(null);
  const bsToast = useRef(null);
  useEffect(() => {
    if (toastRef.current && message) {
      bsToast.current = new window.bootstrap.Toast(toastRef.current, {
        autohide: true,
        delay: 4000,
      });
      bsToast.current.show();
    }
  }, [usersList]);
  return (
    <div
      ref={toastRef}
      className="toast align-items-center m-auto"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}
