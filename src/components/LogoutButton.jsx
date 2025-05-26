import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  function handleClick() {
    sessionStorage.clear();

    navigate("/", { replace: true });
  }
  return (
    <>
      <button className="btn btn-dark" onClick={handleClick}>
        Logout
      </button>
    </>
  );
}
