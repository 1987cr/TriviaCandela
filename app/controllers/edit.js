var args = arguments[0] || {};

var image1, image2, image2, image4;

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
    	if(picker.getSelectedRow(0).title == "text"
    		&& $.answ1.getValue() == ''
    		&& $.answ2.getValue() == ''
    		&& $.answ3.getValue() == ''
    		&& $.answ4.getValue() == ''){
    		alert("Uno o mas campos vacíos.");		
    	}else{
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
    	}
    });
    
    $.buttonView.add(guardar);
    
    var lastRowView = Ti.UI.createView({
    	layout: 'horizontal',
    	width: '100%',
    	height: '10%',
    	top: '3%'
    });
    
	var correcta = Ti.UI.createTextField({
		hintText: "Correcta (1-4)",
		width: "40%", 
		height: "100%",
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
		top: "3%",
		left: "5%"
	});
    
    var picker = Ti.UI.createPicker({
    	left: "10%",
    	height: "100%",
    	width: "40%",
    	backgroundColor: "#aaa",
		color: "#555",
		borderRadius: "20px",
		borderWidth: "2px",
		borderColor: "#aaa"
    });
    
    var dataPicker = [];
    
    dataPicker[0] = Ti.UI.createPickerRow({title: 'text'});
    dataPicker[1] = Ti.UI.createPickerRow({title: 'img'});
    dataPicker[2] = Ti.UI.createPickerRow({title: 'audio'});
    
    picker.add(dataPicker);
    picker.selectionIndicator = true;
    
    picker.addEventListener("change", function(){
    	if(picker.getSelectedRow(0).title == "img"){
    		$.btn1.setEnabled(true);
    		$.btn1.setVisible(true);
    		$.btn2.setEnabled(true);
    		$.btn2.setVisible(true);
    		$.btn3.setEnabled(true);
    		$.btn3.setVisible(true);
    		$.btn4.setEnabled(true);
    		$.btn4.setVisible(true);
    		
    		$.answ1.setValue("");
    		$.answ1.setEditable(false);
    		
    		$.answ2.setValue("");
    		$.answ2.setEditable(false);
    		
    		$.answ3.setValue("");
    		$.answ3.setEditable(false);
    		
    		$.answ4.setValue("");
    		$.answ4.setEditable(false);
		}else{
			$.btn1.setEnabled(false);
    		$.btn1.setVisible(false);
    		$.btn2.setEnabled(false);
    		$.btn2.setVisible(false);
    		$.btn3.setEnabled(false);
    		$.btn3.setVisible(false);
    		$.btn4.setEnabled(false);
    		$.btn4.setVisible(false);
    		
    		$.answ1.setEditable(true);
    		$.answ2.setEditable(true);
    		$.answ3.setEditable(true);
    		$.answ4.setEditable(true);
		}
    	
    });
    
    $.fld1.setTop("3%");
    $.fld2.setTop("3%");
    $.fld3.setTop("3%");
    $.fld4.setTop("3%");
    
    
    lastRowView.add(correcta);
    lastRowView.add(picker);
    
    $.fieldsView.add(lastRowView);
    
}else{
	$.question.value = args.json.question;
	
	$.answ1.setVisible(false);
	$.answ2.setVisible(false);
	$.answ3.setVisible(false);
	$.answ4.setVisible(false);
	
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
	
	var params1 = "type="+picker.getSelectedRow(0).title+"&answer=" + $.answ1.getValue() + "&isCorrect=" + theOne;
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
	
	var params2 = "type="+picker.getSelectedRow(0).title+"&answer=" + $.answ2.getValue() + "&isCorrect=" + theOne;
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
	
	var params3 = "type="+picker.getSelectedRow(0).title+"&answer=" + $.answ3.getValue() + "&isCorrect=" + theOne;
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
	
	var params4 = "type="+picker.getSelectedRow(0).title+"&answer=" + $.answ4.getValue() + "&isCorrect=" + theOne;
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