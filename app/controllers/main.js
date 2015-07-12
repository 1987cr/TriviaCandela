
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
            
			$.mainList.setData(tableData);
				
        },
        onerror: function(e) {
            alert('error');
        },
        timeout: 8000
   }); 

    personal.open("GET", url1);
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
            alert('error');
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
		Ti.App.Properties.setString('token', null);
		var w=Alloy.createController('index').getView();  
		w.open();
	} 
}

function manage(e){
	var w=Alloy.createController('manage').getView();  
	w.open(); 
}
