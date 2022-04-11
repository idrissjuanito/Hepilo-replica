import { Outlet } from "react-router-dom";
import { Store, useUser } from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  return (
    <Store>
      <Header />
      <div className="App font-rob antialiased text-white bg-neutral-900 h-auto min-h-screen relative">
        <Outlet />
      </div>
      <Footer />
    </Store>
  );
}

export default App;
