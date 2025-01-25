//This script is part of Ninique's Dollmaker Script (http://minidollz.ninique.net)
/* NEO fork by Lotte V (https://lottev.moe | https://github.com/lottev1991) */
/* This is the "portable version" of the draggable code. You can easily embed this in any type of page layout. */

// --------------------------------------------------

$(function () {
	$(".pieces-area").find('img').draggable({
		stack: ".ui-draggable",
		distance: 0,
		containment: "document",
	})
	$("#body-area").droppable({
		tolerance: "touch",
	});
	/* Prepare doll for export. This is just in case you styled any of the divs. */
	function prepareDoll(clone) {
		$(clone).find('#dollmaker-container, #dollmaker-container > div').css({
			"background": "none",
			"border": "0",
			"border-radius": "0",
		});
	}
	/* Sets overflow to visible for all pieces areas */
	$(".pieces-area").css("overflow", "visible");

	/* Soft-coded doll size and position on the page */
	const bodyArea = document.getElementById("body-area");
	let containerWidth = bodyArea.offsetWidth;
	let containerHeight = bodyArea.offsetHeight;
	let containerX = bodyArea.offsetLeft;
	let containerY = bodyArea.offsetTop;
	/* Download the doll */
	$("#download-button").on("click", function (){
		html2canvas(document.querySelector("#dollmaker-container"), {
			onclone: function (clone) {
				prepareDoll(clone);
			},
			backgroundColor: null,
			allowTaint: true,
			useCORS: true,
			width: containerWidth,
			height: containerHeight,
			x: containerX,
			y: containerY,
			scale: 1,
			imageSmoothingEnabled: false,
		}).then(canvas => {
			canvas.toBlob(function (blob) {
				try {
					window.saveAs(
						blob, 'my_doll.png', canvas.toDataURL('image/png'),
					);
				} catch (e) {
					alert(e);
				};
			});
		});
	}) 
})