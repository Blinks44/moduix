---
name: changeset-workflow
description: Use when the user explicitly asks to create or update a changeset entry in .changeset/.
---

# Skill: changeset-workflow

Use this skill only when the user explicitly asks to create or update a changeset.

## Scope

- `.changeset/*.md` release note files
- choosing the release bump level for the requested change
- writing summaries that render correctly in the custom changelog

## Rules

- Do not create or update a changeset unless the user asked for it or the task explicitly includes release-note work.
- Reuse an existing pending `.changeset/*.md` file when the task is clearly updating the same unreleased change; otherwise create a new one.
- Match the requested or implied bump level exactly. If the bump level is unclear, ask instead of guessing.
- Keep summaries short, consumer-facing, and release-note shaped.

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

Multi-line:

```md
Sidebar: Improve collapsed rail keyboard focus behavior.
Keeps the trigger visible during focus transitions.
```