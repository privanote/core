# core

Core utilities used by PrivaNote

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
