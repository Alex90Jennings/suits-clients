import { globalContext } from './helper/globalContext';
import { useContext } from "react";
import client from './utils/client';

function RenderCards() {
    const { cards, setCards, currentPlayerState, setCurrentPlayerState } = useContext(globalContext)
    
    const playedCard = (cardStr, index) => {
      const playerStateId = currentPlayerState.id
      client
      .patch(`/user/playerState/${playerStateId}`, {playedCard: cardStr, hand: cards})
      .then((res) => {
        setCurrentPlayerState(res.data.data.playerState)
        setCards(res.data.data.playerState.hand)
      })
    }

    return (
        <ul className="list-reset display-inline">
            {cards.length > 1 && (
              <li className="display-inline" key={`${cards[0]}${cards[1]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[0]}${cards[1]}`, 0)}}>
                    <img src={`../assets/cards/${cards[0]}${cards[1]}.png`} className="playing-cards" alt={`${cards[0]}${cards[1]}`} />
                </button>
              </li>
            )}
            {cards.length > 3 && (
              <li className="display-inline" key={`${cards[2]}${cards[3]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[2]}${cards[3]}`, 2)}}>
                    <img src={`../assets/cards/${cards[2]}${cards[3]}.png`} className="playing-cards" alt={`${cards[2]}${cards[3]}`} />
                </button>
              </li>
            )}
            {cards.length > 5 && (
              <li className="display-inline" key={`${cards[4]}${cards[5]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[4]}${cards[5]}`, 4)}}>
                    <img src={`../assets/cards/${cards[4]}${cards[5]}.png`} className="playing-cards" alt={`${cards[4]}${cards[5]}`} />
                </button>
              </li>
            )}
            {cards.length > 7 && (
              <li className="display-inline" key={`${cards[6]}${cards[7]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[6]}${cards[7]}`, 6)}}>
                    <img src={`../assets/cards/${cards[6]}${cards[7]}.png`} className="playing-cards" alt={`${cards[6]}${cards[7]}`} />
                </button>
              </li>
            )}
            {cards.length > 9 && (
              <li className="display-inline" key={`${cards[8]}${cards[9]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[8]}${cards[9]}`, 8)}}>
                    <img src={`../assets/cards/${cards[8]}${cards[9]}.png`} className="playing-cards" alt={`${cards[8]}${cards[9]}`} />
                </button>
              </li>
            )}
            {cards.length > 11 && (
              <li className="display-inline" key={`${cards[10]}${cards[11]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[10]}${cards[11]}`, 10)}}>
                    <img src={`../assets/cards/${cards[10]}${cards[11]}.png`} className="playing-cards" alt={`${cards[10]}${cards[11]}`} />
                </button>
              </li>
            )}
            {cards.length > 13 && (
              <li className="display-inline" key={`${cards[12]}${cards[13]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[12]}${cards[13]}`, 12)}}>
                    <img src={`../assets/cards/${cards[12]}${cards[13]}.png`} className="playing-cards" alt={`${cards[12]}${cards[13]}`} />
                </button>
              </li>
            )}
            {cards.length > 15 && (
              <li className="display-inline" key={`${cards[14]}${cards[15]}`}>
                <button className="button-reset" onClick={() => {playedCard(`${cards[14]}${cards[15]}`, 14)}}>
                    <img src={`../assets/cards/${cards[14]}${cards[15]}.png`} className="playing-cards" alt={`${cards[14]}${cards[15]}`} />
                </button>
              </li>
            )}
        </ul>
      );
    }
    
    export default RenderCards;