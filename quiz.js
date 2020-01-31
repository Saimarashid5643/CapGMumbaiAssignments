(function () {

    var quesCounter = 0;
    var selectedOptions = [];
    var quizContainer = $('#quiz');
    var answers =["New Delhi", "Washington DC","28", "Mango","Cricket", "Carrom, Table Tennis","Mercedes, BMW" ,"Pens, Books", "CPU, Monitor, Keyboard", "Gorilla,Lion,Tiger,Elephant" ];
    var checkedAnswers =[];
    var questions = [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Bangalore", "Bhopal"],
            value: ["Mumbai", "NewDelhi", "Bangalore", "Bhopal"],
            answer: "NewDelhi"
         },
        {
            question: "What is the capital of USA?",
            options: ["Washington DC", "Atlanta", "Los Angeles", "New York"],
            value: ["WashingtonDC", "Atlanta", "LosAngeles", "NewYork"],
            answer: "WashingtonDC"
            
        },
        {
            question: "How many states does India have?",
            options: ["29", "28", "30", "27"],
            value: ["29", "28", "30", "27"],
            answer: "28"
            

        },
        {
            question: "Which of the following a fruit?",
            options: ["Cauliflower", "Cabbage", "Carrot", "Mango"],
            value: ["Cauliflower", "Cabbage", "Carrot", "Mango"],
            answer: "Mango"
            
        },
        {
            question: "What is the game that Sachin Tendulkar plays?",
            options: ["Football", "Golf", "Cricket", "Tennis"],
            value: ["Football", "Golf", "Cricket", "Tennis"],
            answer: "Cricket"
           
        },

        {
            question: "Which of the following are indoor sports?",
            options: ["Carrom", "Golf", "Cricket", "Table Tennis"],
            value: ["Carrom", "Golf", "Cricket", "TableTennis"],
            answer: "CarromTableTennis"
            
        },
        {
            question: "Select the car companies?",
            options: ["Puma", "L&T", "Mercedes", "BMW"],
            value: ["Puma", "L&T", "Mercedes", "BMW"],
            answer: "MercedesBMW"
        },
        {
            question: "Select the stationary items?",
            options: ["Pens", "Spoons", "Books", "Phones"],
            value: ["Pens", "Spoons", "Books", "Phones"],
            answer: "PensBooks"
            
        },
        {
            question: "What are the parts of a computer?",
            options: ["Door", "CPU", "Monitor", "Keyboard"],
            value: ["Door", "CPU", "Monitor", "Keyboard"],
            answer: "CPUMonitorKeyboard"
        },
        {
            question: "Which of the following are wild animals?",
            options: ["Gorilla", "Lion", "Tiger", "Elephant"],
            value: ["Gorilla", "Lion", "Tiger", "Elephant"],
            answer: "GorillaLionTigerElephant"
        }
    ];
    $(document).ready(function () {
        $('#next').hide();
        $('#submit').hide();
        $('#dialog').hide();


    })
       
    $('#start').click(function () {
        $('#start').hide();
        nextQuestion();
        $('#next').show();
        // $('#submit').show();


    });

    $('#next').click(function () {
        choosenOption();

        if (selectedOptions[quesCounter] === undefined || selectedOptions[quesCounter] === "") {
            $(function () {
                $("#dialog").dialog({
                    appendTo: "#question",
                    buttons: {
                        OK: function () {
                            $(this).dialog("close");
                            selectFlag = 0;
                        }
                    },
                    position: {
                        my: "center",
                        at: "center"
                    },
                    hide: "puff",
                    show: "slide",
                });



            });


        }
        else {

            quesCounter++;
            $("#dialog").hide();
            nextQuestion();
        }
    });

    $('#submit').click(function () {
        choosenOption();
        quizContainer.fadeOut(function () {
            $('#question').remove();
        });
        var scores = displayResult();
        quizContainer.append(scores).fadeIn();

    });

    function printResult(index){
        var element = $('<div style="color:white;">', { id: 'question' });
        var question = $('<h4>Question No.' + (index + 1) +':  ' + questions[index].question + '<h4>');
        element.append(question);

        if(selectedOptions[index] === undefined){
            var answer= $('<p><b>Correct answer is : </b>' + answers[index] + '</p>');
            var yourAns =  $('<p style="color:teal;"><b>You have not answered this question.</b></p><br>');
        }
        else{
            var answer= $('<p><b>Correct answer is : </b>' + answers[index] + '</p>');
            var yourAns = $('<p><b>Your answer is : </b>' + checkedAnswers[index] + '</p><br>');
        }
       
        element.append(answer);        
        element.append(yourAns);
       return element;
    }

    function createElement(index) {
        var element = $('<div>', { id: 'question' });
        var header = $('<h2>Question No.' + (index + 1) + ':</h2>');
        element.append(header);

        var question = $('<p>').append(questions[index].question);
        element.append(question);

        if (quesCounter < 5) {
            var radio = radioButtons(index);
            element.append(radio);
        }
        else {
            var check = checkBoxes(index);
            element.append(check);
        }


        return element;
    }


    function radioButtons(index) {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].options.length; i++) {
            item = $('<li>');
            input = '<input type = "radio" name = "answer"  value =' + questions[index].value[i] +'>';
            input += questions[index].options[i];
            item.append(input);
            radioItems.append(item);
        }
        return radioItems;
    }


    function checkBoxes(index) {
        var checkItems = $('<ul>');
        var item1;
        var input1 = '';
        for (var i = 0; i < questions[index].options.length; i++) {
            item1 = $('<li>');
            input1 = '<input type ="checkbox" name = "answer" value =' + questions[index].value[i] + '>';
            input1 += questions[index].options[i];
            item1.append(input1);
            checkItems.append(item1);
        }
        checkItems.append('<p style="color:royalblue">Note- This question has multiple answers.</p>');
        return checkItems;

    }


    function choosenOption() {
        var inputValue = "";
        var inputArray=[];
        var inputArray1=[];
        if (quesCounter < 5) {
            selectedOptions[quesCounter] = $('input[name="answer"]:checked').val();
            for(var i =0; i<4; i++){
                if(selectedOptions[quesCounter]== questions[quesCounter].value[i]){
                    checkedAnswers[quesCounter]= questions[quesCounter].options[i];
                }
            }
         
        }
        else {

            $.each($('input[name="answer"]:checked'), function () {
                inputValue = inputValue + $(this).val();
                inputArray.push($(this).val());
            });
          
            
            for(var i =0; i<4; i++)
            {
                if(inputArray[i]===questions[quesCounter].value[0])
                {
                    inputArray1.push(questions[quesCounter].options[0]);
                } 
                else if(inputArray[i]===questions[quesCounter].value[1]){
                    inputArray1.push(questions[quesCounter].options[1]);
                }
                else if(inputArray[i]===questions[quesCounter].value[2]){
                    inputArray1.push(questions[quesCounter].options[2]);
                }
                else if(inputArray[i]===questions[quesCounter].value[3]){
                    inputArray1.push(questions[quesCounter].options[3]);
                }
                
            }
            selectedOptions[quesCounter] = inputValue;
            checkedAnswers[quesCounter]= inputArray1.join(",");
           
        }


    }


    function nextQuestion() {
        quizContainer.fadeOut(function () {
            $('#question').remove();
            if (quesCounter < questions.length) {
                var nextQuestion = createElement(quesCounter);
                quizContainer.append(nextQuestion).fadeIn();
                $('#next').show();
                if(quesCounter==questions.length-1)
                {
                    $('#next').hide();
                   $('#submit').show();
                }
            } 
                // $('#submit').show();
            
            else {
                var scores = displayResult();
                quizContainer.append(scores).fadeIn();
            }
        });
    }

    function displayResult() {
        var score = $('<div>', { id: 'question' });
        var correct = 0;
        
        for (var i = 0; i < answers.length; i++) {
            
            var list = printResult(i);
            score.append(list);

            if (selectedOptions[i] === questions[i].answer) {
                correct++;
            }
        }
        score.prepend('<h2 style="color:saddlebrown;"> Your score is <b>' + correct + '</b> out of <b>' + questions.length + '</b> </h2><br>');
        
        $('#next').hide();
        $('#submit').hide();
        return score;

    }
})();