# Indddy - the DDD indicator

Find out whether your codebase is **Strongly Typed 💪** or _Stringly Typed 🤦🏻_

## Why?

I believe that excellent code quality requires the developer to have a firm understanding
of the business they implement.

A firm understanding of the business is reflected in the meaningful typing of the code.

## Principle

The idea is to collect types used in the business logic code to compare it with the ubiquitous language.

With this insight, the developer can quantify how much the codebase correctly models the problem to solve.

## The tool

indddy uses [java-parser](https://github.com/jhipster/prettier-java/tree/master/packages/java-parser) to build Concrete Syntax Tree from Java files,
collects type identifiers that describe:

- fields
- variables
- parameters
- methods result

## How to use

### Standalone

In the project directory:

`npm install` to install required dependencies

Parse one Java source from stdin:

`node parse.js < path/to/File.java`

Parse all `.java` files in a directory (recursive):

`node parseDir.js src`

If no directory is provided, `parseDir.js` uses `src` by default.

`parseDir.js` outputs aggregated frequencies sorted by descending count:

```shell
  42 Customer
  31 Order
  18 Money
```

### As a dependency

That's how this package is intended to be used 😃

Suppose you have a Java project "my-java-project"

Just create this `package.json` file at the root of the project:

```json
{
  "name": "my-java-project",
  "version": "0.0.1",
  "devDependencies": {
    "@lolo101/ddd-ast": "latest"
  }
}
```

Run `npm install`

and then it becomes possible to use the `ddd` command in a script in your projects:

```shell
$ cat HelloWorldExample.java | npx ddd | sort | uniq -c | sort -nr
      2 System
      2 String
      2 println
      2 out
      2 arguments
      2 args
      1 main
      1 List
      1 HelloWorldExample
      1 asList
      1 Arrays
```

## How to maintain

### How to release a new version

I recommend using [np](https://github.com/sindresorhus/np) to publish a new release

```shell
npx np major
npx np minor
npx np patch
```
