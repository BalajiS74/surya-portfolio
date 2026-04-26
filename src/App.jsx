// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// import Contact from "./pages/Contact";
import Venture from "./pages/Venture";
import Blogs from "./pages/Blogs";
import ContactDashboard from "./components/ContactDashboard";
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Venture />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contactdashboard" element={<ContactDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
