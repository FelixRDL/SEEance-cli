#!/usr/bin/env node
const generate = require("./generate");
const publish = require("./publish");
const yargs = require("yargs");

const cmd = yargs
    .command('generate <what>', 'Generate a new component', () => {
    })
    .command('delete <what> <name>')
    .command('publish')
    .command('configure --token <token> --url <url>')
    .help()
    .argv

const operation = cmd["_"][0];

if(operation === 'generate') {
    const what = cmd['what'];
    switch(what) {
        case 'datasource':
        case 'd':
            generate.generateDatasource(cmd._[2], process.cwd(), cmd._[1]);
            break;
        case 'preprocessor':
        case 'p':
            generate.generatePreprocessor(cmd._[1], process.cwd());
            break;
        case 'analysis':
        case 'a':
            generate.generateAnalysis(cmd._[1], process.cwd());
            break;
    }
} else if(operation === 'publish') {
    publish.publish(process.cwd()).then(() => {
        process.exit(0);
    })
}