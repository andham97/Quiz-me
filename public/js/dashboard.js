$(function(){
    $("#newQuiz").click(function(){
        window.location = "/dashboard/quiz/new";
    });
    $("#logout").click(function(){
        $.ajax({
            url: '/api/auth/logout',
            type: "GET",
            success: function () {
                window.location = "/";
            }
        });
    });
    $.ajax({
        url: '/api/quiz',
        type: 'GET',
        data: {
            author: true
        },
        success: function(data){
            var t = "";
            if(data.length != 0)
                t = "<table class='table table-striped'><thead><tr><td>Quiz name</td><td>Time of quiz</td><td></td></tr></thead><tbody>";
            else
                t = "<p>You have no quizzes registered, how about making your first?</p>";
            for(var i = 0; i < data.length; i++){
                t += "<tr><th scope='row'>" + data[i].title + "</th><td>" + new Date(data[i].time) + "</td><td><button class='btn btn-info float-right' onclick='edit(\"" + data[i]._id + "\")'>Edit</button></tdtd>";
            }
            t += "</tbody></table>";
            $("#quizzes").html(t);
        }
    });
});

// Support for editing of quizzes intended, but not implemented
function edit(id){

}