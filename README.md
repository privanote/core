# core

Core utilities used by PrivaNote

## Install a package

Before installing the packages, you need to have a GitHub token with `read:packages` checked. You can create one [here](https://github.com/settings/tokens/new)

Replace `{GITHUB_TOKEN}` with your token in the first step of one of the following methods when setting the GITHUB_TOKEN env variable.

### Bun Environment (Recommended)

refer to: https://bun.sh/docs/install/registries

1. Set the GITHUB_TOKEN in .env file in your project root:

```bash
echo "GITHUB_TOKEN={GITHUB_TOKEN}" >> .env

# Ensure .env is in .gitignore or run:
echo ".env" >> .gitignore
```

2. Add privanote registry to bunfig.toml file in your project root:

```toml
# bunfig.toml - reads GITHUB_TOKEN from .env
[install.scopes]
"@privanote" = { token = "$GITHUB_TOKEN", url = "https://npm.pkg.github.com" }
```

3. Install the package:

```bash
bun add @privanote/collaborators
```

### Node Environment:

1. Set the GITHUB_TOKEN in your environment:

```bash
export GITHUB_TOKEN={GITHUB_TOKEN}
```

2. Add privanote registry to .npmrc file in your project root:

```npmrc
@privanote:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

3. Install the package:

```bash
npm install @privanote/collaborators
```

## Development

1. Setup

```bash
git clone git@github.com:privanote/core.git
cd core
bun install
```

2. Managing the repo

- To create a package:

```bash
bun run add-bun-pkg <pkg-name>
bun run add-vite-pkg <pkg-name>
```

- To execute a package's script:

```bash
# one single package
bun run pkg <pkg-name> <script-name>
# all packages
bun run pkg-all <script-name>
```

## Environement Variables

Depending on your development activity, you may need to set some environment variables for the packages to work properly or to run tests.

```bash
cp env.example .env
```

Fill in the values in the .env file.

Ideally, `GITHUB_TOKEN` should have same permissions as CI:
