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
	
	
	