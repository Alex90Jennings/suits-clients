// import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import BetButtons from './BetButtons.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost, setCards, loggedInUser, setCurrentPlayerState, numberOfCards, lobbyCode, setRoundId } = useContext(globalContext)

    // const newCardDeck = () => {
    //     const suits = ["C", "D", "H", "S"];
    //     const cards = [];
    //     for (let i = 0; i < suits.length; i++) {
    //       for (let j = 2; j < 15; j++) {
    //         let number = j
    //         if (number === 10) number = "T"
    //         if (number === 11) number = "J"
    //         if (number === 12) number = "Q"
    //         if (number === 13) number = "K"
    //         if (number === 14) number = "A"
    //         const card = `${number}${suits[i]}`;
    //         cards.push(card);
    //       }
    //     }
    //     return cards
    // }

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

    const findAllPlayersPlayerStateId = (playerList) => {
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
        .then(() => {setGameState("retrieve cards")})
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

    const fetchMostRecentRoundId = () => {
        client
        .get(`/table/${lobbyCode}`)
        .then((res) => {
            const mostRecentRoundId = res.data.data.foundTable.table.rounds.pop()
            console.log(mostRecentRoundId.id)
            setRoundId(mostRecentRoundId.id)
        })
    }

    const findIndexOfPlayerInPlayerList = () => {
        for (let i = 0; i < playerList.length; i++){
            if(playerList[i].user.id === loggedInUser.user.id) return i
        }
    }
    const fetchMostRecentPlayerStateId = () => {
        const userIndex = findIndexOfPlayerInPlayerList()
        console.log(userIndex)
        client
        .get(`/table/${lobbyCode}`)
        .then((res) => {
            const mostRecentPlayerStateId = res.data.data.foundTable.table.users[userIndex].playerStates.pop()
            console.log(mostRecentPlayerStateId.id)
            setCurrentPlayerState(mostRecentPlayerStateId)
        })
    }



    if (gameState === "start game") {
        fetchMostRecentRoundId()
        fetchMostRecentPlayerStateId()
        if(isHost){
            findAllPlayersPlayerStateId(playerList)
            setGameState("deal cards")
        }
        if(!isHost) {
            fetchCardsFromPlayerState()
            setGameState("wait for bets")
        }
    }

    if (gameState==="retrieve cards"){
        fetchCardsFromPlayerState()
    }

    if (gameState ==="decide who plays next") {
        
    }
    
    return (
        <div className='full-height'>
            <div className='header-height'></div>
            {gameState !== "wait for bets" && <button className="bet-button visibility-hidden">0</button>}
            {gameState === "wait for bets" && (<BetButtons />)}
            {playerList.length === 2 && (<TableForTwoPlayers />)}
            {/* {playerList.length > 2 && (<TableForMoreThanTwoPlayers />)} */}
        </div>
    )
}

export default Table;