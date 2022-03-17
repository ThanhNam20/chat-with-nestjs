import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";

import { SWRConfig } from "swr";
import Register from "./pages/Register/Register";
const App = () => {
  let navigate = useNavigate();
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // we can show a notification here or log the error
            navigate("/login");
          }
        },
      }}
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </SWRConfig>
  );
};

export default App;
