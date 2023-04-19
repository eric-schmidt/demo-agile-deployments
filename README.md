# Agile Deployments Demo

This repo contains example scripts that demonstrate the expand/contract flow shown in Contentful Professional Services' Agile Deployment training slides. Using the example of converting an Author text field on the `Blog Post` content type to an `Author` content type of its own, this repo demonstrates:

- Initial form of the content model.
- Expansion of an existing content type (`Blog Post`) and creation of a new content type (`Author`).
- Modification of related entries.
- Disabling of unused fields.
- Contraction of the content type.

Please keep in mind that these are example scripts that are not necessarily written to production standards -- they're instead written to educate the end developer.

## Folders

There are two script folders, each demonstrating a slightly different approach to achieving the same goal: `scripts/cli` contains CLI-based script for running via `contentful space migration`, while `scripts/sdk` contains CMA-based script that can be run via `node`.

# Demo Steps

This should all start with a completely blank space, so as to illustrate creating fresh environments and starting from scratch w/ aliases.

## Import Content

1. Create a new Space called _Demo - Agile Deployments_ (or whatever you'd like), deleting the existing one if already present.
2. Import data into the master environment of your newly created space via `contentful space import --space-id <YOUR SPACE ID> --environment-id master --content-file scripts/space-export.json`
3. Create a new environment based off of `master` called `feature-1`.
4. Create a new alias for `master`, renaming the master environment `release-1`.
5. Create a new alias for called `sandbox`, and point this alias at the `feature-1` environment.
6. Copy `.env.example`, renaming to `.env`, and update variables to reflect your current Contentful values.
7. Run `npm install` to install dependencies. Note: you may need to run `rm -rf node_modules` and re-run `npm install` if you've changed any of the values in the `.env` file -- for some reason things seem to get cached 🤔

## Expand

- CLI: `contentful space migration -s <YOUR SPACE ID> -e sandbox scripts/cli/1-expand.cjs`
- SDK: `node scripts/sdk/1-expand.mjs`

## Modify

- CLI: `contentful space migration -s <YOUR SPACE ID> -e sandbox scripts/cli/2-modify.cjs`
- SDK: `node scripts/sdk/2-modify.mjs`

## Disable

- CLI: `contentful space migration -s <YOUR SPACE ID> -e sandbox scripts/cli/3-disable.cjs`
- SDK: `node scripts/sdk/3-disable.mjs`

## Contract

- CLI: `contentful space migration -s <YOUR SPACE ID> -e sandbox scripts/cli/4-contract.cjs`
- SDK: `node scripts/sdk/4-contract.mjs`
