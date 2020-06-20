#!/usr/bin/env node
const generate = require("./generate");
const publish = require("./publish");
const yargs = require("yargs");

const cmd = yargs
    .command('generate <what> <name>')
    .command('generate <what> <type> <name>')
    .command('delete <what> <name>')
    .command('publish <what>')
    .command('configure --token <token> --url <url>')
    .help()
    .argv

const operation = cmd["_"][0];

if(operation == 'generate') {
    const what = cmd['what'];
    switch(what) {
        case 'datasource':
        case 'ds':
                generate.generateDatasource(cmd['name'], process.cwd(), cmd['type']);
            break;
        case 'preprocessor':
        case 'pp':
            generate.generatePreprocessor(cmd['name'], '.');
            break;
        case 'analysis':
        case 'an':
            generate.generateAnalysis(cmd['name'], '.');
            break;
    }
} else if(operation == 'publish') {
    const what = cmd['what'];
    switch(what) {
        case 'datasource':
        case 'ds':
                publish.publish(process.cwd());
            break;
        case 'preprocessor':
        case 'pp':
            throw new Error("Method not implemented");
            break;
        case 'analysis':
        case 'an':
            throw new Error("Method not implemented");
            break;
    }
}