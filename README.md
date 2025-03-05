# Signet SDK

![CI](https://github.com/r0zar/signet-sdk/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/signet-sdk.svg)](https://badge.fury.io/js/signet-sdk)

A client-side SDK for integrating websites with the Signet extension.

## Installation

```bash
npm install signet-sdk
# or
yarn add signet-sdk
# or
pnpm add signet-sdk
```

## Usage

```typescript
import { initializeSignetSDK } from 'signet-sdk';

// Initialize SDK
const signet = initializeSignetSDK();

// Check if extension is installed
if (signet.isExtensionInstalled()) {
  console.log('Signet extension is installed!');
  
  // Sign data
  signet.signStructuredData({ foo: 'bar' })
    .then(result => {
      console.log('Signed data:', result);
    })
    .catch(error => {
      console.error('Signing failed:', error);
    });
}
```

## Features

- Check if Signet extension is installed
- Sign structured data
- Event handling for extension state
- Notification handling

## Development

```bash
# Install dependencies
pnpm install

# Build the SDK
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate test coverage report
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm format
```

## Releasing New Versions

This repository uses GitHub Actions to automatically build and publish the package to npm when a new version tag is pushed.

1. Update the version in `package.json`
2. Commit the changes
3. Tag the commit with a version tag (e.g., `v0.1.1`)
4. Push the changes and tag

```bash
# Update version in package.json
# Commit changes

# Create a new version tag
git tag v0.1.1

# Push changes and tags
git push && git push --tags
```

The GitHub action will automatically build and publish the package to npm when a tag starting with `v` is pushed.

**Note:** You need to set up an `NPM_TOKEN` secret in your GitHub repository settings for the publish step to work. This token should have publish permissions for the npm package.

## License

MIT