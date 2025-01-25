//This script is part of Ninique's Dollmaker Script (http://minidollz.ninique.net)
/* NEO fork by Lotte V (https://lottev.moe | https://github.com/lottev1991) */
/* This is the "lite version" of the draggable code. You can easily embed this in any type of page layout. */

// --------------------------------------------------

function dragFunction() {
	//Makes the pieces draggable & sets options
	$(this).find('img').draggable({
		stack: ".ui-draggable",
		distance: 0,
		containment: "document",
	})
};

function dropFunction() {
	//Sets what happens when you release a piece
	$("#body-area").droppable({
		tolerance: "touch",
	});
};

// --------------------------------------------------

/* Prepare doll for export. This is just in case you styled the divs. */
function prepareDoll(clone) {
	$(clone).find('#body-area, #dollmaker-container').css({
		"background": "none",
		"border": "0",
		"border-radius": "0",
	});
}

/* Soft-coded doll size and position on the page */
const bodyArea = document.getElementById("bodyArea");
let containerWidth = bodyArea.offsetWidth;
let containerHeight = bodyArea.offsetHeight;
let containerLeft = bodyArea.offsetLeft;
let containerTop = bodyArea.offsetTop;

/* Download the doll */
function downloadDoll() {
	html2canvas(document.querySelector("#dollmaker-container"), {
		onclone: function (clone) {
			prepareDoll(clone);
		},
		backgroundColor: null,
		allowTaint: true,
		useCORS: true,
		width: containerWidth,
		height: containerHeight,
		x: containerLeft,
		y: containerTop,
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
}

