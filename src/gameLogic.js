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
        }
    };

    newCardDeck () {
        const suits = ["C", "D", "H", "S"];
        const cards = [];
        for (let i = 0; i < suits.length; i++) {
          for (let j = 2; j < 15; j++) {
            let number = j
            if (number === 10) number = "T"
            if (number === 11) number = "J"
            if (number === 12) number = "Q"
            if (number === 13) number = "K"
            if (number === 14) number = "A"
            const card = `${number}${suits[i]}`;
            cards.push(card);
          }
        }
        return cards
    }

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
        
        if (this.checkTrickForTrumps(trick, trumps)) winningSuit = trumps

        for (let i = 0; i < trick.length; i+=2){
            if (trick[i+1] === winningSuit) cardsWithWinningSuit += trick.substr(i, 2)
        }

        const winningCard = this.findWinningCard(cardsWithWinningSuit)
        const winningPlayerIndex = this.findIndexOfWinningCard(winningCard, trick)
        return playerArray[winningPlayerIndex]
    }

    checkTrickForTrumps(trick, trumps) {
        for (let i = 0; i < trick.length; i+=2){    
            if (trick[i+1] === trumps) return true
        }
        return false
    }

    findWinningCard(cardsWithWinningSuit){
        if (cardsWithWinningSuit.includes("A")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("A"), 2)
        if (cardsWithWinningSuit.includes("K")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("K"), 2)
        if (cardsWithWinningSuit.includes("Q")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("Q"), 2)
        if (cardsWithWinningSuit.includes("J")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("J"), 2)
        if (cardsWithWinningSuit.includes("T")) return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf("T"), 2)

        let numbersOfCardsArray = []
        for (let i = 0; i<cardsWithWinningSuit.length; i+=2) {
            numbersOfCardsArray.push(cardsWithWinningSuit[i])
        }

        const highestNumber = Math.max(numbersOfCardsArray)
        return cardsWithWinningSuit.substr(cardsWithWinningSuit.indexOf(highestNumber.toString()), 2)
    }

    findIndexOfWinningCard (winningCard, trick) {
        const winningNumber = winningCard[0]
        const winningSuit = winningCard[1]

        for (let i = 0; i < trick.length; i+=2) {
            if (trick[i] === winningNumber && trick[i+1] === winningSuit) return (i / 2)
        }
    }
}

module.exports = GameLogic