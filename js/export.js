/* This file is for exporting the final doll to a PNG file. */

// --------------------------------------------------

/* Prepare doll for export. This is just in case you styled the div. */
function prepareDoll() {
    $("#bodyArea").css({
        "background-color": "transparent",
        "border-radius": "0px",
    });
}

/* Revert doll CSS after export. This is just in case you styled the div. */
function revertDoll() {
    $("#bodyArea").css({
        "background-color": "",
        "border-radius": "",
    });
}

/* Soft-coded doll size and position on the page */
const bodyArea = document.getElementById("bodyArea");
let containerWidth = bodyArea.offsetWidth;
let containerHeight = bodyArea.offsetHeight;
let containerLeft = bodyArea.offsetLeft;
let containerTop = bodyArea.offsetTop;

/* Export the doll */
function exportDoll() {
    html2canvas($("#dollmaker_container"), {
        onclone: [prepareDoll()],
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
            revertDoll();
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