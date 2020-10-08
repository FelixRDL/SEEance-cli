# SEEance-cli
CLI for the SEEance SDK.

## Requirements

A current installation of nodejs and npm (get it at https://nodejs.org/en/)

## Install

The CLI is installed as a global package:

```
  npm i -g seeance-cli
```

## Generate a Plugin

We recommend starting off with plugin development, by creating dummy plugins with the CLI and adapting them to your 
use case.

`seeance generate datasource git <NAME>` Create a git-based datasource plugin

`seeance generate datasource github <NAME>` Create a github-based datasource plugin

`seeance generate preprocessor <NAME>` Create a preprocessor plugin

`seeance generate analysis <NAME>` Create an analysis plugin

## Test a Plugin

You can get preliminary output of your plugin by utilizing `npm test` from within its folder

## Publish a Plugin

If you are done developing a plugin, you can push it to a plugin-repository:

`seeance publish`