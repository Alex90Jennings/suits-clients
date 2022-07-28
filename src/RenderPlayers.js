import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext, useState } from "react";

function RenderPlayers() {
    const { lobbyCode, playerList, setPlayerList, gameState, setGameState, loggedInUser } = useContext(globalContext)
    const [host, setHost] = useState(null)

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getAllPlayersFromLobbyId = () => {
      setGameState("waiting lobby")
      client
      .get(`/user/table/${lobbyCode}`)
      .then((res) => {
        console.log(res.data.data.foundUsers.length)
        setPlayerList(res.data.data.foundUsers)
        localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
        setHost(res.data.data.foundUsers[0])
      })
    }

    if (gameState === "waiting lobby"){
      delay(1000).then(() => {
        getAllPlayersFromLobbyId()
        setGameState("wait for lobby refresh") 
      });
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
                {host !== null && host === loggedInUser && <button>START GAME</button>}
            </main>
        </>
      );
    }
    
    export default RenderPlayers;