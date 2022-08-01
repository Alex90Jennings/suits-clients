class GameLogic {
    dealCardsToPlayers (cardDeck, numberOfCards, playerArray) {
        let cardsToDeal = []
        let cardsToPatchPlayerJString = ""

        for (let i = 0; i < numberOfCards; i++){
            const randomIndex = Math.floor(Math.random() * (cardDeck.length));
            const cardToDeal = cardDeck[randomIndex];
            cardDeck.splice(randomIndex, 1);
            cardsToDeal.push(cardToDeal)
        }

        for (let j = 0; j < playerArray.length; j++){
            const numberOfCardsEach = numberOfCards / playerArray.length
            const cardsToPatchPlayerJ = cardsToDeal.splice(0, numberOfCardsEach)
            cardsToPatchPlayerJString = cardsToPatchPlayerJ.join("").toString()
            playerArray[j].cards = cardsToPatchPlayerJString
            // console.log(`${playerArray[j].username} with id ${playerArray[j].id} recieves the cards ${cardsToPatchPlayerJToString}`)
            //patch request
            //client
            //patch (/user/${playerArray[j].id}/cards, cardsToPatch)
        }
    };

    validCardsInHand (firstCardPlayed, playerCards) {
        const suitOfFirstCard = firstCardPlayed[1]
        let validCards = ""

        for (let i = 0; i < playerCards.length; i+=2){
            if (playerCards[i+1] === suitOfFirstCard) validCards += playerCards.substr(i, 2)
        }

        if (validCards === "") return validCards = playerCards

        return validCards
    }

    whoWonTrick (trick, trumps, playerArray) {
        let winningSuit = trick[1]
        let cardsWithWinningSuit = ""
        console.log("trick: ", trick)
        
        if (this.checkTrickForTrumps(trick, trumps)) {
            console.log("changing winning suit")
            winningSuit = trumps
        }
        
        console.log("winning suit", winningSuit)

        for (let i = 0; i < trick.length; i+=2){
            if (trick[i+1] === winningSuit) cardsWithWinningSuit += trick.substr(i, 2)
        }

        console.log("cards with winning suit: ", cardsWithWinningSuit)
        const winningCard = this.findWinningCard(cardsWithWinningSuit)
        console.log(winningCard)
        const winningPlayerIndex = this.findIndexOfWinningCard(winningCard, trick)
        console.log(winningPlayerIndex)
        return playerArray[winningPlayerIndex]
    }

    checkTrickForTrumps(trick, trumps) {
        for (let i = 0; i < trick.length; i+=2){
            console.log("suit to compare: ", trick[i+1])        
            if (trick[i+1] === trumps) {      
                console.log("has trumps", trick.substr(i, 2))
                return true
            }
        }
        console.log("does not have trumps", trumps)
        return false
    }

    findWinningCard(cardsWithWinningSuit){
        if (cardsWithWinningSuit.inclues("A")) {
            console.log("there is an A")
            return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("A"), 2)
        }
        if (cardsWithWinningSuit.inclues("K")) {
            console.log("there is a K")
            return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("K"), 2)
        } 
        if (cardsWithWinningSuit.inclues("Q")) {
            console.log("there is a Q")
            return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("Q"), 2)
        } 
        if (cardsWithWinningSuit.inclues("J")) {
            console.log("there is a J")
            return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("J"), 2)
        } 
        if (cardsWithWinningSuit.inclues("T")) {
            console.log("there is a T")
            return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("T"), 2)
        } 
        console.log("no face cards")
        let numbersOfCardsArray = []
        for (let i = 0; i<cardsWithWinningSuit.length; i+=2){
            numbersOfCardsArray.push(cardsWithWinningSuit[i])
            console.log("array of card's number: ", numbersOfCardsArray)
        }
        const highestNumber = Math.max(numbersOfCardsArray)
        console.log("highest card: ", highestNumber)
        return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf(highestNumber.toString()), 2)
    }

    findIndexOfWinningCard (winningCard, trick) {
        console.log("winning card: ", winningCard)
        const winningNumber = winningCard[0]
        const winningSuit = winningCard[1]
        console.log("winning number: ", winningNumber)
        console.log("winning suit: ", winningSuit)

        for (let i = 0; i < trick.length; i+=2) {
            if (trick[i] === winningNumber && trick[i+1] === winningSuit) {
                console.log("found winning card")
                return (i / 2)
            }
        }
        console.log("couldn't find winning card")
    }
}

module.exports = GameLogic