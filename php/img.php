<?php
$ignore = array( ".", "..", ".htaccess", ".DS_Store", );
$folders = scandir( "images/" );
$test = "images/";
if ( ! in_array( $test, $ignore) ) {
	$images = scandir( $test );
	foreach ( $images as $current_image ) {
		$file_title = pathinfo( $current_image, PATHINFO_FILENAME );
		if ( ! in_array( $current_image, $ignore )) {
			echo '<img alt="' . basename( $file_title ) . '" src="images/' . $current_image . '">';
		}
	};
}