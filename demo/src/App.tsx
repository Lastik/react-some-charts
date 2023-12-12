import React from 'react';
import './App.scss';
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Marker, Bars} from "./pages";

function App() {

  return (
      <div className="App">
          <HashRouter>
              <Routes>
                  <Route
                      path='/'
                      element={<Navigate to="/marker" /> }/>
                  <Route
                      path='/marker'
                      element={<Marker/>}/>
                  <Route
                      path='/bars'
                      element={<Bars/>}/>
              </Routes>
          </HashRouter>
      </div>
  );
}

export default App;
