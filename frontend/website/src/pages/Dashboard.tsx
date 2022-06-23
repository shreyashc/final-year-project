import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext);

  if (authState.role === "startup") return <Navigate to="/startup/dashboard" />;
  else if (authState.role === "jobseeker")
    return <Navigate to="/jobseeker/dashboard" />;
  return <Navigate to="/investor/dashboard" />;
};

export default Dashboard;

