import { TrashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";

export default function DeleteButton() {
  const { allUsers, selectedUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleClick() {
    const resultAction = await dispatch(getUsers());

    // check if fulfilled
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
        deleteUsers({
          userEmail: sessionStorage.getItem("email"),
          selectedUsers,
        })
      );

      alert("Successfully deleted.");
    } else {
      alert("Failed to fetch user data.");
    }
  }

  return (
    <>
      <button className="btn btn-danger m-3" onClick={handleClick}>
        <TrashFill />
      </button>
    </>
  );
}
