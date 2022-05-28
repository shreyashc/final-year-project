import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext);

  if (authState.role === "startup") return <Navigate to="/startup/dashboard" />;
  return <Navigate to="/investor/dashboard" />;
};

export default Dashboard;
