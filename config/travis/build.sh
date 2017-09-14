#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

if [ "$TRAVIS_BRANCH" != "master" ] ; then
  echo "This commit was made against $TRAVIS_BRANCH and not master. Not generating updated docs on gh-pages branch."
  exit 0
fi

if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
  echo "This commit was made in a pull request. Not generating updated docs on gh-pages branch."
  exit 0
fi

eval "$(ssh-agent -s)"
openssl aes-256-cbc -K $encrypted_77b5e43a6418_key -iv $encrypted_77b5e43a6418_iv -in config/travis/deploy.key.enc -out config/travis/deploy.key -d
chmod 600 config/travis/deploy.key
ssh-add config/travis/deploy.key

npm run test:visual:build
cd docs

git init
git config user.name "Travis"
git config user.email "travis@travis-ci.org"
git add .
git commit -m "Deployed to Github Pages"
git push "git@github.com:${TRAVIS_REPO_SLUG}.git" master:gh-pages --force
