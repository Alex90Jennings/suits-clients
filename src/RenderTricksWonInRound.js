function RenderTricksWonInRound(props) {
    const tricksWonInRound = props.handsWon

    return (
        <ul className="center-wrapper m-bottom-m m-top-m">
            {tricksWonInRound === 0 && (
            <li className="display-inline m-left-s">
                    <img className="trick visibility-hidden" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 0 && (
                <li className="display-inline m-left-s">
                    <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
                </li>
            )}
            {tricksWonInRound > 1 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 2 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 3 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 4 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 5 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 6 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
            {tricksWonInRound > 7 && (
            <li className="display-inline m-left-s">
                <img className="trick" src="../assets/cards/card-back.png" alt="card-back"></img>
            </li>
            )}
      </ul>
      );
    }
    
    export default RenderTricksWonInRound;