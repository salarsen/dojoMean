$(document).ready(function(){
    console.log("document loaded");
    // $(document).on('click','button',function(){
    //     $.get("https://api.github.com/users/salarsen", displayName);
    // })
    // Notice that displayName is a function that takes in 1 parameter (this is the data that comes back from the API)
    // function displayName(data) {
    //     console.log(data);
    //     $('body').append(`<p>${data.login}</p>`);
    // }
    //
    // //could call this as well in the "on click" method
    // function readGithub(){
    //     var data = $.get({
    //         url : "https://api.github.com/users/salarsen",
    //         dataType: "json",
    //         success: function(data){
    //             console.log(data);
    //         }
    //     });
    // }

    // readGithub();

    function getStuffFromGithub(resolve,reject){
        var username = document.getElementById('username').value;
        var url = `https://api.github.com/users/${username}`;
        resolve($.get({
            url : url,
            dataType : 'json'
        }));
        //reject null
    }

    $(document).on('click','button',function(){
        var data = new Promise(function(resolve,reject){
            console.log("promise created");
            getStuffFromGithub(resolve,reject);
        });
        data.then(function(data){
            console.log("promise fulfilled");
            console.log(data);
            $('body').append(`<p>${data.login}</p>`);
        });
        data.catch(function(){
            console.log("Promise error");
        });
    });
});
