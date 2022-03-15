import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
