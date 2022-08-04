import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import BetButtons from './BetButtons.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost, setCards, loggedInUser, setCurrentPlayerState, numberOfCards } = useContext(globalContext)

    const retrieveCardsToDeal = () => {
        const cardDeck = ["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"]
        const cardsToDeal = []
        const numberOfCards = 16

        for (let i = 0; i < numberOfCards; i++){
            const randomIndex = Math.floor(Math.random() * (cardDeck.length));
            const cardToDeal = cardDeck[randomIndex];
            cardDeck.splice(randomIndex, 1);
            cardsToDeal.push(cardToDeal)
        }

        return cardsToDeal
    }

    const findPlayerStatesId = (playerList) => {
        for (let j = 0; j < playerList.length; j++){
            const userId = playerList[j].user.id
            client
            .get(`/user/${userId}/playerStates`)
            .then((res) => {
                const mostRecentPlayerState = res.data.data.foundPlayerStates.pop()
                patchCardsToPlayers(mostRecentPlayerState.playerState.id)
            })
        }
    }

    const patchCardsToPlayers = (playerStateId) => {
        const cardsToDeal = retrieveCardsToDeal()

        const numberOfCardsEach = numberOfCards
        const cardsToPatchPlayer = cardsToDeal.splice(0, numberOfCardsEach)
        const cardsToPatchPlayerString = cardsToPatchPlayer.join("").toString()
        
        client
        .patch(`/user/playerState/${playerStateId}`, {hand: cardsToPatchPlayerString})
        .then((res) => {
            setGameState("retrieve cards")
        })
    };

    const fetchCardsFromPlayerState = () => {
        const userId = loggedInUser.user.id
        client
        .get(`/user/${userId}/playerStates`)
        .then((res) => {
            const mostRecentPlayerState = res.data.data.foundPlayerStates.pop()
            setCurrentPlayerState(mostRecentPlayerState)
            setCards(mostRecentPlayerState.playerState.hand)
            setGameState("wait for bets")
        })
    }

    if (gameState === "start game") {
        if(isHost){
            findPlayerStatesId(playerList)
            setGameState("deal cards")
        }
        if(!isHost) {
            fetchCardsFromPlayerState()
        }
    }

    if (gameState==="retrieve cards"){
        fetchCardsFromPlayerState()
    }
    
    return (
        <div className='four-rows-expand-three full-height'>
            <div className='header-height'></div>
            <div className='three-columns-expand-two'>
                <div></div>
                {gameState === "wait for bets" && (<BetButtons />)}
                <div></div>
            </div>
            {playerList.length === 2 && (<TableForTwoPlayers />)}
            {playerList.length > 2 && (<TableForMoreThanTwoPlayers />)}
        </div>
    )
}

export default Table;