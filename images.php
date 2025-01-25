<?php
$ignore = array(".", "..", ".htaccess", ".DS_Store");
$folders = scandir( "images/" );
foreach ( $folders as $key => $curfol ) {
	if ( !in_array( $curfol, $ignore) ) {
		$key = $key - 1;
		$images = scandir( "images/" . $curfol );
		foreach ( $images as $curimg ) {
			$filetitle = pathinfo( $curimg, PATHINFO_FILENAME );
			if ( !in_array( $curimg, $ignore )) {
				echo "<img alt=\"" . basename($filetitle) . "\" src=\"images/" . $curfol . "/" . $curimg . "\">";
			}
		};
	}
};
?>