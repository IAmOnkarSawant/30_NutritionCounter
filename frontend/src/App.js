import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuthContext } from "./hooks/useAuthContext";
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Navbar from './components/Navbar'
import Test from './pages/test'

function App() {
  const { user } = useAuthContext()
  
  console.log("IN APP");
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={ <Test/>} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
