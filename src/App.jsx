import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx"; // Import the NavigationMenu component
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";

function App() {
  return (
    <Router>
      <NavigationMenu /> {/* Add the NavigationMenu component */}
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
