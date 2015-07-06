
function loadUsers(e){

	var url = "http://sheltered-mesa-1621.herokuapp.com/api/scores";
	var json;

	var label = Ti.UI.createLabel({ color : 'white', text : 'Show me the label...please?', textAlign : 'center', top:50, left:50, width:'auto', height:20 });

	$.rowContainer.add(label);

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
            
            json = JSON.parse(this.responseText);
	        $.profileName.setText(json[0].user.email);
	        
	    },
	    onerror: function(e) {
		
	        alert('error');
	    },
	    timeout:5000
	});
	xhr.open("GET", url);
	xhr.send();
}



