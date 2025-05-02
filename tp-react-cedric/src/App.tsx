import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Kanban from "./Kanban";
import "./App.css";

// !!!! Ajout de cette fonction généré par IA Juste pour la mise en page.!!!!
function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "";
  
  return (
    <div className={isHomePage ? "home-page" : ""}>
      <nav>
        <ul>
          <li>
            <NavLink to="/kanban">Tableau Kanban</NavLink>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="*" element={<div></div>} />
        <Route path="/kanban" element={<Kanban/>} />  
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
