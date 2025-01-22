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

/* Temporarily change the CSS of the body and tab areas to properly export the finished doll. It reverts after the doll is generated for saving.
	Basically, this function makes it so that the doll has a transparent background upon export (if no background has been selected that is) and that the pieces dragged from the tabs will be visible on the doll.
	As a result, the page will look a bit weird for a split second, but it will revert afterwards (see revertDoll()), so don't worry about it. \
	Yes this is all very hacky but you simply need that with html2canvas, at least when it comes to drag & drop pages. */
function prepareDoll() {
	$("#bodyArea").css({
		"background-color": "transparent", /* Make div background transparent to prepare doll (html2canvas will make it "properly" transparent later, but this removes the color information at least) */
		"border": "1px solid transparent", /* Make border transparent so it won't show in the final image */
		"border-radius": "0px", /* Resets border radius so the rounded corners are not visible on the final image */
	});
}

/* Revert the CSS of the body div and tabs back to normal. */
function revertDoll() {
	$("#bodyArea").css({
		"background-color": "",
		"border-radius": "",
		"border": "",
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
		stack: ".ui-draggable", /* Stack the currently dragged item on top of all other items. I got rid of the "trailing" that Ninique's original script had because I don't care for it (and most of the dollmakers I used to play with back in the day didn't have it). I couldn't get it to work with jQuery UI v1.8.24 anyway for what it's worth, and I don't consider that a loss. */
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
			var whichTab = ui.draggable.parent().index() - 1; /* Had to change the ID attribute to an index, since that's how it works in jQuery UI nowadays. Since the tab index is zero-based, I had to pass -1 for it to work correctly (it seems to be 1-based by default in jQuery?).
			Also, the "select" function got renamed to "active" in jQuery UI v1.9 (notice a pattern? lol), which is why it's called that here. The function remains effectively the same. */
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

	/* Adds that super sweet option to download your finished doll. No more manual screenshotting and editing needed!
		WARNING: THIS WILL DO LOTS OF HACKY STUFF! That's just the nature of the game I'm afraid. */
	$("#downloadDoll").on("click", function () {
		html2canvas(document.querySelector("#dollmaker_container"), {
			onclone: [prepareDoll()],
			backgroundColor: null, /* Important for transparent background; if you remove this, it will be white instead (aka default html2canvas behavior). */
			allowTaint: true,
			useCORS: true,
			/* !! IMPORTANT !! Make these the EXACT same width and height as the "bodyArea" div!!!
				This does mean that you sadly can't add the function to change the doll's width and height like some older dollmakers have. I guess some concessions simply need to be made... */
			width: 249,
			height: 400,
			/* Offsets in pixels because of the body area border. Make these offsets the same number as the border is wide in pixels (and again, please use absolute pixels).
				Obviously, if you've created a borderless layout, you can remove these lines. */
			x: 1,
			y: 1,
			scale: 1, /* Renders the final canvas at a zoom level of 1 at all times, otherwise your final image will be zoomed in along with the page and we don't want that.  */
			imageSmoothingEnabled: false, /* This is a custom setting that I added to my fork of html2canvas. When set to "false", it makes sure the final image remains pixelated no matter the zoom level and/or scaling ("true" is the default and does the opposite). NOTE: I've coded it so that setting "image-rendering: pixelated" and "image-rendering: crisp-edges" in CSS stylesheets will accomplish the same thing.*/
		}).then(canvas => {
			canvas.toBlob(function (blob) {
				/* Revert the CSS of the body div and tabs back to normal. */
				revertDoll();
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
	/* Option to download a 100x100 avatar version of your doll. It functions similarly to the other button, just with a different canvas size and x-y offsets */
	$("#downloadAvi").on("click", function () {
		html2canvas(document.querySelector("#dollmaker_container"), {
			onclone: [prepareDoll()],
			backgroundColor: null,
			allowTaint: true,
			width: 100,
			height: 100,
			/* Offset properties so that the avatar will be in frame properly. (Calculating these wasn't fun...) */
			x: 75,
			y: 36,
			scale: 1,
			imageSmoothingEnabled: false,
		}).then(canvas => {
			canvas.toBlob(function (blob) {
				revertDoll();
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

