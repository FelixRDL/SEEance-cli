const script = require('./index')
const repo = process.argv[3];
let token;
if(process.argv.length > 3) {
    token = process.argv[4];
}
script(repo, token);