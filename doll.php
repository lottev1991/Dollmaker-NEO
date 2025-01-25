<!DOCTYPE HTML>
<html>
<head>
	<?php include "head.php"?>
</head>
<body>
	<div id="dollmaker-container" onload="dragFunction()">
		<div id="body-area" onload="dropDunction()" alt="Body area"></div>
			<button onclick="downloadDoll()" alt="Download doll">Download doll</button>
			<?php
				include "images.php";
			?>
	</div>
</body>
</html>