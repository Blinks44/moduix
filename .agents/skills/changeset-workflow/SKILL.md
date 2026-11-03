---
name: changeset-workflow
description: Create or update changesets for consumer-facing component changes and explicitly requested release notes; choose patch or minor automatically, with major reserved for an explicit user decision.
---

# Skill: changeset-workflow

Use this skill whenever component work changes published behavior, API, styles, types, or distribution,
or when the user explicitly requests release-note work.

## Scope

- `.changeset/*.md` release note files
- choosing release bump levels for one or more public packages
- writing summaries that render correctly in the custom changelog

## Rules

- Include a changeset with consumer-facing component changes without waiting for a separate request.
  Documentation-only, test-only, and tooling-only changes that do not affect published packages need no release entry.
- Reuse an existing pending `.changeset/*.md` file when the task is clearly updating the same unreleased change; otherwise create a new one.
- Follow an explicit user choice of bump level. Otherwise choose `patch` for fixes and `minor` for
  new components or public capabilities; routine choices do not need confirmation.
- Before adding a bump, compare package versions, existing changelog entries, and published npm versions.
  If the requested version is already prepared but unpublished, update its release notes instead of
  creating another bump. An empty changeset queue does not block publishing already-versioned packages.
- Keep summaries short, consumer-facing, and release-note shaped.
- Discover public adapters from `packages/*/package.json`; do not assume a fixed framework list.
  Do not add `fixed` or `linked` groups without an explicit versioning-policy request.
- Use one changeset for one logical change and list every public package whose shipped behavior,
  styles, types, or distribution changed. Do not create one file per package for the same change.
- `packages/foundation` is not published directly. When a foundation change reaches npm output,
  list each public package that receives that output.
- Major releases are exceptional and require an explicit user decision; never select `major`
  automatically. If a stable public contract would break, explain the incompatibility and agree on
  the change and release level instead of hiding it in a patch or minor release.
- Before handoff or commit, run `pnpm exec changeset status` and confirm every affected public
  package has the intended release level. Creating a changeset does not run versioning or publish.
- A Tailwind package may remain on `0.x` while its component set is incomplete.

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

Accordion: Keep keyboard navigation aligned across affected framework adapters.
```

Multi-line:

```md
Sidebar: Improve collapsed rail keyboard focus behavior.
Keeps the trigger visible during focus transitions.
```