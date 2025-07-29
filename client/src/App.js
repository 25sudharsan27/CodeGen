import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Presentation/Pages/Login';
import  SignUp  from './Presentation/Pages/Signup';
import Session from './Presentation/Pages/Session';
import Sessions from './Presentation/Pages/Sessions';
import Error from './Presentation/Pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/sessions/:sessionId" element={<Session/>}/>
        <Route path="/sessions" element={<Session/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
