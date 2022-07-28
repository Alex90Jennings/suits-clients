import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
import { globalContext } from './helper/globalContext';
import Lobby from "./Lobby";
import Table from "./Table";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));
  const [gameState, setGameState] = useState("sign in")
  const [lobbyCode, setLobbyCode]= useState(JSON.parse(localStorage.getItem('lobby code')))
  const [playerList, setPlayerList] = useState([])

  console.log(gameState)
  console.log(loggedInUser)

  return(
    <>
      <globalContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
          gameState,
          setGameState,
          lobbyCode,
          setLobbyCode,
          playerList,
          setPlayerList
        }}
      >
      <main className='center-wrapper'>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/lobby/:id" element={<Lobby />}/>
          <Route path="/table/:id" element={<Table />}/>
        </Routes>
      </main>
      </globalContext.Provider>
    </>
    
  )
}

export default App;
