$(function(){
    $("#lusername").keyup(enterPress("#butLogin"));
    $("#lpassword").keyup(enterPress("#butLogin"));
    $("#rusername").keyup(enterPress("#butRegister"));
    $("#rpassword").keyup(enterPress("#butRegister"));
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

function enterPress(sel){
    return function(event){
        if(event.keyCode == 13){
            $(sel).click();
        }
    }
}

function reset(){
    $("#rpassword").val("");
    $("#rusername").val("");
    $("#lpassword").val("");
    $("#lusername").val("");
    $("#registerError").html("");
    $("#loginError").html("");
    $("#register").css("display", "none");
    $("#login").css("display", "none");
    $("#registerError").html("");
    $("#loginError").html("");
    switch(window.location.hash){
        case '#register':
            $("#register").css("display", "block");
            break;
        case '#login':
            $("#login").css("display", "block");
            break;
    }
}