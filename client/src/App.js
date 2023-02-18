import React from "react";
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Admin from "./routes/Admin";
import Owner from "./routes/Owner";
import User from "./routes/User";

function App() {
  return (
    <div>
      <Router>

            {/* User Routes */}
            <Routes>
                <Route path='/*' element={<User/>}/>
            </Routes>

            {/* Owner Routes */}
            <Routes>
              <Route path="/owner/*" element={<Owner/>}/>
            </Routes>

            {/* Admin Routes */}
            <Routes>
              <Route path="/admin/*" element={<Admin/>}/>
            </Routes>

      </Router>
    </div>
  );
}

export default App;
