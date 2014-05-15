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
	