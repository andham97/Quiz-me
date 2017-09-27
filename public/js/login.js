$(function(){
    if(window.location.hash == "")
        window.location += "#login";
    switch(window.location.hash){
        case '#register':
            $("#register").css("display", "block");
            break;
        case '#login':
            $("#login").css("display", "block");
            break;
    }
    $("#butLogin").click(function(){
        $.ajax({
            url: "/api/auth",
            type: "GET",
            data: {
                username: $("#lusername").val(),
                password: $("#lpassword").val()
            },
            success: function(){
                window.location = "/dashboard";
            },
            error: function(err) {
                console.log(err);
                $("#loginError").html(err.responseText);
            }
        });
    });
    $("#butRegister").click(function () {
        var username = $("#rusername").val();
        var password = $("#rpassword").val();
        if (username == "" && password == ""){
            $("#registerError").html("The username and password fields cannot be empty");
            return;
        }
        $.ajax({
            url: "/api/auth",
            type: "POST",
            data: {
                username: username,
                password: password
            },
            success: function () {
                window.location.hash = "#login";
                reset();
            },
            error: function (err) {
                console.log(err);
                $("#registerError").html(err.responseText);
            }
        });
    });
    $("#mvLogin").click(function () {
        window.location.hash = "#login";
        reset();
    });
    $("#mvReg").click(function () {
        window.location.hash = "#register";
        reset();
    });
});

function reset(){
    $("#register").css("display", "none");
    $("#login").css("display", "none");
    switch(window.location.hash){
        case '#register':
            $("#register").css("display", "block");
            break;
        case '#login':
            $("#login").css("display", "block");
            break;
    }
}