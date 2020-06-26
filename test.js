const exec = require('./lib/promisifyExec').execShellCommand
const fs = require('fs')
const pathLib = require('path')
const rimraf = require('rimraf')

try {
  runTest()
} catch (e) {
  console.error(e)
}

async function runTest () {
  console.log('TEST', 'Creating test folder...')
  const targetP = pathLib.join(__dirname, '.test')
  rimraf.sync(targetP)
  fs.mkdirSync(targetP)

  console.log('TEST', 'Testing generate datasources...')
  testGenerateDatasources(targetP)
    .then(async () => {
      console.log('TEST', 'Testing generate preprocessors...')
      return testGeneratePreprocessors(targetP)
    })
    .then(async () => {
      console.log('TEST', 'Testing generate analyses...')
      return testGenerateAnalyses(targetP)
    })
    .then(() => {
      rimraf.sync(targetP)
    })
}

async function testGenerateDatasources (targetP) {
  return Promise.all([
    exec(`cd ${targetP} && node ../. generate datasource git gitTestSource && cd gitTestSource && npm test`),
    exec(`cd ${targetP} && node ../. generate datasource github githubTestSource && cd githubTestSource && npm test`)
  ])
}

async function testGeneratePreprocessors (targetP) {
  return exec(`cd ${targetP} && node ../. generate preprocessor gitTestPrep && cd gitTestPrep  && npm test`)
}

async function testGenerateAnalyses (targetP) {
  return exec(`cd ${targetP} && node ../. generate analysis gitTestAnalysis && cd gitTestAnalysis  && npm test`)
}
