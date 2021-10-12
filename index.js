const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const repo_token = core.getInput('repo-token');
    const context = github.context;
    const octokit = github.getOctokit(repo_token);

    const { data: issues } = await octokit.rest.issues.listForRepo({
        ...context.repo,
        state: 'open',
        sort: 'created',
        direction: 'asc',
        per_page: 100
    }).then(issues => {
      core.info(`Testing ${issues} ...`);
      // issues is an array of all issue objects
    });

    // const ms = core.getInput('milliseconds');


    // core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // await wait(parseInt(ms));
    // core.info((new Date()).toTimeString());

    // core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
