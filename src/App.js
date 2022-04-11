import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/home";
import Edit from "./components/Edit/edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List/List";
import Add from "./components/Add/Add";
import { Navigate } from "react-router-dom";

function App() {
  var ls = JSON.parse(localStorage.getItem("arr"));
  return (
    // <div className="App">
    //   <Home/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/Edit/:id" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
