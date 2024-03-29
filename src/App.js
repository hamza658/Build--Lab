import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {Route, Switch} from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Protectedroute from './ProtectedRoute';
import { useEffect, useState } from 'react';
import Build from './components/Build';
import ResetPassword from './components/ResetPassword';
import VerificationCode from './components/VerificationCode';
import VerificationMail from './components/VerificationMail';
import TermsAndConditions from './components/TermsAndConditions';


import EmailForm from './components/ForgotPassword';
import ReactSwitch from 'react-switch';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check If User is Logged In
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      if(res.status === 200){
        setauth(true)
        setauth1(false)
      }
      if(res.status === 401){
        setauth(false)
        setauth1(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div id={isDarkMode ? "dark" : "light"}>
      <ReactSwitch checked={isDarkMode} onChange={toggleDarkMode} />
      <Navbar auth={auth1}/>
      <Switch>
        <Route exact path="/ForgotPassword" component={EmailForm} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/service" component={Services} />
        <Route exact path="/contact" component={Contact} />
        <Protectedroute exact path="/VerificationCode" component={VerificationCode} auth={auth1}/>
        <Protectedroute exact path="/VerificationMail" component={VerificationMail} auth={auth1}/>
        <Protectedroute exact path="/TermsAndConditions" component={TermsAndConditions} auth={auth1}/>
        <Protectedroute exact path="/login" component={Login} auth={auth1}/>
        <Protectedroute exact path="/ResetPassword" component={ResetPassword} auth={auth1}/>
        <Protectedroute exact path="/register" component={Register} auth={auth1}/>
        <Protectedroute exact path="/dashboard" component={Dashboard} auth={auth}/>
        <Protectedroute exact path="/logout" component={Logout} auth={auth}/>
        <Protectedroute exact path="/build" component={Build} auth={auth}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;