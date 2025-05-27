import { TrashFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers } from "../features/admin access/handleAPI";
import { useNavigate } from "react-router-dom";

export default function DeleteButton() {
  const { allUsers, selectedUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(
      deleteUsers({ userEmail: sessionStorage.getItem("email"), selectedUsers })
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
        <TrashFill />
      </button>
    </>
  );
}
