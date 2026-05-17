# Skill: cross-package-sync

Use this skill when a task touches both `packages/ui` and `apps/docs`, or when UI updates may desync docs.

## Scope

- UI API/behavior/style changes that require docs updates
- New UI components that require docs pages/examples
- Export changes affecting docs imports/snippets

## Required Sequence

1. Apply `ui-component-workflow` for UI changes.
2. Build UI from root:

```bash
npm run build:ui
```

3. Apply `docs-workflow` for docs updates against fresh built output.

## Synchronization Checklist

- Component name and exported parts match docs imports/snippets.
- Props and behavior described in docs reflect actual implementation.
- Examples demonstrate current API and supported states/variants.
- Customization guidance (`className`, `classNames`, CSS variables, icon replacement) matches current component behavior.
- `CSS Properties` includes all public `--<component>-*` variables from `packages/ui/src/styles/theme.css`.

## Done Criteria

1. No mismatch between UI and docs for touched components.
2. UI package rebuilt before docs verification.
3. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`