import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import BetButtons from './BetButtons.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost, cards, setCards, loggedInUser, currentPlayerState, setCurrentPlayerState } = useContext(globalContext)
    console.log("game state: ", gameState)
    console.log(cards)

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

    const findPlayerStatesIdArray = (playerList) => {
        for (let j = 0; j < playerList.length; j++){
            const userId = playerList[j].user.id
            client
            .get(`/user/${userId}/playerStates`)
            .then((res) => {
                const mostRecentPlayerState = res.data.data.foundPlayerStates.pop()
                console.log(mostRecentPlayerState)
                console.log(mostRecentPlayerState.playerState.id)
                patchCardsToPlayers(mostRecentPlayerState.playerState.id)
            })
        }
    }

    const patchCardsToPlayers = (playerStateId) => {
        console.log("in deal cards to players")
        const cardsToDeal = retrieveCardsToDeal()
        console.log("cards to deal: ", cardsToDeal)

        const numberOfCardsEach = 8
        const cardsToPatchPlayer = cardsToDeal.splice(0, numberOfCardsEach)
        const cardsToPatchPlayerString = cardsToPatchPlayer.join("").toString()
        console.log("cards to patch: ", cardsToPatchPlayerString)

        console.log(playerStateId)
        
        client
        .patch(`/user/playerState/${playerStateId}`, {hand: cardsToPatchPlayerString})
        .then((res) => {
            console.log(`player state ${playerStateId} recieved ${res.data.data.playerState.hand}`)
        })
    };

    const fetchCardsFromPlayerStates = () => {
        const userId = loggedInUser.user.id
        client
        .get(`/user/${userId}/playerStates`)
        .then((res) => {
            setCurrentPlayerState(res.data.data.foundPlayerStates.pop())
            setCards(currentPlayerState.playerState.hand)
            setGameState("wait for bets")
        })
    }

    if (gameState === "start game") {
        setGameState("deal cards")
        if(isHost) findPlayerStatesIdArray(playerList)
    }

    if (gameState==="retrieve cards"){
        fetchCardsFromPlayerStates()
    }

    // const refreshTable = () => {
    //     client
    //     .get(`/table/${lobbyCode}`)
    //     .then((res) => {
    //       if(res.data.data.foundTable.table.isInGame) {
    //         setGameState("start game")
    //         navigate(`../table/${lobbyCode}`, { replace: true })
    //       }
    //     })
    // }
    
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