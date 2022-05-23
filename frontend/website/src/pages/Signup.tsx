import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => nav("/signup/visitor")}>Visitor</button>
        <button onClick={() => nav("/signup/startup")}>Startup</button>
        <button onClick={() => nav("/signup/investor")}>Investor</button>
      </div>
    </div>
  );
};

export default Signup;
