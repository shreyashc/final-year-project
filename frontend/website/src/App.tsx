import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import InvestorSignup from "./components/InverstorSignup";
import Navbar from "./components/Navbar";
import StartupSignup from "./components/StartupSignup";
import VisitorSignup from "./components/VisitorSignup";
import { footerLinks, navLinks } from "./constants";
import AddJobs from "./pages/AddJobs";
import Dashboard from "./pages/Dashboard";
import DRoom from "./pages/DRoom";
import DRooms from "./pages/DRooms";
import EditHighlights from "./pages/EditHighlights";
import EditInvestorDetails from "./pages/EditInvestorDetails";
import EditPeople from "./pages/EditPeople";
import EditStrtupDetails from "./pages/EditStrtupDetails";
import Home from "./pages/Home";
import InvestorDashboard from "./pages/InvestorDashboard";
import InvestorDetails from "./pages/InvestorDetails";
import Investors from "./pages/Investors";
import JobApplications from "./pages/JobApplications";
import Jobs from "./pages/Jobs";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import JobseekerEdit from "./pages/JobseekerEdit";
import Login from "./pages/Login";
import ManageInvestors from "./pages/ManageInvestors";
import ManageStartups from "./pages/ManageStartups";
import MyChats from "./pages/MyChats";
import NewHome from "./pages/NewHome";
import News from "./pages/News";
import PrivateChat from "./pages/PrivateChat";
import Schemes from "./pages/Schemes";
import SeekerProfile from "./pages/SeekerProfile";
import Signup from "./pages/Signup";
import StartupDashboard from "./pages/StartupDashboard";
import Startups from "./pages/Startups";
import { AuthProvider } from "./providers/AuthProvider";
import AxiosProvider from "./providers/AxiosProvider";

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
            <Route path="/startup/appls" element={<JobApplications />} />
            <Route path="/investor/dashboard" element={<InvestorDashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route
              path="/jobseeker/dashboard"
              element={<JobseekerDashboard />}
            />
            <Route path="/jobseeker/:id" element={<SeekerProfile />} />
            <Route path="/my-chats" element={<MyChats />} />
            <Route path="/news/:page" element={<News />} />
            <Route path="/AddJobs" element={<AddJobs />} />
            <Route
              path="/investor/edit-details"
              element={<EditInvestorDetails />}
            />
            <Route path="/jobseeker/edit-details" element={<JobseekerEdit />} />
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
            <Route path="/investors/:id" element={<InvestorDetails />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/startups/:id" element={<StartupDashboard />} />
            <Route path="/private-chat/:chatid" element={<PrivateChat />} />
            <Route path="/Schemes" element={<Schemes />} />
            <Route path="/discussion-rooms" element={<DRooms />} />
            <Route path="/discussion-rooms/:roomid" element={<DRoom />} />
            <Route path="/home" element={<NewHome />} />
            <Route path="/manage-startups" element={<ManageStartups />} />
            <Route path="/manage-investors" element={<ManageInvestors />} />
          </Routes>
          <Footer data={footerLinks} />
        </div>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;

