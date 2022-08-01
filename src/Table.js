import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';

function Table () {
    const { playerList } = useContext(globalContext)
    
    return (
        <div className='four-rows-expand-three full-height'>
            <div className='header-height'></div>
            <div className='three-columns-expand-two'>
                <div></div>
                <h2 className="notifications center">NOTIFICATIONS</h2>
                <div></div>
            </div>
            {playerList.length === 2 && (<TableForTwoPlayers />)}
            {playerList.length > 2 && (<TableForMoreThanTwoPlayers />)}
        </div>
    )
}

export default Table;