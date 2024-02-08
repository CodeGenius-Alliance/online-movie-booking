import "./App.css";
import {Routes,Route} from 'react-router-dom'
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import AuthProvider from "./components/AuthProvider";
import AddScreen from "./components/AddScreen";
import AddShows from "./components/AddShows";
import AddMovie from "./components/AddMovies";
function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/admins'> 
        <Route path='login' element={<LoginPage/>}/>
        </Route>
        <Route path='/shows'>
          <Route path='addShow' element={<AddShows/>}/>
        </Route>
        <Route path='/screens'>
          <Route path='addScreen' element={<AddScreen/>}/>
        </Route>
        <Route path='/movie'>
          <Route path='addMovie' element={<AddMovie/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
