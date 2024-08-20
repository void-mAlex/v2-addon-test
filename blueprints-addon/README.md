# blueprints-addon

_CLI for v2 addons_

1. [Features](#features)
1. [Usage](#usage)
1. [Compatibility](#compatibility)


## Features

Standardize how you write v2 addons:

- Run `new` to create a v2 addon
- Run `generate` to create source and test files
- Run `destroy` to remove source and test files
- Blueprints available for components, helpers, modifiers, services, and utilities
- Tailor addon blueprints to your needs


## Usage

Install `blueprints-addon` as a development dependency in these locations:

<details>

<summary>Workspace root</summary>

```json5
/* package.json */
{
  "scripts": {
    "addon": "blueprints-addon"
  },
  "devDependencies": {
    "blueprints-addon": "workspace:*"
  }
}
```

</details>

<details>

<summary>V2 addon in <code>packages</code></summary>

```json5
/* Example: packages/ui/form/package.json */
{
  "scripts": {
    "addon": "blueprints-addon --test-app-location '../../../test-app'"
  },
  "devDependencies": {
    "blueprints-addon": "workspace:*"
  }
}
```

</details>

> [!NOTE]
>
> After you build `blueprints-addon`, please run `pnpm install` at the workspace root so that the blueprints are available.


### Create addon

From the workspace root, run the `new` command to create a package in `packages`. The package will be added to `docs-app` and `test-app`.

```sh
pnpm addon new <name> [options]

# Example: Create the addon `ui-form`
pnpm addon new ui-form

# Example: Specify the location for a scoped package
pnpm addon new @my-org-ui/form --location ui/form
```


### Create entity

From the addon root, run the `generate` command to create the source code and its test file.

```sh
pnpm addon generate <component|helper|modifier|service|util> <name> [options]

# Example: Create a component
pnpm addon generate component ui/form/input

# Example: Use alias
pnpm addon g component ui/form/textarea
```

There may be more than 1 blueprint available. You can pass `--blueprint` to select the right one.

```sh
# Example: Create a <template> tag component
pnpm addon g component ui/form/select --blueprint glimmer-strict
```

For more information, pass `--help`.


### Remove entity

From the addon root, run the `destroy` command to remove the source code and its test file.

```sh
pnpm addon destroy <component|helper|modifier|service|util> <name> 

# Example: Remove a component
pnpm addon destroy component ui/form/input

# Example: Use alias
pnpm addon d component ui/form/textarea
```


## Compatibility

- Node.js v18 or above


## License

This project is licensed under the [MIT License](LICENSE.md).