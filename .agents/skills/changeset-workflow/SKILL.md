---
name: changeset-workflow
description: Use when the user explicitly asks to create or update a changeset entry in .changeset/.
---

# Skill: changeset-workflow

Use this skill only when the user explicitly asks to create or update a changeset.

## Scope

- `.changeset/*.md` release note files
- choosing release bump levels for one or more public packages
- writing summaries that render correctly in the custom changelog

## Rules

- Do not create or update a changeset unless the user asked for it or the task explicitly includes release-note work.
- Reuse an existing pending `.changeset/*.md` file when the task is clearly updating the same unreleased change; otherwise create a new one.
- Match the requested or implied bump level exactly. If the bump level is unclear, ask instead of guessing.
- Keep summaries short, consumer-facing, and release-note shaped.
- The public packages are `@moduix/react`, `@moduix/solid`, `@moduix/react-tailwind`, and
  `@moduix/solid-tailwind`. They are independently versioned; do not add `fixed` or `linked` groups.
- Use one changeset for one logical change and list every public package whose shipped behavior,
  styles, types, or distribution changed. Do not create one file per package for the same change.
- `packages/foundation` is not published directly. When a foundation change reaches npm output,
  list each public package that receives that output.
- Use `patch` for compatible fixes, `minor` for new components or public capabilities, and `major`
  for breaking stable-package changes. A Tailwind package may remain on `0.x` while its component set
  is incomplete.

## Summary format

- For a single component or clearly component-scoped change, write the first line as `ComponentName: concise summary`.
- The custom changelog renderer turns that first line into a `#### ComponentName` heading with the summary as the bullet below it.
- For cross-cutting, tooling, dependency, build, or broad multi-component updates, use a plain summary without the `ComponentName:` prefix.
- Additional lines after the first become indented continuation lines in the same changelog bullet.

## Examples

Component-scoped:

```md
Splitter: Update resize trigger default hover and drag styling.
```

Cross-cutting:

```md
Update registry build output paths.
```

Multi-package:

```md
---
'@moduix/react': patch
'@moduix/solid': patch
---

Accordion: Keep keyboard navigation aligned across React and Solid.
```

Multi-line:

```md
Sidebar: Improve collapsed rail keyboard focus behavior.
Keeps the trigger visible during focus transitions.
```