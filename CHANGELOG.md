# Changelog

All notable changes to this project will be documented in this file.

The format is based on _Keep a Changelog_ and this project follows semantic versioning.

## [0.3.0] — 2026-04-27

### Changed

- Refactored `PropsPanel.tsx` (2,421 lines) into 40 per-component prop editor files for improved maintainability and scalability
- Refactored `cli/src/generate.ts` (6,400 lines) into 40 per-component generator files
- Set minimum Node.js version to `>=18.0.0`

## [0.2.0] — 2026-04-02

### Added

- Full set of 40 component generators
- Security hardening across CLI and playground
- Accessibility improvements across core components
- Test coverage for generators and UI system
- CI pipeline for linting, type checking, and tests

## [0.1.0] — 2026-04-01

### Added

- Initial release of Forge UI
- Core CLI scaffolding
- Playground foundation for component previewing
