import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

//common pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./components/NotFound";

//admin pages
import Dashboard from "./admin/pages/Dashboard";
import ManageFarmers from "./admin/pages/ManageFarmers";
import ManageOwners from "./admin/pages/ManageOwners";
import ManageEquipment from "./admin/pages/ManageEquipment";
import AllBookings from "./admin/pages/AllBookings";
import Reports from "./admin/pages/Reports";
import Analytics from "./admin/pages/Analytics";
import Settings from "./admin/pages/Settings";
import Feedback from "./admin/pages/Feedback";



//owner pages
import OwnerDashboard from "./owner/pages/Dashboard"
import AddEquipment from "./owner/pages/AddEquipment";
import BookingHistory from "./owner/pages/BookingHistory";
import BookingRequests from "./owner/pages/BookingRequests";
import Earnings from "./owner/pages/Earnings";
import EditEquipment from "./owner/pages/EditEqipment";
import OwnerManageEquipment from "./owner/pages/ManageEquipment";
import Profile from "./owner/pages/Profile";

// farmer pages
import FarmerDashboard from "./farmer/pages/Dashboard";
import BrowseEquipment from "./farmer/pages/BrowseEquipment";
import EquipmentDetails from "./farmer/pages/EquipmentDetails";
import BookEquipment from "./farmer/pages/BookEquipment";
import MyBookings from "./farmer/pages/MyBookings";
import FarmerBookingHistory from "./farmer/pages/BookingHistory";
import FarmerProfile from "./farmer/pages/Profile";
import FarmerFeedback from "./farmer/pages/Feedback";


import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* common routes */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

          {/* admin routes */}
          <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/farmers" element={<ProtectedRoute roleRequired="admin"><PageTransition><ManageFarmers /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/owners" element={<ProtectedRoute roleRequired="admin"><PageTransition><ManageOwners /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/equipment" element={<ProtectedRoute roleRequired="admin"><PageTransition><ManageEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute roleRequired="admin"><PageTransition><AllBookings /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute roleRequired="admin"><PageTransition><Reports /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute roleRequired="admin"><PageTransition><Analytics /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute roleRequired="admin"><PageTransition><Settings /></PageTransition></ProtectedRoute>} />
          <Route path="/admin/feedback" element={<ProtectedRoute roleRequired="admin"><PageTransition><Feedback /></PageTransition></ProtectedRoute>} />

          {/* owner routes */}
          <Route path="/owner" element={<ProtectedRoute roleRequired="owner"><PageTransition><OwnerDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/add" element={<ProtectedRoute roleRequired="owner"><PageTransition><AddEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/manage" element={<ProtectedRoute roleRequired="owner"><PageTransition><OwnerManageEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/edit/:id" element={<ProtectedRoute roleRequired="owner"><PageTransition><EditEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/requests" element={<ProtectedRoute roleRequired="owner"><PageTransition><BookingRequests /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/history" element={<ProtectedRoute roleRequired="owner"><PageTransition><BookingHistory /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/earnings" element={<ProtectedRoute roleRequired="owner"><PageTransition><Earnings /></PageTransition></ProtectedRoute>} />
          <Route path="/owner/profile" element={<ProtectedRoute roleRequired="owner"><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
          
          {/* farmer routes */}
          <Route path="/farmer" element={<ProtectedRoute roleRequired="farmer"><PageTransition><FarmerDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/browse" element={<ProtectedRoute roleRequired="farmer"><PageTransition><BrowseEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/equipment/:id" element={<ProtectedRoute roleRequired="farmer"><PageTransition><EquipmentDetails /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/book/:id" element={<ProtectedRoute roleRequired="farmer"><PageTransition><BookEquipment /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/bookings" element={<ProtectedRoute roleRequired="farmer"><PageTransition><MyBookings /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/history" element={<ProtectedRoute roleRequired="farmer"><PageTransition><FarmerBookingHistory /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/profile" element={<ProtectedRoute roleRequired="farmer"><PageTransition><FarmerProfile /></PageTransition></ProtectedRoute>} />
          <Route path="/farmer/feedback" element={<ProtectedRoute roleRequired="farmer"><PageTransition><FarmerFeedback /></PageTransition></ProtectedRoute>} />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
