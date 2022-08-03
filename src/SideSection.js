import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client.js';
import { useNavigate } from "react-router-dom";

function SideSection () {
    const { lobbyCode, setPlayerList, setHost, gameState, setGameState } = useContext(globalContext)
    let navigate = useNavigate();


    const getAllPlayersFromLobbyId = () => {
        client
        .get(`/user/table/${lobbyCode}`)
        .then((res) => {
          setPlayerList(res.data.data.foundUsers)
          localStorage.setItem('current lobby players', JSON.stringify(res.data.data.foundUsers))
          setHost(res.data.data.foundUsers[0])
        })
      }

        const refreshTable = () => {
        client
        .get(`/table/${lobbyCode}`)
        .then((res) => {
        if(res.data.data.foundTable.table.isInGame) {
            if(gameState === "waiting lobby") setGameState("start game")
            navigate(`../table/${lobbyCode}`, { replace: true })
        }
        })
    }

    return (
        <section className='five-rows-expand-one-five side-section'>
            <div></div>
            <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            <button onClick={() => {
                getAllPlayersFromLobbyId()
                refreshTable()
            }} className="button-reset">
                <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            </button>
            <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            <div></div>
        </section>
    )
}

export default SideSection;