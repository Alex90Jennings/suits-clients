import { useContext } from "react";
import { globalContext } from './helper/globalContext';

function BetButtons() {
    const { setBet, numberOfCards } = useContext(globalContext)

    return (
        <ul>
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            {numberOfCards > 1 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 2 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 3 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 4 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 5 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 6 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
            {numberOfCards > 7 && (
            <li className="display-inline">
                <button className="button-reset" onClick={() => {setBet(0)}}>0</button>
            </li>
            )}
        </ul>
    );
}

export default BetButtons;