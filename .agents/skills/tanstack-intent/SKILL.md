---
name: tanstack-intent
description: Use for TanStack Start, TanStack Router, or TanStack Intent workflow in apps/docs, including loading version-matched upstream skills.
---

# Skill: tanstack-intent

Use this skill when work in `apps/docs` depends on TanStack Start, TanStack Router, or Intent-loaded TanStack guidance.

## Scope

- TanStack Start configuration in `apps/docs`
- TanStack Router usage in `apps/docs`
- server functions, server routes, middleware, SSR, and route generation
- loading version-matched TanStack skills through `@tanstack/intent`

TanStack Start is used only by `apps/docs`. Do not apply this skill to `packages/react` unless the task also touches docs integration.

## Relationship to Local Skills

- Apply `docs-workflow` first for docs content, MDX, examples, or routing.
- Add `cross-package-sync` when UI changes can affect docs accuracy.
- Use this skill only for TanStack-specific behavior. Local project rules still come from `AGENTS.md`.

## Commands

Run from the repository root.

```bash
npx @tanstack/intent@latest list
npx @tanstack/intent@latest load <package>#<skill>
```

Use `install` only when intentionally updating agent config guidance. Use maintainer commands only when maintaining shipped skills.

## Rules

- Prefer the most specific TanStack skill for the code being changed.
- Load additional TanStack skills only when the task spans multiple concerns.
- For server behavior, prefer the relevant `start-core/*` sub-skill.
- For routes, navigation, params, search, loaders, or guards, prefer the relevant `router-core/*` sub-skill.
- If Intent has no matching skill, use official TanStack docs or installed package source instead of guessing.

## Done Criteria

1. The relevant version-matched TanStack skill was loaded before TanStack-specific edits.
2. TanStack-specific code matches the loaded skill and current installed APIs.
3. Required validation from `AGENTS.md` passed.