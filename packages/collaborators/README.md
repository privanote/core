# collaborators

A package to get a list of collaborators for a GitHub repository.

## Prerequisites

A Github token with repo scope is required to access the GitHub API.

## Installation

refer to https://github.com/privanote/core README.md for installation instructions.

## Usage

```js
import { getCollaborators } from '@privanote/collaborators';

try {
  const collaborators = await getCollaborators({
    owner: 'privanote',
    repo: 'privanote',
    token: process.env.GITHUB_TOKEN,
  });
  console.log(collaborators);
} catch (error) {
  console.error(error);
}
```
