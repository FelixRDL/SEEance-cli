const getLine = require('./../lib/getLine');
const git = require('simple-git');
const rimraf = require('rimraf');
const pathLib = require('path');
const fs = require('fs');
const ncp = require('ncp');

exports.publish = async function (path) {
    const creds = await getCredentials();
    const fldr = './.tmp'
    let targetFldr;
    const url = `https://${creds.user}:${creds.pw}@${creds.url}`;
    const cwd = process.cwd();
    const pkg = JSON.parse(fs.readFileSync(pathLib.join(cwd, 'package.json'), 'utf-8'));

    if(pkg['seeance']['type'].includes('datasource')) {
        targetFldr = pathLib.join(fldr, 'datasources');
    } else if(pkg['seeance']['type'].includes('preprocessor')) {
        targetFldr = pathLib.join(fldr, 'preprocessors');
    }
    if(pkg['seeance']['type'].includes('analysis')) {
        targetFldr = pathLib.join(fldr, 'analyses');
    }

    return new Promise((resolve, reject) => {
        console.log("PUBLISH: Deleting old directory...");
        rimraf(fldr, resolve)
    }).then(() => {
        console.log("PUBLISH: Cloning repository...");
        return git().clone(url, fldr)
    }).then(() => {
        if (!fs.existsSync(targetFldr)) {
            console.log("PUBLISH: Recreating folder...");
            return fs.mkdirSync(targetFldr);
        }
    }).then((resolve, reject) => {
        console.log("PUBLISH: Copying file contents...");
        ncp.ncp(cwd, pathLib.join(targetFldr, pkg['name']), resolve);
    }).then(async () => {
        console.log("PUBLISH: Commiting new content...");
        repo = git(targetFldr);
        await repo.add('.');
        await repo.commit(`Add ${pkg['seeance']['type']} ${pkg['seeance']['name']}`);
        return repo.push();

    }).then((resolve, reject) => {
        console.log("PUBLISH: Cleaning up...");
        rimraf(fldr, resolve)
    });
}

async function getCredentials() {
    console.log("Please enter your component repository locator ('github.com/OWNER/REPO_NAME'):");
    github_url = await getLine();
    console.log("Please enter your github username:");
    github_user = await getLine();
    console.log("Please enter your github password:");
    github_pw = await getLine(true);
    return {
        url: github_url,
        user: github_user,
        pw: github_pw
    }
}