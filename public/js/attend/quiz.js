var curQuiz, quizInterval, curQuestion = -1, qstStart;

$(function(){
    $("#quiz").hide();
    $("#nick").keyup(function(event){
        if(event.keyCode == 13){
            $("#addNick").click();
        }
    });
    var quizId = ("" + window.location).split('=')[1];
    $("#addNick").click(function(){
        $.ajax({
            url: '/api/quiz/live/join',
            type: 'POST',
            data: {
                id: quizId,
                nick: $("#nick").val()
            },
            success: function(){
                $.ajax({
                    url: '/api/quiz',
                    type: 'GET',
                    data: {
                        _id: quizId
                    },
                    success: function(data){
                        $("#nickDiv").hide();
                        $("#quiz").show();
                        curQuiz = data[0];
                        quizInterval = setInterval(quizCountDown, 100);
                    },
                    error: console.error
                });
            },
            error: function(err){
                console.log(err);
                $("#error").html("<strong>" + err.responseText + "</strong>");
            }
        });
    });
});

function quizCountDown(){
    var quizDate = new Date(curQuiz.time);
    var curDate = new Date();
    if(Math.floor((quizDate.getTime() - curDate.getTime()) / 1000) <= 0){
        clearInterval(quizInterval);
        nextQuestion();
        quizInterval = setInterval(quizLoop, 100);
    }
    else {
        $("#timeLeft").html("<h1>Time left to quiz start: " + timeStringBetween(quizDate, curDate) + "</h1>");
    }
}

function quizLoop(){
    if(Math.floor((qstStart.getTime() - new Date().getTime()) / 1000) <= 0)
        nextQuestion();
    else
        $("#timeLeft").html("<h1>Question time left: " + timeStringBetween(new Date(), qstStart) + "</h1>");
}

function nextQuestion(){
    if(curQuestion >= 0){
        var val = $("input[name=answers]:checked").val();
        if(!val)
            val = -1;
        $.ajax({
            url: '/api/quiz/live/answer',
            type: 'POST',
            data: {
                id: ("" + window.location).split('=')[1],
                curQuestion: curQuestion,
                answer: val
            },
            error: console.error
        });
    }
    curQuestion++;
    if(curQuestion >= curQuiz.questions.length){
        clearInterval(quizInterval);
        finish();
        return;
    }
    qstStart = new Date(new Date().getTime() + (curQuiz.questions[curQuestion].time * 1000));
    var html = (curQuiz.questions[curQuestion].image != "" ? "<img style='height: 200px; width: 200px;' src='" + curQuiz.questions[curQuestion].image + "'><br>" : "") + "<h3>" + curQuiz.questions[curQuestion].text + "</h3>";
    for(var i = 0; i < curQuiz.questions[curQuestion].alternative.length; i++) {
        html += "<div class=\"input-group mb-2 mb-sm-0\" data-type=\"alternative\">" +
            "<div class=\"input-group-addon\">" +
            "<input type=\"radio\" name='answers' value='" + i + "'>" +
            "</div>" +
            "<input type=\"text\" class=\"form-control\" id=\"inlineFormInputGroupUsername\" value=\"" + curQuiz.questions[curQuestion].alternative[i] + "\" readonly>" +
            "</div>";
    }
    html += "<div class='row justify-content-center'><div class='col-sm-1 mr-auto'><button type='button' id='next' class='btn btn-info'>Next</button></div></div>";
    $("#questions").html(html);
    $("#timeLeft").html("<h1>Question time left: " + timeStringBetween(new Date(), qstStart) + "</h1>");
    $("#next").click(nextQuestion);
}

function finish(){
    $("#timeLeft").html("");
    $("#questions").html("<div class='row justify-content-center'><div class='col-sm-8' style='text-align: center;'><h1>No more questions, continue to leaderboard</h1><button id='leaderboard' class='btn btn-info'>Leaderboard</button></div></div>");
    $("#leaderboard").click(function(){
        window.location = '/attend/score?id=' + ("" + window.location).split('=')[1];
    });
}

function timeStringBetween(a, b){
    var delta = Math.abs(a - b) / 1000;

    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    var seconds = Math.floor(delta % 60);

    return days + "d " + hours + "h " + minutes + "min " + seconds + "sec";
}