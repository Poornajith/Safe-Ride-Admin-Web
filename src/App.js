import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Users from "./Components/Actor/Users";
import Schools from "./Components/Schools/Schools";
import Children from "./Components/Actor/Children";
import Buses from "./Components/Buses";
import AddDriver from "./Components/AddDriver";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/'} element={<Login/>}></Route>
          <Route path={'/home'} element={<Home/>}></Route>
          <Route path={'/children'} element={<Children/>}></Route>
          <Route path={'/users'} element={<Users/>}></Route>
          <Route path={'/schools'} element={<Schools/>}></Route>
          <Route path={'/buses'} element={<Buses/>}></Route>
          <Route path={'/add-driver'} element={<AddDriver/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
