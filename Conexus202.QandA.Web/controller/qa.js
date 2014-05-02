var qa = {
    init: function() {
        $(document).on('ready', qa.run);
        $('#question_form').on('submit', qa.send_question);
        $("#participant_form").on('submit', qa.save_participant);
        $('#btnsi,#btnno').on('click', qa.set_answer);
        $("#cancel").on("click", qa.clear_data);
        $("#restart").on("click", qa.restart);
        qa.set_validation();
        qa.get_questions();
        //qa.get_report();

        $('.nav li a').on('click', qa.change_menu);

    },
    run: function() {
        //load the first question    
        qa.clear_data();
        $(".timer").html(qa.counter);
        //qa.timer = setInterval(qa.backward, 1000);
    },
    set_validation: function() {
        qa.validator = $("#participant_form").validate({
            errorClass: "alert-error input-xlarge",
            rules: {
                name: {
                    required: true
                },
                //NomUsuario: {
                //    required: true,
                //    remote: config.api_url + "checkusername"
                //},
                email: {
                    required: true,
                    email: true
                },
                identification: {
                    required: true
                }
            },
            messages: {
                name: "Ingrese el nombre",
                email: {
                    required: "Ingrese el email",
                    email: "Formato no valido"
                },
                identification: "Ingrese la identificación"
            }
        });
    },
    save_participant: function(e) {
        e.preventDefault();

        if (!$(this).valid())
            return;

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
                    //Hide the participant form and show the questions
                    $("#participant_form").toggle('slide', {
                        direction: "left",
                        complete: function() {
                            $("#question_form").toggle('slide', { direction: "right" });
                            clearInterval(qa.timer);
                            qa.timer = setInterval(qa.backward, 1000);
                        }
                    });


                }
            }
        });

    },
    set_answer: function(e) {
        qa.answer_value = $(e.currentTarget).text() == "Si" ? true : false;
    },
    send_question: function (e) {
        if(e) e.preventDefault();
        if (!qa.data[qa.current_question]) return;
        //set if the answer is correct

        var is_correct = qa.answer_value == qa.data[qa.current_question].Answer && !qa.timed;
        qa.timed = false;
        var model = new answer_model();
        model.QuestionId = $("#qid").val();
        model.ParticipantId = qa.participant_id;
        model.IsCorrect = is_correct;
        model.Number = qa.data[qa.current_question].Number;
        model.Description = qa.data[qa.current_question].Description;

        //add the answer to the array
        qa.answers.push(model);


        //show next question

        

        $("#question_form").toggle('slide', {
            direction: "left",
            complete: function() {
                //Show the next question
                qa.current_question += 1;

                if (qa.current_question == qa.data.length) {
                    qa.save_answers();

                    return;
                }

                qa.set_question(qa.current_question);
                
                $("#question_form").toggle('slide', { direction: "right" });
            }
        });


    },
    set_question: function(index) {
        
        var question_template = _.template($("#question_template").text());
        var html = question_template({ question: qa.data[index] });

        $("#question_container").html(html);
        clearInterval(qa.timer);
        $(".timer").html(qa.time);
        qa.counter = qa.time;
        qa.timer = setInterval(qa.backward, 1000);
    },
    get_questions: function() {
        utils.ajaxRequest({
            url: String.format(config.api_url, "questions"),
            callback: function(err, data) {
                qa.data = data;
            },
            cache: true,
            async: false
        });
    },
    clear_data: function() {
        $("input[type='text'], input[type='email']").val('');
        qa.current_question = 0;
        qa.answers = [];
        qa.answer_value = true;
        qa.set_question(0);
        clearInterval(qa.timer);
        qa.timed = false;
        qa.validator.resetForm();
        $("#loader").hide();
    },
    set_result: function() {
        var result_template = _.template($("#result_template").text());
        var html = result_template({ answers: qa.answers });

        $("#result_container").html(html);
    },
    restart: function(e) {
        $("#result_view").toggle('slide', {
            direction: "left",
            complete: function() {
                $("#participant_form").toggle('slide', { direction: "right" });
                qa.clear_data();
            }
        });
    },
    save_answers: function() {

        var json_data = JSON.stringify({ answers: qa.answers });

        //send the data to the server
        utils.ajaxRequest({
            url: String.format(config.api_url, "answers"),
            data: json_data,
            type: "POST",
            callback: function(err, ret) {
                if (!err && ret) {
                    //Start again
                    //send the data to the server

                    qa.set_result();
                    $("#result_view").toggle('slide', { direction: "right" });

                }
            }
        });
    },
    get_report: function() {
        utils.ajaxRequest({
            url: String.format(config.api_url, "report"),
            callback: function(err, data) {
                var report_template = _.template($("#report_templaten").text());
                var html = report_template({ participants: data });

                $("#report_view").html(html);
            }
        });
    },
    change_menu: function(e) {

        if ($(this).parent().attr('class') != "active") {
            $(".nav li").removeClass("active");
            $(this).parent().addClass("active");


            $("div.container").hide('slide', { direction: "left" });

            if ($(this).text() == "Reporte") {
                qa.get_report();
            }


            $("#" + $(this).attr('rel')).show('slide', { direction: "right" });
        }
    },
    backward: function() {
        qa.counter -= 1;
        if (qa.counter <= 0) {
            qa.counter = qa.time;
            clearInterval(qa.timer);
            qa.timed = true;
            qa.send_question();
        }
        $(".timer").html(qa.counter);
    },
    data: [],
    current_question: 0,
    answers: [],
    answer_value: true,
    participant_id: '',
    validator: null,
    timer: null,
    counter: 30,
    timed: false,
    time: 30
};

qa.init();
