# Signet SDK

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

# Lint code
pnpm lint

# Format code
pnpm format
```

## License

MIT