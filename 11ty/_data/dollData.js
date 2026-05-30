const fs = require('fs');
const path = require('path');

const IGNORE = [".", "..", ".htaccess", ".DS_Store", "Thumbs.db"];

// Converted PHP logic to Eleventy JavaScript logic
function cleanName(name) {
    let clean = name.replace(/^\d+/, '');
    clean = clean.replace(/-slash-/g, '/')
        .replace(/``/g, '"')
        .replace(/`/g, "'")
        .replace(/\(random\)/g, '');
    return clean.trim();
}

function cleanId(name) {
    return name.replace(/^\d+/, '')
        .replace(/\(random\)/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

module.exports = function () {
    let baseDir = path.join(process.cwd(), 'src/base');
    let imagesDir = path.join(process.cwd(), 'src/images');

    if (!fs.existsSync(imagesDir)) {
        baseDir = path.join(process.cwd(), 'base');
        imagesDir = path.join(process.cwd(), 'images');
    }

    let swatches = [];
    let tabs = [];

    // Swatches
    if (fs.existsSync(baseDir)) {
        const folders = fs.readdirSync(baseDir).filter(f => !IGNORE.includes(f));

        folders.forEach(folder => {
            const folderPath = path.join(baseDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                const thumbPath = path.join(folderPath, 'thumbnails');
                let files = [];
                let noneFiles = [];

                fs.readdirSync(folderPath).forEach(file => {
                    if (!IGNORE.includes(file) && file !== 'full' && file !== 'thumbnails') {
                        noneFiles.push({
                            src: `base/${folder}/${file}`,
                            title: cleanName(path.parse(file).name)
                        });
                    }
                });

                if (fs.existsSync(thumbPath)) {
                    fs.readdirSync(thumbPath).forEach(file => {
                        if (!IGNORE.includes(file)) {
                            files.push({
                                thumb: `base/${folder}/thumbnails/${file}`,
                                full: `base/${folder}/full/${file}`,
                                title: cleanName(path.parse(file).name)
                            });
                        }
                    });
                }

                swatches.push({
                    id: cleanId(folder),
                    title: cleanName(folder),
                    noneFiles: noneFiles,
                    files: files
                });
            }
        });
    }

    // Pieces
    if (fs.existsSync(imagesDir)) {
        const folders = fs.readdirSync(imagesDir).filter(f => !IGNORE.includes(f));

        folders.forEach((folder, index) => {
            const folderPath = path.join(imagesDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                let items = [];

                fs.readdirSync(folderPath).forEach(file => {
                    if (!IGNORE.includes(file)) {
                        items.push({
                            src: `images/${folder}/${file}`,
                            title: cleanName(path.parse(file).name)
                        });
                    }
                });

                tabs.push({
                    tabNumber: index + 1,
                    displayName: cleanName(folder),
                    items: items
                });
            }
        });
    }

    return { swatches, tabs };
};