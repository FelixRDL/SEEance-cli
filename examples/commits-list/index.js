const {Octokit} = require("@octokit/rest");
module.exports = async function (owner, repo, token = undefined) {
    return new Promise(async (resolve, reject) => {
        const octo = new Octokit();
        try {
            const issues = await octo.paginate(octo.issues.listForRepo, {
                owner: owner,
                repo: repo
            });
            resolve(issues);
        } catch (e) {
            reject(e);
        }
    });
}