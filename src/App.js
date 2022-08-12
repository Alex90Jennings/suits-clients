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
  const [playerStates, setPlayerStates] = useState([])
  const [isInGame, setIsInGame] = useState(false)
  const [trumps, setTrumps] = useState("S")
  const [tricksWonInRound, setTricksWonInRound] = useState(0)
  const [cards, setCards] = useState("")
  const [cardPlayedThisRound, setCardPlayedThisRound] = useState("")
  const [isHost, setIsHost] = useState(false)
  const [currentPlayerState, setCurrentPlayerState] = useState({})
  const [numberOfCards, setNumberOfCards] = useState(8)
  const [bet, setBet] = useState(null)
  const [roundId, setRoundId] = useState(0)
  const [trick, setTrick] = useState("")

  let navigate = useNavigate();

  const refreshPlayerList = () => {
    const playerStates = []
    client
    .get(`/user/table/${lobbyCode}`)
    .then((res) => {
      setPlayerList(res.data.data.foundUsers)
      for (let i = 0; i < res.data.data.foundUsers.length; i++){
        const mostRecentPlayerState = res.data.data.foundUsers[i].user.playerStates.pop()
        playerStates.push(mostRecentPlayerState)
      }
      setPlayerStates(playerStates)
      localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
    })
  }


  const refreshTable = () => {
    if(gameState === "waiting lobby"){
      setGameState("start game")
      navigate(`../table/${lobbyCode}`, { replace: true })
    }
    refreshPlayerList()
  }

  
  const decideWhoPlaysNext = () => {
    if(hasFirstPlayerPlayed()){
      for (let i = 0; i < playerStates.length; i++) {
        const playerStateId = playerStates[i].id
        if(playerStates[i].playedCard === null) patchWhoPlaysNext(playerStateId)
      }
    }
    if(!hasFirstPlayerPlayed()&& !hasLastPlayerPlayed()) {
      for (let i = playerStates.length - 1; i >= 0; i--) {
        const playerStateId = playerStates[i+1].id
        if(playerStates[i].playerCard !== null) patchWhoPlaysNext(playerStateId)
      }
    }
    if(!hasFirstPlayerPlayed() && hasLastPlayerPlayed()) patchWhoPlaysNext(playerStates[0].id)
    if(trick.length === playerList.length * 2){
      console.log('decide who won the trick')
      whoWonTrick()
    }
  }

  const hasFirstPlayerPlayed = () => {
      if(playerStates[0].playedCard !== null) return true
      return false
  }

  const hasLastPlayerPlayed = () => {
      if(playerStates[(playerStates.length - 1)].playedCard !== null) return true
      return false
  }

  const patchWhoPlaysNext = (playerStateId) => {
    console.log("player to play next: ", playerStateId)
    client
    .patch(`/user/playerState/${playerStateId}`, { playsNext: true })
    setGameState("wait for card")
  }

  const whoWonTrick = () => {
    let winningSuit = trick[1]
    let cardsWithWinningSuit = ""
    
    if (checkTrickForTrumps()) winningSuit = trumps

    for (let i = 0; i < trick.length; i+=2){
        if (trick[i+1] === winningSuit) cardsWithWinningSuit += trick.substr(i, 2)
    }

    const winningCard = findWinningCard(cardsWithWinningSuit)
    const winningPlayerState = findWinningPlayer(winningCard)
    patchWinningPlayerState(winningPlayerState)
    setGameState("end of trick")
  }

  const checkTrickForTrumps = () => {
    for (let i = 0; i < trick.length; i+=2){    
        if (trick[i+1] === trumps) return true
    }
    return false
  }

  const findWinningCard = (cardsWithWinningSuit) => {
      if (cardsWithWinningSuit.includes("A")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("A"), 2)
      if (cardsWithWinningSuit.includes("K")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("K"), 2)
      if (cardsWithWinningSuit.includes("Q")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("Q"), 2)
      if (cardsWithWinningSuit.includes("J")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("J"), 2)
      if (cardsWithWinningSuit.includes("T")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("T"), 2)

      let numbersOfCardsArray = []
      for (let i = 0; i<cardsWithWinningSuit.length; i+=2) {
          numbersOfCardsArray.push(cardsWithWinningSuit[i])
      }

      const highestNumber = Math.max(numbersOfCardsArray)
      return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf(highestNumber.toString()), 2)
  }

  const findWinningPlayer = (winningCard) => {
    console.log(winningCard)
    for (let i = 0; i < playerStates.length; i++) {
      if(playerStates[i].playedCard === winningCard) return playerStates[i]
    }
  }

  const patchWinningPlayerState = (playerState) => {
    const playerStateId = playerState.id
    let handsWon = playerState.handsWon
    client
    .patch(`/user/playerState/${playerStateId}`, { handsWon: handsWon++, playsNext: true })
  }

  const selectTrumps = () => {
    if(trumps === "S") return "H"
    if(trumps === "H") return "D"
    if(trumps === "D") return "C"
    if(trumps === "C") return "S"
  }

  const resetTrick = () => {
    let numberOfCardsInRound = numberOfCards
    const newTrumps = selectTrumps()
    client
    .patch(`/table/round/${roundId}`, {numberCards: numberOfCardsInRound--, trumps: newTrumps, currentTrick: ""})
    .then((res) => {
      setTrumps(newTrumps)
      setTrick("")
      setNumberOfCards(numberOfCardsInRound--)
    })
  }

  const resetPlayerState = () => {
    const currentPlayerStateId = currentPlayerState.id
    client
    .patch(`/user/playerState/${currentPlayerStateId}`, {playedCard: null})
  }

  if(gameState === "end of trick") {
    if(cards.length === 0) setGameState("end of round")
    else {
      if(isHost) resetTrick()
      resetPlayerState(currentPlayerState)
    }
    setGameState("wait for card")
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
          currentPlayerState,
          setCurrentPlayerState,
          numberOfCards,
          setNumberOfCards,
          bet,
          setBet,
          roundId,
          setRoundId,
          trick,
          setTrick,
          refreshPlayerList,
          playerStates,
          decideWhoPlaysNext
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
