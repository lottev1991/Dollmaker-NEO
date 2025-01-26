//This script is part of Ninique's Dollmaker Script (http://minidollz.ninique.net)
/* NEO fork by Lotte V (https://lottev.moe | https://github.com/lottev1991) */

// --------------------------------------------------

function toggleFullScreen() { /* Add full screen toggle. Mostly did this for mobile. But playing dressup games without any visual distractions is pretty sweet in general, right? */
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
}

/* Change the CSS of the cloned doll element.
Basically, this function makes it so that the doll has a transparent background upon export (if no background has been selected that is).
This no longer affects the actual doll area itself, so you don't have to worry about flashes anymore.
(You can remove the "#doll-bg" part if you want the rounded corners to remain in all background images.)*/
function prepareDoll(clone) {
	$(clone).find('#bodyArea,.ui-tabs-panel,#doll-bg').css({
		"background-color": "transparent",
		"border": "0",
		"border-radius": "0",
	});
}

/* Re-implement old "ui-tabs-hide" class. This is to set inactive tabs to "visibility: hidden" and "display: block" instead of "display: none" upon switching, to preserve dragged-out items. */
(function ($) {
	$.fn.invisible = function () {
		return this.each(function () {
			$(this).addClass("ui-tabs-hide")
		});
	};
	$.fn.visible = function () {
		return this.each(function () {
			$(this).removeClass("ui-tabs-hide")
		});
	};
}(jQuery));

$(function () { /* Simplified this in order to future-proof the code */
	//Makes the pieces draggable & sets options
	$('#piecesArea').find('img').draggable({
		stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. */
		distance: 0, /* I believe this has to do with mouse distance? */
		containment: "document", /* Makes it so pieces don't get lost off the page while dragging them */
	})

	//Sets what happens when you release a piece
	$("#bodyArea").droppable({
		accept: ".ui-draggable", /* Accept draggable pieces */
		tolerance: "touch", /* Accept any part of a draggable piece, rather than only the center */
		drop: function (event, ui) {
			//this is so that the element "sticks" even when tab is changed.
			ui.draggable.addClass("draggedout");
		},
		//changes current tab to the tab the piece belongs to when dragged out of body area
		out: function (event, ui) {
			ui.draggable.removeClass("draggedout");
			var whichTab = ui.draggable.parent().index() - 1; /* Had to change the ID attribute to an index, since that's how it works in jQuery UI nowadays.
			Since the tab index is zero-based, I had to pass -1 for it to work correctly (it seems to be 1-based by default in jQuery?).
			Also, the "select" function got renamed to "active" in jQuery UI v1.9 (notice a pattern? lol), which is why it's called that here.
			The function remains effectively the same. */
			$("#piecesArea").tabs({
				active: whichTab
			});
		},
	});
	//tabs
	$("#piecesArea").tabs({
		/* Apply the custom visibility functions we defined earlier upon tab activation */
		activate: function (event, ui) {
			ui.oldPanel.invisible();
			ui.newPanel.visible();
		},
	});

	/* Button for showing and hiding the dollmaker instructions */
	$("#instrBtn").on("click", function () {
		$("#instructions").slideToggle();
	}
	);

	/*NOTE: It would be better to use an implementation of this that uses nth child, and put the order the same in both cases.*/

	//changes the body when thumbnails are clicked	
	$("#swatchesArea a").on("click", function () {
		var changeSrc = $(this).attr("href");
		var type = $(this).parent().attr("id");
		/* Dynamic alt/title-switching (currently for the background div only) */
		let bgPath = `base/Background/full/`;
		var changeAttr = changeSrc.replace(bgPath, "").replace(/\.[^/.]+$/, "").replace('-slash-', '/').replace('``', '"').replace('`', '\'');
		switch (type) {
			case "skinSwitch":
				$("#skintone").attr("src", changeSrc,);
				break;
			case "leftEyeSwitch":
				$("#left-eye").attr("src", changeSrc,);
				break;
			case "rightEyeSwitch":
				$("#right-eye").attr("src", changeSrc,);
				break;
			case "bgSwitch":
				$("#doll-bg").attr({
					"src": changeSrc,
					"alt": changeAttr,
					"title": changeAttr,
				});
				break;
		};
		return false;
	});

	/* Refreshes the page to reset all the pieces to their original position, and all the swatches back to default (which is randomized in the case of skin and eyes).*/
	$("#reset").on("click", function () {
		location.reload(true);
		window.location.reload();
	});

    /* I have now made it so that the width and height of the rendered canvas will always be the exact same as the body area width and height. So you no longer have to specify it manually. */
	const bodyArea = document.getElementById("bodyArea");
	let containerWidth = bodyArea.offsetWidth;
	let containerHeight = bodyArea.offsetHeight;

	/* Adds that super sweet option to download your finished doll. No more manual screenshotting and editing needed!
		WARNING: THIS WILL DO LOTS OF HACKY STUFF! That's just the nature of the game I'm afraid. */
	$("#downloadDoll").on("click", function () {
		html2canvas(document.querySelector("#dollmaker_container"), {
			onclone: function (clone) {
				prepareDoll(clone);
			},
			backgroundColor: null, /* Important for transparent background; if you remove this, it will be white instead (aka default html2canvas behavior). */
			allowTaint: true,
			useCORS: true,
			width: containerWidth,
			height: containerHeight,
			scale: 1, /* Renders the final canvas at a zoom level of 1 at all times, otherwise your final image will be zoomed in along with the page and we don't want that.  */
			imageSmoothingEnabled: false, /* This is a custom setting that I added to my fork of html2canvas.
			When set to "false", it makes sure the final image remains pixelated no matter the zoom level and/or scaling ("true" is the default and does the opposite).
			NOTE: I've coded it so that setting "image-rendering: pixelated" and "image-rendering: crisp-edges" in CSS stylesheets will accomplish the same thing.*/
		}).then(canvas => {
			canvas.toBlob(function (blob) {
				try { /* Save the final image as PNG.
						On desktop, you can easily change the name to whatever you like.
						On smartphones, you'll have to do this manually after saving.
						(I have no interest in accessing anyone's phone file system, due to privacy concerns. This is why you have to do it after the fact in that case.) */
					window.saveAs(
						blob, 'my_doll.png', canvas.toDataURL('image/png'),
					);
				} catch (e) {
					alert(e); /* Make sure to run this project on a web server! Otherwise you might get an error when trying to save the image (especially with Firefox, due to its CORS policy).
					I added this alert function to warn/remind people of that (since I ran in it myself and was very confused at the time when I was still a newbie).
					Please consult the readme for tips on local testing!*/
				};
			});
		});
	});

	/* Takes the dimensions and offsets of the avatar area from the document */
	const aviArea = document.querySelector("#avi-area");
	let aviWidth = aviArea.offsetWidth;
	let aviHeight = aviArea.offsetHeight;
	let aviX = bodyArea.offsetLeft + aviArea.offsetLeft;
	let aviY= bodyArea.offsetTop + aviArea.offsetTop;

	/* Option to download an avatar version of your doll (size is now customizable through CSS). It functions similarly to the other button, just with a different canvas size and x-y offsets */
	$("#downloadAvi").on("click", function () {
		html2canvas(document.querySelector("#dollmaker_container"), {
			onclone: function (clone) {
				prepareDoll(clone);
			},
			backgroundColor: null,
			allowTaint: true,
			width: aviWidth,
			height: aviHeight,
			/* Offset properties so that the avatar will be in frame properly. (Calculating these wasn't fun...) */
			x: aviX,
			y: aviY,
			scale: 1,
			imageSmoothingEnabled: false,
		}).then(canvas => {
			canvas.toBlob(function (blob) {
				try {
					window.saveAs(
						blob, 'my_doll_avi.png', canvas.toDataURL('image/png'),
					);
				} catch (e) {
					alert(e);
				};
			});
		});
	});
});

