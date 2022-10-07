# GIT Hooks

## Steps to setup GIT hooks

1. Copy and paste the post-commit hook file into the local .git/hooks directory of this repository
   ```sh
   cp .github/hooks/pre-commit .git/hooks
   cp .github/hooks/post-commit .git/hooks
   ```
2. Do a commit!

## What do these hooks do

1. pre-commit hook block commits when a file with a non-ASCII file name is added.
2. post-commit hook runs tests and sends a post-commit notification with the test output to the team.
