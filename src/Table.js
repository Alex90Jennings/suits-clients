// import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import BetButtons from './BetButtons.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost, setCards, loggedInUser, setCurrentPlayerState, numberOfCards, lobbyCode, setRoundId, setIsInGame, refreshPlayerList, playerStates } = useContext(globalContext)

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
    
    const prepareCardsToPatch = () => {
        const cardsToDeal = retrieveCardsToDeal()

        for (let i = 0; i < playerList.length; i++){
            const numberOfCardsEach = numberOfCards
            const cardsToPatchPlayer = cardsToDeal.splice(0, numberOfCardsEach)
            const cardsToPatchPlayerString = cardsToPatchPlayer.join("").toString()
        
            const playerStateId = playerStates[i].id

            patchCardsToPlayerStateId(playerStateId, cardsToPatchPlayerString)
        }
    };

    const patchCardsToPlayerStateId = (playerStateId, cards) => {
        client
        .patch(`/user/playerState/${playerStateId}`, {hand: cards})
    }

    const fetchCardsFromPlayerState = () => {
        const userId = loggedInUser.user.id
        client
        .get(`/user/${userId}/playerStates`)
        .then((res) => {
            const mostRecentPlayerState = res.data.data.foundPlayerStates.pop()
            const hand = mostRecentPlayerState.playerState.hand
            setCurrentPlayerState(mostRecentPlayerState.playerState)
            if(hand) {
                setCards(hand)
                setGameState("wait for bets")
            }
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

    const hostPlaysFirst = () => {
        const hostId = loggedInUser.user.id
        client
        .patch(`/user/playerState/${hostId}`, { playsNext: true})
        refreshPlayerList()
    }

    if (gameState === "start game") {
        setIsInGame(true)
        fetchMostRecentRoundId()
        if(isHost){
            setGameState("deal cards")
            prepareCardsToPatch()
            hostPlaysFirst()
            setGameState("retrieve cards")
        }
        if(!isHost) fetchCardsFromPlayerState()
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