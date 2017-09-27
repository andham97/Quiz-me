var question, alternative, num_qst = 0, a;

$(function(){
    question = $("#question");
    alternative = $("#alternative");
    $("#question").remove();
    $("#alternative").remove();
    addQuestion();

    $("#save").click(save);
    $("#addQst").click(addQuestion);
});

function addQuestion(){
    num_qst++;
    $("#qst_cnt").append("<div data-type='content'><h3>Question " + num_qst + "</h3>" + question[0].innerHTML + "</div><br>");
    $($("input[data-lastalt='true']")[$("input[data-lastalt='true']").length-1]).click(addAlternative);
    $($("input[data-lastalt='true']")[$("input[data-lastalt='true']").length-1]).on('keyup', addAlternative);

}

function addAlternative(){
    $(this).parent().before(alternative[0].innerHTML);
    $(this).parent().prev().find('input[type=text]').focus().val($(this).val());
    $(this).parent().prev().find('input[type=checkbox]')[0].checked = $(this).prev().find('input')[0].checked;
    $(this).val("");
    $(this).prev().find('input')[0].checked = false;

}

function save(){
    var base = $("#qst_cnt").find("div[data-type='content']");
    var qsts = [];
    var quiz = {};
    quiz.title = $("#title").val();
    if(quiz.title == ""){
        error("The quiz must have a name");
        return;
    }
    quiz.time = new Date($("#time").val()).getTime();
    if(isNaN(quiz.time)){
        error("The quiz must have a valid date and time");
        return;
    }
    for(var i = 0; i < base.length; i++){
        var question = {};
        var txt = $(base[i]).find("input[data-type='question']").val();
        if(txt == ""){
            error("The question field at question " + (i + 1) + " is empty, please fill in a question text");
            return;
        }
        var time = Number($(base[i]).find("input[data-type='questionTime']").val());
        if(time <= 0){
            error("The time parameter in question " + (i + 1) + " is faulty, please provide a time greater than 0");
            return;
        }
        var img = $(base[i]).find("input[data-type='questionImage']").val();
        var a = getAlternative(base[i]);
        var alt = a[0];
        var c = a[1];
        question.text = txt;
        question.time = time;
        question.alternative = alt;
        question.correct = c;
        question.image = img;
        if(!question.alternative || question.alternative.length == 0){
            error("You must provide at least one alternative for question " + (i + 1));
            return;
        }
        if(!question.correct || question.correct.length == 0){
            error("You must provide at least one correct alternative for question " + (i + 1));
            return;
        }
        qsts.push(question);
    }
    quiz.questions = qsts;
    $.ajax({
        url: '/api/quiz',
        type: 'POST',
        data: quiz,
        success: function(){
            window.location = "/dashboard";
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getAlternative(b){
    var base = $(b).find("div[data-type='alternative']");
    var ret = [];
    var crr = [];
    a = base[0];
    for(var i = 0; i < base.length - 1; i++){
        var txt = $(base[i]).find('input[type=text]').val();
        var c = $(base[i]).find('input[type=checkbox]')[0].checked;
        if(txt == "")
            continue;
        ret.push(txt);
        if(c)
            crr.push(i);
    }
    return [ret, crr];
}

function error(msg){
    $("#error").html(msg);
}