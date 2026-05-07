import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { api_route, socket } from "./socketApi";
import Landing from "./Pages/Landing";
import Apply from "./Pages/Apply";
import Branch from "./Pages/Branch";
import Otp from "./Pages/Otp";
import Success from "./Pages/Success";

export { api_route, socket };

function App() {
  useEffect(() => {
    (async () => {
      try {
        await axios.get(api_route + "/");
      } catch {
        /* offline */
      }
    })();
  }, []);

  useEffect(() => {
    const onConnect = () => socket.emit("join", { role: "visitor" });
    if (socket.connected) onConnect();
    socket.on("connect", onConnect);
    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  return (
    <div className="w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
