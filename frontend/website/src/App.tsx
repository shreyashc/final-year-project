import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./providers/AuthProvider";
import AxiosProvider from "./providers/AxiosProvider";

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
