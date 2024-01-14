import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate replace to={"/auth/sign-in"} />;
  return children;
}
