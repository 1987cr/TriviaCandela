var puntaje = 0;
var cant = 0;

(function() {
    loadQuestions();
})();

function loadQuestions(e) {

    var url = "http://sheltered-mesa-1621.herokuapp.com/api/questions";
    var json;
    var answers;
    var j = 0;
    var scoreUser;
    var probadobool = false;


    var file1 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'mario.mp3');
    var sound = Ti.Media.createSound({
        url: file1
    });
    sound.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
    var scr = Ti.Network.createHTTPClient({
        onload: function(e) {

        },
        onerror: function(e) {

        },
        timeout: 5000
    });

    if ($.answers.children.length == 0) {
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                json = JSON.parse(this.responseText);

                var j = Math.floor((Math.random() * json.length - 1) + 1);


                var label = Ti.UI.createLabel({
                    top: "25%",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    color: "white",
                    paddingleft: 20,
                    paddingRight: 20,
                    text: json[j].question,
                    width: "75%",
                    font: {
                    	fontSize: 20,
                    	fontWeight: "bold"
                    }
                });
                $.question.add(label);


                //API segunda llamada
                var api = Ti.Network.createHTTPClient({
                    onload: function(e) {

                        answers = JSON.parse(this.responseText);
                        if (answers.length == 4) {

                            var res1 = Ti.UI.createButton({
                                title: answers[0].textAnswer,
                                top: 10,
                                width: "75%",
                                height: "16%",
                                borderRadius: "20px",
                                backgroundColor: "#ffae00",
                                color: "#fff"
                            });
                            var res2 = Ti.UI.createButton({
                                title: answers[1].textAnswer,
                                top: 10,
                                width: "75%",
                                height: "16%",
                                borderRadius: "20px",
                                backgroundColor: "#ffae00",
                                color: "#fff"
                            });
                            var res3 = Ti.UI.createButton({
                                text: answers[2].textAnswer
                            });
                            var res3 = Ti.UI.createButton({
                                title: answers[2].textAnswer,
                                top: 10,
                                width: "75%",
                                height: "16%",
                                borderRadius: "20px",
                                backgroundColor: "#ffae00",
                                color: "#fff"
                            });
                            var res4 = Ti.UI.createButton({
                                title: answers[3].textAnswer,
                                top: 10,
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

                            function sumarScoreUser(e) {

                                var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/scores";
                                var tokeni = Ti.App.Properties.getString('token');
                                var score = Ti.Network.createHTTPClient({
                                    onload: function(e) {
                                        var dialog = Ti.UI.createAlertDialog({
                                        	title: 'Score',
                                        	message: puntaje
                                        });
                                        dialog.show();
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

                            };
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


            },
            onerror: function(e) {

                alert(e);
            },
            timeout: 5000
        });
        xhr.open("GET", url);
        xhr.send(); // request is actually sent with this statement
    }
}

function giveUp(e){
	$.rendirseDialog.show();
}

function rendirseDialog(e){
	if(e.index == 0){
		var w=Alloy.createController('main').getView();  
		w.open();
	}
}
