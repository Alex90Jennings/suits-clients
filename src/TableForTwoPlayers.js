import RenderCards from "./RenderCards.js";
import RenderTricksWonInRound from "./RenderTricksWonInRound.js";
import { useContext } from "react";
import { globalContext } from './helper/globalContext';


function TableForMoreThanTwoPlayers() {
  const { playerList, loggedInUser, playerStates } = useContext(globalContext)

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

  return (
    <>
      <div className="table-rectangle center">
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player2" className="card">
              <div>
                <p>{playerList[shiftIndex(1)].user.username.toUpperCase()} {playerStates[shiftIndex(1)].bet !== null && ` - ${playerStates[shiftIndex(1)].bet}`}</p>
              </div>
              <div className={`${playerStates[shiftIndex(1)].playsNext ? "up-next" : ""} animal center`}>
                <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(1)}.png`} alt="animal"></img>
              </div>
              <RenderTricksWonInRound handsWon={playerStates[shiftIndex(1)].handsWon}/>
              {playerStates[shiftIndex(1)].playedCard === null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center visibility-hidden" src={`../assets/cards/red_joker.png`} alt="card"></img></div>}
              {playerStates[shiftIndex(1)].playedCard !== null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center" src={`../assets/cards/${playerStates[shiftIndex(1)].playedCard[0]}${playerStates[shiftIndex(1)].playedCard[1]}.png`} alt="card"></img></div>}
            </li>
          </ul>
          <div></div>
        </div>
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player1" className="card">
              {playerStates[shiftIndex(0)].playedCard === null && <div className="border-playing-card playing-card center"><img className="playing-card center visibility-hidden" src={`../assets/cards/red_joker.png`} alt="card"></img></div>}
              {playerStates[shiftIndex(0)].playedCard !== null && <div className="border-playing-card playing-card center m-bottom-s"><img className="playing-card center" src={`../assets/cards/${playerStates[shiftIndex(0)].playedCard[0]}${playerStates[shiftIndex(0)].playedCard[1]}.png`} alt="card"></img></div>}
              <RenderTricksWonInRound handsWon={playerStates[shiftIndex(0)].handsWon}/>
              <div className={`${playerStates[shiftIndex(0)].playsNext ? "up-next" : ""} animal center`}>
                <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(0)}.png`} alt="tiger"></img>
              </div>
              <p>{playerList[shiftIndex(0)].user.username.toUpperCase()} {playerStates[shiftIndex(0)].bet !== null && ` - ${playerStates[shiftIndex(0)].bet}`}</p>
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