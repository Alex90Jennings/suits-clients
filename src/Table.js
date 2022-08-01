import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';

function Table () {
    const { playerList, lobbyCode } = useContext(globalContext)
    
    return (
        <>
            <h2>Welcome to Table {lobbyCode}</h2>
            {playerList.length === 2 && (<TableForTwoPlayers />)}
            {playerList.length > 2 && (<TableForMoreThanTwoPlayers />)}
        </>
    )
}

export default Table;