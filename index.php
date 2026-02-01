<!DOCTYPE HTML>
<html>
<head>
	<meta name="viewport" http-equiv="Content-Type">
	<title id="title">Dollmaker NEO - Responsive drag & drop dress up game</title>
	<link id="main-css" rel="stylesheet" type="text/css" href="styles/mainstylesheet.css" charset="utf-8">
	<link id="colors-css" rel="stylesheet" type="text/css" href="styles/colors.css" charset="utf-8">

	<!-- We are now using the latest versions of jQuery and jQuery UI! I managed to make tabs work the way I wanted them to, so I upgraded everything to keep things nice and up-to-date.
	All of this has been tested and works 100% as it should (yes, it still does!). Only change these if you know what you're doing! -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-4.0.0.min.js" integrity="sha256-OaVG6prZf4v69dPg6PhVattBXkcOWQB62pdZ3ORyrao=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.14.2/jquery-ui.min.js" integrity="sha256-mblSWfbYzaq/f+4akyMhE6XELCou4jbkgPv+JQPER2M=" crossorigin="anonymous"></script>

	<!-- Use Touch Punch to make the drag & drop function resonsive to touch input.
	We're using a more up-to-date fork now, maintained by RWAP software (https://github.com/RWAP). Special thanks to them! -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@rwap/jquery-ui-touch-punch@1.1.5/jquery.ui.touch-punch.min.js" crossorigin="anonymous"></script>

	<!-- We're using FileSaver and html2canvas to save the finished doll as an image. -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js" crossorigin="anonymous"></script>
	
	<!-- We're using a slightly modified fork of html2canvas now (fixes tab flashing and blurred pixels).
	Special thanks to @toohtik on GitHub for the visible child element fix! (https://github.com/toohtik)  -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/lottev1991/html2canvas@1.6.5-custom/dist/html2canvas.min.js" crossorigin="anonymous"></script>

	<!--  This is the minified version of the drag-and-drop script (and pretty much everything else). Recommended for production use. -->
	<script type="text/javascript" src="scripts/drag.min.js"></script>

</head>
<?php
$ignore = array(".", "..", ".htaccess", ".DS_Store");
/* This function now also accepts creating buttons for removing an image. It is no longer restricted to backgrounds alone.
To do this, just put the image button in the root folder of the clickable option.
You can name the button anything you like. */
function displayBase($path, $ignore) {
	$images = scandir("$path/thumbnails");
	$noneimg = scandir("$path"); // The button image that returns none should always go in the root folder
	$ignorefol = array("full", "thumbnails"); //Exclude subfolders
	// Defines "none"-buttons
	foreach ($noneimg as $curimg) {
		if (!in_array($curimg, $ignore) && !in_array($curimg, $ignorefol)) {
			$filetitle = pathinfo($curimg, PATHINFO_FILENAME);
			/* Replace specific characters to susbtitute characters PHP struggles with */
			$find = ['-slash-', '``', '`',];
			$replace = ['/', '"', "'"];
			echo "<a href=\"\"><img src=\"$path/$curimg\" alt=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\" title=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\"></a>";
		}
	}
	// Defines regular buttons that always return images
	foreach ($images as $curimg) {
		if (!in_array($curimg, $ignore)) {
			$filetitle = pathinfo($curimg, PATHINFO_FILENAME);
			$find = ['-slash-', '``', '`',];
			$replace = ['/', '"', "'"];
			echo "<a href=\"$path/full/$curimg\"><img src=\"$path/thumbnails/$curimg\" alt=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\" title=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\"></a>";
		}
	};
}
?>
<body>
	<h1 id="page-header">Dollmaker NEO</h1>
	<h2 id="page-subheader">Original code by <a href="https://github.com/ninique/Dollmaker-Script" target="_blank">Ninique</a> | Fork by <a href="https://github.com/lottev1991/Dollmaker-NEO" target="_blank">Lotte V</a></h2>
	<!-- You can put your own content up here. You can move the dollmaker on the page using CSS (see mainstylesheet.css for details) -->
	<div id="dollmaker_container">
		<div id="bodyArea" class="ui-corner-all" title="Make your doll here.">
			<?php
			/* Find-and-replace options for variable names. */
			$ignore = array(".", "..", ".htaccess", ".DS_Store");
			$randfol = "(random)";  /* The "(random)" suffix is for images you don't want to see randomized. Any folder that doesn't have this suffix will have randomized settings on page load (you can change them manually later). */
			$find = ['-slash-', '``', '`', $randfol];
			$replace = ['/', '"', "'", ''];
			$cssfind = [" $randfol", ' '];
			$cssreplace = ['', '-'];
			$folders = scandir("base/");
			foreach ($folders as $key => $curfol) {
				if (!in_array($curfol, $ignore)) {
					$key = $key - 1;
					$imageDir = "base/$curfol/full/";
					$images = glob($imageDir . '*.*', GLOB_BRACE);
					$randomImage = $images[array_rand($images)]; /* Randomize relevant parts. You can change these manually later if you want. */
					$filetitle = pathinfo($randomImage, PATHINFO_FILENAME);
					// Different settings for static vs. randomized images
					if (str_ends_with($curfol, $randfol)) { // Randomized images
						echo "<img id=\"" . ltrim(str_replace($cssfind, $cssreplace, $curfol), '1234567890') . "\" src=\"" . $randomImage . "\" alt=\"" . $filetitle ."\" title=\"" . $filetitle ."\" class=\"clickable\">\n";
					} else { // Static non-randomized images
						foreach ($images as $key => $curimg) {
							if (!in_array($curimg, $ignore)) {
								$key = $key - 1;
								echo "<img id=\"" . ltrim(str_replace($cssfind, $cssreplace, $curfol), '1234567890') . "\" class=\"clickable\">\n";
							}	
						}	
					}
				}
			}
			?>
			<!-- Avatar area, not visible on the document -->
			<div id="avi-area"></div>
		</div>
		<div id="swatchesArea" class="ui-corner-all">
			<button id="instrBtn" alt="Click here to toggle the instructions for the dollmaker." title="Click here to toggle the instructions for the dollmaker.">Dollmaker instructions</button>
			<div id="instructions">
				<ul id="instructions-list">
					<li>Drag and drop the <b>items</b> from the middle-right of the page onto the doll above.</li>
					<li>For easy navigation among the different items, you can click on the <b>tab of your choice</b> at the top of the page.</li>
					<li>Click on the <b>swatches</b> below to change skin and eye color, as well as the doll background. You choose the eye color per eye, so that you can easily give your doll two different eye colors with any combination of colors.</li>
					<li>Click on the <b>"Download doll"</b> button below to download your finished doll.</li>
					 <!-- Make sure to adjust the listed avatar dimensions here too! -->
					<li>Click on the <b>"Download avatar (100x100)"</b> button to download a cropped avatar of your doll.</li>
					<li>Click on the <b>"Reset dollmaker"</b> button to reset the dollmaker.</li>
					<li>Click on the <b>"Toggle fullscreen"</b> button to toggle between fullscreen and windowed mode.</li>
				</ul>
			</div>
			<h3>Tools:</h3>
				<!-- Button to download the finished doll. -->
				<button id="downloadDoll" alt="Click here to download your finished doll." title="Click here to download your finished doll.">Download doll</button>
				<!-- Button to download a 100x100 avatar of the doll. Make sure to change the dimensions listed if you changed them in the CSS.  -->
				<button id="downloadAvi" alt="Click here to download a 100x100 avatar of your doll." title="Click here to download a 100x100 avatar of your doll.">Download avatar (100x100)</button>

				<!-- Button to toggle fullscreen. -->
				<button id="fullscreen" alt="Click here to toggle between fullscreen and windowed mode. (On desktop, you can also press F11.)" title="Click here to toggle between fullscreen and windowed mode. (On desktop, you can also press F11.)" onclick="toggleFullScreen()">Toggle fullscreen</button>
				<!-- Button to refresh the page, resetting all positions. -->
				<button id="reset" alt="Click here to reset the dollmaker to its default settings." title="Click here to reset the dollmaker to its default settings.">Reset dollmaker</button>

				<?php 
				/* We can now dynamically add switcher areas containing swatches to the page, which means we can now easily add any sort of swatches we want.
				All the swatches are ordered by folder name, so it's good to put some numbers in the front of the folder name if you'd like to see them listed in a specific order. */
				$folders = scandir("base/");
				$ignore = array(".", "..", ".htaccess", ".DS_Store");
				foreach ($folders as $key => $curfol) {
					if (!in_array($curfol, $ignore)) {
						$key = $key - 1;
						$find_id = [' (random)', ' '];
						$replace_id = ['', '-'];
						$find_title = [' (random)'];
						$replace_title = [''];
						$id = str_replace($find_id, $replace_id, ltrim($curfol, '1234567890'));
						$title = str_replace($find_title, $replace_title, ltrim($curfol, '1234567890'));
						echo "<div id=\"" . $id . "-switch\" class=\"switcher\">\n"; // The "switcher" class is so that the switchers can be easily found with JavaScript
						echo "<h3>" . $title . ":</h3>\n";
						echo displayBase("base/$curfol", $ignore);
						echo "</div>\n";
					}
				}
				?>
				
		</div>
		<div id="piecesArea" alt="You can drag pieces from this area." title="You can drag pieces from this area.">
			<?php
			$folders = scandir("images/");

			/*Display the tabs according to folder names*/
			echo "<ul id=\"tabsbar\">";
			foreach ($folders as $key => $curfol) {
				if (!in_array($curfol, $ignore)) {
					$curfol = str_replace($find, $replace, ltrim($curfol, '1234567890')) ;
					$find = ['-slash-', '``', '`',];
					$replace = ['/', '"', "'"];
					$key = $key - 1;
					echo "<li><a href=\"#tabs-" . $key . "\">" . $curfol . "</a></li>\n";
				}
			};
			echo "</ul>";

			/*For each tab, display the props*/
			foreach ($folders as $key => $curfol) {
				if (!in_array($curfol, $ignore)) {
					$key = $key - 1;
					echo "<div id=\"tabs-" . $key . "\">\n";
					$images = scandir("images/" . $curfol);
					foreach ($images as $curimg) {
						/* Add image filenames as both alt text and titles for easy crediting on hover */
						$filetitle = pathinfo($curimg, PATHINFO_FILENAME);
						if (!in_array($curimg, $ignore)) {
							echo "<img alt=\"" . str_replace($find, $replace, basename($filetitle)) . "\" src=\"images/" . $curfol . "/" . $curimg . "\" title=\"" . str_replace($find, $replace, basename($filetitle)) . "\">";
						}
					};
					echo "</div>\n";
				}
			};
			?>
		</div>
		<!--PiecesArea-->
	</div><!--container-->

</body>
</html>