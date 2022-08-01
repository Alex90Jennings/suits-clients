import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderCards() {
    const { cards } = useContext(globalContext)

    return (
        <ul className="list-reset display-inline">
            {cards.length > 1 && (
              <li className="display-inline" key={`${cards[0]}${cards[1]}`}>
                <img src={`../assets/${cards[0]}${cards[1]}.png`} className="playing-cards" alt={`${cards[0]}${cards[1]}`} />
              </li>
            )}
            {cards.length > 3 && (
              <li className="display-inline" key={`${cards[2]}${cards[3]}`}>
                <img src={`../assets/${cards[2]}${cards[3]}.png`} className="playing-cards" alt={`${cards[2]}${cards[3]}`} />
              </li>
            )}
            {cards.length > 5 && (
              <li className="display-inline" key={`${cards[4]}${cards[5]}`}>
                <img src={`../assets/${cards[4]}${cards[5]}.png`} className="playing-cards" alt={`${cards[4]}${cards[5]}`} />
              </li>
            )}
            {cards.length > 7 && (
              <li className="display-inline" key={`${cards[6]}${cards[7]}`}>
                <img src={`../assets/${cards[6]}${cards[7]}.png`} className="playing-cards" alt={`${cards[6]}${cards[7]}`} />
              </li>
            )}
            {cards.length > 9 && (
              <li className="display-inline" key={`${cards[8]}${cards[9]}`}>
                <img src={`../assets/${cards[8]}${cards[9]}.png`} className="playing-cards" alt={`${cards[8]}${cards[9]}`} />
              </li>
            )}
            {cards.length > 11 && (
              <li className="display-inline" key={`${cards[10]}${cards[11]}`}>
                <img src={`../assets/${cards[10]}${cards[11]}.png`} className="playing-cards" alt={`${cards[10]}${cards[11]}`} />
              </li>
            )}
            {cards.length > 13 && (
              <li className="display-inline" key={`${cards[12]}${cards[13]}`}>
                <img src={`../assets/${cards[12]}${cards[13]}.png`} className="playing-cards" alt={`${cards[12]}${cards[13]}`} />
              </li>
            )}
            {cards.length > 15 && (
              <li className="display-inline" key={`${cards[14]}${cards[15]}`}>
                <img src={`../assets/${cards[14]}${cards[15]}.png`} className="playing-cards" alt={`${cards[14]}${cards[15]}`} />
              </li>
            )}
        </ul>
      );
    }
    
    export default RenderCards;

    // ../assets/diagrams/suits/spade-colour.png