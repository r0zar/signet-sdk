# Signet SDK Development Guide

## Build & Test Commands
- `pnpm install` - Install dependencies
- `pnpm build` - Build the SDK
- `pnpm test` - Run all tests
- `pnpm test -- tests/path/to/file.test.ts` - Run single test
- `pnpm lint` - Run ESLint checks
- `pnpm format` - Format code with Prettier

## Architecture
The SDK provides a communication layer between websites and the Signet Chrome extension.

## Code Style Guidelines
- **TypeScript**: Strict typing with complete type annotations
- **Imports**: Group by external → internal libraries
- **Formatting**: 2-space indentation, semicolons required
- **Naming**: 
  - PascalCase for types/interfaces
  - camelCase for variables/functions
- **Error Handling**: Use structured try/catch with clear error messages
- **Documentation**: JSDoc for all public functions and types
- **Testing**: Unit tests for all public APIs
- **Package Manager**: pnpm recommended