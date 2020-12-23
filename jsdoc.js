module.exports = {
    "source": {
        "includePattern": ".+\\.ts(doc|x)?$", // Only process file ending in .js, .jsdoc or .jsx
        "include": [
            "."
        ], // Check all folders.
        "exclude": [
            "node_modules",
            "dist"
        ] // Be gone, node_modules.
    },
    "recurseDepth": 10, // Only go 10 levels deep.
    "opts": {
        "destination": "./docs/", // Where I want my docs to be generated.
        "recurse": true // Same as using -r or --recurse
    }
}