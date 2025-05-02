import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Kanban from "./Kanban";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/kanban">Tableau Kanban</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
          <Route path="/kanban" element={<Kanban/>} />
            <Route path="*" element={<div>Bienvenue</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
