import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
import { globalContext } from './helper/globalContext';
// import Lobby from "./Lobby";
// import Table from "./Table";

function App() {
  const [lobbyCode, setLobbyCode] = useState("")
  const [loggedInUser, setLoggedInUser] = useState({id: null, username: "", cards: [], isHost: false, score: 0})

  //if I have a loggedInUser and I want to setLoggedInUser(id: 1), 

  return(
    <>
      <globalContext.Provider
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
      </globalContext.Provider>
    </>
    
  )
}

export default App;
