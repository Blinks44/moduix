# Skill: tanstack-intent

Use this skill when work in `apps/docs` involves TanStack Start, TanStack Router, or TanStack
Intent-discovered skills.

## Scope

- TanStack Start configuration in `apps/docs`
- TanStack Router usage in `apps/docs`
- Server functions, server routes, middleware, SSR, route generation, and Start/Router plugin setup
- Loading version-matched TanStack skills through `@tanstack/intent`

TanStack Start is used only by `apps/docs` in this repository. Do not apply this skill to
`packages/ui` component implementation unless the task also touches the docs app integration.

## Relationship to Local Skills

- For docs content, MDX, examples, or docs routing, apply `docs-workflow` first.
- For UI and docs parity work, apply `cross-package-sync` in addition to `docs-workflow`.
- Use this skill as the bridge to upstream TanStack Start/Router guidance when docs app code depends
  on TanStack behavior.
- Local project rules remain the source of truth for repository structure, validation, and component
  documentation conventions.

## Intent Commands

Run commands from the repository root. In this repository, shell commands must be prefixed with `rtk`
when `rtk-command-proxy` is active.

List available intent-enabled package skills:

```bash
rtk npx @tanstack/intent@latest list
```

Load a matching skill before changing TanStack-specific code:

```bash
rtk npx @tanstack/intent@latest load <package>#<skill>
```

Useful examples:

```bash
rtk npx @tanstack/intent@latest load @tanstack/react-start#react-start
rtk npx @tanstack/intent@latest load @tanstack/start-client-core#start-core
rtk npx @tanstack/intent@latest load @tanstack/start-client-core#start-core/middleware
rtk npx @tanstack/intent@latest load @tanstack/start-client-core#start-core/server-functions
rtk npx @tanstack/intent@latest load @tanstack/router-core#router-core
rtk npx @tanstack/intent@latest load @tanstack/router-core#router-core/navigation
```

Use `install` only when intentionally updating agent config guidance:

```bash
rtk npx @tanstack/intent@latest install
rtk npx @tanstack/intent@latest install --map
```

Use maintainer commands only when creating or maintaining shipped skills:

```bash
rtk npx @tanstack/intent@latest scaffold
rtk npx @tanstack/intent@latest validate
rtk npx @tanstack/intent@latest stale
```

## Selection Rules

- Prefer the most specific loaded TanStack skill for the code being changed.
- Load additional skills only when the task spans multiple TanStack concerns.
- For server functions and CSRF/auth/session behavior, prefer `start-core/server-functions`,
  `start-core/middleware`, and `start-core/auth-server-primitives` when available.
- For route files, links, params, search, loaders, and guards, prefer the relevant
  `router-core/*` sub-skill.
- If Intent lists no matching skill, use official TanStack docs or installed package source instead
  of guessing.

## Done Criteria

1. The local docs workflow rules still apply to all `apps/docs` changes.
2. The relevant version-matched TanStack skill was loaded before TanStack-specific edits.
3. TanStack-specific code follows the loaded skill guidance and current installed package APIs.
4. Repository validation follows the root `AGENTS.md` requirements for the files changed.