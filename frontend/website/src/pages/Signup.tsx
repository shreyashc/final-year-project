import { useState } from "react";
import StartupSignup from "../components/StartupSignup";
import VisitorSignup from "../components/VisitorSignup";

const Signup = () => {
  const [cur, setCur] = useState("visitor");
  return (
    <div>
      <div>
        <button onClick={() => setCur("visitor")}>Visitor</button>
        <button onClick={() => setCur("startup")}>Startup</button>
      </div>
      {cur === "visitor" ? <VisitorSignup /> : <StartupSignup />}
    </div>
  );
};

export default Signup;
