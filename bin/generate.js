#!/usr/bin/env node
const fs = require('fs');
const pathLib = require('path');
/*
 * This script is meant to generate new skeleton projects for various elements of the analysis.
 */

/**
 *
 * @param title Name for the datasource.
 * @param path Where the datasource skeleton will be initialized.
 * @param type Whether this will be a git oder github datasource.
 */
exports.generateDatasource = async function(title, path, type) {
    try {
        // Get folders
        const resFldr = pathLib.join(__dirname, '..', 'res', 'datasource', type);
        let projectFldr = await makeProjectFolder(title, path);
        // Read skeleton files
        var indexContent = fs.readFileSync(pathLib.join(resFldr, 'index.js'), 'utf-8');
        var pkgContent = fs.readFileSync(pathLib.join(resFldr, 'package.json'), 'utf-8');
        // Fill in Variables
        pkgContent = pkgContent.replace('$NAME', title);
        // Create files
        fs.writeFileSync(pathLib.join(projectFldr, 'package.json'), pkgContent);
        fs.writeFileSync(pathLib.join(projectFldr, 'index.js'), indexContent);
    } catch(e) {
        console.error(e);
    }
}

exports.generatePreprocessor = async function(title, path) {
    return Promise.reject("Method not implemented");
}
exports.generateAnalysis = async function(title, path) {
    return Promise.reject("Method not implemented");
}

function makeProjectFolder(title, path) {
    const target = pathLib.join(path, title);
    if(!fs.existsSync(target)) {
        fs.mkdirSync(target);
        return target;
    } else {
        throw Error("Target Directory already existing!");
    }
}