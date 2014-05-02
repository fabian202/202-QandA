var qa = {
    init: function() {
        $(document).on('ready', qa.run);        
        $('#question_form').on('submit', qa.send_question);
        $("#participant_form").on('submit', qa.save_participant);
        $('#btnsi,#btnno').on('click', qa.set_answer);
        $("#cancel").on("click", qa.clear_data);
        $("#restart").on("click", qa.restart);
        qa.get_questions();
    },
    run: function (e) {
        //load the first question    
        qa.clear_data();        
    },
    save_participant: function(e) {
        e.preventDefault();

        var participant = new participant_model();

        participant.Name = $("#name").val();
        participant.Identification = $("#identification").val();
        participant.Email = $("#email").val();

        qa.participant_id = 0;

        var json_data = JSON.stringify({ participant: participant });

        //send the data to the server
        utils.ajaxRequest({
            url: String.format(config.api_url, "participant"),
            data: json_data,
            type: "POST",
            callback: function(err, ret) {
                if (!err && ret) {
                    qa.participant_id = ret;
                    console.log(ret);
                    //Hide the participant form and show the questions
                    $("#participant_form").toggle('slide', {
                        direction: "left", complete: function () {
                            $("#question_form").toggle('slide', { direction: "right" });
                        }
                    });
                    
                   
                }
            }
        });

    },
    set_answer: function(e) {
        qa.answer_value = $(e.currentTarget).text() == "Si" ? true : false;
    },
    send_question: function(e) {
        e.preventDefault();        

        //set if the answer is correct
        var is_correct = qa.answer_value == qa.data[qa.current_question].Answer;

        var model = new answer_model();
        model.QuestionId = $("#qid").val();
        model.ParticipantId = qa.participant_id;
        model.IsCorrect = is_correct;
        model.Number = qa.data[qa.current_question].Number;
        model.Description = qa.data[qa.current_question].Description;

        //add the answer to the array
        qa.answers.push(model);

        //console.log(JSON.stringify(qa.answers));

        //show next question
        
        $("#question_form").toggle('slide', { direction: "left", complete: function() {
            //Show the next question
            qa.current_question += 1;

            if (qa.current_question == qa.data.length) {
                qa.save_answers();
                
                return;
            }

            qa.set_question(qa.current_question);
            $("#question_form").toggle('slide', { direction: "right" });
        } });

        
    },
    set_question: function (index) {
        
        var question_template = _.template($("#question_template").text());
        var html = question_template({question: qa.data[index]});

        $("#question_container").html(html);
    },
    get_questions: function() {
        utils.ajaxRequest({
            url: String.format(config.api_url, "questions"),
            callback: function(err, data) {                
                qa.data = data;
            },
            cache: true,
            async:false
    });
    },
    clear_data: function() {
        $("input[type='text']").val('');
        qa.current_question = 0;
        qa.answers = [];
        qa.answer_value = true;
        qa.set_question(0);
    },
    set_result: function() {
        var result_template = _.template($("#result_template").text());
        var html = result_template({ answers: qa.answers });

        $("#result_container").html(html);
    },
    restart: function(e) {
        $("#result_view").toggle('slide', { direction: "left", complete:function() {
            $("#participant_form").toggle('slide', { direction: "right" });
            qa.clear_data();
        } });                        
    },
    save_answers: function () {

        var json_data = JSON.stringify({ answers : qa. answers });

        //send the data to the server
        utils.ajaxRequest({
            url: String.format(config.api_url, "answers"),
            data: json_data,
            type: "POST",
            callback: function (err, ret) {
                if (!err && ret) {                    
                    //Start again
                    //send the data to the server

                    qa.set_result();
                    $("#result_view").toggle('slide', { direction: "right" });

                }
            }
        });
    },
    data: [],
    current_question: 0,
    answers: [],
    answer_value: true,
    participant_id:''
};

qa.init();
