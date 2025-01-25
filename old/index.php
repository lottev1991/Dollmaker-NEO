<!DOCTYPE HTML>
<html>
<head>
	<meta name="viewport" http-equiv="Content-Type">
	<title id="title">Dollmaker NEO - Responsive drag & drop dress up game</title>
	<link id="main-css" rel="stylesheet" type="text/css" href="styles/mainstylesheet.css" charset="utf-8">
	<link id="colors-css" rel="stylesheet" type="text/css" href="styles/colors.css" charset="utf-8">

	<!-- We are now using the latest versions of jQuery and jQuery UI! I managed to make tabs work the way I wanted them to, so I upgraded everything to keep things nice and up-to-date.
	All of this has been tested and works 100% as it should (yes, it still does!). Only change these if you know what you're doing! -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="https://code.jquery.com/ui/1.14.1/jquery-ui.min.js" integrity="sha256-AlTido85uXPlSyyaZNsjJXeCs07eSv3r43kyCVc8ChI=" crossorigin="anonymous"></script>

	<!-- Use Touch Punch to make the drag & drop function resonsive to touch input.
	We're using a more up-to-date fork now, maintained by RWAP software (https://github.com/RWAP). Special thanks to them! -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@rwap/jquery-ui-touch-punch@1.1.5/jquery.ui.touch-punch.min.js" crossorigin="anonymous"></script>

	<!-- We're using FileSaver and html2canvas to save the finished doll as an image. -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js" crossorigin="anonymous"></script>
	
	<!-- We're using a slightly modified fork of html2canvas now (fixes tab flashing and blurred pixels).
	Special thanks to @toohtik on GitHub for the visible child element fix! (https://github.com/toohtik)  -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/lottev1991/html2canvas@1.6.5-custom/dist/html2canvas.min.js" crossorigin="anonymous"></script>

	<!-- This is the drag-and-drop script (and pretty much everything else). -->
	<script type="text/javascript" src="scripts/drag.js"></script>
	<!--remove the following line if you do not want anti-rightclick on images-->
	<!-- Commented this out by default because I really don't care. Uncomment it for your own project if you like. -->
	<!-- <script type="text/javascript" src="scripts/anti-rightclick.js"></script> -->
</head>
<?php
$ignore = array(".", "..", ".htaccess", ".DS_Store");

function displayBase($path, $ignore) {
	$images = scandir("$path/thumbnails");
	foreach ($images as $curimg) {
		if (!in_array($curimg, $ignore)) {
			$filetitle = pathinfo($curimg, PATHINFO_FILENAME);
			$find = ['-slash-', '``', '`',];
			$replace = ['/', '"', "'"];
			echo "<a href=\"$path/full/" . $curimg . "\"><img src=\"$path/thumbnails/" . $curimg . "\" alt=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\" title=\"" . str_replace($find, $replace, ltrim(basename($filetitle), '1234567890')) . "\"></a>";
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
			$find = ['-slash-', '``', '`',];
			$replace = ['/', '"', "'"];
			/* Randomize default skin and eye colors. You can change these manually later if you want.
			Things such as makeup, skin marks etc. I'd rather have as draggable items. */
			$imageDir = 'base/Skintone/full/';
			$images = glob($imageDir . '*.*', GLOB_BRACE);
			$randomImage = $images[array_rand($images)];
			$filetitle = pathinfo($randomImage, PATHINFO_FILENAME);
			?>
			<img id="skintone" src="<?php echo ($randomImage); ?>" alt="The base body of the doll." title="The base body of the doll.">

			<?php
			$imageDir = 'base/LeftEye/full/';
			$images = glob($imageDir . '*.*', GLOB_BRACE);
			$randomImage = $images[array_rand($images)];
			$filetitle = pathinfo($randomImage, PATHINFO_FILENAME);
			?>
			<img id="left-eye" src="<?php echo ($randomImage); ?>" alt="The left eye of the doll." title="The left eye of the doll.">

			<?php
			$imageDir = 'base/RightEye/full/';
			$images = glob($imageDir . '*.*', GLOB_BRACE);
			$randomImage = $images[array_rand($images)];
			$filetitle = pathinfo($randomImage, PATHINFO_FILENAME);
			?>
			<img id="right-eye" src="<?php echo ($randomImage); ?>" alt="The right eye of the doll." title="The right eye of the doll.">
			<!-- The doll background is transparent by default -->
			<img id="doll-bg">
		</div>
		<div id="swatchesArea" class="ui-corner-all">
			<button id="instrBtn" alt="Click here to toggle the instructions for the dollmaker." title="Click here to toggle the instructions for the dollmaker.">Dollmaker instructions</button>
			<div id="instructions">
				<!-- <h3>Instructions:</h3> -->
				<ul id="instructions-list">
					<li>Drag and drop the <b>items</b> from the middle-right of the page onto the doll above.</li>
					<li>For easy navigation among the different items, you can click on the <b>tab of your choice</b> at the top of the page.</li>
					<li>Click on the <b>swatches</b> below to change skin and eye color, as well as the doll background. You choose the eye color per eye, so that you can easily give your doll two different eye colors with any combination of colors.</li>
					<li>Click on the <b>"Download doll"</b> button below to download your finished doll.
						<ul class="subBullet">
							<li><b>NOTE:</b> While exporting the final doll, you'll see the doll container background and border disappear for about a second. This is normal and nothing to worry about; it's all part of the process to prepare and export the final doll.</li>
						</ul>
					</li>
					<li>Click on the <b>"Download avatar (100x100)"</b> button to download a cropped avatar of your doll. (Keep the above note about zoom level in mind!)</li>
					<li>Click on the <b>"Reset dollmaker"</b> button to reset the dollmaker.</li>
					<li>Click on the <b>"Toggle fullscreen"</b> button to toggle between fullscreen and windowed mode.</li>
				</ul>
			</div>
			<h3>Tools:</h3>
				<!-- Button to download the finished doll. -->
				<button id="downloadDoll" alt="Click here to download your finished doll." title="Click here to download your finished doll.">Download doll</button>
				<!-- Button to download a 100x100 avatar of the doll. -->
				<button id="downloadAvi" alt="Click here to download a 100x100 avatar of your doll."title="Click here to download a 100x100 avatar of your doll.">Download avatar (100x100)</button>

				<!-- Button to toggle fullscreen. -->
				<button id="fullscreen" alt="Click here to toggle between fullscreen and windowed mode. (On desktop, you can also press F11.)" title="Click here to toggle between fullscreen and windowed mode. (On desktop, you can also press F11.)" onclick="toggleFullScreen()">Toggle fullscreen</button>
				<!-- Button to refresh the page, resetting all positions. -->
				<button id="reset" alt="Click here to reset the dollmaker to its default settings." title="Click here to reset the dollmaker to its default settings.">Reset dollmaker</button>

				<div id="bgSwitch">
					<h3>Doll background:</h3>
					<!-- No background by default -->
					<a href=""><img src="base/Background/None.png" alt="No background" title="No background"></a>
					<?php displayBase("base/Background", $ignore); ?>
				</div>
				<div id="skinSwitch">
					<h3>Skintone:</h3>
					<?php displayBase("base/Skintone", $ignore); ?>
				</div>
				<div id="leftEyeSwitch">
					<h3>Left eye:</h3>
					<?php displayBase("base/LeftEye", $ignore); ?>
				</div>
				<div id="rightEyeSwitch">
					<h3>Right eye:</h3>
					<?php displayBase("base/RightEye", $ignore); ?>
				</div>
		</div>
		<div id="piecesArea" alt="You can drag pieces from this area." title="You can drag pieces from this area.">
			<?php
			$folders = scandir("images/");

			/*Display the tabs according to folder names*/
			echo "<ul id=\"tabsbar\">";
			foreach ($folders as $key => $curfol) {
				if (!in_array($curfol, $ignore)) {
					$curfol = str_replace($find, $replace, ltrim($curfol, '1234567890')) ;
					/* Replace specific characters to susbtitute characters PHP struggles with */
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

		<!--The message for anti-rightclick-->
		<!-- Commented out by default because I dom't care for it. Feel free to uncomment for your own project if you want. -->
		<!-- <div id="anti-rightclick">Please do not steal the images from this dollmaker</div>	 -->
	</div><!--container-->

</body>
</html>