$(function(){
    $.ajax({
        url: '/api/quiz',
        type: 'GET',
        success: function(data){
            data.sort(function(b, a){return new Date(a.time).getTime() - new Date(b.time).getTime()});
            var t = "";
            if(data.length != 0)
                t = "<table class='table table-striped'><thead><tr><td>Quiz name</td><td>Time of quiz</td><td></td></tr></thead><tbody>";
            else
                t = "<h5><a href='/dashboard'>There are no quizzes in existence, how about making the first?</a></h5>";
            var a = false;
            for(var i = 0; i < data.length; i++){
                t += "<tr><th scope='row'>" + data[i].title + "</th><td>" + new Date(data[i].time) + "</td><td><button class='btn btn-info float-right' onclick='" + (new Date(data[i].time).getTime() > new Date().getTime() ? "join(\"" + data[i]._id + "\")'>Join</button>" : "score(\"" + data[i]._id + "\")'>Scoreboard</button>") + "</tdtd>";
            }
            t += "</tbody></table>";
            $("#quizzes").html(t);
        }
    })
});

function score(id){
    window.location = "/attend/score?id=" + id;
}

function join(id){
    window.location = "/attend/quiz?id=" + id;
}