# Open a branch for a jira ticket CLI Tool

This little script allows you to create/navigate to a branch based off of your jira tickets.

## How does it work?

It uses a jira npm package to be able to pull your tickets that are in the 'In Progress', 'Review', 'To Do' state. If you only have one ticket assigned to you, it will checkout a branch with that jira ticket number (ie ZCB-1234). If the branch doesn't exist, it will create it and then check it out. It will use lowercase letters because the pipeline doesn't like uppercase branch names. If you have more than one ticket assigned to you, you'll be asked to choose which branch you want to checkout/create.

## How to use it

1. Clone the repo
2. Run `npm install`
3. Follow instructions to get a [JIRA API token.](https://confluence.atlassian.com/cloud/api-tokens-938839638.html)
4. Copy the `.env.example` file to `.env` and fill in the values.
5. You can run `node index.js` to run the script. You can also add an alias to your bash profile to make it easier to run. I use `alias doWork='node ~/path/to/repo/index.js'`
