$(document).ready(function(){
    console.log(`JQuery is loaded`);

    let socket = io.connect();

    let users = [];
    let chat = [];

    let user = prompt("Enter your name:");
    user = user || "Bob the builder";
    socket.emit('new_user', { data: user });

    $(window).unload(function () {
        socket.emit('remove_user', { user : user, playerId : player.id });
    });
    // chat functions
    $('#chat_send').keypress(function (event) {
        if (event.keyCode === 13) { //enter key is pressed
            socket.emit('chat_add', { reason: { user: user, userText: $('#chat_send').val() } }); //send user data and text
            $('#chat_send').val(''); // wipe text val
        }
    });
    socket.on('chat_response', function (data) {
        console.log(data);
        $('#chat').prepend(data.response); //if we want to show past history we jsut need to push to the chat array in the server file and then replace do html(data.reason);
    });

    socket.on('user_response', function (data) {
        player.id = data.response.id;
        generateWorld(world, player, 'world');
        setPlayerStartPos(player);
        $('#chat').prepend(`<p>${data.response.name} joined the conversation.</p>`);
        socket.emit('user_world_add', { user: player, world: world });
    });

    socket.on('new_user_world', function(data){
        console.log(data);
        generateWorld(data.world, data.user, 'otherGameClients');
    })

    socket.on('remove_user_res',function(data){
        console.log(data);
        $(`div #${data.id}`).detach();
    })

    // basic testing world
    let world = [];

    for (let i = 0; i < 10; i++) {
        let arr = [];
        for (let x = 0; x < 10; x++) {
            if (i === 0 || i === 9 || x === 0 || x === 9) {
                arr.push(2);
            } else {
                arr.push(0);
            }

        }
        world.push(arr);
    }

    let player = {
        id: null, //socket id here?
        direction: null, // 'up' = 0 (row--), 'right' = 1 (col++), down' = 2 (row++), 'left' = 3 (col--)
        canMove : true,
        row: 0,
        col: 0,
        class : 'pacman',
    }




    let playerTimer = setInterval(function(){
        checkMove(player);
    },2000)

    function checkMove(target){
        // check here before we move if at edge of world
        // if ((target.direction === 0 && target.row !== 0) || (target.direction === 1 && target.col !== world[target.row].length - 1) || (target.direction === 2 && target.row !== world.length - 1) || (target.direction === 3 && target.col !== 0)){
        if (target.canMove) {
            if (target.direction === 0 && target.row !== 0) {
                moveObject(target, { row : target.row, col : target.col },{ row : target.row - 1, col : target.col});
                // target.row--;
            } else if (target.direction === 1 && target.col !== world[target.row].length - 1) {
                moveObject(target, { row: target.row, col: target.col }, { row: target.row, col: target.col + 1 });
                // target.col++;
            } else if (target.direction === 2 && target.row !== world.length - 1) {
                moveObject(target, { row: target.row, col: target.col }, { row: target.row + 1, col: target.col });
                // target.row++;
            } else if (target.direction === 3 && target.col !== 0) {
                moveObject(target, { row: target.row, col: target.col }, { row: target.row, col: target.col - 1 });
                // target.col--;
            } else {
                target.canMove = false;
            }
        } else {
            if (target.row === 0 && (target.direction === 1 || target.direction === 2 || target.direction === 3)) { // top of map (or at wall), can move left, right, down if open
                target.canMove = true;
            } else if (target.col === world[target.row].length - 1 && (target.direction === 0 || target.direction === 2 || target.direction === 3)) { // right of map (or at wall), can move up, right, down if open
                target.canMove = true;
            } else if (target.row === world.length - 1 && (target.direction === 0 || target.direction === 1 || target.direction === 3)) { // bottom of map (or at wall), can move up, right, left if open
                target.canMove = true;
            } else if (target.col === 0 && (target.direction === 0 || target.direction === 1 || target.direction === 2)) { // left of map (or at wall), can move up, right, down if open
                target.canMove = true;
            } else {
                // console.log('target cannot move')
                target.canMove = false;
            }
        }
    }

    function moveObject(target, oldPos, newPos){
        let fadeIn = 125;
        let fadeOut = 125;
        let interval = 5;
        $(`#${target.id} #R${oldPos.row}C${oldPos.col}`).children().fadeOut(fadeOut, () => {
            $(`#R${oldPos.row}C${oldPos.col}`).children().remove(`div`);
            $(`#R${newPos.row}C${newPos.col}`).append(`<div id="${target.id}" class="${target.class}"></div>`)
            setTimeout(() => {
                // console.log(`fading in R${target.row}C${target.col}`)
                $(`#${target.id} #R${newPos.row}C${newPos.col}`).children().fadeIn(fadeIn);
                target.row = newPos.row;
                target.col = newPos.col;
            }, interval);
        });
        socket.emit('movement', { data : { target : target, newPos : newPos}});
        // } else {
            // console.log('edge of map');
        // }
    }

    // function checkMove(target){
    //     // assumes any move is invalid unless otherwise checked
    //     if(target.direction === 0){
    //         if(target.row !== 0 && world[target.row - 1][target.col] === -1){ // if we are not at the top row, check if the row above us is a wall.
    //             return false;
    //         } else if(target.row === 0 && world[world.length - 1][target.col] === -1){ // if we are at the top row (meaning there was no wall above us), check if the bottom row has a wall. This enables the game to jump from top to bottom, side to side, vice-versa
    //             return false;
    //         } else { // code point/ghost stuff here
    //             return true;
    //         }
    //     }
        // move up
            // if at wall, return false
            // else if at edge of map, check bottom. if wall, return false, else true
        // move up
            // if at wall, return false
            // else if at edge of map, check bottom. if wall, return false, else true
        // move up
            // if at wall, return false
            // else if at edge of map, check bottom. if wall, return false, else true
        // move up
            // if at wall, return false
            // else if at edge of map, check bottom. if wall, return false, else true
        // else if ghost && not ghost lunch mode trigger death
        // else if ghost && ghost lunch mode, trigger lunch
        // else if cherry (id 4), trigger ghost lunch mode and points add
        // else if coin (id 1), trigger coin disappear (change to basic) and points add
    // }

    function setPlayerStartPos(player){
        let start_row = Math.floor(Math.random() * (world.length - 2)) + 1;
        let start_col = Math.floor(Math.random() * (world[0].length - 2)) + 1;
        player.direction = Math.floor(Math.random() * 4); // 'up' = 0 (row--), 'right' = 1 (col++), down' = 2 (row++), 'left' = 3 (col--)

        // while (!checkSpawn(world[start_row][start_col])) {
        //     start_row = Math.floor(Math.random() * (world.length - 2)) + 1;
        //     start_col = Math.floor(Math.random() * (world[0].length - 2)) + 1;
        // }
        // if (checkSpawn(world[start_row][start_col])) {
            world[start_row][start_col] = player.id;
            player.row = start_row;
            player.col = start_col;
            socket.emit('user_start', {data : player})
            // console.log(`Row: ${player.row}, Col: ${player.col}`)

        $(`#R${player.row}C${player.col}`).append(`<div id="${player.id}" class="pacman"></div>`)
        // }
    }

    // create an update the world
    function generateWorld(world, player, target) {
        let displayStr = `<div id="${player.id}" class="player">`;
        for (let row = 0; row < world.length; row++) {
            displayStr += '<div class="row">';
            for (let col = 0; col < world[row].length; col++) {
                if (world[row][col] === 4) {
                    displayStr += `<div id="R${row}C${col}" class="cherry"></div>`;
                } else if (world[row][col] > 4 && ghost_status === 0) {
                    displayStr += `<div id="R${row}C${col}" class="ghost"></div>`;
                } else if (world[row][col] > 4 && ghost_status === 1) {
                    displayStr += `<div id="R${row}C${col}" class="ghostEdible"></div>`;
                } else if (world[row][col] === 2) {
                    displayStr += `<div id="R${row}C${col}" class="brick"></div>`;
                } else if (world[row][col] === 1) {
                    displayStr += `<div id="R${row}C${col}" class="coin"></div>`;
                } else if (world[row][col] === player.id){
                    displayStr += `<div id="R${row}C${col}" class="basic"><div id="${player.id}" class="pacman"></div></div>`;
                } else {
                    displayStr += `<div id="R${row}C${col}" class="basic"></div>`;
                }
            }
            displayStr += '</div>';
        }
        //console.log(displayStr);
        //console.log(pacman);
        displayStr += '</div>';
        // console.log(displayStr);
        // console.log(`Created world: ${world}`);
        $(`div.${target}`).append(displayStr);
    };


    // change player direction here.
    document.onkeydown = function(e){
        // console.log(player.row)
        // console.log(`before ${player.direction}`)
        // 'up' = 0 (row--), 'right' = 1 (col++), down' = 2 (row++), 'left' = 3 (col--)
        if (e.keyCode === 40) {
            player.direction = 2;
        } else if (e.keyCode === 38){
            player.direction = 0;
        } else if (e.keyCode === 39){
            player.direction = 1;
        } else if (e.keyCode === 37) {
            player.direction = 3;
        } else if(e.keycode === 27){
            clearInterval(playerTimer);
        } else {
            console.log(e.keyCode)
        }
        // console.log(`after ${player.direction}`)
        // socket.emit('movement',{'player':player})
        // if(e.keyCode === 40){ //arrow down
        //     // check if we can move down
        //     if(player.row === world.length - 1){ // at edge of array
        //         console.log(`Edge of array`)
        //     } else {
                
        //         // $(`#R${player.row}C${player.col}`).fadeOut("50");
        //         $(`#R${player.row}C${player.col}`).children().fadeOut(fadeOut, () => {
        //             $(`#R${player.row}C${player.col}`).children().remove(`div`);
        //             player.row++;
        //             $(`#R${player.row}C${player.col}`).append(`<div id="${player.id}" class="pacman" style="display:none;"></div`)
        //             setTimeout(() => {
        //                 console.log(`fading in R${player.row}C${player.col}`)
        //                 $(`#R${player.row}C${player.col}`).children().fadeIn(fadeIn);
        //             }, interval);
        //         });

                
        // //     }
        // } else if (e.keyCode === 38) { //arrow up
        //     // check if we can move down
        //     if (player.row === 0) { // at edge of array
        //         console.log(`Edge of array`)
        //     } else {

        //         // $(`#R${player.row}C${player.col}`).fadeOut("50");
        //         // $(`#R${player.row}C${player.col}`).children().removeClass("pacman");
        //         // $(`#R${player.row - 1}C${player.col}`).children().addClass("pacman");
        //         // player.row--;


        //         $(`#R${player.row}C${player.col}`).children().fadeOut(fadeOut, () => {
        //             $(`#R${player.row}C${player.col}`).children().remove(`div`);
        //             player.row--;
        //             $(`#R${player.row}C${player.col}`).append(`<div id="${player.id}" class="pacman" style="display:none;"></div`)
        //             setTimeout(() => {
        //                 console.log(`fading in R${player.row}C${player.col}`)
        //                 $(`#R${player.row}C${player.col}`).children().fadeIn(fadeIn);
        //             }, interval);
        //         });
        //     }
        // } else if (e.keyCode === 39) { //arrow right
        //     // check if we can move down
        //     if (player.col === world[player.row].length - 1) { // at edge of array
        //         console.log(`Edge of array`)
        //     } else {

        //         // $(`#R${player.row}C${player.col}`).fadeOut("50");
        //         // $(`#R${player.row}C${player.col}`).children().removeClass("pacman");
        //         // $(`#R${player.row}C${player.col + 1}`).children().addClass("pacman");
        //         // player.col++;


        //         $(`#R${player.row}C${player.col}`).children().fadeOut(fadeOut, () => {
        //             $(`#R${player.row}C${player.col}`).children().remove(`div`);
        //             player.col++;
        //             $(`#R${player.row}C${player.col}`).append(`<div id="${player.id}" class="pacman" style="display:none;"></div`)
        //             setTimeout(() => {
        //                 console.log(`fading in R${player.row}C${player.col}`)
        //                 $(`#R${player.row}C${player.col}`).children().fadeIn(fadeIn);
        //             }, interval);
        //         });
        //     }
        // } else if (e.keyCode === 37) { //arrow left
        //     // check if we can move down
        //     if (player.col === 0) { // at edge of array
        //         console.log(`Edge of array`)
        //     } else {

        //         // $(`#R${player.row}C${player.col}`).fadeOut("50");
        //         // $(`#R${player.row}C${player.col}`).children().removeClass("pacman");
        //         // $(`#R${player.row}C${player.col - 1}`).children().addClass("pacman");
        //         // player.col--;


        //         $(`#R${player.row}C${player.col}`).children().fadeOut(fadeOut, () => {
        //             $(`#R${player.row}C${player.col}`).children().remove(`div`);
        //             player.col--;
        //             $(`#R${player.row}C${player.col}`).append(`<div id="${player.id}" class="pacman" style="display:none;"></div`)
        //             setTimeout(() => {
        //                 console.log(`fading in R${player.row}C${player.col}`)
        //                 $(`#R${player.row}C${player.col}`).children().fadeIn(fadeIn);
        //             }, interval);
        //         });
        //     }
        // }
        
    }
})