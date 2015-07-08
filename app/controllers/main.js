function setIcon(e){
	$.tab2.setIcon("/home2.png");
}

function loadUsers(e){

	var url = "http://sheltered-mesa-1621.herokuapp.com/api/scores";
	var json;
	var tableData=[];
	var max=-1;

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
            json = JSON.parse(this.responseText);

            for(var i=0; i<=10;i++){

            	 var row = Ti.UI.createTableViewRow({heigth:"200"});

            	var view =Ti.UI.createView({	borderColor:"#cacdd8",
	borderRadius:5,
	borderWidth:1,
	left:"5",
	right:"5",
	top:"5",
	bottom:"5",
	height:Ti.UI.SIZE,
	width:Ti.UI.FILL,
	backgroundColor: "#E33B3B" });


            	if(i==0){
            	var image =Ti.UI.createImageView({backgroundColor:"black",	width:"66",
	heigth:"66",
	image:"trophy2.png",
	top:"5",
	left:"5"});
	        	           	
	        	}   
	        	else{
					 var image =Ti.UI.createImageView({width:"66",
					heigth:"66",
					image:"trophy2.png",
					top:"5",
					left:"5"});
	        	}
	        	var label = Ti.UI.createLabel({ top:"5",left:"80",color:"#ffae00",text : json[i].user.email});
				var label2 = Ti.UI.createLabel({ top:"25",	left:"80",	color:"#ff6000", text : json[i].score});
				view.add(image); 
				view.add(label);  
				view.add(label2);    


				row.add(view);

				tableData.push(row);
				if(json[i].score>max){
					max=json[i].score;
				}

            }
            $.mainList.setData(tableData);
	        
	    },
	    onerror: function(e) {
		
	        alert('error');
	    },
	    timeout:5000
	});
	xhr.open("GET", url);
	xhr.send();  // request is actually sent with this statement
}

function logout(e){
	/*Ti.App.Properties.setString('token', "null");
	var w=Alloy.createController('index').getView();  
	w.open();*/
	$.logoutDialog.show();
}

function optionDialog(e){
	if(e.index == 0){
		Ti.App.Properties.setString('token', "null");
		var w=Alloy.createController('index').getView();  
		w.open();
	}
}
