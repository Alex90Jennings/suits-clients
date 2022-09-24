import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client.js';

function SideSection () {
    const { lobbyCode, playerList, refreshTable, gameState, setGameState, roundId, setTrick, decideWhoPlaysNext } = useContext(globalContext)

    /*GAME STATES 
        8 cards dealt to each player
        Players bet
        Bets revealed
        GAME STARTS 
            First card played
            Next player plays card
            Repeat until all players have played
            Decide who wins the hand
            Repeat the hand, until there are 0 cards left
            Allocate scores based on bet vs actual hands won
        REDUCE THE NUMBER OF CARDS BY 1
            Repeat the game, until there are number of cards = 0
        */
        


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
                if (gameState==="decide who plays next") decideWhoPlaysNext()
            }} className="button-reset">
                <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            </button>
            <img className='palace' src='../assets/diagrams/india/palace.png' alt='palace'></img>
            <div></div>
        </section>
    )
}

export default SideSection;