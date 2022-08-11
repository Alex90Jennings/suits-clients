const GameLogic = require('../src/gameLogic.js')

describe('suits', () => {
    it('adding 2 cards to 2 players', () => {
        const Suits = new GameLogic()
        const cardDeck = ["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"]
        const numberOfCards = 4
        const playerArray = [{username: "player1", id: 1, cards: ""}, {username: "player2", id: 2, cards: ""}]
        Suits.dealCardsToPlayers(cardDeck, numberOfCards, playerArray)

        expect(playerArray[0].cards.length / 2).toEqual(2)
        expect(playerArray[1].cards.length / 2).toEqual(2)
        expect(playerArray.length).toEqual(2)
        expect(cardDeck.length).toEqual(48)
    })

    it('adding 6 cards to 8 players', () => {
        const Suits = new GameLogic()
        const cardDeck = ["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"]
        const numberOfCards = 48
        const playerArray = [{username: "player1", id: 1, cards: ""}, {username: "player2", id: 2, cards: ""}, {username: "player3", id: 3, cards: ""}, {username: "player4", id: 4, cards: ""}, {username: "player5", id: 5, cards: ""}, {username: "player6", id: 6, cards: ""}]
        Suits.dealCardsToPlayers(cardDeck, numberOfCards, playerArray)

        expect(playerArray[0].cards.length / 2).toEqual(8)
        expect(playerArray[1].cards.length / 2).toEqual(8)
        expect(playerArray[2].cards.length / 2).toEqual(8)
        expect(playerArray[3].cards.length / 2).toEqual(8)
        expect(playerArray[4].cards.length / 2).toEqual(8)
        expect(playerArray[5].cards.length / 2).toEqual(8)
        expect(playerArray.length).toEqual(6)
        expect(cardDeck.length).toEqual(4)
    })

    it('select valid cards to play from a players hand after the first card has been played', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3C"}, {username: "player2", id: 2, cards: "6C7H"}]
        const result = Suits.validCardsInHand("4H", playerArray[1].cards)

        expect(result).toEqual("7H")
    })

    it('select valid cards to play from a players hand after the first card has been played (multiple cards)', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH9H"}]
        const result = Suits.validCardsInHand("4H", playerArray[1].cards)

        expect(result).toEqual("7HTH9H")
    })

    it('select valid cards to play from a players hand after the first card has been played (no matching cards)', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH9H"}]
        const result = Suits.validCardsInHand("4S", playerArray[1].cards)

        expect(result).toEqual("6C7H2CTH9H")
    })

    it('who won the trick, 2 players, no trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}]
        const result = Suits.whoWonTrick("4STS", "D", playerArray)

        expect(result).toEqual(playerArray[1])
    })

    it('who won the trick, 2 players, player one has trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}]
        const result = Suits.whoWonTrick("4DTS", "D", playerArray)

        expect(result).toEqual(playerArray[0])
    })

    it('who won the trick, 4 players, no trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}, {username: "player3", id: 3, cards: "QHKQASAC"}, {username: "player4", id: 4, cards: "2C4C5C7C"}]
        const result = Suits.whoWonTrick("4DTDQDTS", "C", playerArray)

        expect(result).toEqual(playerArray[2])
    })

    
    it('who won the trick, 4 players, player four has trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}, {username: "player3", id: 3, cards: "QHKQASAC"}, {username: "player4", id: 4, cards: "2C4C5C7C"}]
        const result = Suits.whoWonTrick("4DTDQDTC", "C", playerArray)

        expect(result).toEqual(playerArray[3])
    })

    it('who won the trick, 4 players, player one and four has trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}, {username: "player3", id: 3, cards: "QHKQASAC"}, {username: "player4", id: 4, cards: "2C4C5C7C"}]
        const result = Suits.whoWonTrick("4CTDQDTC", "C", playerArray)

        expect(result).toEqual(playerArray[3])
    })

    it('who won the trick, 4 players, player one and four has trumps', () => {
        const Suits = new GameLogic()
        const playerArray = [{username: "player1", id: 1, cards: "3CQSKHTD"}, {username: "player2", id: 2, cards: "6C7H2CTH"}, {username: "player3", id: 3, cards: "QHKQASAC"}, {username: "player4", id: 4, cards: "2C4C5C7C"}]
        const result = Suits.whoWonTrick("TCTDQD4C", "C", playerArray)

        expect(result).toEqual(playerArray[0])
    })

    it('function produces a full card deck', () => {
        const Suits = new GameLogic()
        const cardDeck = Suits.newCardDeck()
        const result = ["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"]

        expect(cardDeck).toEqual(result)
    })

    it('player can play any card first', () => {
        const Suits = new GameLogic()
        const result = Suits.isValidCard("AC", "KC5D3S", "")

        expect(result).toEqual(true)
    })

    it('player must follow suit if they have a card available in the hand', () => {
        const Suits = new GameLogic()
        const result = Suits.isValidCard("AC", "KC5D3S", "4D")

        expect(result).toEqual(false)
    })

    it('player must follow suit if they have a card available in the hand', () => {
        const Suits = new GameLogic()
        const result = Suits.isValidCard("5D", "KCAC3S", "4D")

        expect(result).toEqual(true)
    })

    it('player can play any card if they do not have a card with the starting suit', () => {
        const Suits = new GameLogic()
        const result = Suits.isValidCard("5D", "KCAC3S", "4H")

        expect(result).toEqual(true)
    })

    it('find the next player to play', () => {
        const Suits = new GameLogic()
        const playerStates = [{id: 1, playedCard: "4C"}, {id: 2, playedCard: ""}, {id: 3, playedCard: ""}, {id: 4, playedCard: ""}]
        const result = Suits.findNextPlayer(playerStates)

        expect(result).toEqual(2)
    })

    it('find the next player to play', () => {
        const Suits = new GameLogic()
        const playerStates = [{id: 1, playedCard: ""}, {id: 2, playedCard: "4C"}, {id: 3, playedCard: "8C"}, {id: 4, playedCard: ""}]
        const result = Suits.findNextPlayer(playerStates)

        expect(result).toEqual(4)
    })

    it('find the next player to play', () => {
        const Suits = new GameLogic()
        const playerStates = [{id: 1, playedCard: ""}, {id: 2, playedCard: ""}, {id: 3, playedCard: "8C"}, {id: 4, playedCard: "4C"}]
        const result = Suits.findNextPlayer(playerStates)

        expect(result).toEqual(1)
    })

    it('find the next player to play', () => {
        const Suits = new GameLogic()
        const playerStates = [{id: 1, playedCard: "8C"}, {id: 2, playedCard: ""}, {id: 3, playedCard: ""}, {id: 4, playedCard: "4C"}]
        const result = Suits.findNextPlayer(playerStates)

        expect(result).toEqual(2)
    })
})

