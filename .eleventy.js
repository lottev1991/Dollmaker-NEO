module.exports = function (eleventyConfig) {
    // Copy over CSS, JS, and images
    eleventyConfig.addPassthroughCopy("base");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addPassthroughCopy("styles");

    return {
        dir: {
            input: "11ty",
            output: "_site"
        },
    };
};
