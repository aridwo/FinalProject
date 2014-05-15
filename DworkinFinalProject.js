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
	