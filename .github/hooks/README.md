# GIT Hooks

## Steps to setup GIT hooks

1. Copy the 'creds.json' file (sent on e-mail) to the project root directory
2. Copy and paste the post-commit hook file into the local .git/hooks directory of this repository
   ```sh
   cp .github/hooks/pre-commit .git/hooks
   cp .github/hooks/post-commit .git/hooks
   ```
3. Make sure executable permissions are set for the above files
   ```
   cd .git/hooks
   chmod 755 post-commit pre-commit
   ```
4. Do a commit!

## What do these hooks do

1. pre-commit hook block commits when a file with a non-ASCII file name is added.
2. post-commit hook sends a post-commit notification to the team.
