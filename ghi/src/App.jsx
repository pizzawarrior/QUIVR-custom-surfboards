import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing.jsx";
import OrderCreate from "./pages/orderCreate/OrderCreate.jsx";
import OrderHistory from "./pages/orderHistory/OrderHistory.jsx";
import UserList from "./pages/userList/UserList.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { FooterContainer } from "./components/footer/Footer.jsx";
import Login from "./pages/login/Login.jsx";
import NotFound from "./components/errorNotification/NotFound.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-order" element={<OrderCreate />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
