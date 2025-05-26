import { Trash, UnlockFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { blockUnblockUsers } from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";
export default function UnblockButton() {
  const navigate = useNavigate();
  const { selectedUsers, allUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      blockUnblockUsers({
        userEmail: sessionStorage.getItem("email"),
        selectedUsers,
        newStatus: "active",
      })
    );
    if (
      allUsers.find((user) => user.email === sessionStorage.getItem("email"))
        ?.status === "blocked"
    ) {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 5000);
    }
  }
  return (
    <>
      <button className="btn btn-primary" onClick={handleClick}>
        <UnlockFill />
      </button>
    </>
  );
}
