# Dollmaker NEO template for Eleventy
## What is Eleventy?
[Eleventy](https://11ty.dev) (or *11ty*, if you will) is a static site generator. It's very convenient for processing large amounts of files on a page (such as dollmaker images!).

## How do I use it?
Generating a dollmaker with Eleventy is easy:

### Step 1: Install Node.js
You'll need to install [Node.js](https://nodejs.org) on your computer, if not done yet. See the [Node.js download page](https://nodejs.org/en/download) for instructions for your operating system.

### Step 2: Install Eleventy into this folder
Go to this folder on your computer and follow the instructions [here](https://www.11ty.dev/docs/#step-2-install-eleventy). This will install Eleventy into this folder (which will serve as our project folder).

### Step 3: Generate the static page and preview it on a live server
You can find the instructions for that [here](https://www.11ty.dev/docs/#step-5-gaze-upon-your-templates). You can omit the `--serve` command to just generate the files without previewing it on the live server. **Make sure to repeat this step every time you edit/add new images!** It's not automatic like PHP is, which is by design.

If everything went well, you should now have a perfectly working dollmaker!

### Step 4: Upload the files from the `_site` folder to your web host
Since the output is purely static HTML, you *can* in fact use this on Neocities and similar web hosts. **Tip:** Don't copy the folder itself, but only its contents! (Unless you want it to be in a subfolder called `_site` for some reason.)

As I've already said above, you'll need to re-run Eleventy every time you add new files to the folders, or if you've edited any (including the NJK template, CSS files, and/or JavaScript). After that, you'll need to upload the updated files to your web host again. But, at the very least you can easily add images in bulk.