import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      Navbar
      <Routes>
        <Route path="/">
          <Route index element={<h1>Home</h1>} />

          <Route path="login" element={<>Login</>} />
          <Route path="signup" element={<>Signup</>} />
          {true && (
            <>
              <Route path="profile" element={<>Profile</>} />
              <Route path="dashboard" element={<>Dashboard</>} />
            </>
          )}
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
