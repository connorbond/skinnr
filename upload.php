<?php
	
	// Random String Generator | Simplified from http://stackoverflow.com/a/4356295
	function getRand($len) {
		$char = 'abcdefghijklmnopqrstuvwxyz';
		$rand = '';
		for ($i = 0; $i < $len; $i++) {
			$rand .= $char[rand(0, strlen($char) - 1)];
		}
		return $rand;
	}
	$extra = getRand(10);

	
	// PHP File Upload | Source: http://www.w3schools.com/php/php_file_upload.asp
	$file_exts = array("jpg", "bmp", "jpeg", "gif", "png");
	$upload_exts = end(explode(".", $_FILES["file"]["name"]));
	
	if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/gif")) 
	&& ($_FILES["file"]["size"] < 512000)
	&& in_array($upload_exts, $file_exts)) {
		if (file_exists("uploads/" . $extra . $_FILES["file"]["name"])) {
			echo "<div>"."(".$extra.$_FILES["file"]["name"].")"." already exists. "."</div>";
		} else {
			move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$extra.$_FILES["file"]["name"]);
			sleep(4);
			header('Location: http://dev.connorbond.co.uk/skinnr/index.php?upload='.$extra.$_FILES["file"]["name"]);
		}
	} else {
		echo "<!DOCTYPE html><html><head><title>Skinnr | Error: Invalid File</title><link rel='shortcut icon' href='img/favicon.ico' /><link rel='stylesheet' href='css/styles.css'><meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' /><style>body { padding-left: 0px !important }</style></head>" .
			"\n<body><div class='upError'>" .
			"\n<p><img src='img/sad.png' width='80px' height='80px' /></p>" .
			"\n<br><p><strong>Oops.</strong> That's an invalid file.</p>" .
			"\n<p>Only <strong>.jpg</strong>'s and <strong>.png</strong>'s are accepted, under 0.5mb. Sorry.</p>" .
			"\n<br><p><a href='http://dev.connorbond.co.uk/skinnr/'><button class='grnBtn'>Go back...</button></a></p>" .
		"\n</div></body></html>";
	}
	
?>