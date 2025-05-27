import { Trash, UnlockFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUnblockUsers,
  getUsers,
} from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";
export default function UnblockButton() {
  const navigate = useNavigate();
  const { selectedUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const dispatch = useDispatch();
  async function handleClick() {
    const resultAction = await dispatch(getUsers());
    if (getUsers.fulfilled.match(resultAction)) {
      const updatedUsers = resultAction.payload;
      const currentUserEmail = sessionStorage.getItem("email");

      const currentUser = updatedUsers.find(
        (user) => user.email === currentUserEmail
      );

      if (!currentUser || currentUser.status === "blocked") {
        alert("You are blocked or deleted by another user.");
        navigate("/", { replace: true });
        return;
      }

      await dispatch(
        blockUnblockUsers({
          userEmail: currentUserEmail,
          selectedUsers,
          newStatus: "active",
        })
      );
    } else {
      alert("Failed to fetch user data.");
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
