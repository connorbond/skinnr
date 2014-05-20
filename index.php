<!DOCTYPE html>
<html>
	<head>
		<!-- Design by Connor Bond (connorbond.co.uk) - 2013/14 -->

		<!-- Basic Page Needs
		================================================== -->
		<meta charset="utf-8">
		<title>skin.nr | v6.8.4</title>
		<meta name="description" content="">
		<meta name="author" content="Connor Bond, 2014">
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="apple-touch-icon" sizes="120x120" href="img/iOS.png">

		<!-- Mobile Specific Metas
		================================================== -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-title" content="skin.nr">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

		<!-- CSS
		================================================== -->
		<link rel="stylesheet" href="css/styles.css">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
		<link href="http://cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.css" rel="stylesheet">
		
	</head>

	<body ondragstart='return false;' ondrop='return false;'>
		<?php 
			if (!empty($_GET['upload'])) {
				echo "<span class='status hidden'>Upload</span>\n";
			}
		?>
		<div class="header">
			<div class="headwrap">
				<div class="logo">skin.nr</div>
				<img class="headlogo" src="img/fullhead.png" width="40px" height="40px" />
				<div class="controls">
					<form class="username" onsubmit="return false">
						<input type="text" class="user" name="user" placeholder="User or URL..." onkeyup="enter(event)"><input type="button" class="grnBtn bar loadSkin" value="Load Skin" title="Load from Minecraft Servers" onclick="getBase($('.user').val());">
						<i class="fa fa-refresh fa-spin mcSpin novis"></i>
					</form>
					<form class="upload" action="upload.php" method="post" enctype="multipart/form-data">
						<!--<button class="upBtn" onclick="$('#skin_file').click();" title="Upload Skin File"><i class="fa fa-upload"></i> Upload</button>--> <!-- Tested custom button for input, but breaks 'onchange' event and always fails on click -->
						<input type="file" accept="image/*" name="file" id="skin_file" class="bar" title="Upload Local Skin" onchange="$('.upload').submit(); uploadSpin();"/>
					</form>
					<button class="dropBtn bar" title="Choose Skin from Dropbox"><i class="fa fa-caret-left"></i> <i class="fa fa-dropbox fa-lg"></i></button>
				</div>
				
				<span class="saveapply">
					<div class="output hidden">
						<a class="imgPrev" href='out/default.png' download='skin.png'>
							<div class="image">
								<img class='outImg bar' src='out/default.png' title="Download Skin File"/><i class="fa fa-download fa-lg"></i>
							</div></a>
						<button class="dropSave bar" title="Save to Dropbox" data-drop="http://dev.connorbond.co.uk/skinnr/out/default.png" data-code="steve"><i class="fa fa-caret-right fa-lg"></i> <i class="fa fa-dropbox fa-lg"></i></button>
						<a class="apply" href="#" target=""><button type="button" class="setBtn barR" title="Set as your Skin"><img src="img/mc.png" alt="MC" /> Set</button></a>
					</div>
					<div class="make">
						<div class="makeimg"><button type="button" id="exp" class="greyBtn save bar" title="Generate Skin File"><i class="fa fa-save fa-lg"></i> <span class="makeTxt">Make</span></button></div>
					</div>
				</span>
			</div>
		</div>
		
		<div class="side">
			<div id="pen" class="toolBtn pen tip using" title="Pen Tool (P)" onclick="tool('pen');"><i class="fa fa-pencil fa-lg"></i></div>
			<br>
			<div id="dib" class="toolBtn dib tip" title="Eyedropper Tool (I)" onclick="tool('dib');"><img src="img/dib.png" /></div>
			<br>
			<div id="erase" class="toolBtn erase tip" title="Eraser Tool (E)" onclick="tool('erase'); document.getElementById('color').color.fromString('000000');"><i class="fa fa-eraser fa-lg"></i></div>
			<br />
			<div id="fill" class="toolBtn fill tip" title="Fill Area Tool (F)" onclick="tool('fill');"><img src="img/bucket.png" /></div>
			___<br><br>
			<div id="refresh" class="toolBtn refresh tip" title="Reload Base Skin (R)" onclick="getBase($('.cuser').html());"><i class="fa fa-refresh fa-lg"></i></div>
			</br>
			<div id="daynight" class="toolBtn time tip" title="Toggle Day/Night (T)" onclick="toggleDay()"><i class="fa fa-adjust fa-lg"></i></div>
			___<br><br>
			<input id="color" class="shade tip color {pickerClosable:true}" name="color" title="Pick Colour" onclick="tool('pen')"><br><br>
		</div>
		
		<div class="spin hide">
			<i class="fa fa-cog fa-spin fa-4x"></i>
			<h2 class="spinMsg">Making skin file...</h2>
		</div>
		
		<div class="bodywrap">
			<div class="skinout"></div>
		</div>

		<div class="mobFoot">
			<button type="button" id="exp" class="grnBtn save saveBtn footR" title="Generate Skin File">
				<i class="fa fa-save fa-lg"></i> <span class="makeTxt">Make</span>
			</button>
			<a class="imgPrev" href='out/default.png' download='skin.png'>
				<div class="image">
					<img class='outImg footC' src='out/default.png' title="Download Skin"/>
					<i class="fa fa-download fa-lg"></i>
				</div>
			</a>
			<a class="apply" href="#" target="">
				<button type="button" class="setBtn footL" title="Set as your Skin"><img src="img/mc.png" alt="MC"/> Set</button>
			</a>
			<button class="dropSave footC" title="Save to Dropbox" data-drop="http://dev.connorbond.co.uk/skinnr/out/default.png" data-code="steve"><i class="fa fa-caret-right fa-lg"></i> <i class="fa fa-dropbox fa-lg"></i></button>
		</div>

		<!-- Get Link Modal -->
		<div class="getlink hide">
			<p>Share your Skin: <span class="shareLink">URL</span></p><button class="grnBtn" onclick='$(".getlink").addClass("hide")'>Close</button>
		</div>

		<div id="skin3D" class="skin3D hide"></div> <!-- 3D preview output -->

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script> <!-- CDN hosted jQuery Library | http://jquery.com/ -->
		<script type="text/javascript" src="js/jscolor/jscolor.js"></script> <!-- jQuery Color Picker | http://jscolor.com/ -->
		<script type="text/javascript" src="https://www.dropbox.com/static/api/2/dropins.js" id="dropboxjs" data-app-key="e86soa1bu03kjtr"></script> <!-- Dropbox 'Dropins' API | https://www.dropbox.com/developers/dropins -->
		<script type="text/javascript" src="http://cdn.jsdelivr.net/qtip2/2.2.0/jquery.qtip.min.js"></script> <!-- jQuery Tooltips | http://qtip2.com/ -->
		<script src="js/three.js"></script> <!-- Javascript 3D Library | http://threejs.org/ -->
		<script src="js/scripts.js"></script> <!-- My personal scripts -->

		<!-- If the user has uploaded a file (image url returned in get), append script to draw uploaded image below -->
		<?php 
			if (!empty($_GET['upload'])) {
				echo "<script type='text/javascript'>getUpload('".$_GET['upload']."');</script>\n";
			}
		?>
	</body>
</html>