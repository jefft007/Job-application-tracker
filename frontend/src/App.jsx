import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import ApplicationList from "./pages/ApplicationList";
import EditApplication from "./pages/EditApplication";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <div style={{ fontWeight: 'bold', color: 'white', marginRight: 'auto', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span> Tracker
        </div>
        <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/applications" className={({isActive}) => isActive ? "active" : ""}>Applications</NavLink>
        <NavLink to="/add" className={({isActive}) => isActive ? "active" : ""}>Add Application</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddApplication />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/edit/:id" element={<EditApplication />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;