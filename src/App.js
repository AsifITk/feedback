
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile";
import FeedBack from "./Components/FeedBack";
import { useState } from 'react';

function App() {
  let [user, setUser] = useState();

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile user={user} />} />
        <Route path="/:id" element={<FeedBack />} />
      </Routes>


    </div>
  );
}

export default App;
