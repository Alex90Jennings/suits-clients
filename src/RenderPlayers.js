// import client from './utils/client.js';
import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderPlayers() {
    const { lobbyCode, playerList, setPlayerList } = useContext(globalContext)

    console.log(playerList)

    if ( playerList !== getAllPlayersFromLobbyId()){
      getAllPlayersFromLobbyId()
    }

    const getAllPlayersFromLobbyId = () => {
      //fetch all players for a spefic lobby using params
      //setPlayerList
      return
    }
    return (
        <>
            <main>
                <h2>Welcome to Lobby {lobbyCode}</h2>
                <ul className='grid-template-columns'>
                  {playerList.map((player) => {
                    return (
                      <li className="player-card" key={`${player.id}`}>
                        Player 1
                      </li>
                    );
                  })}
                </ul>
            </main>
        </>
      );
    }
    
    export default RenderPlayers;