import RenderCards from "./RenderCards.js";
import RenderTricksWonInRound from "./RenderTricksWonInRound.js";
import { useContext } from "react";
import { globalContext } from './helper/globalContext';


function TableForMoreThanTwoPlayers() {
  const { playerList, loggedInUser } = useContext(globalContext)

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
              <p>{playerList[shiftIndex(1)].user.username.toUpperCase()}</p>
              <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(1)}.png`} alt="animal"></img>
              <RenderTricksWonInRound />
              <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
            </li>
          </ul>
          <div></div>
        </div>
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player1" className="card">
              <img className="playing-card center" src={`../assets/cards/red_joker.png`} alt="card"></img>
              <RenderTricksWonInRound />
              <img className="animal center" src={`../assets/diagrams/india/${shiftIndex(0)}.png`} alt="tiger"></img>
              <p>{playerList[shiftIndex(0)].user.username.toUpperCase()}</p>
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