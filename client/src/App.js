import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Presentation/Pages/Login';
import  SignUp  from './Presentation/Pages/Signup';
import Session from './Presentation/Pages/Session';
import Sessions from './Presentation/Pages/Sessions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/sessions" element={<Session/>}/>
        <Route path="/session/:sessionId" element={<Sessions/>}/>

        <Route path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
