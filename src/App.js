import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Practice from './components/practice';
import { useEffect } from 'react';
import {getUserAuth} from "./firebase";
import {connect} from "react-redux";
import Chat from './components/Chat.js';

function App(props) {

  useEffect(()=>{
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path ='/home' element={<><Header/><Home/></>} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/practice' element={<Practice/>}/>
      </Routes>
    </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth : () => dispatch(getUserAuth()),
});
// export default App;

export default connect(mapStateToProps,mapDispatchToProps)(App);
