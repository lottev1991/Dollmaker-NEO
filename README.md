# Dollmaker NEO

**Dollmaker NEO** is a script (or rather, a set of scripts) to bring drag & drop dress up games (or dollmakers, as we often called them) to the modern age, without making them any less fun. If anything, it's the opposite, as the process of dollmaking has been made much easier than it used to be.

This project is a fork of Ninique's original [Dollmaker script](https://github.com/ninique/Dollmaker-Script); I simply modernized and styled it. Special thanks to her, because if I hadn't looked at her code, I would've never learned PHP.

## New features
- **Responsive page layout**. The dollmaker's content is always centered, which means it will load nicely on phones and tablets, while still looking good on PC screens.
- **Support for touch input**, which means you can also actually *play* with the dollmaker on your phone or tablet. This is done with the help of the [Touch Punch](https://github.com/furf/jquery-ui-touch-punch/) library.
- **Exporting your finished doll as a PNG image**, with the help of [FileSaver.js](https://github.com/eligrey/FileSaver.js) and [html2canvas](https://github.com/niklasvh/html2canvas). No more manual screenshotting and pasting in a paint program!
    - The backgrounds are also **transparent by default**, so you don't need to do that yourself either.
    - It also has the ability to **create a cropped avatar** of your final doll (100x100 pixels by default) for easy use on social media services, forums and chat rooms.
- **Randomized images** *(PHP-only)*. By default, the script makes it so that the doll has no default skin or eye color; it picks a random one upon loading. (You can change these manually afterwards, don't worry!)
- **Fullscreen toggle**. Why I added this? Honestly, I don't remember exactly... But I *do* know this makes entering fullscreen on the page much easier on mobile.
- **Dollmaker instructions toggle**. I made it so that the instructions don't take up space if you don't need them at the moment. This was done to maintain a responsive layout.

I've also decided to use the latest versions of [jQuery](https://releases.jquery.com/jquery/) and [jQuery UI](https://releases.jquery.com/ui/) as of writing. Those are, of course, very different versions from the ones Ninique used, with quite a few breaking changes; I've adjusted the code to maintain the intended functionality. On top of that, it also supports newer libraries such as html2canvas (which refused to work with jQuery 1.3 and jQuery UI 1.7.2 on my end). (**Note:** You may remember that this repo used to stringently use jQuery v1.8.3 and jQuery UI v1.8.24. This is no longer the case; as I've mentioned, I managed to update the code so that the script works fine with the latest versions of both libraries (which admittedly had given me a real headache before). I plan to keep everything as much up-to-date as possible as a result of this (unless there are ever any breaking changes that I won't be able to fix).)

## Old features
Note that "old" in this case means "I liked these features *so* much, I decided to keep them around". All of these are 100% credited to Ninique.
* **Drag & Drop dress up**, powered by jQuery and jQuery UI. The very core of dollmakers.
- **Stacking of pieces**. This is a native component of jQuery UI. This basically means you can add pieces in any order to your doll, meaning you can layer them in any way you like.
* **A nice tabbed layout**, which will make your dollmaker look neat, tidy and sorted. Perfect for larger projects!
* **Easily adding new pieces to the page with PHP** *(recommended)*. You can also still do it with plain HTML of course, but *do* consider using PHP for your dollmaker! It will make your life a lot easier, trust me. (Please read "Testing and running your dollmaker locally" right below to see how to preview and test PHP files directly on your computer).

## Testing and running your dollmaker locally
For locally testing/running your dollmaker, the primary option I recommend is [XAMPP](https://www.apachefriends.org/) (which also happens to feature PHP as a part of it, so you won't need to install it separately). Unlike Ninique's original script, I do in fact recommend you run this on a localhost web server (for PHP this is necessary, but even if you prefer plain HTML you may want to consider it, at least if you want the image exporting feature to work properly). You can read more on the CORS policy [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (TL;DR: running certain scripts from your computer's filesystem is not always possible, due to security concerns).

An alternative way to run your dollmaker locally is to install [Visual Studio Code](https://code.visualstudio.com/) with the [Five Server](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) extension, as well as [PHP](https://www.php.net/) (unless you don't want to use PHP that is). This is the setup I use, but it may not be very friendly for beginners. XAMPP is definitely a lot easier to use in that case.

For editing JavaScript (and CSS, and HTML too), I definitely do recommend Visual Studio code though (or a different code editor if you prefer that), so I recommend you install it either way, even if you don't plan on live previewing PHP files with it. (*Never* use basic Notepad on Windows for programming tasks! Unless you *really* know what you're doing.)

As for online testing, many web hosting providers already provide a so-called [LAMP-stack](https://en.wikipedia.org/wiki/LAMP_(software_bundle)), so unless you're a masochist like me and use a VPS for hosting, you likely won't need to set up anything special before you can upload the files. (Note that if you plan on using something like Neocities, you won't be able to use PHP.)

## Other stuff
I've written down a *lot* of notes in the files provided with this fork, and I recommend you read them if you plan on making your own dollmaker. Some of them are pretty important! (*Especially* the ones related to html2canvas. That library will need quite a bit of "hacking" in order to work properly.)

You can also read Ninique's old readme [here](README-old.md) for more information. You can ignore the part about the default dollmaker pieces; I've replaced them with my own and I don't care if people reuse them, as long as you credit me. You can find the license [here](LICENSE-default-images), or a more human-readable version [here](https://creativecommons.org/licenses/by-sa/4.0/). You're of course still free to replace them with your own, I really don't care either way. (The above license *only* counts for the default images I created; any images you create yourself will of course be licensed under your own terms.)