import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


function Lobby() {
  const { lobbyCode, playerList, setGameState, isHost, refreshPlayerList } = useContext(globalContext)
  let navigate = useNavigate();

  console.log(playerList)

  const startGame = () => {
    setGameState("start game")
    client
    .patch(`/table/${lobbyCode}`, {isInGame: true})
    .then((res) => console.log(res.data.data))
    navigate(`../table/${lobbyCode}`, { replace: true });
  }

  return (
    <>
      <main className='three-rows-expand-two'>
          <div className='three-columns-expand-one-three'>
            <div></div>
            <h2>Welcome to Lobby {lobbyCode}</h2>
            <div></div>
          </div>
          <ul className='responsive-columns lobby-grid'>
            {playerList !== null && playerList.map((player) => {
              return (
                <li className="lobby-player-card two-rows-expand-two display-inline center" key={`${player.user.id}`}>
                  <h3>{player.user.username}</h3>
                  <div className='three-columns-expand-one-three'>
                    <div></div>
                    <img src={`../assets/diagrams/india/${playerList.indexOf(player)}.png`} className="animal-l" alt={`animal${playerList.indexOf(player)}`} />
                    <div></div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div>
            <div className='four-columns-expand-one-four m-top-l'>
              <div></div>
              <div className='display-inline three-rows-expand-one-three  m-top-l'>
                <div></div>
                <p>Click the Gate of India to refresh see if others have joined:</p>
                <div></div>
              </div>
              <button onClick={() => {refreshPlayerList()}} className="button-reset display-inline m-left-m m-top-l">
                <img src='../assets/diagrams/india/gate.png' alt="gate" className='button-image'></img>
              </button>
              <div></div>
            </div>
            {isHost && (
              <div className='four-columns-expand-one-four m-top-l'>
                <div></div>
                <div className='display-inline three-rows-expand-one-three'>
                  <div></div>
                  <p className='display-inline'>Click the bag of Rupees to start the game:</p>
                  <div></div>
                </div>
                <button onClick={() => startGame()} className="button-reset display-inline m-left-m">
                  <img src='../assets/diagrams/india/rupee.png' alt="rupee" className='button-image'></img>
                </button>
                <div></div>
              </div>
            )}
          </div>
      </main>
    </>
  );
}
    
export default Lobby;
