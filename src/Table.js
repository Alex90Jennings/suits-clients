import TableForMoreThanTwoPlayers from './TableForMoreThanTwoPlayers.js'
import TableForTwoPlayers from './TableForTwoPlayers.js'
import { useContext } from "react";
import { globalContext } from './helper/globalContext';
import client from './utils/client.js';

function Table () {
    const { playerList, gameState, setGameState, isHost } = useContext(globalContext)

    //deal cards
    const dealCardsToPlayers = (playerStateIdArray) => {
        const cardDeck = ["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"]
        const cardsToDeal = []
        const numberOfCards = 16

        console.log("game state: ", gameState)

        for (let i = 0; i < numberOfCards; i++){
            const randomIndex = Math.floor(Math.random() * (cardDeck.length));
            const cardToDeal = cardDeck[randomIndex];
            cardDeck.splice(randomIndex, 1);
            cardsToDeal.push(cardToDeal)
        }

        for (let j = 0; j < playerStateIdArray.length; j++){
            const playerStateId = playerStateIdArray[j]
            console.log(playerStateId)
            const numberOfCardsEach = numberOfCards / playerStateIdArray.length
            const cardsToPatchPlayerJ = cardsToDeal.splice(0, numberOfCardsEach)
            const cardsToPatchPlayerJString = cardsToPatchPlayerJ.join("").toString()
            console.log(playerStateId)
            console.log(cardsToPatchPlayerJString)
            client
            .patch(`/user/playerState/${playerStateId}`, {hand: cardsToPatchPlayerJString})
            .then((res) => {
                console.log(`player state ${playerStateId} recieved ${res.data.data.playerState.hand}`)
                setGameState("wait for bets")
            })
        }
    };

    const findPlayerStatesIdArray = (playerList) => {
        const playerStatesIdArray = []
        for (let j = 0; j < playerList.length; j++){
            const userId = playerList[j].user.id
            client
            .get(`/user/${userId}/playerStates`)
            .then((res) => {
                const indexOfPlayerState = (res.data.data.foundPlayerStates.length - 1)
                const playerStateId = Number(res.data.data.foundPlayerStates[indexOfPlayerState].playerState.id)
                playerStatesIdArray.push(playerStateId)
                console.log(playerStatesIdArray)
                dealCardsToPlayers(playerStatesIdArray)
            })
        }
    }

    // const fetchCardsFromTable = (tableId) => {
    //     client
    //     .get(`/table/${tableId}`)
    //     .then((res) => {
    //         console.log(res.data.data.foundTable.table.users.playerStates[-1].hand)
    //     })
    // }

    if (gameState === "start game") {
        setGameState("deal cards")
        if(isHost) findPlayerStatesIdArray(playerList)
    }

    // if (gameState === "deal cards"){
    //     fetchCardsFromTable({lobbyCode})
    // }

    // const refreshTable = () => {
    //     client
    //     .get(`/table/${lobbyCode}`)
    //     .then((res) => {
    //       if(res.data.data.foundTable.table.isInGame) {
    //         setGameState("start game")
    //         navigate(`../table/${lobbyCode}`, { replace: true })
    //       }
    //     })
    // }
    
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