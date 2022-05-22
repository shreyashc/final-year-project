import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./providers/AuthProvider";
import AxiosProvider from "./providers/AxiosProvider";

function App() {
  const l = [
    {
      link: "/login",
      label: "Login",
    },
    {
      link: "/signup",
      label: "Signup",
    },
    {
      link: "/startup/dashboard",
      label: "Dashboard",
    },
  ];
  return (
    <AuthProvider>
      <AxiosProvider>
        <div className="App">
          <Navbar links={l} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="startup/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
