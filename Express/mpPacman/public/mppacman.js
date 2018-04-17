$(document).ready(function(){
    console.log(`JQuery is loaded`);
    let socket = io.connect();

    let user = prompt("Enter your name:");
    user = user || "Bob the builder";
    socket.emit('new_user', { data: user });

    let player = {
        id: null, //socket id here?
        row: 0,
        col: 0,
    }

    socket.on('user_response', function (data) {
        console.log(`Received: `, data.response);
        player.id = data.response.id;
        setPlayerStartPos(player);
        generateWorld(world, player);
    });
    document.onkeydown = (e) => {
        if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 37) {
            // socket.emit('move', )
            console.log('movement');
        }
    }

    let world = [];
    for(let i = 0; i < 10; i++){
        let arr = [];
        for(let x = 0; x < 10; x++){
            arr.push(0);
        }
        world.push(arr);
    }

    function setPlayerStartPos(player){
        let start_row = Math.floor(Math.random() * (world.length - 2)) + 1;
        let start_col = Math.floor(Math.random() * (world[0].length - 2)) + 1;
        // while (!checkSpawn(world[start_row][start_col])) {
        //     start_row = Math.floor(Math.random() * (world.length - 2)) + 1;
        //     start_col = Math.floor(Math.random() * (world[0].length - 2)) + 1;
        // }
        // if (checkSpawn(world[start_row][start_col])) {
            world[start_row][start_col] = player.id;
            player.row = start_row;
            player.col = start_col;
            console.log(`Row: ${player.row}, Col: ${player.col}`)
        // }
    }

    // create an update the world
    function generateWorld(world, player) {
        let displayStr = `<div id="${player.id}" class="player">`;
        for (let row = 0; row < world.length; row++) {
            displayStr += '<div class="row">';
            for (let col = 0; col < world[row].length; col++) {
                if (world[row][col] === 4) {
                    displayStr += `<div id="R${row}C${col}" class="cherry"></div>`;
                } else if (world[row][col] > 4 && ghost_status === 0) {
                    displayStr += `<div id="R${row}C${col}" data-attr="ghost1" class="ghost"></div>`;
                } else if (world[row][col] > 4 && ghost_status === 1) {
                    displayStr += `<div id="R${row}C${col}" data-attr="ghost1" class="ghostEdible"></div>`;
                } else if (world[row][col] === 2) {
                    displayStr += `<div id="R${row}C${col}" class="brick"></div>`;
                } else if (world[row][col] === 1) {
                    displayStr += `<div id="R${row}C${col}" class="coin"></div>`;
                } else if (world[row][col] === 0) {
                    displayStr += `<div id="R${row}C${col}" class=""></div>`;
                } else if (world[row][col] === -1) {
                    displayStr += `<div id="R${row}C${col}" class="pacman"></div>`;
                } else if (world[row][col] === -2) {
                    displayStr += `<div id="R${row}C${col}" data-attr="pacman2" class="pacman2"></div>`;
                }
            }
            displayStr += '</div>';
        }
        //console.log(displayStr);
        //console.log(pacman);
        displayStr += '</div>';
        console.log(`Created world: ${world}`);
        $('div.world').html(displayStr);
    };

    document.onkeydown = function(e){
        if(e.keyCode === 40){ //arrow down
            // check if we can move down
            if(player.row === world.length - 1){ // at edge of array
                console.log(`Edge of array`)
            } else {
                
                // $(`#R${player.row}C${player.col}`).fadeOut("50");
                $(`#R${player.row}C${player.col}`).removeClass("pacman");
                $(`#R${player.row + 1}C${player.col}`).addClass("pacman");
                player.row ++;
            }
        } else if (e.keyCode === 38) { //arrow up
            // check if we can move down
            if (player.row === 0) { // at edge of array
                console.log(`Edge of array`)
            } else {

                // $(`#R${player.row}C${player.col}`).fadeOut("50");
                $(`#R${player.row }C${player.col}`).removeClass("pacman");
                $(`#R${player.row - 1}C${player.col}`).addClass("pacman");
                player.row--;
            }
        } else if (e.keyCode === 39) { //arrow right
            // check if we can move down
            if (player.col === world[player.row].length - 1) { // at edge of array
                console.log(`Edge of array`)
            } else {

                // $(`#R${player.row}C${player.col}`).fadeOut("50");
                $(`#R${player.row}C${player.col}`).removeClass("pacman");
                $(`#R${player.row}C${player.col+1}`).addClass("pacman");
                player.col++;
            }
        } else if (e.keyCode === 37) { //arrow left
            // check if we can move down
            if (player.col === 0) { // at edge of array
                console.log(`Edge of array`)
            } else {

                // $(`#R${player.row}C${player.col}`).fadeOut("50");
                $(`#R${player.row}C${player.col}`).removeClass("pacman");
                $(`#R${player.row}C${player.col-1}`).addClass("pacman");
                player.col--;
            }
        }
        
    }
})