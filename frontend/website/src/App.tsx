import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import InvestorSignup from "./components/InverstorSignup";
import Navbar from "./components/Navbar";
import StartupSignup from "./components/StartupSignup";
import VisitorSignup from "./components/VisitorSignup";
import { footerLinks, navLinks } from "./constants";
import Dashboard from "./pages/Dashboard";
import EditHighlights from "./pages/EditHighlights";
import EditInvestorDetails from "./pages/EditInvestorDetails";
import EditPeople from "./pages/EditPeople";
import EditStrtupDetails from "./pages/EditStrtupDetails";
import Home from "./pages/Home";
import MyChats from "./pages/MyChats";
import InvestorDashboard from "./pages/InvestorDashboard";
import Investors from "./pages/Investors";
import Login from "./pages/Login";
import News from "./pages/News";
import PrivateChat from "./pages/PrivateChat";
import Signup from "./pages/Signup";
import StartupDashboard from "./pages/StartupDashboard";
import Startups from "./pages/Startups";
import { AuthProvider } from "./providers/AuthProvider";
import AxiosProvider from "./providers/AxiosProvider";
import Schemes from "./pages/Schemes";
import DRooms from "./pages/DRooms";
import DRoom from "./pages/DRoom";
import AddJobs from "./pages/AddJobs";
import NewHome from "./pages/NewHome";

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <div className="App">
          <Navbar links={navLinks} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup/startup" element={<StartupSignup />} />
            <Route path="/signup/visitor" element={<VisitorSignup />} />
            <Route path="/signup/investor" element={<InvestorSignup />} />
            <Route path="/startup/dashboard" element={<StartupDashboard />} />
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/my-chats" element={<MyChats />} />
            <Route path="/news/:page" element={<News />} />
            <Route path="/AddJobs" element={<AddJobs />} />
            <Route
              path="/investor/edit-details"
              element={<EditInvestorDetails />}
            />
            <Route
              path="/startup/edit-details"
              element={<EditStrtupDetails />}
            />
            <Route path="/startup/edit-people" element={<EditPeople />} />
            <Route
              path="/startup/edit-highlights"
              element={<EditHighlights />}
            />
            <Route path="/investors" element={<Investors />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/startups/:id" element={<StartupDashboard />} />
            <Route path="/private-chat/:chatid" element={<PrivateChat />} />
            <Route path="/Schemes" element={<Schemes />} />
            <Route path="/discussion-rooms" element={<DRooms />} />
            <Route path="/discussion-rooms/:roomid" element={<DRoom />} />
            <Route path="/home" element={<NewHome />} />
          </Routes>
          <Footer data={footerLinks} />
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;

