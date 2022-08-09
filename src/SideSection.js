import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client.js';

function SideSection () {
    const { lobbyCode, playerList, refreshTable, gameState, setGameState, roundId, setTrick } = useContext(globalContext)

    const checkIfEveryoneHasBet = () => {
        let playersWhoHaveBet = 0
        client
        .get(`/user/table/${lobbyCode}`)
        .then((res) => {
            for(let i = 0; i<playerList.length; i++) {
                const mostRecentPlayerState = res.data.data.foundUsers[i].user.playerStates.pop()
                if(mostRecentPlayerState.bet !== null) playersWhoHaveBet++
                if(playersWhoHaveBet === playerList.length) setGameState("decide who plays next")
            }
        })
    }

    const refreshRound = () => {
        client
        .get(`/table/round/${roundId}`)
        .then((res) => {setTrick(res.data.data.foundRound.round.currentTrick)})
    }

    return (
        <section className='five-rows-expand-one-five side-section'>
            <div></div>
            <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            <button onClick={() => {
                refreshTable()
                if (roundId !== 0) refreshRound()
                if (gameState==="wait for bets") checkIfEveryoneHasBet()
                if (gameState==="wait for card") setGameState("decide who plays next")
            }} className="button-reset">
                <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            </button>
            <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            <div></div>
        </section>
    )
}

export default SideSection;