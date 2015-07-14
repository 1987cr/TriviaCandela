var style;
if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}
var activityIndicator = Ti.UI.createActivityIndicator({
  style:style,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});

$.mainList.add(activityIndicator);


function playTrivia(e){
    var w=Alloy.createController('playTrivia').getView(); 
    w.open();
}

function sortByKey(array, key){
    return array.sort(function(a, b){
        var x = a[key];
        var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function loadUsers(e) {

    var url1 = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/scores";
    var url2 = "http://sheltered-mesa-1621.herokuapp.com/api/scores";
    var json, json2;
    var tableData = [];
    
    var personal = Ti.Network.createHTTPClient({
        onload: function(e) {
            
            json2 = JSON.parse(this.responseText);
            json2 = sortByKey(json2, 'score');
            
            var row = Ti.UI.createTableViewRow({
                
            });
                
            var view = Ti.UI.createView({
                borderColor: "#ff6000",
                height: "100",
                borderRadius: 5,
                borderWidth: 1,
                left: "5",
                right: "5",
                top: "10",
                bottom: "5",
                height: Ti.UI.SIZE,
                width: Ti.UI.FILL,
                backgroundColor: "#ff6000"
            });

            var label1 = Ti.UI.createLabel({
                left: "25",
                color: "#fff",
                text: "-",
                height: "45",
                font: {
                    fontWeight: "bold"
                }
            });
            
            var label2 = Ti.UI.createLabel({
                left: "80",
                color: "#fff",
                text: "Record personal",
                height: "45",
                font: {
                    fontWeight: "bold"
                }
            });
                
            var label3 = Ti.UI.createLabel({
                right: "30",
                color: "#fff",
                text: json2[0].score,
                height: "45",
                font: {
                    fontSize: 20,
                    fontWeight: "bold"
                }
            });
            
            view.add(label1);
            view.add(label2);
            view.add(label3);
            
            row.add(view);

            tableData.push(row);
            activityIndicator.hide();
            
            $.mainList.setData(tableData);
                
        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 8000
   }); 

    personal.open("GET", url1);
    activityIndicator.show();
    personal.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    personal.setRequestHeader('Token', Ti.App.Properties.getString("token"));
    personal.send(); 
    
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            
            json = JSON.parse(this.responseText);
            json = sortByKey(json, 'score');
            
            for (var i = 0; i < 7; i++) {

                var row = Ti.UI.createTableViewRow({
                    
                });
                
                var view = Ti.UI.createView({
                    borderColor: "#ffc64c",
                    height: "100",
                    borderRadius: 5,
                    borderWidth: 1,
                    left: "5",
                    right: "5",
                    top: "5",
                    bottom: "5",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    backgroundColor: "#ffc64c"
                });
                
                var label1 = Ti.UI.createLabel({
                    left: "25",
                    color: "#fff",
                    text: i + 1,
                    height: "45",
                    font: {
                        fontSize: 30
                    }
                });
                
                var label2 = Ti.UI.createLabel({
                    left: "80",
                    color: "#fff",
                    text: json[i].user.email,
                    height: "45",
                    font: {
                        fontWeight: "bold"
                    }
                });
                
                var label3 = Ti.UI.createLabel({
                    right: "30",
                    color: "#fff",
                    text: json[i].score,
                    height: "45",
                    font: {
                        fontSize: 20,
                        fontWeight: "bold"
                    }
                });
                //view.add(image);
                view.add(label1);
                view.add(label2);
                view.add(label3);
                
                row.add(view);

                tableData.push(row);

            }
            
            $.mainList.setData(tableData);

        },
        onerror: function(e) {
            alert(e);
        },
        timeout: 8000
    });
    xhr.open("GET", url2);
    xhr.send(); 
}

function logout(e){
    $.logoutDialog.show();
}

function optionDialog(e){
    if(e.index == 0){
        Ti.App.Properties.setString('token', "null");
        var w=Alloy.createController('index').getView();  
        w.open();
    }
}


function sincronizar(e) {

    var url = "http://sheltered-mesa-1621.herokuapp.com/api/questions";
    var json;
    var answers;
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            json = JSON.parse(this.responseText);
            for (var i = 0; i < json.length - 1; i++) {
                var questionModel = Alloy.createModel("question", {
                    id_question: json[i].id,
                    user: json[i].user.email,
                    question: json[i].question
                });
                questionModel.save();
                Alloy.Collections.question.fetch();

                for (var i = 0; i < json.length; i++) {

                    var inline_function = function(i) {

                        var url2 = "http://sheltered-mesa-1621.herokuapp.com/api/questions/" + json[i].id + "/answers";

                        var ans = Ti.Network.createHTTPClient({
                            onload: function(e) {
                                answers = JSON.parse(this.responseText);
                                alert('que ladilla!' + json[i].id + 'resp' + answers[0].id);
                                for (var j = 0; j < answers.length; j++) {

                                    var answerModel = Alloy.createModel('answers', {
                                        id_answer: answers[j].id,
                                        question: answers[j].question,
                                        type: answers[j].type,
                                        textAnswer: answers[j].textAnswer,
                                        isCorrect: answers[j].isCorrect
                                    });
                                    answerModel.save();

                                }
                                Alloy.Collections.answers.fetch();


                            },
                            onerror: function(e) {
                                alert(e);
                            }
                        });
                        ans.open('GET', url2);
                        ans.send();

                    };
                    inline_function(i);
                }
            }

            activityIndicator.hide();
            alert('Carga Exitosa! Ya puedes jugar offline.');
        },
        onerror: function(e) {
            alert(e);
        }
    });
    xhr.open('GET', url);
    activityIndicator.show();
    xhr.send();


    // Save the model

    var recoverDatabase = Alloy.createCollection("question");
    recoverDatabase.fetch({
        query: "SELECT * FROM question"
    });

    var recoverDatabase2 = Alloy.createCollection("answers");
    recoverDatabase2.fetch({
        query: "SELECT * FROM answers"
    });

}


function cleanup() {
    $.destroy();
}

function manage(e){
    var w=Alloy.createController('manage').getView();  
    w.open(); 
}