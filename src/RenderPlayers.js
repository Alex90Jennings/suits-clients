import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderPlayers() {
    const { lobbyCode, playerList, setPlayerList, gameState, setGameState } = useContext(globalContext)

    console.log(playerList) 

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
        console.log("first")
      })
    }

    if (gameState === "waiting lobby"){
      if(playerList === []) {
        console.log("player list empty")
        getAllPlayersFromLobbyId()
      }
      delay(10000).then(() => {
        console.log("second")
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
                <button onClick={() => {getAllPlayersFromLobbyId()}}>REFRESH LOBBY</button>
            </main>
        </>
      );
    }
    
    export default RenderPlayers;