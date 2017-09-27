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
    for(var i = 0; i < base.length; i++){
        var question = {};
        var txt = $(base[i]).find("input[data-type='question']").val();
        var time = Number($(base[i]).find("input[data-type='questionTime']").val());
        var img = $(base[i]).find("input[data-type='questionImage']").val();
        var a = getAlternative(base[i]);
        var alt = a[0];
        var c = a[1];
        question.text = txt;
        question.time = time;
        question.alternative = alt;
        question.correct = c;
        question.image = img;
        qsts.push(question);
    }
    var quiz = {};
    quiz.title = $("#title").val();
    quiz.time = new Date($("#time").val()).getTime();
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
        console.log(c);
        console.log(txt);
        ret.push(txt);
        if(c)
            crr.push(i);
    }
    return [ret, crr];
}