import { useSelector } from "react-redux";
import UserDetails from "./UserDetails";
export default function DisplayUsers({ users, handleChange }) {
  const userList = useSelector((state) => state.adminReducer.usersList);
  const checkStatusHandler = userList.allUsers.every((user) =>
    userList.selectedUsers.includes(user)
  );
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="select-all"
                id="select-all"
                checked={checkStatusHandler}
                onChange={handleChange}
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th className="text-center">Email</th>
            <th>Status</th>
            <th className="text-center">Last login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserDetails user={user} key={user.email} />
          ))}
        </tbody>
      </table>
    </>
  );
}
