#!/usr/bin/env node
const fs = require('fs')
const pathLib = require('path')
const asyncExec = require('../lib/promisifyExec')
/*
 * This script is meant to generate new skeleton projects for various elements of the analysis.
 *
 * TODO: lots of duplicate code in here, should be refactored
 */

/**
 *
 * @param title Name for the datasource.
 * @param path Where the datasource skeleton will be initialized.
 * @param type Whether this will be a git oder github datasource.
 */
exports.generateDatasource = async function (title, path, type) {
  try {
    console.log('GENERATE: Getting Folders...')
    const resFldr = pathLib.join(__dirname, '..', 'res', 'datasource', type)
    const projectFldr = makeProjectFolder(title, path)
    console.log('GENERATE: Reading Skeleton Files...')
    const indexContent = fs.readFileSync(pathLib.join(resFldr, 'index.js'), 'utf-8')
    let pkgContent = fs.readFileSync(pathLib.join(resFldr, 'package.json'), 'utf-8')
    console.log('GENERATE: Substituting Placeholders...')
    pkgContent = pkgContent.replace('$NAME', title)
    console.log('GENERATE: Creating Files...')
    fs.writeFileSync(pathLib.join(projectFldr, 'package.json'), pkgContent)
    fs.writeFileSync(pathLib.join(projectFldr, 'index.js'), indexContent)
    // Workaround to force access to the .gitignore (also see https://github.com/npm/npm/issues/3763)
    fs.copyFileSync(pathLib.join(resFldr, 'gignore'), pathLib.join(projectFldr, '.gitignore'), projectFldr)
    fs.copyFileSync(pathLib.join(resFldr, 'test.js'), pathLib.join(projectFldr, 'test.js'), projectFldr)
    console.log('GENERATE: Installing Dependencies... this could take a while...')
    await asyncExec.execShellCommand('cd ' + projectFldr + ' && npm i')
    console.log('GENERATE: Project created successfully!')
    return Promise.resolve()
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

exports.generatePreprocessor = async function (title, path) {
  try {
    console.log('GENERATE: Getting Folders...')
    const resFldr = pathLib.join(__dirname, '..', 'res', 'preprocessor')
    const projectFldr = makeProjectFolder(title, path)
    console.log('GENERATE: Reading Skeleton Files...')
    const indexContent = fs.readFileSync(pathLib.join(resFldr, 'index.js'), 'utf-8')
    let pkgContent = fs.readFileSync(pathLib.join(resFldr, 'package.json'), 'utf-8')
    console.log('GENERATE: Substituting Placeholders...')
    pkgContent = pkgContent.replace('$NAME', title)
    console.log('GENERATE: Creating Files...')
    fs.writeFileSync(pathLib.join(projectFldr, 'package.json'), pkgContent)
    fs.writeFileSync(pathLib.join(projectFldr, 'index.js'), indexContent)
    // Workaround to force access to the .gitignore (also see https://github.com/npm/npm/issues/3763)
    fs.copyFileSync(pathLib.join(resFldr, 'gignore'), pathLib.join(projectFldr, '.gitignore'), projectFldr)
    fs.copyFileSync(pathLib.join(resFldr, 'test.js'), pathLib.join(projectFldr, 'test.js'), projectFldr)
    console.log('GENERATE: Installing Dependencies... this could take a while...')
    await asyncExec.execShellCommand('cd ' + projectFldr + ' && npm i')
    console.log('GENERATE: Project created successfully!')
    return Promise.resolve()
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}
exports.generateAnalysis = async function (title, path) {
  try {
    console.log('GENERATE: Getting Folders...')
    const resFldr = pathLib.join(__dirname, '..', 'res', 'analysis')
    const projectFldr = makeProjectFolder(title, path)
    console.log('GENERATE: Reading Skeleton Files...')
    const indexContent = fs.readFileSync(pathLib.join(resFldr, 'index.js'), 'utf-8')
    let pkgContent = fs.readFileSync(pathLib.join(resFldr, 'package.json'), 'utf-8')
    console.log('GENERATE: Substituting Placeholders...')
    pkgContent = pkgContent.replace('$NAME', title)
    console.log('GENERATE: Creating Files...')
    fs.writeFileSync(pathLib.join(projectFldr, 'package.json'), pkgContent)
    fs.writeFileSync(pathLib.join(projectFldr, 'index.js'), indexContent)
    // Workaround to force access to the .gitignore (also see https://github.com/npm/npm/issues/3763)
    fs.copyFileSync(pathLib.join(resFldr, 'gignore'), pathLib.join(projectFldr, '.gitignore'), projectFldr)
    fs.copyFileSync(pathLib.join(resFldr, 'test.js'), pathLib.join(projectFldr, 'test.js'), projectFldr)
    console.log('GENERATE: Installing Dependencies... this could take a while...')
    await asyncExec.execShellCommand('cd ' + projectFldr + ' && npm i')
    console.log('GENERATE: Project created successfully!')
    return Promise.resolve()
  } catch (e) {
    console.error(e)
    return Promise.reject(e)
  }
}

function makeProjectFolder (title, path) {
  const target = pathLib.join(path, title)
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
    return target
  } else {
    throw Error('Target Directory already existing!')
  }
}
