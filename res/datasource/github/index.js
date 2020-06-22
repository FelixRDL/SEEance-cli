const {Octokit} = require("@octokit/rest");
module.exports = async function(owner, repo, token=undefined) {
    return new Promise(async (resolve, reject) => {
        var octo = new Octokit();
        /**
         * TODO: Implement your data acquisition logic here.
         *
         * You can use octokit/rest (pre-installed) or any other github library. Make sure to install them properly
         * via npm i before referencing them.
         *
         * Resolve with
         * */
        reject("Method not yet implemented!");
    });
}