function entrar(e) {
	
    var url = "http://sheltered-mesa-1621.herokuapp.com/api/sessions";
    var json;
    var xhr = Ti.Network.createHTTPClient({
    	onload: function(e){
    		json = JSON.parse(this.responseText);
    		Ti.App.Properties.setString('token', json.token);
    		var w=Alloy.createController('main').getView(); 
			w.open();
    	},
    	onerror: function(e){
    		alert('error');
    	},
    	timeout:5000
    });
    xhr.open('POST',url);
    xhr.send({
    	email: $.username.getValue(),
    	password: $.password.getValue()
    });
    //var w=Alloy.createController('main').getView(); 
	//w.open();
}

function username_focus(e) {
    $.username.setBorderColor("#ffae00");
}

function username_blur(e) {
    $.username.setBorderColor("#aaa");
}

function password_focus(e) {
    $.password.setBorderColor("#ffae00");
}

function password_blur(e) {
    $.password.setBorderColor("#aaa");
}

if(Ti.App.Properties.getString("token") != null ||
	Ti.Network.networkTypeName == "NONE"){
	var w=Alloy.createController('main').getView(); 
	w.open();
}else{
	$.index.open();
}

