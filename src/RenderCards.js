import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client';

function RenderCards() {
    const { cards, setCards, currentPlayerState, setCurrentPlayerState, roundId, trick, setTrick } = useContext(globalContext)


    const playACard = (cardStr) => {
      if (isValidCard(cardStr) === false) return false
      const playerStateId = currentPlayerState.id
      const newHand = cards.replace(cardStr, '')
      client
      .patch(`/user/playerState/${playerStateId}`, {playedCard: cardStr, hand: newHand})
      .then((res) => {
        setCurrentPlayerState(res.data.data.playerState)
        setCards(res.data.data.playerState.hand)
      })
      updateRound(cardStr)
    }

    const isValidCard = (card) => {
      if (trick === "") return true
      if (card[1] === trick[1]) return true
      for (let i = 1; i < cards.length; i+=2){
        if(cards[i] === trick[1]) return false
      }
      return true
    }

    const updateRound = (cardPlayed) => {
      const newTrick = trick + cardPlayed
      client
      .patch(`/table/round/${roundId}`, { currentTrick: newTrick })
      .then((res) => {
        setTrick(res.data.data.round.currentTrick)
      })
    }

    return (
        <ul className="list-reset display-inline">
            {cards.length > 1 && (
              <li className="display-inline" key={`${cards[0]}${cards[1]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[0]}${cards[1]}`)}}>
                    <img src={`../assets/cards/${cards[0]}${cards[1]}.png`} className="playing-cards" alt={`${cards[0]}${cards[1]}`} />
                </button>
              </li>
            )}
            {cards.length > 3 && (
              <li className="display-inline" key={`${cards[2]}${cards[3]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[2]}${cards[3]}`)}}>
                    <img src={`../assets/cards/${cards[2]}${cards[3]}.png`} className="playing-cards" alt={`${cards[2]}${cards[3]}`} />
                </button>
              </li>
            )}
            {cards.length > 5 && (
              <li className="display-inline" key={`${cards[4]}${cards[5]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[4]}${cards[5]}`)}}>
                    <img src={`../assets/cards/${cards[4]}${cards[5]}.png`} className="playing-cards" alt={`${cards[4]}${cards[5]}`} />
                </button>
              </li>
            )}
            {cards.length > 7 && (
              <li className="display-inline" key={`${cards[6]}${cards[7]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[6]}${cards[7]}`)}}>
                    <img src={`../assets/cards/${cards[6]}${cards[7]}.png`} className="playing-cards" alt={`${cards[6]}${cards[7]}`} />
                </button>
              </li>
            )}
            {cards.length > 9 && (
              <li className="display-inline" key={`${cards[8]}${cards[9]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[8]}${cards[9]}`)}}>
                    <img src={`../assets/cards/${cards[8]}${cards[9]}.png`} className="playing-cards" alt={`${cards[8]}${cards[9]}`} />
                </button>
              </li>
            )}
            {cards.length > 11 && (
              <li className="display-inline" key={`${cards[10]}${cards[11]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[10]}${cards[11]}`)}}>
                    <img src={`../assets/cards/${cards[10]}${cards[11]}.png`} className="playing-cards" alt={`${cards[10]}${cards[11]}`} />
                </button>
              </li>
            )}
            {cards.length > 13 && (
              <li className="display-inline" key={`${cards[12]}${cards[13]}`}>
                <button className="button-reset" onClick={() => {playACard(`${cards[12]}${cards[13]}`)}}>
                    <img src={`../assets/cards/${cards[12]}${cards[13]}.png`} className="playing-cards" alt={`${cards[12]}${cards[13]}`} />
                </button>
              </li>
            )}
            {cards.length > 15 && (
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