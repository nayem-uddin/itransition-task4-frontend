import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/auth/login/Login";
import AdminPage from "./features/admin access/AdminPage";
import Signup from "./features/auth/register/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="register" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
