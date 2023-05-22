import dotenv from 'dotenv';
dotenv.config();
import JiraApi from 'jira-client';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
// Initialize
const jira = new JiraApi({
  protocol: 'https',
  host: process.env.host,
  username: process.env.userName,
  password: process.env.password,
  apiVersion: '2',
  strictSSL: true,
});

const makeBranch = branchName => {
  try {
    execSync(`git rev-parse --verify ${branchName}`);
    execSync(`git checkout ${branchName}`);
    console.log(`Switched to branch '${branchName}'`);
  } catch (error) {
    execSync(`git checkout -b ${branchName}`);
    console.log(`Successfully created and switched to branch '${branchName}'`);
  }
};

const issues = await jira.getUsersIssues(process.env.userName);

const openIssues = issues.issues.filter(
  issue =>
    issue.fields.status.name === 'In Progress' ||
    issue.fields.status.name === 'Review' ||
    issue.fields.status.name === 'To Do'
);

if (openIssues.length === 0) {
  console.log('No issues in progress');
  process.exit();
}

if (openIssues.length === 1) {
  makeBranch(openIssues[0].key.toLowerCase());
} else {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'branch',
      message: 'Which ticket do you want to make a branch for?',
      choices: openIssues.map(
        issue => `${issue.key.toLowerCase()} - ${issue.fields.summary}`
      ),
    },
  ]);
  const branchName = answer.branch.split(' - ')[0];
  makeBranch(branchName);
}
