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
import client from './utils/client.js';
import { useNavigate } from "react-router-dom";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));
  const [gameState, setGameState] = useState("sign in")
  const [lobbyCode, setLobbyCode]= useState(JSON.parse(localStorage.getItem('lobby code')))
  const [playerList, setPlayerList] = useState([])
  const [isInGame, setIsInGame] = useState(false)
  const [trumps, setTrumps] = useState("S")
  const [tricksWonInRound, setTricksWonInRound] = useState(0)
  const [cards, setCards] = useState("")
  const [cardPlayedThisRound, setCardPlayedThisRound] = useState("")
  const [isHost, setIsHost] = useState(false)
  const [host, setHost] = useState(null)
  const [currentPlayerState, setCurrentPlayerState] = useState({})
  const [numberOfCards, setNumberOfCards] = useState(8)
  const [bet, setBet] = useState(null)
  const [roundId, setRoundId] = useState(0)

  let navigate = useNavigate();

  const refreshTable = () => {
    client
    .get(`/table/${lobbyCode}`)
    .then((res) => {
      if(res.data.data.foundTable.table.isInGame) {
        setGameState("start game")
        navigate(`../table/${lobbyCode}`, { replace: true })
      }
    })
    getAllPlayersFromLobbyId()
  }

  const getAllPlayersFromLobbyId = () => {
    client
    .get(`/user/table/${lobbyCode}`)
    .then((res) => {
      setPlayerList(res.data.data.foundUsers)
      localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
      setHost(res.data.data.foundUsers[0])
    })
  }


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
          setPlayerList,
          isInGame,
          setIsInGame,
          trumps,
          setTrumps,
          tricksWonInRound,
          setTricksWonInRound,
          cards,
          setCards,
          cardPlayedThisRound,
          setCardPlayedThisRound,
          isHost,
          setIsHost,
          refreshTable,
          getAllPlayersFromLobbyId,
          host,
          setHost,
          currentPlayerState,
          setCurrentPlayerState,
          numberOfCards,
          setNumberOfCards,
          bet,
          setBet,
          roundId,
          setRoundId
        }}
      >
      <Header />
      <div className='three-columns-expand-two'>
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
      <Footer />
      </globalContext.Provider>
    </>
  )
}

export default App;
