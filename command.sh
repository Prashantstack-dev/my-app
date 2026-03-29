#!/bin/bash

# REPO_URL https://github.com/Prashantstack-dev/my-app

# 1. Create react app using the create-react-app tool
npx create-react-app my-app
cd my-app

# 2. Commit the code, create GitHub repo using GitHub CLI
# (create-react-app initializes git and makes the first commit automatically)
gh repo create my-app --public --source=. --remote=origin
git branch -M master
git push -u origin master

# 3. Switch branch to “update_logo”
git checkout -b update_logo

# 4. Replace existing logo with Propeller Aero logo
# 5. Replace existing link with Propeller Aero link
# (These two steps are done manually by editing src/App.js)

# 6. Commit, then push the code
git add src/App.js
git commit -m "Update logo and link"
git push -u origin update_logo

# 7. Create PR from “update_logo” to “master” branch using GitHub CLI
gh pr create --title "Update logo and link" --body "Replaced default React assets with Propeller files" --base master --head update_logo

# 8. Merge the PR using GitHub CLI
gh pr merge update_logo --merge
