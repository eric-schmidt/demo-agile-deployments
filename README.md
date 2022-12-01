# Agile Deployments Demo

This repo contains example scripts that demonstrate the expand/contract flow shown in Contentful's Agile Deployment training slides. They demonstrate:

- Initial form of the content model
- Expansion of a content type
- Modification of related entries
- Disabling of unused fields
- Contraction of the content type

Please keep in mind that these are example scripts that are not necessarily written to production standards -- they're instead written to educate the end developer.

## Folders

There are two folders with the same scripts doubled. `scripts/cli` contains CLI-based script for running via `contentful space migration`. `scripts/sdk` contains CMS-based script that can be run via `node`.

# Demo Steps

This should all start with a completely blank space, so as to illustrate creating fresh environments and starting from scratch w/ aliases.

## Import Content

1. Create a new Space called _Demo - Agile Deployments_, deleting the existing one if already present.
2. Run `contentful space use` and select the space you just created above.
3. Import data into the master environment via `contentful space import --environment-id master --content-file scripts/space-export.json`
4. Create a new environment based off of `master` called `feature-1`.
5. Create a new alias for `master`, renaming the master environment `release-1`.
6. Create a new alias for called `dev`, and point this alias at the `feature-1` environment.
7. Copy `.env.example`, renaming to `.env`, and update variables to reflect your current Contentful values.
8. Run `npm install` to install dependencies. Note: you may need to remove `node_modules` and re-run `npm install` if you've changed any of the values in the `.env` file -- for some reason things seem to get cached 🤔

## Expand

- CLI: `contentful space migration -e dev scripts/cli/1-expand.cjs`
- SDK: `node scripts/sdk/1-expand.mjs`

## Modify

- CLI: `contentful space migration -e dev scripts/cli/2-modify.cjs`
- SDK: `node scripts/sdk/2-modify.mjs`

## Disable

- CLI: `contentful space migration -e dev scripts/cli/3-disable.cjs`
- SDK: `node scripts/sdk/3-disable.mjs`

## Contract

- CLI: `contentful space migration -e dev scripts/cli/4-contract.cjs`
- SDK: `node scripts/sdk/4-contract.mjs`
