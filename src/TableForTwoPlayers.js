import RenderCards from "./RenderCards.js";
import RenderTricksWonInRound from "./RenderTricksWonInRound.js";
import { useContext } from "react";
import { globalContext } from './helper/globalContext';


function TableForMoreThanTwoPlayers() {
  const { gameState, playerList, loggedInUser, numberOfCards } = useContext(globalContext)

  console.log("player list ", playerList, "at game state: ", gameState)

  const findIndexOfLoggedInUser = () => {
    for (let i = 0; i < playerList.length; i++){
      if (playerList[i].user.id === loggedInUser.user.id) return i
    }
  }

  const shiftIndex = (oldIndex) => {
    const shift = findIndexOfLoggedInUser()
    let newIndex = oldIndex + shift

    if (newIndex > playerList.length - 1){
      newIndex = newIndex-playerList.length
    }
    return newIndex
  }
  
  const playerStateIndex = () => {
    return 8 - numberOfCards
  }

  return (
    <>
      <div className="table-rectangle center">
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player2" className="card">
              <div>
                <p>{playerList[shiftIndex(1)].user.username.toUpperCase()} {playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.bet !== null && ` - ${playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.bet}`}</p>
              </div>
              <div className={`${playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.playsNext ? "up-next" : ""} animal center`}>
                <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(1)}.png`} alt="animal"></img>
              </div>
              <RenderTricksWonInRound />
              {playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.playedCard === null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center visibility-hidden" src={`../assets/cards/red_joker.png`} alt="card"></img></div>}
              {playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.playedCard !== null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center" src={`../assets/cards/${playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.playedCard[0]}${playerList[shiftIndex(1)].user.playerStates[playerStateIndex()]?.playedCard[1]}.png`} alt="card"></img></div>}
            </li>
          </ul>
          <div></div>
        </div>
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player1" className="card">
              {playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.playedCard === null && <div className="border-playing-card playing-card center"><img className="playing-card center visibility-hidden" src={`../assets/cards/red_joker.png`} alt="card"></img></div>}
              {playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.playedCard !== null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center" src={`../assets/cards/${playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.playedCard[0]}${playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.playedCard[1]}.png`} alt="card"></img></div>}
              <RenderTricksWonInRound />
              <div className={`${playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.playsNext ? "up-next" : ""} animal center`}>
                <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(0)}.png`} alt="tiger"></img>
              </div>
              <p>{playerList[shiftIndex(0)].user.username.toUpperCase()} {playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.bet !== null && ` - ${playerList[shiftIndex(0)].user.playerStates[playerStateIndex()]?.bet}`}</p>
            </li>
          </ul>          
          <div></div>
        </div>
      </div>
      <div className="three-columns-expand-one-three m-bottom-xl">
        <div></div>
        <RenderCards />
        <div></div>
      </div>
    </>
  );
}

export default TableForMoreThanTwoPlayers;