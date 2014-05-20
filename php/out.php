<?php

	/* ------------------------------------------------
		EXPORT IMAGE - FROM DIV 'PIXEL' CONTENT - PASSED VIA POST
	------------------------------------------------- */
	// Directory of PHP GD functions used: http://www.php.net/manual/en/ref.image.php
	// Guide followed: http://php.about.com/od/advancedphp/ss/gd_library_2.htm
	// Built upon code by Jamie Bicknell - Github: https://github.com/jamiebicknell/Minecraft-Avatar

	// Create image variable, to 64px by 32px (exact skin size)
	$skin = imagecreatetruecolor(64, 32);
	
	// Grab colours for each section and face, split by comma.
	$headf = $_POST['headf'];
	$headf = explode(",", $headf);
	$headbk = $_POST['headbk'];
	$headbk = explode(",", $headbk);
	$headsl = $_POST['headsl'];
	$headsl = explode(",", $headsl);
	$headsr = $_POST['headsr'];
	$headsr = explode(",", $headsr);
	$headt = $_POST['headt'];
	$headt = explode(",", $headt);
	$headb = $_POST['headb'];
	$headb = explode(",", $headb);

	$bodyf = $_POST['bodyf'];
	$bodyf = explode(",", $bodyf);
	$bodybk = $_POST['bodybk'];
	$bodybk = explode(",", $bodybk);
	$bodys = $_POST['bodys'];
	$bodys = explode(",", $bodys);
	$bodyt = $_POST['bodyt'];
	$bodyt = explode(",", $bodyt);
	$bodyb = $_POST['bodyb'];
	$bodyb = explode(",", $bodyb);
	
	$armf = $_POST['armf'];
	$armf = explode(",", $armf);
	$armbk = $_POST['armbk'];
	$armbk = explode(",", $armbk);
	$arms = $_POST['arms'];
	$arms = explode(",", $arms);
	$armt = $_POST['armt'];
	$armt = explode(",", $armt);
	$armb = $_POST['armb'];
	$armb = explode(",", $armb);
	
	$legf = $_POST['legf'];
	$legf = explode(",", $legf);
	$legbk = $_POST['legbk'];
	$legbk = explode(",", $legbk);
	$legs = $_POST['legs'];
	$legs = explode(",", $legs);
	$legt = $_POST['legt'];
	$legt = explode(",", $legt);
	$legb = $_POST['legb'];
	$legb = explode(",", $legb);
	
	// Draw Section/Face function
	function draw($skin, $part, $w, $h, $ox, $oy) {
		$i = 0; // Set incrementer
		for($y=0;$y<$h; $y++){ 		// Loop function Y (down - column)
			for($x=0;$x<$w; $x++){ 	// Loop function X (left - row)
				$r = $part[$i]; 	// Get RED value
				$g = $part[($i+1)]; // Get GREEN value
				$b = $part[($i+2)]; // Get BLUE value
				$col = imagecolorallocate($skin, $r, $g, $b); 	// Set colour variable
				imagesetpixel($skin, $x+$ox, $y+$oy, $col);		// Draw pixel in location (using offsets), to correct colour
				$i+=3; 	// Move to next colour (0 = r, 1 = g, 2 = b | So jump in 3's)
			}
		}
	}
	
	// Random String Generator | Simplified from http://stackoverflow.com/a/4356295
	function getRand($len) {
		$char = 'abcdefghijklmnopqrstuvwxyz';
		$rand = '';
		for ($i = 0; $i < $len; $i++) {
			$rand .= $char[rand(0, strlen($char) - 1)];
		}
		return $rand;
	}
	
	// Draw each section to the correct size and location
	// Structure: draw(img, face, width, height, offsetX, offsetY);
	draw($skin, $headf, 8, 8, 8, 8);
	draw($skin, $headbk, 8, 8, 24, 8);
	draw($skin, $headsl, 8, 8, 0, 8);
	draw($skin, $headsr, 8, 8, 16, 8);
	draw($skin, $headt, 8, 8, 8, 0);
	draw($skin, $headb, 8, 8, 16, 0);
	
	draw($skin, $bodyf, 8, 12, 20, 20);
	draw($skin, $bodybk, 8, 12, 32, 20);
	draw($skin, $bodys, 4, 12, 16, 20);
	draw($skin, $bodys, 4, 12, 28, 20);
	draw($skin, $bodyt, 8, 4, 20, 16);
	draw($skin, $bodyb, 8, 4, 28, 16);
	
	draw($skin, $armf, 4, 12, 44, 20);
	draw($skin, $armbk, 4, 12, 52, 20);
	draw($skin, $arms, 4, 12, 40, 20);
	draw($skin, $arms, 4, 12, 48, 20);
	draw($skin, $armt, 4, 4, 44, 16);
	draw($skin, $armb, 4, 4, 48, 16);
	
	draw($skin, $legf, 4, 12, 4, 20);
	draw($skin, $legbk, 4, 12, 12, 20);
	draw($skin, $legs, 4, 12, 0, 20);
	draw($skin, $legs, 4, 12, 8, 20);
	draw($skin, $legt, 4, 4, 4, 16);
	draw($skin, $legb, 4, 4, 8, 16);
	
	// Random string (to avoid file conflicts and overwrites)
	$str = getRand(10);

	// Export image as PNG to output folder
	imagepng($skin, '../out/skin_'.$str.'.png');
	
	// Return string in data response
	echo $str;	
?>