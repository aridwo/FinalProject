// Location of detonation 
	var det = {};
	det.map;
	det.geocoder;
	det.marker;
	det.Circles = [];	
	det.gZ = null;
	det.location = null;
	det.tg = new Array();
	det.w = new Array();
	det.c = new Array();
	det.mapzoom = 12;
	det.default_zoom = det.mapzoom;
	det.idx = 0;
	det.y = 0;
	det.drop = 0;
	det.cities = 0;
	det.MapLoaded = false;

	var f = loadData();
	
	;
	
	// Loads dropdown list of weapon options
	function loadWeapon(form) {
		det.idx = form.selector.value;
		var wd = det.w[det.idx].split(",");
		det.y = parseInt(wd[0]);
		det.mapzoom = parseInt(wd[4]);
		if (det.idx > 0)	{
			document.getElementById('t_1').innerHTML = wd[1] + ", " + wd[2] + ", " + wd[3];
		}
		else	{
			document.getElementById('t_1').innerHTML = "&nbsp;";
		}
		return 1;
	}	
	
	//Calls the Google Map libraries 
	function loadScript() {
	  var script = document.createElement("script");
	  script.type = "text/javascript";
	  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAF0_yYi3uRm-N2V1FbtR9pHK6jtgMCJHs&sensor=false&callback=initialize";
	  document.body.appendChild(script);
	}
	
	// Loads data of weapons
	function loadData()	{
	// Weapon Info: "yield in kilotons, year, country, info, map zoom"
		det.w[0] = "0,0,0,0";
		det.w[1] = "7.5,2013,N Korea,Kim Jong Un.,13";		
		det.w[2] = "15,1945,US,Uranium Hiroshima bomb was the 1st device used in war.,13";
		det.w[3] = "21,1945,US,Plutonium Nagasaki bomb was the 2nd device used in war.,13";
		det.w[4] = "140,2001,China,Modern nuclear bomb carried by an intercontinental missile.,12"; 
		det.w[5] = "340,1991,US,Modern nuclear bomb that can be carried by a fighter jet.,11"; 
		det.w[6] = "400,1953,USSR,The 1st soviet H-bomb.,11";  
		det.w[7] = "1400,1958,US,Seen in the Dr Strangelove movie.,11";
		det.w[8] = "12000,1952,US,The first H-bomb.,9"; 
		det.w[9] =  "50000,1961,USSR,Largest manmade explosion ever recorded in history.,9";
	
	
	
	//Mapping Functions
	
	// Places Boston as default target
		det.c[0] = "42.3581,-71.0636,Boston";
		return 1;
	}
	function initialize() {
		var rd = Math.floor(Math.random() * det.cities);
		var cd = det.c[rd].split(",");
		det.tg[0] = parseFloat(cd[0]);
		det.tg[1] = parseFloat(cd[1]);
	
		document.forms.yields.selector.value = 0;
		var mapOptions = { //makes sure that address entered is zoomed in on and scaled appropriately
		    zoom: det.default_zoom,
		    center: new google.maps.LatLng(det.tg[0], det.tg[1]), //provides latitude and longitude of address
		    panControl: false,
		    streetViewControl: false,
		    zoomControl: true,
		    zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL	      
		    },
		    scaleControl: true,
		    scaleControlOptions: {		    	
				position: google.maps.ControlPosition.BOTTOM_CENTER	
		    },		    
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		}
				  			  
		det.map = new google.maps.Map(document.getElementById("map"), mapOptions);
		det.geocoder = new google.maps.Geocoder();
		det.location = new google.maps.LatLng(det.tg[0], det.tg[1]); 
		det.map.setCenter(det.location);
        det.marker = new google.maps.Marker({ // creates marker in center of location
		    position: det.location, 
		    draggable: false,
		    map: det.map,
		    title: det.tg[0].toString() + ', ' + det.tg[1].toString()
		});
		det.MapLoaded = true;

	}
 
 //Finds address entered in search bar
	//jumps to that location on map
function codeAddress() {
	    var address = document.getElementById("address").value;
	    
	    det.geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			
			if (det.marker)
				det.marker.setMap(null);  			
				
		  	det.tg[0] = results[0].geometry.location.lat();
			det.tg[1] = results[0].geometry.location.lng();
			det.location = new google.maps.LatLng(det.tg[0], det.tg[1]);
			
		    det.map.setCenter(results[0].geometry.location);
		    
			det.marker = new google.maps.Marker({
			    position: det.location, 
			    draggable: false,
			    map: det.map,
			    title: det.tg[0].toString() + ', ' + det.tg[1].toString()
			});  	     

		  } else {
		    alert("Geocode error: " + status);	        
		  }
	    });	
  
	}
	
	//Renders various circles/areas of destructions based on weapon chosen
	
		function deleteCircles()	{
		if (det.Circles) {
		    for (var i in det.Circles) {
		      det.Circles[i].setMap(null);
		    }
		}
	}

	function buildInfo(mode){
	
	}	
	
	// sourced by fas.org and wikipedia.org
	function ba(kt, burns)	{
		var A = 1, B = 1;
		if (burns==1) {A=0.38;B=1.20};
		if (burns==2) {A=0.40;B=0.87};
		if (burns==3) {A=0.34;B=0.67};
		if (burns==4) {A=0.30;B=0.55};
		return Math.pow(kt,A) * B;	}

	function kmToDegX(kms, lat) {
		return (kms / (Math.abs(lat) * 180/112.12 + 112.12));}
	function kmToDegY(kms) {
		return (kms / 112); }					
	function cX(x, radius, angle) {
		return x + radius * Math.cos(radians(angle));	}
	function cY(y, radius, angle) {
		return y + radius * Math.sin(radians(angle));	}
	function radians(degrees) {
		return degrees*Math.PI/180;		}
	function pa(kt, f)	{
		var A = 1, B = 1;

		if (f==1) {A=0.38;B=1.2;det.c1="#ff9933";};
		if (f==2) {A=0.4;B=0.88;det.c2="#5b4efa"};
		if (f==3) {A=0.34;B=0.67;det.c3="#00cf68"};
		if (f==4) {A=0.3;B=0.55;det.c4="#a94732"};

		return Math.pow(kt,A) * B;
	}		
		
	function dropBomb(options) {
		var vX = 0, vY = 0;
		var opt = {geodesic:true};
		var zX = new Array(), zY = new Array();
		var circles = new Array();
		var polys = new Array();
		var aE1 = new google.maps.MVCArray();
		var aE2 = new google.maps.MVCArray();
		var aE3 = new google.maps.MVCArray();
		var aE4 = new google.maps.MVCArray();
		
		if (!det.MapLoaded)
			return 0;
	
		if (det.idx == 0) {
			alert("Select a nuclear weapon from the dropdown list");
			return 0;
		}

				
		deleteCircles(); //ensures circles are cleared when new weapon choice is detonated
			
		det.map.setZoom(det.mapzoom);
		det.map.setCenter(det.location);
		
		det.infowindow = new google.maps.InfoWindow({
		    content: buildInfo(0)
		});
			
		
		document.getElementById('t_3');
		if (det.mode!=2)	{
			for (var i = 1; i < 5; i ++) {
				circles[i] = new google.maps.Circle({
					center: det.location,
					clickable: false,
					map: det.map,
					radius: pa((det.y),i) * 700, 
					strokeColor: eval("det.c" + i),
					
					strokeWeight: 1,
					fillColor: eval("det.c" + i),
							
				});
				det.Circles.push(circles[i]);
			}	
		}
		else	{
			zX[0] = kmToDegX(pa((det.y),1), det.tg[0]);
			zX[1] = kmToDegX(pa((det.y),2), det.tg[0]);
			zX[2] = kmToDegX(pa((det.y),3), det.tg[0]);
			zX[3] = kmToDegX(pa((det.y),4), det.tg[0]);	
			
			zY[0] = kmToDegY(pa((det.y),1));
			zY[1] = kmToDegY(pa((det.y),2));
			zY[2] = kmToDegY(pa((det.y),3));
			zY[3] = kmToDegY(pa((det.y),4));	
			var sinbeta = Math.sin(radians(det.wind));
			var cosbeta = Math.cos(radians(det.wind));
			var a = 0, b=0;
			var item;
			
			for (var i = 0; i < 360; i += (360 / 18)) {	
				var sinalpha = Math.sin(radians(i));
			    var cosalpha = Math.cos(radians(i));
			    
				a=zX[0];b=zY[0];
	
			    if ((i >= 180)) {b=(zY[0] * 3.5);} else {b=(zY[0] * 0.65);}
			    	
			    vX = eX(det.tg[0],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
			    vY = eY(det.tg[1],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
				item = aE1.push(new google.maps.LatLng(vX, vY));	
				a=zX[1];b=zY[1];
	
		    	if ((i >= 180)) {b=(zY[1] * 3.5);} else {b=(zY[1] * 0.85);}
	
			    vX = eX(det.tg[0],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
			    vY = eY(det.tg[1],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
				item = aE2.push(new google.maps.LatLng(vX, vY));
				a=zX[2];b=zY[2];
	
		    	if ((i >= 180)) {b=(zY[2] * 3.5);} else {b=(zY[2] * 0.90);}
	
			    vX = eX(det.tg[0],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
			    vY = eY(det.tg[1],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
				item = aE3.push(new google.maps.LatLng(vX, vY));		
				a=zX[3];b=zY[3];
				
		    	if ((i >= 180)) {b=(zY[3] * 3.5);} else {b=(zY[3] * 0.95);}
	
			    vX = eX(det.tg[0],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
			    vY = eY(det.tg[1],a,b,sinalpha,cosalpha,sinbeta,cosbeta);
				item = aE4.push(new google.maps.LatLng(vX, vY));
				
			};
			
			for (var i = 1; i < 5; i ++) {
				polys[i] = new google.maps.Polygon({
					clickable:false,
					strokeColor: eval("det.c" + i),
					
					strokeWeight: 1,
					fillColor: eval("det.c" + i),
								
				});
				polys[i].setPath(eval("aE"+ i));
				polys[i].setMap(det.map);
				det.Circles.push(polys[i]);
			}		
		}		
		det.drop=1;	
		return 1;
	}
	
	window.onload = loadScript;
	
	//Clears blast area rings on map
	function closeInfoWindow()	{
		if (det.infowindow)
			det.infowindow.close();	
	}	

		
	function clearAll(){	
		closeInfoWindow();		
		deleteCircles();
		document.forms.yields.selector.value = 0;
		document.getElementById('t_1').innerHTML = " ";
		document.getElementById('t_3').innerHTML = " ";		
	
		det.idx=0;
		det.mapzoom=13;
		det.map.setCenter(det.location, det.mapzoom);
		det.tg[0] = parseFloat(det.location.lat());
		det.tg[1] = parseFloat(det.location.lng());	
		det.drop=0;
		return 1;
	}