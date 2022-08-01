import RenderCards from "./RenderCards.js";
import { useContext } from "react";
import { globalContext } from './helper/globalContext';


function TableForMoreThanTwoPlayers() {
  const { playerList } = useContext(globalContext)


  return (
    <>
      <div className="table-rectangle center">
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            {playerList.length > 2 && (
            <li id="player3" className="card">
              <p>{playerList[2].user.username}</p>
              <img className="animal center" src="../assets/diagrams/india/2.png" alt="elephant"></img>
              <ul className="center-wrapper">
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
              </ul>
              <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
            </li>
            )}
            {playerList.length > 3 && (
              <li id="player4" className="card">
                <p>{playerList[3].user.username}</p>
                <img className="animal center" src="../assets/diagrams/diagrams/india/3.png" alt="cobra"></img>
                <ul className="center-wrapper">
                  <li className="display-inline m-left-s">
                      <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                  </li>
                  <li className="display-inline m-left-s">
                      <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                  </li>
                </ul>
                <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
              </li>
            )}
            {playerList.length > 4 && (
              <li id="player5" className="card">
              <p>{playerList[4].user.username}</p>
              <img className="animal center" src="../assets/diagrams/india/4.png" alt="cow"></img>
              <ul className="center-wrapper">
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
              </ul>
              <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
            </li>             
            )}
          </ul>
          <div></div>
        </div>
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player2" className="card">
              <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
              <ul className="center-wrapper">
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
              </ul>
              <img className="animal center" src="../assets/diagrams/india/1.png" alt="monkey"></img>
              <p>{playerList[1].user.username}</p>
            </li>
            <li id="player1" className="card">
              <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
              <ul className="center-wrapper">
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
              </ul>
              <img className="animal center" src="../assets/diagrams/india/0.png" alt="tiger"></img>
              <p>{playerList[0].user.username}</p>
            </li>
            {playerList.length > 5 && (
              <li id="player6" className="card">
                <img className="playing-card center" src="../assets/cards/red_joker.png" alt="card"></img>
                <ul className="center-wrapper">
                  <li className="display-inline m-left-s">
                      <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                  </li>
                  <li className="display-inline m-left-s">
                      <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                  </li>
                </ul>
                <img className="animal center" src="../assets/diagrams/india/5.png" alt="crocodile"></img>
                <p>{playerList[6].user.username}</p>
              </li>             
            )}
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