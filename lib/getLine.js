const readline = require('readline');
const Writable = require('stream').Writable;

/**
 * Solution by s.o. user guybedford (https://stackoverflow.com/questions/24037545/how-to-hide-password-in-the-nodejs-console)
 */
var mutableStdout = new Writable({
    write: function(chunk, encoding, callback) {
        if (!this.muted)
            process.stdout.write(chunk, encoding);
        callback();
    }
});
const rl = readline.createInterface({ input: process.stdin , output: mutableStdout, terminal: true });

/**
 * Solution by stackoverflow user hamid k (https://stackoverflow.com/questions/43638105/how-to-get-synchronous-readline-or-simulate-it-using-async-in-nodejs)
 */
module.exports = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async (mute=false) => {
        mutableStdout.muted = mute;
        return (await getLineGen.next()).value;
    }
})();