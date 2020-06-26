const getLine = require('../lib/getLine')
const git = require('simple-git')
const rimraf = require('rimraf')
const pathLib = require('path')
const fs = require('fs')
const ncp = require('ncp')

exports.publish = async function () {
  const creds = await getCredentials()
  const fldr = './.tmp'
  let targetFldr
  const url = `https://${creds.user}:${creds.pw}@${creds.url}`
  const cwd = process.cwd()

  /**
   *
   * @type {{
   *    name: string
   *   seeance: {
   *     type: string
   *   }
   * }}
   */
  const pkg = JSON.parse(fs.readFileSync(pathLib.join(cwd, 'package.json'), 'utf-8'))

  if (pkg.seeance.type.includes('datasource')) {
    targetFldr = pathLib.join(fldr, 'datasources')
  } else if (pkg.seeance.type.includes('preprocessor')) {
    targetFldr = pathLib.join(fldr, 'preprocessors')
  }
  if (pkg.seeance.type.includes('analysis')) {
    targetFldr = pathLib.join(fldr, 'analyses')
  }

  return new Promise((resolve, reject) => {
    console.log('PUBLISH: Cleaning up...')
    rimraf(fldr, {}, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  }).then(() => {
    console.log('PUBLISH: Cloning repository...')
    return git().clone(url, fldr)
  }).then(() => {
    if (!fs.existsSync(targetFldr)) {
      console.log('PUBLISH: Recreating folder...')
      return fs.mkdirSync(targetFldr)
    }
  }).then((resolve, reject) => {
    console.log('PUBLISH: Copying file contents...')
    return ncp.ncp(cwd, pathLib.join(targetFldr, pkg.name), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  }).then(async () => {
    console.log('PUBLISH: Commiting new content...')
    const repo = git(targetFldr)
    await repo.add('.')
    await repo.commit(`Add/Update Component:   ${pkg.seeance.type} ${pkg.name}`)
    return repo.push()
  }).then(() => {
    return new Promise(function (resolve, reject) {
      console.log('PUBLISH: Cleaning up...')
      rimraf(fldr, {}, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  })
}

async function getCredentials () {
  console.log('Please enter your component repository locator (\'github.com/OWNER/REPO_NAME\'):')
  const githubUrl = await getLine()
  console.log('Please enter your github username:')
  const githubUser = await getLine()
  console.log('Please enter your github password:')
  const githubPassword = await getLine(true)
  return {
    url: githubUrl,
    user: githubUser,
    pw: githubPassword
  }
}
