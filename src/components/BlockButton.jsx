import { useDispatch, useSelector } from "react-redux";
import {
  blockUnblockUsers,
  getUsers,
} from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function BlockButton() {
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

      dispatch(
        blockUnblockUsers({
          userEmail: sessionStorage.getItem("email"),
          selectedUsers,
          newStatus: "blocked",
        })
      );
    } else {
      alert("Failed to fetch user data.");
    }
  }

  return (
    <>
      <button className="btn btn-danger m-3" onClick={handleClick}>
        Block
      </button>
    </>
  );
}
