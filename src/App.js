import React from 'react';
import './App.css';
import useAuthFacade from './facades/authFacade';
import { Navigate} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';

function App() {

  const { isUserValid } = useAuthFacade();

  return <div>{isUserValid ? <HomePage /> : <Navigate to={"login"} />}</div>;
}

export default App;
