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
              <p>{playerList[2].username}</p>
              <img className="animal center" src="../assets/diagrams/india/2.png" alt="elephant"></img>
              <ul className="responsive-columns">
                  <li>
                      <img className="trick" src="./india/card-back.png" alt="card-back"></img>
                  </li>
                  <li>
                      <img className="trick" src="./india/card-back.png" alt="card-back"></img>
                  </li>
              </ul>
              <img className="playing-card center" src="./india/red_joker.png" alt="card"></img>
            </li>
            )}
            {playerList.length > 3 && (
              <li id="player4" class="card">
                <p>{playerList[3].username}</p>
                <img class="animal center" src="../assets/diagrams/india/3.png" alt="cobra"></img>
                <div class="three-rows-expand-one-three">
                    <div></div>
                    <ul class="responsive-columns">
                        <li>
                            <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                        </li>
                        <li>
                            <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                        </li>
                    </ul>
                    <div></div>
                </div>
                <img class="playing-card center" src="./india/red_joker.png" alt="card"></img>
              </li>
            )}
            {playerList.length > 4 && (
              <li id="player5" class="card">
              <p>{playerList[4].username}</p>
              <img class="animal center" src="../assets/diagrams/india/4.png" alt="monkey"></img>
              <div class="three-rows-expand-one-three">
                  <div></div>
                  <ul class="responsive-columns">
                      <li>
                          <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                      </li>
                      <li>
                          <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                      </li>
                  </ul>
                  <div></div>
              </div>
              <img class="playing-card center" src="./india/red_joker.png" alt="card"></img>
            </li>             
            )}
          </ul>
        </div>
        <div className="three-rows-expand-one-three m-left-l">
          <div></div>
          <ul className="center">
            <li id="player2" className="card">
              <p>{playerList[1].username}</p>
              <img className="animal center" src="../assets/diagrams/india/1.png" alt="cow"></img>
              <ul className="responsive-columns">
                  <li>
                      <img className="trick" src="./india/card-back.png" alt="card-back"></img>
                  </li>
                  <li>
                      <img className="trick" src="./india/card-back.png" alt="card-back"></img>
                  </li>
              </ul>
              <img className="playing-card center" src="./india/red_joker.png" alt="card"></img>
            </li>
            <li id="player1" class="card">
              <p>{playerList[0].username}</p>
              <img class="animal center" src="../assets/diagrams/india/0.png" alt="tiger"></img>
              <div class="three-rows-expand-one-three">
                  <div></div>
                  <ul class="responsive-columns">
                      <li>
                          <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                      </li>
                      <li>
                          <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                      </li>
                  </ul>
                  <div></div>
              </div>
              <img class="playing-card center" src="./india/red_joker.png" alt="card"></img>
            </li>
            {playerList.length > 5 && (
              <li id="player6" class="card">
                <p>{playerList[6].username}</p>
                <img class="animal center" src="../assets/diagrams/india/5.png" alt="crocodile"></img>
                <div class="three-rows-expand-one-three">
                    <div></div>
                    <ul class="responsive-columns">
                        <li>
                            <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                        </li>
                        <li>
                            <img class="trick" src="./india/card-back.png" alt="card-back"></img>
                        </li>
                    </ul>
                    <div></div>
                </div>
                <img class="playing-card center" src="./india/red_joker.png" alt="card"></img>
              </li>             
            )}
          </ul>
        </div>
      </div>
      <RenderCards />
    </>
  );
}

export default TableForMoreThanTwoPlayers;