import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import { NavLink } from "react-router-dom";

// import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
import RoadtripView from "./views/RoadtripView";
import ProfileView from "./views/ProfileView";
import StopsView from "./views/StopsView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";

import TheMap from "./components/TheMap";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();
  const [roadtrips, setRoadtrips] = useState([]);
  let [roadtripData, setRoadtripData] = useState([]);

  async function doLogin(username, password) {
    console.log(username, password);
    console.log("potato");
    let myresponse = await Api.loginUser(username, password);

    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

  

  useEffect(() => {
    fetchRoadtrips();
  }, []);

  async function fetchRoadtrips() {
    let myresponse = await Api.getRoadtrips();
    if (myresponse.ok) {
      setRoadtripData(myresponse.data);
    } else {
      console.log("Response not okay.");
    }
  }

   //POST A NEW ROADTRIP (RoadtripForm.js)
   async function addRoadtrip(formData){
    let options= {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
    };
  
    try {
    let response = await fetch("/roadtrips", options);
    if (response.ok) {
      let data = await response.json();   
      setRoadtrips(data);
      navigate("/stops")
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
    } catch (err) {
    console.log(`Network error: ${err.message}`);
    }
  }


  return (
    <div className="App">
      <NavLink to="/" className="Logo">
        {" "}
        <p>Road Tripper</p>
      </NavLink>
      <Navbar user={user} logoutCb={doLogout} />

      <Routes>
        <Route path="/" element={<HomeView roadtripData={roadtripData} />} />
        <Route path="/profile/*" element={<ProfileView />} />

        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          }
        />
        <Route
          path="/members-only"
          element={<PrivateRoute>{/* <MembersOnlyView /> */}</PrivateRoute>}
        />
        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(u, p) => doLogin(u, p)}
              loginError={loginErrorMsg}
            />
          }
        />

        <Route path="*" element={<Error404View />} />
        <Route path="/roadtrip" element={<RoadtripView addRoadtripCb={formData => addRoadtrip(formData)} />} />
        <Route path="/stops" element={<StopsView roadtrips={roadtrips} />} />
        <Route path="/map" element={<TheMap />} />
        {/* <Route path="/PastFormView" element={<TheMap />} /> */}
        {/* <Route path="/NewRoadTripView" element={<NewRoadTripView />} />
        <Route path="/PastRoadTripView" element={<PastRoadTripView />} /> */}
      </Routes>
    </div>
  );
}

export default App;
