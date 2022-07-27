import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderPlayers() {
    const { lobbyCode, playerList, setPlayerList } = useContext(globalContext)

    console.log(playerList)

    const getAllPlayersFromLobbyId = () => {
      client
      .get(`/user/table/${lobbyCode}`)
      .then((res) => {
        console.log(res.data.data.foundUsers.length)
        setPlayerList(res.data.data.foundUsers)
        localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
      })
    }

    // if (playerList != JSON.parse(localStorage.getItem('current lobby players'))){
    //   getAllPlayersFromLobbyId()
    // }

    return (
        <>
            <main>
                <h2>Welcome to Lobby {lobbyCode}</h2>
                <ul className='grid-template-columns'>
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