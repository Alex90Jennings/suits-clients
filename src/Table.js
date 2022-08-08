// import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import BetButtons from './BetButtons.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost, setCards, loggedInUser, setCurrentPlayerState, numberOfCards, lobbyCode, setRoundId, setIsInGame } = useContext(globalContext)

    const newCardDeck = () => {
        const suits = ["C", "D", "H", "S"];
        const cards = [];
        for (let i = 0; i < suits.length; i++) {
          for (let j = 2; j < 15; j++) {
            let number = j
            if (number === 10) number = "T"
            if (number === 11) number = "J"
            if (number === 12) number = "Q"
            if (number === 13) number = "K"
            if (number === 14) number = "A"
            const card = `${number}${suits[i]}`;
            cards.push(card);
          }
        }
        return cards
    }

    const retrieveCardsToDeal = () => {
        const cardDeck = newCardDeck()
        const cardsToDeal = []
        const numberOfCardsTotalToDeal = numberOfCards * playerList.length

        for (let i = 0; i < numberOfCardsTotalToDeal; i++){
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
            setCurrentPlayerState(mostRecentPlayerState.playerState)
            setCards(mostRecentPlayerState.playerState.hand)
            setGameState("wait for bets")
        })
    }

    const fetchMostRecentRoundId = () => {
        client
        .get(`/table/${lobbyCode}`)
        .then((res) => {
            const mostRecentRoundId = res.data.data.foundTable.table.rounds.pop()
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
        client
        .get(`/table/${lobbyCode}`)
        .then((res) => {
            const mostRecentPlayerState = res.data.data.foundTable.table.users[userIndex].playerStates.pop()
            setCurrentPlayerState(mostRecentPlayerState)
        })
    }

    const dealCardsToAllPlayers = (playerList) => {
        findAllPlayersPlayerStateId(playerList)
    }

    if (gameState === "start game") {
        setIsInGame(true)
        fetchMostRecentRoundId()
        fetchMostRecentPlayerStateId()
        if(isHost){
            dealCardsToAllPlayers(playerList)
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

    console.log(playerList)

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