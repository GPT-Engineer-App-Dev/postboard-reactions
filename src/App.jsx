import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Navigation from "./components/Navigation.jsx"; // Import the new Navigation component
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";

function App() {
  return (
    <Router>
      <Navigation /> {/* Add the Navigation component here */}
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
