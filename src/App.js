import React, { useState,useEffect } from 'react';

import AuthContext from './components/store/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
      setIsLoggedIn(true)
    }
  },[])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn',true)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => { 
    localStorage.setItem('isLoggedIn',false)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
          isLoggedIn: isLoggedIn,
          onLogout:logoutHandler
      }}> {/* changing the context with isLoggedIn state managed by parent*/}
      
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
