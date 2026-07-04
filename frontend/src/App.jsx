import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Homescreen from './pages/Homescreen';
import GamesPage from './pages/GamesPage';
import Header from './components/Header';
import GamePopup from './pages/GamePopup';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './pages/SignInUp';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserPreferences } from './actions/TagsPlacement'
import SuccessPage from './pages/SuccessPage';
import UpdateUser from './components/UpdateUser';

function App() {
  const dispatch = useDispatch()
  const TagUpdateAfterPreferences = async() =>{
    let tags = localStorage.getItem("tags")

    tags = tags ? JSON.parse(tags) : null

    if(tags == null)
      return;

    let maxi = -1,nr = -1
    for(let key of Object.keys(tags))
    {
        if(tags[key] > maxi)
          {
            maxi = tags[key]
            nr = key
          }
    }

    if(!nr)
      return;

    localStorage.removeItem("tags")

    const data = {
      nr: maxi
    };

    dispatch(updateUserPreferences(data))
  }

  useEffect(() =>{

    const intervalTime = setInterval(TagUpdateAfterPreferences,6 * 60 * 1000)
    return ()=> clearInterval(intervalTime)
  },[])

  return (
    <AuthContextProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path='/listGame/' Component={GamesPage} />
          <Route path='/:type?' Component={Homescreen}/>
          <Route path='/gamePage/:id' Component={GamePopup} />
          <Route path='/signin'  Component={SignIn}/>
          <Route path="/success" Component={SuccessPage} />
          <Route path="/updateUser" Component={UpdateUser} />
        </Routes>
      </Router>
    </AuthContextProvider>
);

}

export default App;
