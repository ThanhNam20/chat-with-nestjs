import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { createBrowserHistory } from "history";
import ChatRoomScreen from "./pages/ChatRoom";



const App = () => {
  const history = createBrowserHistory();
  return (
    <Routes history={history}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chatroom/:id" element={<ChatRoomScreen />} />
    </Routes>
  );
};

export default App;
