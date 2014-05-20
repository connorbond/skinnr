<?php
	
	/* ------------------------------------------------
		DRAWING FUNCTION - FROM DROPBOX FILES
	------------------------------------------------- */
	// Built and insipired around code by Jamie Bicknell
	// Source: https://github.com/jamiebicknell/Minecraft-Avatar

	// SEE IN.PHP FOR FULL COMMENTS

	$file_url = $_POST['url'];
	$file_size = $_POST['size'];
	$kb = number_format($file_size / 1024, 2). 'kb';
	$type = '.'.pathinfo($file_url, PATHINFO_EXTENSION);
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $file_url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$img = curl_exec($ch);
	$hCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if ($hCode=='200' && $file_size <='102400') {
		$im = imagecreatefromstring($img);
		echo '<div class="topMsg"><h4>Loaded <i class="fa fa-dropbox fa-lg"></i> Dropbox Image - Type: '.$type.' | Size: '.$kb.'</h4>';
		echo '<p>Source: '.$file_url.'</p></div>';
		echo '&nbsp;&nbsp;&nbsp;&nbsp;<div class="front in">';
			drawSkin("headf", "headf", "in", 8, 8, 8, 8);
			echo '<br />';
			drawSkin("larmf", "armf", "in", 4, 12, 44, 20);
			drawSkin("bodyf", "bodyf", "in", 8, 12, 20, 20);
			drawSkin("rarmf", "armf", "in flip", 4, 12, 44, 20);
			echo '<br />';
			drawSkin("llegf", "legf", "in", 4, 12, 4, 20);
			drawSkin("rlegf", "legf", "in flip", 4, 12, 4, 20);
			echo '<br /><br />';
		echo '</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		echo '<div class="back in">';
			drawSkin("headbk", "headbk", "in", 8, 8, 24, 8);
			echo '<br />';
			drawSkin("larmbk", "armbk", "in", 4, 12, 52, 20);
			drawSkin("bodybk", "bodybk", "in", 8, 12, 32, 20);
			drawSkin("rarmbk", "armbk", "in flip", 4, 12, 52, 20);
			echo '<br />';
			drawSkin("llegbk", "legbk", "in", 4, 12, 12, 20);
			drawSkin("rlegbk", "legbk", "in flip", 4, 12, 12, 20);
			echo '<br /><br />';
		echo '</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		echo '<div class="sides in">';
			drawSkin("headsl", "headsl", "in", 8, 8, 0, 8);
			drawSkinB("headsl", "headsl", "in", 8, 8, 0, 8);
			echo '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			drawSkin("bodys", "bodys", "in", 4, 12, 16, 20);
			drawSkin("arms", "arms", "in", 4, 12, 48, 20);
			echo '<br />';
			drawSkin("legs", "legs", "in", 4, 12, 0, 20);
			echo '<br /><br />';
		echo '</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
		echo '<div id="tops" class="tops in">';
			drawSkin("headt", "headt", "in", 8, 8, 8, 0);
			echo '<br />';
			drawSkin("armt", "armt", "in", 4, 4, 44, 16);
			drawSkin("bodyt", "bodyt", "in", 8, 4, 20, 16);
			drawSkin("armt", "armt", "in flip", 4, 4, 44, 16);
			echo '<br />';
			drawSkin("legt", "legt", "in", 4, 4, 4, 16);
			drawSkin("legt", "legt", "in flip", 4, 4, 4, 16);
			echo '<br /><br />';
			drawSkin("headb", "headb", "in", 8, 8, 16, 0);
			echo '<br />';
			drawSkin("armb", "armb", "in", 4, 4, 48, 16);
			drawSkin("bodyb", "bodyb", "in", 8, 4, 28, 16);
			drawSkin("armb", "armb", "in flip", 4, 4, 48, 16);
			echo '<br />';
			drawSkin("legb", "legb", "in", 4, 4, 8, 16);
			drawSkin("legb", "legb", "in flip", 4, 4, 8, 16);
		echo '</div>&nbsp;&nbsp;&nbsp;&nbsp;';
		suggest();
		echo '<br /><br />';
	} else {
		echo '<div class="topMsg"><h4>Error loading from <i class="fa fa-dropbox fa-lg"></i> Dropbox - Type: '.$type.' | Size: '.$kb.'</h4>';
		echo '<p>Images must be .jpg or .png & under 100kb.</p></div><br><p><img src="img/sad.png" width="80px" height="80px" /></p><br>';
		echo '<div><button class="dropBtn big"><i class="fa fa-dropbox fa-2x"></i> Try again from Dropbox</button></div>';
		suggest();
		echo '<script type="text/javascript">$(".dropBtn").on("click", function(e) {Dropbox.choose(drop_options);});</script>';
	}

	//drawSkin("Div ID", "Div Class", "Container Class", "Pixels Wide(x)", "Pixels High(y)", "Offset X", "Offset Y");
	function drawSkin($id, $class, $cClass, $px, $py, $ox, $oy){
		$i = 0;
		global $im;
		$out = "\n\t\t <div id='".$id."' class='".$cClass."'>\n\t\t";
		for($y=0;$y<$py; $y++){
			$out .= "<div class='line'>";
			for($x=0;$x<$px; $x++){
				$rgb = imagecolorat($im, $ox+$x, $oy+$y);
				$cols = imagecolorsforindex($im, $rgb);
				$r = dechex($cols['red']);
				$g = dechex($cols['green']);
				$b = dechex($cols['blue']);
				if (strlen($r) == 1) {
					$r = "0" . $r;
				}
				if (strlen($g) == 1) {
					$g = "0" . $g;
				}
				if (strlen($b) == 1) {
					$b = "0" . $b;
				}
				$out .= "<div class='pixel ".$class.$x."x".$y." ".$class."' style='background-color: #".$r.$g.$b."' onclick='inputClick(\"".$class.$x."x".$y."\", \"".$class."\")' onmouseover='inputOver(\"".$class.$x."x".$y."\")' ondragstart='return false;' ondrop='return false;'></div>"; 
			}
			$out .= "</div> \n\t\t";
			$i++;
		}
		$out .= "</div> \n";
		echo $out;
	}
	
	function drawSkinB($id, $class, $cClass, $px, $py, $ox, $oy){
		$i = 0;
		global $im;
		$out = "\n\t\t <div id='".$id."' class='".$cClass." hidden'>\n\t\t";
		for($y=0;$y<$py; $y++){
			$out .= "<div class='line'>";
			for($x=($px-1);$x>=0; $x--){
				$rgb = imagecolorat($im, $ox+$x, $oy+$y);
				$cols = imagecolorsforindex($im, $rgb);
				$r = dechex($cols['red']);
				$g = dechex($cols['green']);
				$b = dechex($cols['blue']);
				if (strlen($r) == 1) {
					$r = "0" . $r;
				}
				if (strlen($g) == 1) {
					$g = "0" . $g;
				}
				if (strlen($b) == 1) {
					$b = "0" . $b;
				}
				$out .= "<div class='pixel ".$class.$x."x".$y." ".$class."2".$x."x".$y."' style='background-color: #".$r.$g.$b."' onclick='inputClick(\"".$class.$x."x".$y."\", \"".$class."\")' onmouseover='inputOver(\"".$class.$x."x".$y."\")' ondragstart='return false;' ondrop='return false;'></div>"; 
			}
			$out .= "</div> \n\t\t";
			$i++;
		}
		$out .= "</div> \n";
		echo $out;
	}
	
	function suggest(){
		$f_contents = file("../txt/users.txt"); 
		$line = $f_contents[rand(0, count($f_contents) - 1)];
		$line = substr_replace($line, "", -2);
		$out = "<br /><br /><div class='suggest sml'>Or why don't you try: <strong><u><span class='cur loadSuggest' onclick='saveLast(); getBase(&#34;".$line."&#34;)' title='Load ".$line."'>".$line."</span></u></strong> <span class='trySpin novis'><i class='fa fa-refresh fa-spin'></i></span></div><br><br><br>";
		echo $out;
	}
?>