import { useDispatch, useSelector } from "react-redux";
import { deselectUser, selectUser } from "../features/admin access/userSlice";

export default function UserDetails({ user }) {
  const { firstName, lastName, email, status, lastLogin } = user;
  const { selectedUsers } = useSelector(
    (state) => state.adminReducer.usersList
  );
  const dispatch = useDispatch();
  function handleChange(e) {
    e.target.checked
      ? dispatch(selectUser(email))
      : dispatch(deselectUser(email));
  }
  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="select"
            id="select"
            onChange={handleChange}
            checked={selectedUsers.includes(user)}
          />
        </td>
        {[firstName, lastName, email, status, lastLogin].map((field) => (
          <td key={field}>{field}</td>
        ))}
      </tr>
    </>
  );
}
