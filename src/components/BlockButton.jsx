import { useDispatch, useSelector } from "react-redux";
import { blockUnblockUsers } from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";

export default function BlockButton() {
  const { allUsers, selectedUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      blockUnblockUsers({
        userEmail: sessionStorage.getItem("email"),
        selectedUsers,
        newStatus: "blocked",
      })
    );
    const newUserStatus = allUsers.find(
      (user) => user.email === sessionStorage.getItem("email")
    );
    if (!newUserStatus || newUserStatus.status === "blocked") {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
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
