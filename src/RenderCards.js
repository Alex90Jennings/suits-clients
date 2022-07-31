import { globalContext } from './helper/globalContext';
import { useContext } from "react";

function RenderCards() {
    const { gameState } = useContext(globalContext)
    return (
        <>
            {(gameState === "start game" || gameState === "retrieving card deck") && 
                <ul className="list-reset display-inline">
                    <li className="display-inline" key={1}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={2}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={3}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={4}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={5}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={6}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={7}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                    <li className="display-inline" key={8}>
                        <img src='../assets/cards/card-back.png' alt='card-back' className='playing-cards'></img>
                    </li>
                </ul>
            }
        </>
      );
    }
    
    export default RenderCards;

    // ../assets/diagrams/suits/spade-colour.png