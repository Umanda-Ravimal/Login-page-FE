import React from 'react';
import './App.css';
import useAuthStore from './store/authStore';
import { Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  const isUserValid = useAuthStore((state) => state.isUserValid);

  return <div>{isUserValid ? <HomePage /> : <Navigate to={"login"} />}</div>;
}

export default App;
