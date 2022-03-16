import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { SWRConfig } from "swr";

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
      </Routes>
    </SWRConfig>
  );
};

export default App;
