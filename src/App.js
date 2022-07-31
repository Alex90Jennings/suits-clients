import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from "./SignIn";
import { globalContext } from './helper/globalContext';
import Footer from "./Footer.js";
import Lobby from "./Lobby.js";
import Table from "./Table.js";
import Header from './Header.js';
import SideSection from './SideSection';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));
  const [gameState, setGameState] = useState("sign in")
  const [lobbyCode, setLobbyCode]= useState(JSON.parse(localStorage.getItem('lobby code')))
  const [playerList, setPlayerList] = useState([])

  console.log(gameState)
  console.log(loggedInUser)

  return(
    <body>
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
      <Header />
      <div className='three-columns-expand-one-three'>
        <SideSection />
        <main className='center'>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/lobby/:id" element={<Lobby />}/>
            <Route path="/table/:id" element={<Table />}/>
          </Routes>
        </main>
        <SideSection />
      </div>
      <footer><Footer /></footer>
      </globalContext.Provider>
    </body>
    
  )
}

export default App;
