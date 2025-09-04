import React from "react";
import { useRoutes, BrowserRouter, Routes, Route } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";
import "./App.css";


  function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ViewCreator/>}/>
        <Route path="/creators" element={<ViewCreator/>}/>
        <Route path="/creator/:id" element={<ShowCreators/>}/>
        <Route path="/add" element={<AddCreator/>}/>
        <Route path="/edit/:id" element={<EditCreator/>}/>
      </Routes>
    </div>
  );
}

export default App;