$(function(){
    updateTable();
    setInterval(updateTable, 5000);
});

function updateTable(){
    $.ajax({
        url: '/api/quiz',
        type: 'GET',
        data: {
            _id: ("" + window.location).split("=")[1]
        },
        success: function(data){
            data = data[0];
            data.score.sort(function(a, b){return b.score - a.score;});
            if(data.score.length == 0){
                $("#board").html("<p><strong>No contestants have entered the quiz</strong></p>");
                return;
            }
            var html = "<table class='table table-striped'><thead><tr><td><strong>Position</strong></td><td><strong>Nickname</strong></td><td><strong>Score</strong></td><td></td></tr></thead><tbody>";
            for(var i = 0; i < data.score.length; i++){
                html += "<tr><td><strong>" + (i + 1) + "</strong></td><td>" + data.score[i].nick + "</td><td>" + data.score[i].score + "</td></tr>";
            }
            html += "</tbody></table>";
            $("#board").html(html);
        },
        error: console.log
    });
}