import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client';

function RenderCards() {
    const { cards, setCards, currentPlayerState, setCurrentPlayerState, roundId, trick, setTrick, setGameState, isHost, loggedInUser, playerList, gameState, playerStates } = useContext(globalContext)

    const playACard = (cardStr) => {
      const playerStateId = currentPlayerState.id
      if (isValidCard(cardStr) === false) return false
      if (isNextToPlay(playerStateId) === false) return false
      const newHand = cards.replace(cardStr, '')
      client
      .patch(`/user/playerState/${playerStateId}`, {playedCard: cardStr, hand: newHand, playsNext: false})
      .then((res) => {
        setCurrentPlayerState(res.data.data.playerState)
        setCards(res.data.data.playerState.hand)
      })
      setGameState("decide who plays next")
      updateRound(cardStr)
      decideWhoPlaysNext()
    }

    const isValidCard = (card) => {
      if (trick === "" || trick === null) return true
      if (card[1] === trick[1]) return true
      for (let i = 1; i < cards.length; i+=2){
        if(cards[i] === trick[1]) return false
      }
      return true
    }

    const isNextToPlay = (playerStateId) => {
      client
      .get(`/playerState/${playerStateId}`)
      .then((res) => {return res.data.data.foundPlayerState.playerState.playsNext})
    }

    const updateRound = (cardPlayed) => {
      let newTrick
      if (trick === null) newTrick = cardPlayed
      if (trick !== null) newTrick = trick + cardPlayed
      client
      .patch(`/table/round/${roundId}`, { currentTrick: newTrick })
      .then((res) => {
        setTrick(res.data.data.round.currentTrick)
      })
    }

    const patchPlaysNext = (playerStateId) => {
      client
      .patch(`/user/playerState/${playerStateId}`, {playsNext: true})
    }

    const decideWhoPlaysNext = () => {
      for (let i = playerList.length - 1; i >= 0; i--) {
        const mostRecentPlayerState = playerStates[i]
        const playerStateId = mostRecentPlayerState.id
        client
        .get(`/playerState/${playerStateId}`)
        .then((res) => {
          if (res.data.data.foundPlayerState.playerState.playedCard !== null){
            if (i === playerList.length - 1) patchPlaysNext(playerStates[i].id)
            else patchPlaysNext(playerStates[i+1].id)
          }
        })
      }
      setGameState("wait for card")
    }

    
    const retrieveCards = () => {
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
    

    if (gameState ==="decide who plays next") {
      decideWhoPlaysNext()
    }

    return (
        <ul className="list-reset display-inline">
            {isHost && !cards && (
              <li className="display-inline" key={`${cards[0]}${cards[1]}`}>
                <button className="button-reset" onClick={() => {retrieveCards()}}><h2>CLICK TO SEE CARDS</h2></button>
              </li>
            )}
            {cards && cards.length > 1 && (
              <li className="display-inline" key={`${cards[0]}${cards[1]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[0]}${cards[1]}`)}}>
                    <img src={`../assets/cards/${cards[0]}${cards[1]}.png`} className="playing-cards" alt={`${cards[0]}${cards[1]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 3 && (
              <li className="display-inline" key={`${cards[2]}${cards[3]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[2]}${cards[3]}`)}}>
                    <img src={`../assets/cards/${cards[2]}${cards[3]}.png`} className="playing-cards" alt={`${cards[2]}${cards[3]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 5 && (
              <li className="display-inline" key={`${cards[4]}${cards[5]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[4]}${cards[5]}`)}}>
                    <img src={`../assets/cards/${cards[4]}${cards[5]}.png`} className="playing-cards" alt={`${cards[4]}${cards[5]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 7 && (
              <li className="display-inline" key={`${cards[6]}${cards[7]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[6]}${cards[7]}`)}}>
                    <img src={`../assets/cards/${cards[6]}${cards[7]}.png`} className="playing-cards" alt={`${cards[6]}${cards[7]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 9 && (
              <li className="display-inline" key={`${cards[8]}${cards[9]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[8]}${cards[9]}`)}}>
                    <img src={`../assets/cards/${cards[8]}${cards[9]}.png`} className="playing-cards" alt={`${cards[8]}${cards[9]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 11 && (
              <li className="display-inline" key={`${cards[10]}${cards[11]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[10]}${cards[11]}`)}}>
                    <img src={`../assets/cards/${cards[10]}${cards[11]}.png`} className="playing-cards" alt={`${cards[10]}${cards[11]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 13 && (
              <li className="display-inline" key={`${cards[12]}${cards[13]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[12]}${cards[13]}`)}}>
                    <img src={`../assets/cards/${cards[12]}${cards[13]}.png`} className="playing-cards" alt={`${cards[12]}${cards[13]}`} />
                </button>
              </li>
            )}
            {cards && cards.length > 15 && (
              <li className="display-inline" key={`${cards[14]}${cards[15]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[14]}${cards[15]}`)}}>
                    <img src={`../assets/cards/${cards[14]}${cards[15]}.png`} className="playing-cards" alt={`${cards[14]}${cards[15]}`} />
                </button>
              </li>
            )}
        </ul>
      );
    }
    
    export default RenderCards;