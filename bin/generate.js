#!/usr/bin/env node
const fs = require('fs');
const pathLib = require('path');
const exec = require('child_process').exec;
const asyncExec = require('./../lib/promisifyExec');
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
        console.log("GENERATE: Getting Folders...");
        const resFldr = pathLib.join(__dirname, '..', 'res', 'datasource', type);
        let projectFldr = await makeProjectFolder(title, path);
        console.log("GENERATE: Reading Skeleton Files...");
        var indexContent = fs.readFileSync(pathLib.join(resFldr, 'index.js'), 'utf-8');
        var pkgContent = fs.readFileSync(pathLib.join(resFldr, 'package.json'), 'utf-8');
        console.log("GENERATE: Substituting Placeholders...");
        pkgContent = pkgContent.replace('$NAME', title);
        console.log("GENERATE: Creating Files...");
        fs.writeFileSync(pathLib.join(projectFldr, 'package.json'), pkgContent);
        fs.writeFileSync(pathLib.join(projectFldr, 'index.js'), indexContent);
        fs.copyFileSync(pathLib.join(resFldr, '.gitignore'), pathLib.join(projectFldr, '.gitignore'), projectFldr);
        console.log("GENERATE: Installing Dependencies... this could take a while...");
        await asyncExec.execShellCommand('cd '+projectFldr + " && npm i");
        console.log("GENERATE: Project created successfully!");
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