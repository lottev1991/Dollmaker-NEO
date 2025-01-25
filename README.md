# Dollmaker Portable

This is a portable script for drag & drop dress up games, also known as dollmakers. This is essentially a "lite" version of Dollmaker NEO, featuring only the most essential things. Note that this script works best for dollmakers where every piece is draggable.

Note that while this script was created for dollmakers, you could in theory use it for other things, if it fits your usecase.

This is a stripped-down fork of [Ninique's original dollmaker script](https://github.com/ninique/Dollmaker-Script).

## Features
- Drag & drop script.
- Doll save function.
- PHP tools:
    - Embeddable script for populating a container with images (for people who are able to use PHP).
    - A convenient embeddable HTML file containing all the necessary JavaScript in the `<head>` tag of your dollmaker PHP file (if you use plain HTML, feel free to copy the code over to your `<head>` tag instead. Note that the URL to `dollmaker-portable.js` might need to be changed).

## Required libraries
- [jQuery](https://releases.jquery.com/jquery/)
- [jQuery UI](https://releases.jquery.com/ui/)
- [jQuery UI Touch Punch](https://github.com/RWAP/jquery-ui-touch-punch/) (recommended fork)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- [html2canvas](https://github.com/lottev1991/html2canvas) (custom fork; required for full functionality of the script)

## Required CSS selectors
- The container containing the dollmaker should have the ID `#dollmaker-container`. All of the elements listed below should be put *inside* this element.
- Any area that you want to put draggable pieces in should have the class `.pieces-area`. You could have multiple of these on the page, if you really wanted to.
- The area where the doll is assembled should have the ID `#body-area`.
- The doll download button should have the ID `#download-button`.

You are free to customize these however you see fit (though see below for notes).

## Customization notes
- Do **not** style the dollmaker container with the `max-width` CSS property; please use a static `width` instead. `max-width` will screw up the positions of the draggables and will also affect html2canvas rendering. Feel free to implement responsive scaling if necessary; the final doll image will always be scaled back to 100%.
- The CSS `border` property might mess with image positions on mobile. Please keep this in mind when customizing and don't forget to test.