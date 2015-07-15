var puntaje = 0;
var cant = 0;
var j = 0;
var answerglob;
var jsonglob;
var style;
var user_question;


if (Ti.Platform.name === 'iPhone OS') {
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
    style = Ti.UI.ActivityIndicatorStyle.DARK;
}
var activityIndicator = Ti.UI.createActivityIndicator({
    style: style,
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE
});


var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'mario.mp3');
var sound = Ti.Media.createSound({
    url: file1
});
sound.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;


(function() {

    $.question.add(activityIndicator);
    if (Titanium.Network.networkTypeName != 'WIFI') {

        loadQuestions();
    } else {
        loadQuestionsOff();
    }

})();

function loadQuestionsOff(e) {
    var recoverQuestion = Alloy.createCollection("question");
    recoverQuestion.fetch({
        query: "SELECT * FROM question"
    });
	
	alert(recoverQuestion.length);
    var label = Ti.UI.createLabel({
        top: "25%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        paddingleft: 20,
        paddingRight: 20,
        text: recoverQuestion.at(j).get("question"),
        width: "75%",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        }
    });

    var recoverAnswers = Alloy.createCollection("answers");
    recoverAnswers.fetch({
        query: "SELECT * FROM answers WHERE question=" + recoverQuestion.at(j).get('id_question')
    });

    var answer1 = false;
    var answer2 = false;
    var answer3 = false;
    var answer4 = false;

    if (recoverAnswers.at(0).get('isCorrect') == 'true') {
        answer1 = true;
    }
    if (recoverAnswers.at(1).get('isCorrect') == 'true') {
        answer2 = true;
    }
    if (recoverAnswers.at(2).get('isCorrect') == 'true') {
        answer3 = true;
    }
    if (recoverAnswers.at(3).get('isCorrect') == 'true') {
        answer4 = true;
    }



    if (recoverAnswers.at(0).get('type') == "img" || recoverAnswers.at(0).get('type') == "audio") {


        $.question.remove(label);
        j = j + 1;
        loadQuestionsOff();

    } else {
        $.question.add(label);
        var res1 = Ti.UI.createButton({
            title: recoverAnswers.at(0).get("textAnswer"),
            top: '15%',
            width: "75%",
            height: "16%",
            borderRadius: "20px",
            backgroundColor: "#ffae00",
            color: "#fff"
        });
        var res2 = Ti.UI.createButton({
            title: recoverAnswers.at(1).get("textAnswer"),
            top: '35%',
            width: "75%",
            height: "16%",
            borderRadius: "20px",
            backgroundColor: "#ffae00",
            color: "#fff"
        });
        var res3 = Ti.UI.createButton({
            title: recoverAnswers.at(2).get("textAnswer"),
            top: '55%',
            width: "75%",
            height: "16%",
            borderRadius: "20px",
            backgroundColor: "#ffae00",
            color: "#fff"
        });
        var res4 = Ti.UI.createButton({
            title: recoverAnswers.at(3).get("textAnswer"),
            top: '75%',
            width: "75%",
            height: "16%",
            borderRadius: "20px",
            backgroundColor: "#ffae00",
            color: "#fff"
        });

        $.answers.add(res1);
        $.answers.add(res2);
        $.answers.add(res3);
        $.answers.add(res4);

        res1.addEventListener("click", function() {

            if (answer1) {

                res1.setBackgroundColor('green');
                puntaje = puntaje + 10;

                actualizar2();

            } else {
                res1.setBackgroundColor('red');

                if (answer2) {
                    res2.setBackgroundColor('green');
                }
                if (answer3) {
                    res3.setBackgroundColor('green');
                }
                if (answer4) {
                    res4.setBackgroundColor('green');
                }
                sumarScoreUserOff();
                mostrarBotonContinue();


            }

        });
        res2.addEventListener("click", function() {

            if (answer2) {
                res2.setBackgroundColor('green');
                puntaje = puntaje + 10;

                actualizar2();
            } else {
                res2.setBackgroundColor('red');

                if (answer1) {
                    res1.setBackgroundColor('green');
                }
                if (answer3) {
                    res3.setBackgroundColor('green');
                }
                if (answer4) {
                    res4.setBackgroundColor('green');
                }
                sumarScoreUserOff();
                mostrarBotonContinue();

            }
        });
        res3.addEventListener("click", function() {

            if (answer3) {
                res3.setBackgroundColor('green');
                puntaje = puntaje + 10;

                actualizar2();


            } else {
                res3.setBackgroundColor('red');

                if (answer1) {
                    res1.setBackgroundColor('green');
                }
                if (answer2) {
                    res2.setBackgroundColor('green');
                }
                if (answer4) {
                    res4.setBackgroundColor('green');
                }
                sumarScoreUserOff();
                mostrarBotonContinue();
            }
        });
        res4.addEventListener("click", function() {

            if (answer4) {
                res4.setBackgroundColor('green');
                puntaje = puntaje + 10;
                actualizar2();
            } else {
                res4.setBackgroundColor('red');


                if (answer1) {
                    res1.setBackgroundColor('green');
                }
                if (answer2) {
                    res2.setBackgroundColor('green');
                }
                if (answer3) {
                    res3.setBackgroundColor('green');
                }
                sumarScoreUserOff();
                mostrarBotonContinue();

            }
        });

        function actualizar2(e) {


            setTimeout(function(evt) {
                $.answers.remove(res1);
                $.answers.remove(res2);
                $.answers.remove(res3);
                $.answers.remove(res4);

                var correcto = Ti.UI.createLabel({
                    top: "30%",
                    text: "¡Correcto!",
                    font: {
                        fontWeight: "bold",
                        fontSize: 40
                    },
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: "75%",
                    color: "green"
                });

                $.answers.add(correcto);

                var jugar = Ti.UI.createButton({
                    title: 'Continuar',
                    width: "100%",
                    height: "100%"
                });
                jugar.setBackgroundColor('#ff6000');
                $.continuar.add(jugar);

                jugar.addEventListener("click", function() {
                    $.question.remove(label2);
                    $.question.remove(label);
                    $.continuar.remove(jugar);
                    $.answers.remove(correcto);
                });

                jugar.addEventListener("click", loadQuestionsOff);

            }, 1000);


            var label2 = Ti.UI.createLabel({
                bottom: "10%",
                color: "#ddd",
                paddingRight: 20
            });
            $.question.add(label2);

        }

        function mostrarBotonContinue(e) {

            var finalizar = Ti.UI.createButton({
                title: 'Finalizar',
                width: "100%",
                height: "100%",
                backgroundColor: "ff6000"
            });

            var incorrecto = Ti.UI.createLabel({
                top: "30%",
                text: "¡Incorrecto!",
                font: {
                    fontWeight: "bold",
                    fontSize: 40
                },
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: "75%",
                color: "red"
            });


            setTimeout(function(evt) {
                $.answers.remove(res1);
                $.answers.remove(res2);
                $.answers.remove(res3);
                $.answers.remove(res4);
                label.hide();
                $.continuar.add(finalizar);
                $.answers.add(incorrecto);

            }, 1000);

            finalizar.addEventListener("click", function() {
                var main = Alloy.createController('main').getView();
                main.open();

            });

        }

    }


    j = j + 1;
}

function loadQuestions(e) {


    var url = "http://sheltered-mesa-1621.herokuapp.com/api/questions";
    var json;
    var answers;
    var scoreUser;
    var probadobool = false;
    if (j == 1 || j == 6) {
        j = j + 1;
    }

    if ($.answers.children.length == 0) {
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                json = JSON.parse(this.responseText);
                if (json.length <= j) {
                    var w = Alloy.createController('main').getView();
                    w.open();
                }

                var label = Ti.UI.createLabel({
                    top: "25%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "white",
                    paddingleft: 20,
                    paddingRight: 20,
                    text: j + ' ' + json[j].question,
                    width: "75%",
                    font: {
                        fontSize: 20,
                        fontWeight: "bold"
                    }
                });



                //API segunda llamada

                var api = Ti.Network.createHTTPClient({
                    onload: function(e) {

                        answers = JSON.parse(this.responseText);

                        if (answers.length == 4) {

                            if (answers[0].type == "audio") {
                                answerglob = JSON.parse(this.responseText);
                                jsonglob = json;
                                loadQuestionsinSound();
                            } else {
                                if (answers[0].type == "img") {
                                    $.question.add(label);



                                    var res1 = Titanium.UI.createImageView({
                                        image: "http://sheltered-mesa-1621.herokuapp.com/api/questions/" + json[j].id + "/answers/" + answers[0].id + "/file",
                                        height: '50%',
                                        width: '50%',
                                        top: 0,
                                        left: 0,
                                        display: 'inline'
                                    });

                                    var res2 = Titanium.UI.createImageView({
                                        image: "http://sheltered-mesa-1621.herokuapp.com/api/questions/" + json[j].id + "/answers/" + answers[1].id + "/file",
                                        height: '50%',
                                        width: '50%',
                                        top: 0,
                                        right: 0,
                                        display: 'inline'
                                    });
                                    var res3 = Titanium.UI.createImageView({
                                        image: "http://sheltered-mesa-1621.herokuapp.com/api/questions/" + json[j].id + "/answers/" + answers[2].id + "/file",
                                        height: '50%',

                                        width: '50%',
                                        bottom: 0,
                                        left: 0,
                                        display: 'inline'
                                    });
                                    var res4 = Titanium.UI.createImageView({
                                        image: "http://sheltered-mesa-1621.herokuapp.com/api/questions/" + json[j].id + "/answers/" + answers[3].id + "/file",
                                        height: '50%',
                                        width: '50%',
                                        bottom: 0,
                                        right: 0,
                                        display: 'inline'
                                    });



                                } else {
                                    $.question.add(label);
                                    var res1 = Ti.UI.createButton({
                                        title: answers[0].textAnswer,
                                        top: '15%',
                                        width: "75%",
                                        height: "16%",
                                        borderRadius: "20px",
                                        backgroundColor: "#ffae00",
                                        color: "#fff"
                                    });
                                    var res2 = Ti.UI.createButton({
                                        title: answers[1].textAnswer,
                                        top: '35%',
                                        width: "75%",
                                        height: "16%",
                                        borderRadius: "20px",
                                        backgroundColor: "#ffae00",
                                        color: "#fff"
                                    });
                                    var res3 = Ti.UI.createButton({
                                        title: answers[2].textAnswer,
                                        top: '55%',
                                        width: "75%",
                                        height: "16%",
                                        borderRadius: "20px",
                                        backgroundColor: "#ffae00",
                                        color: "#fff"
                                    });
                                    var res4 = Ti.UI.createButton({
                                        title: answers[3].textAnswer,
                                        top: '75%',
                                        width: "75%",
                                        height: "16%",
                                        borderRadius: "20px",
                                        backgroundColor: "#ffae00",
                                        color: "#fff"
                                    });
                                }

                                $.answers.add(res1);
                                $.answers.add(res2);
                                $.answers.add(res3);
                                $.answers.add(res4);
                                res1.addEventListener("click", function() {

                                    if (answers[0].isCorrect) {
                                        res1.setBackgroundColor('green');
                                        puntaje = puntaje + 10;

                                        actualizar();

                                    } else {
                                        res1.setBackgroundColor('red');

                                        if (answers[1].isCorrect) {
                                            res2.setBackgroundColor('green');
                                        }
                                        if (answers[2].isCorrect) {
                                            res3.setBackgroundColor('green');
                                        }
                                        if (answers[3].isCorrect) {
                                            res4.setBackgroundColor('green');
                                        }
                                        sumarScoreUser();
                                        mostrarBotonContinue();


                                    }

                                });
                                res2.addEventListener("click", function() {

                                    if (answers[1].isCorrect) {
                                        res2.setBackgroundColor('green');
                                        puntaje = puntaje + 10;

                                        actualizar();
                                    } else {
                                        res2.setBackgroundColor('red');

                                        if (answers[0].isCorrect) {
                                            res1.setBackgroundColor('green');
                                        }
                                        if (answers[2].isCorrect) {
                                            res3.setBackgroundColor('green');
                                        }
                                        if (answers[3].isCorrect) {
                                            res4.setBackgroundColor('green');
                                        }
                                        sumarScoreUser();
                                        mostrarBotonContinue();

                                    }
                                });
                                res3.addEventListener("click", function() {

                                    if (answers[2].isCorrect) {
                                        res3.setBackgroundColor('green');
                                        puntaje = puntaje + 10;

                                        actualizar();


                                    } else {
                                        res3.setBackgroundColor('red');

                                        if (answers[0].isCorrect) {
                                            res1.setBackgroundColor('green');
                                        }
                                        if (answers[1].isCorrect) {
                                            res2.setBackgroundColor('green');
                                        }
                                        if (answers[3].isCorrect) {
                                            res4.setBackgroundColor('green');
                                        }
                                        sumarScoreUser();
                                        mostrarBotonContinue();
                                    }
                                });
                                res4.addEventListener("click", function() {

                                    if (answers[3].isCorrect) {
                                        res4.setBackgroundColor('green');
                                        puntaje = puntaje + 10;

                                        actualizar();
                                    } else {
                                        res4.setBackgroundColor('red');


                                        if (answers[0].isCorrect) {
                                            res1.setBackgroundColor('green');
                                        }
                                        if (answers[1].isCorrect) {
                                            res2.setBackgroundColor('green');
                                        }
                                        if (answers[2].isCorrect) {
                                            res3.setBackgroundColor('green');
                                        }
                                        sumarScoreUser();
                                        mostrarBotonContinue();

                                    }
                                });

                                function actualizar(e) {

                                    sound.play();
                                    setTimeout(function(evt) {
                                        $.answers.remove(res1);
                                        $.answers.remove(res2);
                                        $.answers.remove(res3);
                                        $.answers.remove(res4);

                                        var correcto = Ti.UI.createLabel({
                                            top: "30%",
                                            text: "¡Correcto!",
                                            font: {
                                                fontWeight: "bold",
                                                fontSize: 40
                                            },
                                            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                                            width: "75%",
                                            color: "green"
                                        });

                                        $.answers.add(correcto);

                                        var jugar = Ti.UI.createButton({
                                            title: 'Continuar',
                                            width: "100%",
                                            height: "100%"
                                        });
                                        jugar.setBackgroundColor('#ff6000');
                                        $.continuar.add(jugar);

                                        jugar.addEventListener("click", function() {
                                            $.question.remove(label2);
                                            $.question.remove(label);
                                            $.continuar.remove(jugar);
                                            $.answers.remove(correcto);
                                        });

                                        jugar.addEventListener("click", loadQuestions);

                                    }, 1000);


                                    var label2 = Ti.UI.createLabel({
                                        bottom: "10%",
                                        color: "#ddd",
                                        paddingRight: 20,
                                        text: 'Autor: ' + json[j].user.email
                                    });
                                    $.question.add(label2);

                                };

                                function mostrarBotonContinue(e) {

                                    var finalizar = Ti.UI.createButton({
                                        title: 'Finalizar',
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "ff6000"
                                    });

                                    var incorrecto = Ti.UI.createLabel({
                                        top: "30%",
                                        text: "¡Incorrecto!",
                                        font: {
                                            fontWeight: "bold",
                                            fontSize: 40
                                        },
                                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                                        width: "75%",
                                        color: "red"
                                    });


                                    setTimeout(function(evt) {
                                        $.answers.remove(res1);
                                        $.answers.remove(res2);
                                        $.answers.remove(res3);
                                        $.answers.remove(res4);
                                        label.hide();
                                        $.continuar.add(finalizar);
                                        $.answers.add(incorrecto);

                                    }, 1000);

                                    finalizar.addEventListener("click", function() {
                                        var main = Alloy.createController('main').getView();
                                        main.open();

                                    });

                                };
                            }
                        } else {
                            $.question.remove(label);
                            loadQuestions();
                        }
                    },
                    onerror: function(e) {
                        alert(e);
                    },
                    timeout: 5000

                });

                api.open("GET", url + '/' + json[j].id + '/answers');
                api.send();
                activityIndicator.hide();

            },
            onerror: function(e) {
                //Aqui cargamos las cosas de la base de datos local...
                alert(e);




                //////////////////////AQUI TERMINA LO OFFLINE

            },
            timeout: 5000
        });
        xhr.open("GET", url);
        activityIndicator.show();
        xhr.send(); // request is actually sent with this statement
    }
    j = j + 1;
}


function loadQuestionsinSound(e) {

    var scrollView = Ti.UI.createScrollView({
        showHorizontalScrollIndicator: true,
        height: '100%',
        width: '100%',
        scrollType: 'horizontal',
        layout: 'horizontal'
    });
    $.answers.add(scrollView);

    var view = Ti.UI.createView({
        height: '100%',
        width: 370,
        backgroundColor: 'white'
    });
    var view2 = Ti.UI.createView({
        height: '100%',
        width: 370,
        backgroundColor: "white"
    });
    var view3 = Ti.UI.createView({
        height: '100%',
        width: 370,
        backgroundColor: "white"
    });
    var view4 = Ti.UI.createView({
        height: '100%',
        width: 370,
        backgroundColor: "white"
    });
    scrollView.add(view);
    scrollView.add(view2);
    scrollView.add(view3);
    scrollView.add(view4);

    var label = Ti.UI.createLabel({
        top: "25%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        paddingleft: 20,
        paddingRight: 20,
        text: j + ' ' + jsonglob[j].question,
        width: "75%",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        }
    });
    $.question.add(label);

    //////////////////////////////////////////////VISTA1
    var playicon = Ti.UI.createImageView({
        image: '/play_icon.png',
        top: '20%',
        width: 60,
        height: 60
    });
    var res1 = Ti.UI.createButton({
        top: '60%',
        width: "75%",
        height: "16%",
        borderRadius: "20px",
        backgroundColor: "#ffae00",
        color: "#fff",
        title: 'This is the answer'

    });

    view.add(playicon);
    view.add(res1);
    //////////////////////////////////////////////////VISTA2


    var playicon2 = Ti.UI.createImageView({
        image: '/play_icon.png',
        top: '20%',
        width: 60,
        height: 60
    });
    var res2 = Ti.UI.createButton({
        top: '60%',
        width: "75%",
        height: "16%",
        borderRadius: "20px",
        backgroundColor: "#ffae00",
        color: "#fff",
        title: 'This is the answer'

    });

    view2.add(playicon2);
    view2.add(res2);







    var playicon3 = Ti.UI.createImageView({
        image: '/play_icon.png',
        top: '20%',
        width: 60,
        height: 60
    });
    var res3 = Ti.UI.createButton({
        top: '60%',
        width: "75%",
        height: "16%",
        borderRadius: "20px",
        backgroundColor: "#ffae00",
        color: "#fff",
        title: 'This is the answer'

    });

    view3.add(playicon3);
    view3.add(res3);







    var playicon4 = Ti.UI.createImageView({
        image: '/play_icon.png',
        top: '20%',
        width: 60,
        height: 60
    });
    var res4 = Ti.UI.createButton({
        top: '60%',
        width: "75%",
        height: "16%",
        borderRadius: "20px",
        backgroundColor: "#ffae00",
        color: "#fff",
        title: 'This is the answer'

    });


    view4.add(playicon4);
    view4.add(res4);


    var audioPlayer = Ti.Media.createAudioPlayer({
        url: 'http://sheltered-mesa-1621.herokuapp.com/api/questions/' + jsonglob[j].id + '/answers/' + answerglob[0].id + '/file',
        allowBackground: true
    });
    var audioPlayer2 = Ti.Media.createAudioPlayer({
        url: 'http://sheltered-mesa-1621.herokuapp.com/api/questions/' + jsonglob[j].id + '/answers/' + answerglob[1].id + '/file',
        allowBackground: true
    });
    var audioPlayer3 = Ti.Media.createAudioPlayer({
        url: 'http://sheltered-mesa-1621.herokuapp.com/api/questions/' + jsonglob[j].id + '/answers/' + answerglob[2].id + '/file',
        allowBackground: true
    });
    var audioPlayer4 = Ti.Media.createAudioPlayer({
        url: 'http://sheltered-mesa-1621.herokuapp.com/api/questions/' + jsonglob[j].id + '/answers/' + answerglob[3].id + '/file',
        allowBackground: true
    });

    playicon.addEventListener("click", function() {
        audioPlayer.start();
    });
    playicon2.addEventListener("click", function() {
        audioPlayer2.start();
    });
    playicon3.addEventListener("click", function() {
        audioPlayer3.start();
    });
    playicon4.addEventListener("click", function() {
        audioPlayer4.start();
    });
    res1.addEventListener("click", function() {

        if (answerglob[0].isCorrect) {
            res1.setBackgroundColor('green');
            puntaje = puntaje + 10;
            actualizar();

        } else {
            res1.setBackgroundColor('red');

            if (answerglob[1].isCorrect) {
                res2.setBackgroundColor('green');
            }
            if (answerglob[2].isCorrect) {
                res3.setBackgroundColor('green');
            }
            if (answerglob[3].isCorrect) {
                res4.setBackgroundColor('green');
            }
            sumarScoreUser();
            mostrarBotonContinue();


        }

    });
    res2.addEventListener("click", function() {

        if (answerglob[1].isCorrect) {
            res2.setBackgroundColor('green');
            puntaje = puntaje + 10;
            actualizar();

        } else {
            res2.setBackgroundColor('red');

            if (answerglob[0].isCorrect) {
                res1.setBackgroundColor('green');
            }
            if (answerglob[2].isCorrect) {
                res3.setBackgroundColor('green');
            }
            if (answerglob[3].isCorrect) {
                res4.setBackgroundColor('green');
            }
            sumarScoreUser();
            mostrarBotonContinue();

        }
    });
    res3.addEventListener("click", function() {

        if (answerglob[2].isCorrect) {
            res3.setBackgroundColor('green');
            puntaje = puntaje + 10;
            actualizar();


        } else {
            res3.setBackgroundColor('red');

            if (answerglob[0].isCorrect) {
                res1.setBackgroundColor('green');
            }
            if (answerglob[1].isCorrect) {
                res2.setBackgroundColor('green');
            }
            if (answerglob[3].isCorrect) {
                res4.setBackgroundColor('green');
            }
            sumarScoreUser();
            mostrarBotonContinue();
        }
    });
    res4.addEventListener("click", function() {

        if (answerglob[3].isCorrect) {
            res4.setBackgroundColor('green');
            puntaje = puntaje + 10;
            actualizar();

        } else {
            res4.setBackgroundColor('red');


            if (answerglob[0].isCorrect) {
                res1.setBackgroundColor('green');
            }
            if (answerglob[1].isCorrect) {
                res2.setBackgroundColor('green');
            }
            if (answerglob[2].isCorrect) {
                res3.setBackgroundColor('green');
            }
            sumarScoreUser();
            mostrarBotonContinue();


        }
    });

    function actualizar(e) {

        sound.play();
        setTimeout(function(evt) {
            $.answers.remove(scrollView);
            $.question.remove(label);

            var correcto = Ti.UI.createLabel({
                top: "30%",
                text: "¡Correcto!",
                font: {
                    fontWeight: "bold",
                    fontSize: 40
                },
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: "75%",
                color: "green"
            });

            $.answers.add(correcto);

            var jugar = Ti.UI.createButton({
                title: 'Continuar',
                width: "100%",
                height: "100%"
            });
            jugar.setBackgroundColor('#ff6000');
            $.continuar.add(jugar);

            jugar.addEventListener("click", function() {
                $.continuar.remove(jugar);
                $.answers.remove(correcto);
            });

            jugar.addEventListener("click", loadQuestions);

        }, 1000);

    };

    function mostrarBotonContinue(e) {

        var finalizar = Ti.UI.createButton({
            title: 'Finalizar',
            width: "100%",
            height: "100%",
            backgroundColor: "ff6000"
        });

        var incorrecto = Ti.UI.createLabel({
            top: "30%",
            text: "¡Incorrecto!",
            font: {
                fontWeight: "bold",
                fontSize: 40
            },
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            width: "75%",
            color: "red"
        });


        setTimeout(function(evt) {
            $.answers.remove(res1);
            $.answers.remove(res2);
            $.answers.remove(res3);
            $.answers.remove(res4);
            $.question.remove(label);
            $.continuar.add(finalizar);
            $.answers.add(incorrecto);

        }, 1000);

        finalizar.addEventListener("click", function() {
            var main = Alloy.createController('main').getView();
            main.open();

        });

    };


    ///////////////////////////////////////////////////////////////////////////

}


function giveUp(e) {
    $.giveUp.setBackgroundColor("#ff6000");
    $.rendirseDialog.show();
}

function rendirseDialog(e) {
    if (e.index == 0) {
        var w = Alloy.createController('main').getView();
        w.open();
    }
}


function sumarScoreUser(e) {

    var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/scores";
    var tokeni = Ti.App.Properties.getString('token');
    var score = Ti.Network.createHTTPClient({
        onload: function(e) {

        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 5000
    });
    score.open('POST', url);
    score.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    score.setRequestHeader('token', Ti.App.Properties.getString("token"));
    score.send({
        score: puntaje
    });

}

function sumarScoreUserOff(e) {
    var scoreModel = Alloy.createModel("scores", {
        id: 9999,
        score: puntaje
    });
    scoreModel.save();
    alert('puntaje es: ' + scoreModel.get('score'));
}
