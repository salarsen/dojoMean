document.addEventListener("DOMContentLoaded",function(){
    console.log("loaded");
    var addButton = document.getElementById('addPlayer');
    var battleButton = document.getElementById('battle');
    var game = {
        players: [],
        addPlayer: function(newPlayer){
            game.players.push(newPlayer);
        }
    };

    function playerConstructor(name){
        var player = {
            name : name,
            card : $.ajax({
                url : `http://pokeapi.co/api/v1/pokemon/${Math.floor(Math.random()*151) + 1}/`,
                dataType :'json',
                success : function(pokemon){
                    player.card = pokemon;
                    // console.log("id",player.card.pkdx_id);
                    var arena = document.getElementById('arena');
                    arena.innerHTML += `
                        <ul class="competitor" id="${player.name}">
                            <li>Player: ${player.name}</li>
                            <li>Pokemon: ${player.card.name}</li>
                            <li>Attack: ${player.card.attack}</li>
                            <li>Defense: ${player.card.defense}</li>
                            <li><img src="http://pokeapi.co/media/img/${player.card.pkdx_id}.png" height="120px" widht="120px" alt="${player.card.name}"></il>
                        </ul>`;
                }
            })
        };
        return player;
    }

    addButton.onclick = function(){
        var newPlayer = document.getElementById('newPlayer');
        if(newPlayer.value !== ""){
            game.addPlayer(playerConstructor(newPlayer.value));
            newPlayer.value = "";
            document.getElementById('results').innerHTML = "";
        }
    }

    battle.onclick = function(){
        var results = document.getElementById('results');
        results.innerHTML = "";
        if(game.players.length <= 1){
            alert("Please add a player to do battle!");
        } else {
            while(game.players.length > 1){
                results.innerHTML += `<li>Battle commencing betwen ${game.players[0].name} and ${game.players[1].name}</li>`;
                var player1 = game.players[0];
                var player2 = game.players[1];
                if(player1.card.attack > player2.card.defense && player1.card.defense > player2.card.attack){
                    results.innerHTML += `<li>${player1.name} wins this battle.</li>`;
                    document.getElementById(player2.name).remove();
                    game.players.splice(1,1);
                } else if (player2.card.attack > player1.card.defense && player2.card.defense > player1.card.attack){
                    results.innerHTML += `<li>${player2.name} wins this battle.</li>`;
                    document.getElementById(player1.name).remove();
                    game.players.splice(0,1);
                } else {
                    results.innerHTML += `We have a tie! Both players knock each other out!</li>`;
                    document.getElementById(player1.name).remove();
                    document.getElementById(player2.name).remove();
                    game.players.splice(0,2);
                }
            }
        }
    }
});
