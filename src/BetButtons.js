import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from "./utils/client";

function BetButtons() {
    const { setBet, numberOfCards, currentPlayerState } = useContext(globalContext)

    const patchBet = (bet) => {
        const playerStateId = currentPlayerState.playerState.id
        console.log(playerStateId)
        client
        .patch(`/user/playerState/${playerStateId}`, {bet: bet})

        setBet(bet)
    }

    return (
        <ul>
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(0)}}>0</button>
            </li>
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(1)}}>1</button>
            </li>
            {numberOfCards > 1 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(2)}}>2</button>
            </li>
            )}
            {numberOfCards > 2 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(3)}}>3</button>
            </li>
            )}
            {numberOfCards > 3 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(4)}}>4</button>
            </li>
            )}
            {numberOfCards > 4 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(5)}}>5</button>
            </li>
            )}
            {numberOfCards > 5 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(6)}}>6</button>
            </li>
            )}
            {numberOfCards > 6 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(7)}}>7</button>
            </li>
            )}
            {numberOfCards > 7 && (
            <li className="display-inline">
                <button className="bet-button" onClick={() => {patchBet(8)}}>8</button>
            </li>
            )}
        </ul>
    );
}

export default BetButtons;