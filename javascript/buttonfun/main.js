$(document).ready(function(){
    console.log("Document Loaded");
    createButton();
    $('#container').on('click','button',clickButton);
    $('#container').on('mouseenter','button',hoverIn);
    $('#container').on('mouseleave','button',hoverOut);
    $(document).on('keypress',function(event){
        createButton();
    });

});

function createButton(){
    $('#container').append(`<button>ClickMe!</button>`);
}
function clickButton(){
    var color = $(this).css("background-color");
    if(color == "rgb(255, 0, 0)"){
        $(this).css("background-color","blue");
    } else {
        $(this).css("background-color","red");
    }
}

function hoverIn(){
    $(this).data('previousColor',$(this).css("background-color"));
    $(this).css("background-color","green");
}

function hoverOut(){
    $(this).css("background-color",$(this).data("previousColor"));
    $(this).removeData("previousColor");
}
