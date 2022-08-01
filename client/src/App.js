//BrowserRouter
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Components
import Home from "./components/Home/Home";
import AddEdit from "./components/AddEdit/AddEdit";
import View from "./components/View/View";
//ToastContainer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addContact" element={<AddEdit />} />
          <Route exact path="/update/:id" element={<AddEdit />} />
          <Route exact path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
