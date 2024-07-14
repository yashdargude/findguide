import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import AdminRegistration from "./pages/AdminRegistration";
import CounseleeAppointment from "./pages/CounseleeAppointment";
import CounselorAppointments from "./pages/CounselorAppointments";
import ScheduleAppointments from "./pages/ScheduleAppointments";
import { UserContextProvider } from "./contexts/UserContext";
import AddAppointments from "./pages/AddAppointments";
import Counselor from "./pages/Counselor";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminregister" element={<AdminRegistration />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <UserContextProvider>
                <DashboardLayout />
              </UserContextProvider>
            </PrivateRoutes>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route
            path="counseleeappointments"
            element={<CounseleeAppointment />}
          />
          <Route
            path="counselorappointments"
            element={<CounselorAppointments />}
          />
          <Route
            path="scheduleappointments"
            element={<ScheduleAppointments />}
          />
          <Route path="addappointments" element={<AddAppointments />} />
          <Route path="counselor/:id" element={<Counselor />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
