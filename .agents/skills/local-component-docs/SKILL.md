# Skill: local-component-docs

Use this skill when creating or updating local markdown documentation for components in
`packages/ui/src/components`.

## Scope

- `packages/ui/src/components/<ComponentName>/<component-name>.md`
- component behavior contracts
- component-specific agent notes
- component-level changelog entries

## Principle

Local component documentation describes the `moduix` wrapper, not the upstream Base UI primitive.

Base UI primitive documentation is available as markdown on the Base UI site:

```text
https://base-ui.com/react/components/<primitive-slug>.md
```

Examples:

- `https://base-ui.com/react/components/accordion.md`
- `https://base-ui.com/react/components/alert-dialog.md`

Use upstream docs to understand primitive behavior, accessibility, state, and lifecycle. Do not copy
or rewrite that documentation locally. For broader upstream lookup, use
`.agents/skills/upstream-library-docs/SKILL.md`.

## Local Documentation Goal

Each local component markdown file should make the current wrapper behavior explicit enough that
future agents can preserve it unless a user explicitly asks for a behavior change.

Document:

- what abstraction our component exposes over the Base UI primitive
- public composition model and exported parts
- wrapper defaults and small DX sugar
- styling hooks, `data-slot` values, CSS variables, and intentional CSS contracts
- intentional differences from Base UI
- behavior that must not be removed as "cleanup"
- known constraints and edge cases that affect implementation choices

## Recommended Structure

Use this structure for new or heavily rewritten local component docs:

```md
# ComponentName

Upstream primitive docs: https://base-ui.com/react/components/<primitive-slug>.md

## Purpose

## Current behavior contract

## Composition

## Defaults and styling

## Intentional differences from Base UI

## Agent notes

## Local changelog
```

Existing files can keep their current headings if the same information is clear and easy to scan.

## Changelog Rules

Keep a short component-local changelog in the component markdown file.

- Record meaningful API, behavior, composition, styling-contract, and documentation-contract changes.
- Prefer concise entries that explain why the change matters for future maintenance.
- Do not record formatting-only edits, mechanical renames without behavior impact, or noisy internal
  churn.
- If a change is public at the package level, also update the package-level changelog when one
  exists.

## Update Rules

When a component changes, update its local markdown in the same task if any of these changed:

- public API
- default behavior
- composition pattern
- styling hooks or CSS variables
- examples or recommended usage
- intentional difference from Base UI
- agent preservation notes

Do not let local docs drift from the shipped component.