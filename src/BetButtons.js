import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from "./utils/client";

function BetButtons() {
    const { setBet, numberOfCards, currentPlayerState } = useContext(globalContext)

    const patchBet = (bet) => {
        const playerStateId = currentPlayerState.playerState.id
        client
        .patch(`/user/playerState/${playerStateId}`, {bet: bet})
        .then(() => setBet(bet))
    }

    return (
        <ul className="responsive-columns-bet-buttons">
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(0)}}>0</button>
                <div></div>
            </li>
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(1)}}>1</button>
                <div></div>
            </li>
            {numberOfCards > 1 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(2)}}>2</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 2 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(3)}}>3</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 3 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(4)}}>4</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 4 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(5)}}>5</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 5 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(6)}}>6</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 6 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(7)}}>7</button>
                <div></div>
            </li>
            )}
            {numberOfCards > 7 && (
            <li className="display-inline three-columns-expand-one-three">
                <div></div>
                <button className="bet-button" onClick={() => {patchBet(8)}}>8</button>
                <div></div>
            </li>
            )}
        </ul>
    );
}

export default BetButtons;