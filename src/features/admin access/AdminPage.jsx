import { useEffect } from "react";
import UserDetails from "../../components/UserDetails";
import styles from "./ui.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deselectAllUsers, selectAllUsers } from "./userSlice";
import { getUsers } from "./handleAPI";
import DisplayUsers from "../../components/DisplayUsers";
import Toolbar from "../../components/Toolbar";
import DisplayMessage from "../../components/DisplayMessage";
import LoadingAnim from "../../components/LoadingAnim";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();
  const { isLoading, usersList, message } = useSelector(
    (state) => state.adminReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function verifyUser() {
      if (!sessionStorage.getItem("email")) {
        navigate("/", { replace: true });
      }
      const res = await fetch(
        "https://itransition-task4-backend-gxbs.onrender.com/"
      );
      const users = await res.json();
      const userStatus = await users.users.find(
        (user) => user.email === sessionStorage.getItem("email")
      );
      if (userStatus.status === "blocked") {
        navigate("/", { replace: true });
      }
    }
    verifyUser();
    dispatch(getUsers());
  }, []);
  function handleAllusers(e) {
    e.target.checked
      ? dispatch(selectAllUsers())
      : dispatch(deselectAllUsers());
  }

  return (
    <div className={`${styles.usersList}`}>
      {!isLoading && usersList.allUsers.length > 0 && (
        <div>
          <Toolbar message={message} />
          <DisplayUsers
            users={usersList.allUsers.toSorted((user1, user2) =>
              user1.firstName.toLowerCase() > user2.firstName.toLowerCase()
                ? 1
                : -1
            )}
            handleChange={handleAllusers}
          />
        </div>
      )}

      {isLoading && <LoadingAnim />}
      {!isLoading && usersList.allUsers.length == 0 && (
        <p className="text-center">No data found</p>
      )}
      {message && <DisplayMessage message={message} />}
    </div>
  );
}
