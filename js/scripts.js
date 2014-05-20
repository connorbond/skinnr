// --- VARIABLES -- //
var headt; var headbk; var headsl; var headsr; var headt; var headb
var bodyf; var bodybk; var bodys; var bodyt; var bodyb;
var armf; var armbk; var arms; var armt; var armb;
var legf; var legbk; var legs; var legt; var legb;

var ctool = "pen";
var str; 
var time = "night";
var text = "Hello";
var lastUser = "char";
var shortcuts = true;

// --- SHORTCUT KEYS -- //
$("input").focus(function() { // Disable if focused on input (to type)
	shortcuts = false;
});
$("input").blur(function() { // Enable on exit (blur)
	shortcuts = true;
});

$("body").on("keydown", function(e){
	if (shortcuts == true) {
		//alert(e.type + ": " + e.which);
		if (e.which == "80") { // P
			$(".pen").click();
		}
		if (e.which == "73") { // I
			$(".dib").click();
		}
		if (e.which == "69") { // E
			$(".erase").click();
		}
		if (e.which == "70") { // F
			$(".fill").click();
		}
		if (e.which == "82") { // R
			$(".refresh").click();
		}
		if (e.which == "84") { // T
			$(".time").click();
		}
		if (e.which == "83") { // S
			$(".shade").click();
		}
	}
});

// --- FORM REDIRECT (submit when you press enter) -- //
function enter(e) {
	var key;
	if (window.event){
		key = window.event.keyCode; //IE
	} else {
		key = e.which; //Firefox & others
	}
	if(key == 13){
		getBase($('.user').val());
	}
}

// --- LOAD SKIN -- //
function getBase(uname) {
	$(".mcSpin").removeClass('novis'); // Show loading spinner
	var str = uname;
	// If the value begins as a web address - load as URL
	if (str.substring(0, 5) == "http:" || str.substring(0, 5) == "https" || str.substring(0, 3) == "www"){
		$.ajax({
			type: "POST",
			data: { url: uname },
			url: "php/url.php",
			success: function(data){
				$(".mcSpin").addClass('novis');
				$(".skinout").hide().html(data);
				$(".skinout").fadeIn('slow');
			}
		});
	// Else load as plain Username
	} else {
		$.ajax({
			type: "POST",
			data: { user: uname },
			url: "php/in.php",
			success: function(data){
				$(".mcSpin").addClass('novis');
				$(".skinout").hide().html(data);
				$(".skinout").fadeIn('slow');
			}
		});
	}
}

function getUpload(fileurl) {
	$.ajax({
		type: "POST",
		data: { url: fileurl },
		url: "php/up.php",
		success: function(data){
			$(".skinout").hide().html(data);
			$(".skinout").fadeIn('slow');
		}
	});
}

// --- FIRST LOAD -- //
if ($(".status").html() != "Upload"){
	getBase('char'); // Load the default character skin
}

// --- SETUP -- //
$(".color").addClass("usePen");

// --- TRACK MOUSE STATE -- //
var mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

// --- SELECT TOOL -- //
function tool(name) {
	ctool = name;
	$("#pen").removeClass("using");
	$("#dib").removeClass("using");
	$("#erase").removeClass("using");
	$("#fill").removeClass("using");
	$("#"+name).addClass("using");
}

// --- TOGGLE DAY/NIGHT --- //
function toggleDay(){
	if (time == "night"){
		$('body').css("background-image", "none");
		$('body').css("background", "#EEE");
		$('body').css("color", "#000");
		$('.prevBtn').css("color", "#000");
		time = "day";
	} else {
		$('body').css("background", "#000");
		$('body').css("background-image", "url(img/back_night.png)");
		$('body').css("color", "#FFF");
		$('.prevBtn').css("color", "#FFF");
		time = "night";
	}
}

// --- RGB TO HEX -- //
// Daniel Elliott | Source: http://stackoverflow.com/a/1740716
var hexDigits = new Array
("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

// --- INDIVIDUAL 'PIXEL' EVENTS -- //
function inputClick(pix, face) {
	if (ctool=="pen"){
		pen(pix);
	}
	if (ctool=="dib"){
		grab(pix);
	}
	if (ctool=="fill"){
		fill(face);
	}
}

function inputOver(pix) {
	if (mouseDown == 1 && ctool=="pen"){
		pen(pix);
	}
	if (mouseDown == 1 && ctool=="erase"){
		erase(pix);
	}
}


// --- TOOL FUNCTIONS -- //
function pen(name){
	var color = document.getElementById('color').value;
	$('.'+name).css('background', '#' + color);
}

function grab(name){
	dib = rgb2hex($('.'+name).css('background-color'));
	document.getElementById('color').color.fromString(dib);
	ctool = "pen";
	$("#dib").removeClass("using");
	$("#pen").addClass("using");
}

function fill(face){
	var color = document.getElementById('color').value;
	$('.'+face).css('background', '#' + color);
}

function erase(name){
	var color = document.getElementById('color').value;
	$('.'+name).css('background', '#' + color);
}

function saveLast(){
	lastUser = $(".cuser").html();
}

function showSpin(){
	$(".trySpin").removeClass("novis");
}

function uploadSpin(){
	$(".spinMsg").html("Uploading your file...");
	$(".spin").fadeIn("fast");
}


// --- EXPORT (TO ARRAY) -- //

// -- HEAD -- //
function expHeadF(w, h) {
	i = 0; // Incrementor
	col = new Array; // Create empty array
	
	// Loop with provided width and height
	for (y=0; y < h; y++) { // Y axis (vertical)
		for (x=0; x < w; x++) { // X axis (horizontal)
			col[i] = $('.headf'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(','); // Find 'pixel' via class, get the background colour in HEX and convert to RBG
			i++;
		}
	}
	headf = col.join(","); // Array to string, seperated by commas - to be passed into PHP script, exploded back to array and drawn out.
}

function expHeadBk(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.headbk'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	headbk = col.join(",");
}

function expHeadSL(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.headsl'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	headsl = col.join(",");
}

function expHeadSR(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=(w-1); x>=0; x--) {
			col[i] = $('.headsl2'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	headsr = col.join(",");
}

function expHeadT(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=(w-1); x>=0; x--) {
			col[i] = $('.headt'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	headt = col.join(",");
}

function expHeadBtm(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=(w-1); x>=0; x--) {
			col[i] = $('.headb'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	headb = col.join(",");
}


// -- BODY -- //
function expBodyF(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.bodyf'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	bodyf = col.join(",");
}

function expBodyBk(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.bodybk'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	bodybk = col.join(",");
}

function expBodyS(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.bodys'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	bodys = col.join(",");
}

function expBodyT(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.bodyt'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	bodyt = col.join(",");
}

function expBodyBtm(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.bodyb'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	bodyb = col.join(",");
}


// -- ARM -- //
function expArmF(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.armf'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	armf = col.join(",");
}

function expArmBk(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.armbk'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	armbk = col.join(",");
}

function expArmS(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.arms'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	arms = col.join(",");
}

function expArmT(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.armt'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	armt = col.join(",");
}

function expArmBtm(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.armb'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	armb = col.join(",");
}

// -- LEG -- //
function expLegF(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.legf'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	legf = col.join(",");
}

function expLegBk(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.legbk'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	legbk = col.join(",");
}

function expLegS(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.legs'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	legs = col.join(",");
}

function expLegT(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.legt'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	legt = col.join(",");
}

function expLegBtm(w, h) {
	i = 0;
	col = new Array;
	for (y=0; y < h; y++) {
		for (x=0; x < w; x++) {
			col[i] = $('.legb'+x+'x'+y).css('backgroundColor').replace(/^rgba?\(|\s+|\)$/g,'').split(',');
			i++;
		}
	}
	legb = col.join(",");
}

// --- SEND TO PHP -- //
function makeImg() {
	$.ajax({
		type: "POST",
		data: { 
			headf: headf,
			headbk: headbk,
			headsl: headsl,
			headsr: headsr,
			headt: headt,
			headb: headb,
			bodyf: bodyf,
			bodybk: bodybk,
			bodys: bodys,
			bodyt: bodyt,
			bodyb: bodyb,
			armf: armf,
			armbk: armbk,
			arms: arms,
			armt: armt,
			armb: armb,
			legf: legf,
			legbk: legbk,
			legs: legs,
			legt: legt,
			legb: legb
		},
		url: "php/out.php",
		success: function(data){
			str = data;
		}
	});
}

// --- SAVE IMAGE (Open Modal) -- //
$(".save").click(function() {
	//Export each section to a string of color values (see above functions)
	expHeadF(8, 8);
	expHeadBk(8, 8);
	expHeadSL(8, 8);
	expHeadSR(8, 8);
	expHeadT(8, 8);
	expHeadBtm(8, 8);
	
	expBodyF(8, 12);
	expBodyBk(8, 12);
	expBodyS(4, 12);
	expBodyT(8, 4);
	expBodyBtm(8, 4);
	
	expArmF(4, 12);
	expArmBk(4, 12);
	expArmS(4, 12);
	expArmT(4, 4);
	expArmBtm(4, 4);
	
	expLegF(4, 12);
	expLegBk(4, 12);
	expLegS(4, 12);
	expLegT(4, 4);
	expLegBtm(4, 4);
	
	// Send generated strings to PHP to create image, and return url.
	makeImg();

	// Show processing spinners
	$(".makeTxt").html("Making...");
	$(".spin").fadeIn("fast");

	// Pause to let PHP process and return, then show results on screen
	setTimeout(function(){
		skin.src = "http://dev.connorbond.co.uk/skinnr/out/skin_"+str+".png"; // update skin image used in 3D preview
		$(".outImg").attr("src", "out/skin_"+str+".png"); // show skin file
		$(".imgPrev").attr("href", "out/skin_"+str+".png"); // link to skin file (on click)
		$(".shareLink").html('<a href="http://dev.connorbond.co.uk/skinnr/out/skin_'+str+'.png" target="_blank">http://dev.connorbond.co.uk/skinnr/out/skin_'+str+'.png</a>'); // provide visual url to skin file for sharing
		$(".getlink").removeClass('hide'); // show bar to get link & share
		$(".dropSave").attr('data-drop', 'http://dev.connorbond.co.uk/skinnr/out/skin_'+str+'.png'); // update dropbox button to save correct image
		$(".dropSave").attr('data-code', str); // update dropbox button to save image with correct name
		$(".apply").attr("href", "http://www.minecraft.net/skin/remote.jsp?url=http://dev.connorbond.co.uk/skinnr/out/skin_"+str+".png"); // update apply to minecraft account button - load new image
		$(".apply").attr("target", "_blank");
		$(".spin").fadeOut("fast"); // hide spinner
		$(".output").removeClass("hidden"); // show output controls
		$(".makeTxt").html("Make"); // revert button to original text
	},2000);

	setTimeout(function(){$(".skin3D").removeClass("hide");},2200); // show 3D preview - slight delay to mask 'jump' when loading.
});

// Dropbox Button API | Source: https://www.dropbox.com/developers/dropins/chooser/js
drop_options = {
	linkType: "direct",
	multiselect: false,
	extensions: ['.jpg', '.png'],
	success: function(files) {
		$(".skinout").html("<br><br><br><br><h2><i class='fa fa-cog fa-spin fa-3x'></i></h2><br><p>Loading from <i class='fa fa-dropbox fa-2x'></i> Dropbox...</p>");
		$.ajax({
			type: "POST",
			data: { url: files[0].link, size: files[0].bytes },
			url: "php/drop.php",
			success: function(data){
				$(".skinout").hide().html(data);
				$(".skinout").fadeIn('slow');
			}
		});
	},
};
$('.dropBtn').on('click', function(e) {
	Dropbox.choose(drop_options);
});

$('.dropSave').on('click', function(e) {
	Dropbox.save($('.dropSave').attr("data-drop"), "skinnr_" + $('.dropSave').attr("data-code") + ".png"); // update button to save correct image & name
});

// Tooltip API | Source: http://qtip2.com/
$(document).ready(function () {
	$('.tip[title]').qtip({
		position: {
			my: 'center left',
			at: 'center right'
		},
		style: {
			classes: 'qtip-light'
		}
	});	
	
	$('.bar[title]').qtip({
		position: {
			my: 'top center',
			at: 'bottom center'
		},
		style: {
			classes: 'qtip-light'
		}
	});

	$('.barR[title]').qtip({
		position: {
			my: 'top right',
			at: 'bottom center'
		},
		style: {
			classes: 'qtip-light'
		}
	});	

	$('.footL').qtip({
		position: {
			my: 'bottom right',
			at: 'top center'
		},
		style: {
			classes: 'qtip-light'
		}
	});
	$('.footC').qtip({
		position: {
			my: 'bottom center',
			at: 'top center'
		},
		style: {
			classes: 'qtip-light'
		}
	});
	$('.footR').qtip({
		position: {
			my: 'bottom left',
			at: 'top center'
		},
		style: {
			classes: 'qtip-light'
		}
	});
});


/* -----------------------------
		3D SKIN PREVIEW
------------------------------*/

/*
	Built on modified code originally by Daniel Hede | @daniel_hede
	Original Demo: http://djazz.mine.nu/apps/MinecraftSkin/
	Source: https://github.com/maxogden/minecraft-skin
	
	Personal Modifications:
	-----------------------
		# Removed unnecessary functions (shrunk file size/length)
			- Selecting different view modes:
				- 'Classic run'
				- Camera relocation
			- Pause rotation pause, 
			- Load capes/helmets - remove strange box around head, 
			- File upload
		# Modified to load the image of my choosing on the fly (user-generated skin).
		# Canvas scale edited to suit (shrunk)
		# Added 'Hide 3D Preview' button
*/

var skin = new Image();

var MSP = (function (global, undefined) {

	var skinFile = 'img/steve.png';
	
	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame     || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	var supportWebGL = !!global.WebGLRenderingContext && (!!global.document.createElement('canvas').getContext('experimental-webgl') || !!global.document.createElement('canvas').getContext('webgl'));
	
	var container = global.document.querySelector('#skin3D');
	
	var cw = 200, ch = 200;
	var tileUvWidth = 1/64;
	var tileUvHeight = 1/32;
	
	var skincanvas = global.document.createElement('canvas');
	var skinc = skincanvas.getContext('2d');
	skincanvas.width = 64;
	skincanvas.height = 32;
	
	var getMaterial = function (img, trans) {
		var material = new THREE.MeshBasicMaterial({
			map: new THREE.Texture(
				img,
				new THREE.UVMapping(),
				THREE.ClampToEdgeWrapping,
				THREE.ClampToEdgeWrapping,
				THREE.NearestFilter,
				THREE.NearestFilter,
				(trans? THREE.RGBAFormat : THREE.RGBFormat)
			),
			transparent: trans
		});
		material.map.needsUpdate = true;
		return material;
	};
	var uvmap = function (mesh, face, x, y, w, h, rotateBy) {
		if(!rotateBy) rotateBy = 0;
		var uvs = mesh.geometry.faceVertexUvs[0][face];
		var tileU = x;
		var tileV = y;
		uvs[ (0 + rotateBy) % 4 ].u = tileU * tileUvWidth;
		uvs[ (0 + rotateBy) % 4 ].v = tileV * tileUvHeight;
		uvs[ (1 + rotateBy) % 4 ].u = tileU * tileUvWidth;
		uvs[ (1 + rotateBy) % 4 ].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[ (2 + rotateBy) % 4 ].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[ (2 + rotateBy) % 4 ].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[ (3 + rotateBy) % 4 ].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[ (3 + rotateBy) % 4 ].v = tileV * tileUvHeight;
	};
	var cubeFromPlanes = function (size, mat) {
		var cube = new THREE.Object3D();
		var meshes = [];
		for(var i=0; i < 6; i++) {
			var mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
			mesh.doubleSided = true;
			cube.add(mesh);
			meshes.push(mesh);
		}
		// Front
		meshes[0].rotation.x = Math.PI/2;
		meshes[0].rotation.z = -Math.PI/2;
		meshes[0].position.x = size/2;
		
		// Back
		meshes[1].rotation.x = Math.PI/2;
		meshes[1].rotation.z = Math.PI/2;
		meshes[1].position.x = -size/2;
		
		// Top
		meshes[2].position.y = size/2;
		
		// Bottom
		meshes[3].rotation.y = Math.PI;
		meshes[3].rotation.z = Math.PI;
		meshes[3].position.y = -size/2;
		
		// Left
		meshes[4].rotation.x = Math.PI/2;
		meshes[4].position.z = size/2;
		
		// Right
		meshes[5].rotation.x = -Math.PI/2;
		meshes[5].rotation.y = Math.PI;
		meshes[5].position.z = -size/2;
		
		return cube;
	};
	
	var charMaterial = getMaterial(skincanvas, false);
	var charMaterialTrans = getMaterial(skincanvas, true);
	
	var camera = new THREE.PerspectiveCamera(35, cw / ch, 1, 1000);
	camera.position.z = 50;
	var scene = new THREE.Scene();
	scene.add(camera);
	
	var headgroup = new THREE.Object3D();
	var upperbody = new THREE.Object3D();
	
	// Left leg
	var leftleggeo = new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		leftleggeo.vertices[i].y -= 6;
	}
	var leftleg = new THREE.Mesh(leftleggeo, charMaterial);
	leftleg.position.z = -2;
	leftleg.position.y = -6;
	uvmap(leftleg, 0, 8, 20, -4, 12);
	uvmap(leftleg, 1, 16, 20, -4, 12);
	uvmap(leftleg, 2, 4, 16, 4, 4, 3);
	uvmap(leftleg, 3, 8, 20, 4, -4, 1);
	uvmap(leftleg, 4, 12, 20, -4, 12);
	uvmap(leftleg, 5, 4, 20, -4, 12);
	
	// Right leg
	var rightleggeo = new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		rightleggeo.vertices[i].y -= 6;
	}
	var rightleg = new THREE.Mesh(rightleggeo, charMaterial);
	rightleg.position.z = 2;
	rightleg.position.y = -6;
	uvmap(rightleg, 0, 4, 20, 4, 12);
	uvmap(rightleg, 1, 12, 20, 4, 12);
	uvmap(rightleg, 2, 8, 16, -4, 4, 3);
	uvmap(rightleg, 3, 12, 20, -4, -4, 1);
	uvmap(rightleg, 4, 0, 20, 4, 12);
	uvmap(rightleg, 5, 8, 20, 4, 12);
	
	// Body
	var bodygeo = new THREE.CubeGeometry(4, 12, 8);
	var bodymesh = new THREE.Mesh(bodygeo, charMaterial);
	uvmap(bodymesh, 0, 20, 20, 8, 12);
	uvmap(bodymesh, 1, 32, 20, 8, 12);
	uvmap(bodymesh, 2, 20, 16, 8, 4, 1);
	uvmap(bodymesh, 3, 28, 16, 8, 4, 3);
	uvmap(bodymesh, 4, 16, 20, 4, 12);
	uvmap(bodymesh, 5, 28, 20, 4, 12);
	upperbody.add(bodymesh);
	
	// Left arm
	var leftarmgeo = new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		leftarmgeo.vertices[i].y -= 4;
	}
	var leftarm = new THREE.Mesh(leftarmgeo, charMaterial);
	leftarm.position.z = -6;
	leftarm.position.y = 4;
	leftarm.rotation.x = Math.PI/32;
	uvmap(leftarm, 0, 48, 20, -4, 12);
	uvmap(leftarm, 1, 56, 20, -4, 12);
	uvmap(leftarm, 2, 48, 16, -4, 4, 1);
	uvmap(leftarm, 3, 52, 16, -4, 4, 3);
	uvmap(leftarm, 4, 52, 20, -4, 12);
	uvmap(leftarm, 5, 44, 20, -4, 12);
	upperbody.add(leftarm);
	
	// Right arm
	var rightarmgeo = new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		rightarmgeo.vertices[i].y -= 4;
	}
	var rightarm = new THREE.Mesh(rightarmgeo, charMaterial);
	rightarm.position.z = 6;
	rightarm.position.y = 4;
	rightarm.rotation.x = -Math.PI/32;
	uvmap(rightarm, 0, 44, 20, 4, 12);
	uvmap(rightarm, 1, 52, 20, 4, 12);
	uvmap(rightarm, 2, 44, 16, 4, 4, 1);
	uvmap(rightarm, 3, 48, 16, 4, 4, 3);
	uvmap(rightarm, 4, 40, 20, 4, 12);
	uvmap(rightarm, 5, 48, 20, 4, 12);
	upperbody.add(rightarm);
	
	//Head
	var headgeo = new THREE.CubeGeometry(8, 8, 8);
	var headmesh = new THREE.Mesh(headgeo, charMaterial);
	headmesh.position.y = 2;
	uvmap(headmesh, 0, 8, 8, 8, 8);
	uvmap(headmesh, 1, 24, 8, 8, 8);
	uvmap(headmesh, 2, 8, 0, 8, 8, 1);
	uvmap(headmesh, 3, 16, 0, 8, 8, 3);
	uvmap(headmesh, 4, 0, 8, 8, 8);
	uvmap(headmesh, 5, 16, 8, 8, 8);
	headgroup.add(headmesh);
	headgroup.position.y = 8;
	
	var playerModel = new THREE.Object3D();
	
	playerModel.add(leftleg);
	playerModel.add(rightleg);
	playerModel.add(upperbody);
	playerModel.add(headgroup);
	playerModel.position.y = 6;
	
	var playerGroup = new THREE.Object3D();
	playerGroup.add(playerModel);
	scene.add(playerGroup);
	
	var mouseX = 0;
	var mouseY = 0.1;
	var originMouseX = 0;
	var originMouseY = 0;
	var rad = 0;
	var isMouseOver = false;
	var isMouseDown = false;
	var counter = 0;
	var firstRender = true;
	var startTime = Date.now();
	var pausedTime = 0;
	
	var render = function () {
		requestAnimFrame(render, renderer.domElement);
		var oldRad = rad;
		var time = (Date.now() - startTime)/1000;
		
		if(!isMouseDown) {
			rad += 2;
		} else {
			rad = mouseX;
		}
		if(mouseY > 500) {
			mouseY = 500;
		} else if(mouseY < -500) {
			mouseY = -500;
		}
		camera.position.x = -Math.cos(rad/(cw/2)+(Math.PI/0.9));
		camera.position.z = -Math.sin(rad/(cw/2)+(Math.PI/0.9));
		camera.position.y = (mouseY/(ch/2))*1.5+0.2;
		camera.position.setLength(70);
		camera.lookAt(new THREE.Vector3(0, 1.5, 0));

		counter+=0.01;
		headgroup.rotation.y = Math.sin(time*1.5)/5;
		headgroup.rotation.z = Math.sin(time)/6;

		leftarm.rotation.z = -Math.sin(time*3)/2;
		leftarm.rotation.x = (Math.cos(time*3)+Math.PI/2)/30;
		rightarm.rotation.z = Math.sin(time*3)/2;
		rightarm.rotation.x = -(Math.cos(time*3)+Math.PI/2)/30;
		leftleg.rotation.z = Math.sin(time*3)/3;
		rightleg.rotation.z = -Math.sin(time*3)/3;
		playerGroup.position.y = -6; // Not jumping

		renderer.render(scene, camera);
	};

	if(supportWebGL) {
		var renderer = new THREE.WebGLRenderer({antialias: true});
	}
	else {
		var renderer = new THREE.CanvasRenderer({antialias: true});
	}

	var threecanvas = renderer.domElement;
	renderer.setSize(cw, ch);
	container.appendChild(threecanvas);
	
	var onMouseMove = function (e) {
		if(isMouseDown) {
			mouseX = (e.pageX - threecanvas.offsetLeft - originMouseX);
			mouseY = (e.pageY - threecanvas.offsetTop - originMouseY);
		}
	};
	
	threecanvas.addEventListener('mousedown', function (e) {
		e.preventDefault();
		originMouseX = (e.pageX - threecanvas.offsetLeft) - rad;
		originMouseY = (e.pageY - threecanvas.offsetTop) - mouseY;
		isMouseDown = true;
		isMouseOver = true;
		onMouseMove(e);
	}, false);
	global.addEventListener('mouseup', function (e) {
		isMouseDown = false;
	}, false);
	global.addEventListener('mousemove', onMouseMove, false);
	threecanvas.addEventListener('mouseout', function (e) {
		isMouseOver = false;
	}, false);

	// Button 
	var button = document.createElement('button');
	var t = document.createTextNode("Hide 3D Preview");
	button.appendChild(t);
	button.setAttribute("class", "hide3d");
	button.setAttribute("onclick", "$('.skin3D').addClass('hide');");
	container.appendChild(button);
	
	render();

	skin.onload = function () {
		
		skinc.clearRect(0, 0, 64, 32);
		skinc.drawImage(skin, 0, 0);
		
		var imgdata = skinc.getImageData(0, 0, 64, 32);
		var pixels = imgdata.data;
		
		var isOnecolor = true;
		var colorCheckAgainst = [40, 0];
		var colorIndex = (colorCheckAgainst[0]+colorCheckAgainst[1]*64)*4;
		
		var isPixelDifferent = function (x, y) {
			if(pixels[(x+y*64)*4+0] !== pixels[colorIndex+0] || pixels[(x+y*64)*4+1] !== pixels[colorIndex+1] || pixels[(x+y*64)*4+2] !== pixels[colorIndex+2] || pixels[(x+y*64)*4+3] !== pixels[colorIndex+3]) {
				return true;
			}
			return false;
		};
		
		skinc.putImageData(imgdata, 0, 0);
		charMaterial.map.needsUpdate = true;
		charMaterialTrans.map.needsUpdate = true;
	};
	
	skin.src = skinFile;
	
	threecanvas.addEventListener('dragenter', function (e) {
		e.stopPropagation(); 
		e.preventDefault();
		threecanvas.className = "dragenter";
	}, false);
	threecanvas.addEventListener('dragleave', function (e) {
		e.stopPropagation(); 
		e.preventDefault();
		threecanvas.className = "";
	}, false);
	threecanvas.addEventListener('dragover', function (e) {
		e.stopPropagation();
		e.preventDefault();
	}, false);
	threecanvas.addEventListener('drop', function (e) {
		e.stopPropagation();
		e.preventDefault();
		threecanvas.className = "";
		
		var dt = e.dataTransfer;
		var files = dt.files;
		handleFiles(files);
	}, false);
}(this));