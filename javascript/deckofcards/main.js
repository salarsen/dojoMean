// document.addEventListener("DOMContentLoaded",function(){
    console.log("loaded");
    // ************************ Deck Constructor ***********************
    function deckConstructor (){
        this.cards = [];
        this.buildDeck();
    }

    deckConstructor.prototype.buildDeck = function(){
        console.log("Building the deck!");
        var letters = ['A','B','C','D'];
        for (letter in letters){
            for(var i = 1; i <= 14; i++){
                if(i <= 9){
                    this.cards.push({
                        cardNum : `1F0${letters[letter]}${i}`,
                        value : i
                    });
                } else {
                    switch (i){
                        case 10:
                            this.cards.push({
                                cardNum : `1F0${letters[letter]}A`,
                                value : 10
                            }); break;
                        case 11:
                            this.cards.push({
                                cardNum : `1F0${letters[letter]}B`,
                                value : 11
                            }); break;
                        case 12:
                            this.cards.push({
                                cardNum : `1F0${letters[letter]}D`,
                                value : 12
                            }); break;
                        case 13:
                            this.cards.push({
                                cardNum : `1F0${letters[letter]}E`,
                                value : 13
                            }); break;
                    }
                }
            }
        }
    }

    deckConstructor.prototype.shuffle = function(){
        var m = this.cards.length, temp, newPosition;
        console.log("Shuffling...");
        // for(var i = 0; i < this.cards.length; i++){
        while(m){
            newPosition = Math.floor(Math.random()* m--);
            temp =  this.cards[m];
            this.cards[m] =  this.cards[newPosition];
            this.cards[newPosition] = temp;
        }
        return this;
    }

    deckConstructor.prototype.resetDeck = function(){
        this.cards = [];
        this.buildDeck();
    }

    deckConstructor.prototype.dealCard = function(){
        //assumes we have already shuffled the deck. then pops one off the top (i.e. deals one from top of deck if its face down)
        return this.cards.pop();
    }

    var deck = new deckConstructor();

    // ************************ Player Constructor ***********************
    function playerConstructor(name){
        this.name = name || "Bob";
        this.hand = [];
    }

    playerConstructor.prototype.takeCard = function(deck){
        this.hand.push(deck.dealCard());
        return this;
    }

    playerConstructor.prototype.discard = function(card){ //should do a discard pile and then when you hit shuffle it shuffles it back into the maindeck
        for(var i = 0; i < this.hand.length; i++){
            if(this.hand[i].cardNum == card){
                this.hand.splice(i,1);
            }
        }
        return this;
    }

    var newDeck = new deckConstructor();
    console.log(newDeck);
    newDeck.shuffle().shuffle();
    var spencer = new playerConstructor();
    spencer.takeCard(newDeck);
    console.log(spencer);
// });
