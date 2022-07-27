import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
import { loggedInUserContext } from './Helper/loggedInUserContext';
// import Lobby from "./Lobby";
// import Table from "./Table";

function App() {
  const [lobbyCode, setLobbyCode] = useState("")
  const [loggedInUser, setLoggedInUser] = useState({id: null, username: "", cards: [], isHost: false, score: 0})

  //if I have a loggedInUser and I want to setLoggedInUser(id: 1), 

  return(
    <>
      <loggedInUserContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser
        }}
      >
      <main className='center-wrapper'>
        <Routes>
          <Route path="/" element={<SignIn loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} lobbyCode={lobbyCode} setLobbyCode={setLobbyCode} />} />
          {/* <Route path="/lobby" element={<Lobby />}/>
          <Route path="/table" element={<Table />}/> */}
        </Routes>
      </main>
      </loggedInUserContext.Provider>
    </>
    
  )
}

export default App;
