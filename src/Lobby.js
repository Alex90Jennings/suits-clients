import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


function Lobby() {
  const { lobbyCode, playerList, setPlayerList, gameState, setGameState, loggedInUser } = useContext(globalContext)
  const [host, setHost] = useState(null)
  let navigate = useNavigate();

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getAllPlayersFromLobbyId = () => {
    setGameState("waiting lobby")
    client
    .get(`/user/table/${lobbyCode}`)
    .then((res) => {
      setPlayerList(res.data.data.foundUsers)
      localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
      setHost(res.data.data.foundUsers[0])
    })
  }

  if (gameState === "waiting lobby"){
    delay(3000).then(() => {
      getAllPlayersFromLobbyId()
      setGameState("wait for lobby refresh") 
    });
  }

  const startGame = () => {
    //ask host to confirm the players
    //patch request table isInGame = true
    //lock the table
    setGameState("start game")
    navigate(`../table/${lobbyCode}`, { replace: true });
    //start game
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
              <button onClick={() => {getAllPlayersFromLobbyId()}} className="button-reset display-inline m-left-m m-top-l">
                <img src='../assets/diagrams/india/gate.png' alt="rupee" className='button-image'></img>
              </button>
              <div></div>
            </div>
            {host !== null && host.user.id === loggedInUser.user.id && (
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
