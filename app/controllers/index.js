function entrar(e) {
    var url = "http://sheltered-mesa-1621.herokuapp.com/api/scores";
    var json;
    var xhr = Ti.Network.createHTTPClient({
    	onload: function(e){
    		json = JSON.parse(this.responseText);
    		alert(json[0].score);
    	},
    	onerror: function(e){
    		alert('error');
    	},
    	timeout:5000
    });
    xhr.open('GET',url);
    xhr.send();
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

$.index.open();
