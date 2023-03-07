import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/User/LoadingPage";
import Admin from "./routes/Admin";
import Owner from "./routes/Owner";
import { AppContext } from "./context/AppContext";
// import User from "./routes/User";

function App() {
  const User = lazy(() => import("./routes/User"));
  const [chat, setChat] = React.useState(null);
  return (
    <div>
      <Router>
        {/* User Routes */}
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/*" element={<User />} />
          </Routes>
        </Suspense>

        {/* Owner Routes */}
        <AppContext.Provider value={{chat,setChat}}>
          <Routes>
            <Route path="/owner/*" element={<Owner />} />
          </Routes>
        </AppContext.Provider>

        {/* Admin Routes */}
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
