var args = arguments[0] || {};

if(isEmpty(args)){
	var guardar = Ti.UI.createButton({
        title: "Guardar",
        width: "50%",
        height: "100%",
        backgroundColor: "#ffae00",
        color: "#fff",
        left: 0
    });
    
    guardar.addEventListener("click", function(){
    	var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/questions";
	    var del = Ti.Network.createHTTPClient({
	        onload: function(e) {
	        	var json = JSON.parse(this.responseText);
	        	var isCorrect = correcta.getValue();
	        	postAnswers(json.id, isCorrect);
	        },
	        onerror: function(e) {
	            alert(e);
	        }
	    });
	    del.open('POST', url);
	    del.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    del.setRequestHeader('token', Ti.App.Properties.getString("token"));
	    del.send({
	    	question: $.question.getValue()
	    });
    });
    
    $.buttonView.add(guardar);
    
	var correcta = Ti.UI.createTextField({
		hintText: "Correcta (1-4)",
		width: "75%", 
		height: "10%",
		backgroundColor: "#fff",
		color: "#555",
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		borderRadius: "20px",
		borderWidth: "2px",
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderColor: "#aaa",
		paddingLeft: 20,
		paddingRight: 20,
		hintTextColor: "#aaa",
		top: "3%"
	});
    
    $.answ1.setTop("3%");
    $.answ2.setTop("3%");
    $.answ3.setTop("3%");
    $.answ4.setTop("3%");
    
    $.fieldsView.add(correcta);
    
}else{
	$.question.value = args.json.question;
	$.answ1.value = args.json.answers[0].textAnswer;
	$.answ2.value = args.json.answers[1].textAnswer;
	$.answ3.value = args.json.answers[2].textAnswer;
	$.answ4.value = args.json.answers[3].textAnswer;
	var actualizar = Ti.UI.createButton({
        title: "Actualizar",
        width: "50%",
        height: "100%",
        backgroundColor: "#ffae00",
        color: "#fff",
        left: 0
    });
    //actualizar.addEventListener("click", updateTrivia());
    $.buttonView.add(actualizar);
}

var cancelar = Ti.UI.createButton({
    title: "Cancelar",
    width: "50%",
    height: "100%",
    backgroundColor: "#ffae00",
    color: "#fff",
    Right: 0
});

cancelar.addEventListener("click", function(){
	$.win.close();
});
$.buttonView.add(cancelar);

function isEmpty(object){
	for(var i in object){
		return false;
	}
	return true;
}

function deleteQuestion(){
	var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/questions/";
	url = url.concat(args.id);
    var del = Ti.Network.createHTTPClient({
        onload: function(e) {
        	alert("Trivia Eliminada");
    		$.win.close();
        },
        onerror: function(e) {
            alert(e);
        }, 
        timeout: 8000 
    });
    del.open('DELETE', url);
    del.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    del.setRequestHeader('token', Ti.App.Properties.getString("token"));
    del.send();

}

function postAnswers(id, isCorrect){
	var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/questions/";
	url = url.concat(id);
	url = url.concat("/answers");
	var theOne;
	

	if(isCorrect === "1"){
		theOne = true;
	}else{
		theOne = false;
	}
	
	var params1 = "type=text&answer=" + $.answ1.getValue() + "&isCorrect=" + theOne;
	var a1 = Ti.Network.createHTTPClient({
        onload: function(e) {
        	
        },
        onerror: function(e) {
            alert(e);
        }
    });
    a1.open('POST', url);
    a1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    a1.setRequestHeader('token', Ti.App.Properties.getString("token"));
    a1.send(params1);
	
	if(isCorrect === "2"){
		theOne = true;
	}else{
		theOne = false;
	}
	
	var params2 = "type=text&answer=" + $.answ2.getValue() + "&isCorrect=" + theOne;
	var a2 = Ti.Network.createHTTPClient({
        onload: function(e) {
        },
        onerror: function(e) {
            alert(e);
        }
    });
    a2.open('POST', url);
    a2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    a2.setRequestHeader('token', Ti.App.Properties.getString("token"));
    a2.send(params2);
	
	
	if(isCorrect === "3"){
		theOne = true;
	}else{
		theOne = false;
	}
	
	var params3 = "type=text&answer=" + $.answ3.getValue() + "&isCorrect=" + theOne;
	var a3 = Ti.Network.createHTTPClient({
        onload: function(e) {
        },
        onerror: function(e) {
            alert(e);
        }
    });
    a3.open('POST', url);
    a3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    a3.setRequestHeader('token', Ti.App.Properties.getString("token"));
    a3.send(params3);
    
    if(isCorrect === "4"){
		theOne = true;
	}else{
		theOne = false;
	}
	
	var params4 = "type=text&answer=" + $.answ4.getValue() + "&isCorrect=" + theOne;
	var a4 = Ti.Network.createHTTPClient({
        onload: function(e) {
        	alert("Trivia Creada");
        	$.win.close();
        },
        onerror: function(e) {
            alert(e);
        }
    });
    a4.open('POST', url);
    a4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    a4.setRequestHeader('token', Ti.App.Properties.getString("token"));
    a4.send(params4);
}

/*
function updateTrivia(){ 
	var url = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/questions/";
	url = url.concat(args.id);
    var del = Ti.Network.createHTTPClient({
        onload: function(e) {
            alert("Trivia Actualizada");
    		$.win.close();
        },
        onerror: function(e) {
            alert(e);
        }, 
        timeout: 8000 
    });
    del.open('PATCH', url);
    del.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    del.setRequestHeader('token', Ti.App.Properties.getString("token"));
    del.send({
    	question: $.question.getValue()
    });
}*/