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
$.win.add(activityIndicator);

(function() {
	activityIndicator.show();
    loadTrivias();
})();

var tableData = [];
var json;

function loadTrivias(e){
	var url1 = "http://sheltered-mesa-1621.herokuapp.com/api/users/me/questions";
	
	var personal = Ti.Network.createHTTPClient({
        onload: function(e) {
        	
            json = JSON.parse(this.responseText);
			
			for (var item in json){
				var row = Ti.UI.createTableViewRow({
					rowIndex: item
				});
				
				row.rowID = item;
                
				var view = Ti.UI.createView({
	                height: "100",
	                borderRadius: 5,
	                borderWidth: 1,
	                left: "5",
	                right: "5",
	                top: "5",
	                bottom: "5",
	                height: Ti.UI.SIZE,
	                width: Ti.UI.FILL,
	                backgroundColor: "#ffae00"
	            });
	
	       		var label1 = Ti.UI.createLabel({
	                left: "25",
	                color: "#fff",
	                text: item + 1,
	                height: "45",
	                font: {
	                	fontWeight: "bold"
	                }
	            });
	            
	            var label2 = Ti.UI.createLabel({
	                left: "80",
	                color: "#fff",
	                text: json[item].question.substring(0,30).concat("..."),
	                height: "45",
	                font: {
	                	fontWeight: "bold"
	                }
	            });
	            
				view.add(label1);
				view.add(label2);
				
	            row.add(view);
	
	            tableData.push(row);
			}
			activityIndicator.hide();          
			$.triviaList.data = tableData;
				
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
}

function showEdit(e){
		
	var parametros = {
		json: json[e.rowData.rowIndex]
	};

	var w = Alloy.createController('edit', parametros).getView();
	w.open();
}

function newTrivia(){
	var w = Alloy.createController('edit').getView();
	w.open();
}

function closeMe(){
	$.win.close();
}
