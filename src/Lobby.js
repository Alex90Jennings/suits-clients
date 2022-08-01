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
      <main>
          <h2>Welcome to Lobby {lobbyCode}</h2>
          <ul className='responsive-columns'>
            {playerList !== null && playerList.map((player) => {
              return (
                <li className="player-card" key={`${player.user.id}`}>
                  <p>{player.user.username}</p>
                </li>
              );
            })}
          </ul>
          <button onClick={() => {getAllPlayersFromLobbyId()}}>SEE OTHER PLAYERS IN LOBBY</button>
          {host !== null && host.user.id === loggedInUser.user.id && <button onClick={() => startGame()}>START GAME</button>}
      </main>
    </>
  );
}
    
export default Lobby;
