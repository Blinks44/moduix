---
name: ui-component-workflow
description: Use for work in packages/react, including component implementation, API changes, stories, exports, and local component docs.
---

# Skill: ui-component-workflow

Use this skill for work in `packages/react`.

## Scope

- new components
- component API, behavior, and style changes
- stories, public exports, and local component docs

## Read First

1. `AGENTS.md`
2. The touched component's TSX, CSS module, story, and local markdown
3. `.agents/skills/js-react-conventions/SKILL.md`
4. `.agents/skills/upstream-library-docs/SKILL.md` when Ark, Chakra, or shadcn behavior matters
5. `.agents/skills/local-component-docs/SKILL.md` when component markdown changes
6. `.agents/skills/cross-package-sync/SKILL.md` when public changes affect docs

Before editing an existing component, inspect its implementation, styling, stories, and local
markdown together. Check public docs/examples when the change is user-facing.

## Workflow Contract

- Keep wrappers thin, explicit, and Ark-shaped.
- Treat Ark UI as the behavior source for anatomy, lifecycle, state, callback detail objects, accessibility, and part naming.
- Prefer direct primitive passthrough and explicit composition over prop translation, hidden structural bundles, feature
  flags, compatibility shims, or extra local state layers.
- Preserve the current public contract unless the task explicitly changes it: meaningful parts, controlled/uncontrolled
  behavior, refs, `asChild`, `HiddenInput`, provider/context hooks, and stable `data-slot` hooks should not disappear
  silently.
- If consumer-facing stories or docs need an Ark context, item context, state hook, or context hook as part of the
  normal advanced path, expose that state surface through the moduix component namespace or package barrel instead of
  teaching consumers to import `ArkComponent.Context` from `@ark-ui/react/*`. Keep direct Ark imports only for rare
  escape hatches that are intentionally outside the moduix API.
- When the current moduix API exports `RootProvider`, `Context`, `ItemContext`, `useComponent`, or `use*Context`,
  keep that surface aligned unless the task intentionally simplifies it everywhere.
- Preserve the callable `Object.assign` root pattern so both `<Component>` and `<Component.Root>` keep working when
  that is already part of the contract.
- Prefer removing duplicated private plumbing before removing meaningful public structure or escape hatches.

## Typing Rules

- When wrapping Ark primitive parts, prefer `ComponentRef<typeof Primitive.Part>` for refs and
  `ComponentProps<typeof Primitive.Part>` for props.
- When wrapping `ark.*` factory elements such as `ark.div`, `ark.button`, or `ark.a`, prefer
  `HTMLArkProps<'div'>`, `HTMLArkProps<'button'>`, and the matching intrinsic form for props.
- Do not rewrite `ark.*` wrappers to `ComponentProps<typeof ark.div>`-style typing only for visual consistency with
  primitive wrappers.
- Keep the standard component shape when it already exists: `ComponentName.tsx`, `ComponentName.module.css`,
  `ComponentName.stories.tsx`, `component-name.md`, and `index.ts`.
- Accept `className` on meaningful visual roots.
- Use stable `data-slot` hooks on exported parts.
- Do not add business logic, extra state layers, speculative APIs, or god components.

## Component Family Contracts

### Popup-like Components

- Prefer the full explicit Ark/Chakra composition path as the public contract.
- Keep structural parts explicit. `Content` means the real upstream content part, not a hidden bundle such as
  `Portal + Positioner + Content`.
- Roots own portal transport through the shared `portalled` and `portalRef` contract.
- Preserve Ark positioning, accessibility wiring, and runtime CSS variables when the primitive exposes them.

### Dialog-like Components

- Keep the visible content wrapper thin.
- Export the full explicit Ark/Chakra composition path as the default and documented API.
- Allow only narrow workflow sugar that removes repeated boilerplate without hiding structure.
- Preserve Ark focus lifecycle, title/description wiring, context hooks, and controlled/uncontrolled state shape.

## Sync Requirements

- Keep stories, package barrels, local component markdown, public docs, and registry output aligned with the shipped API.
- If the wrapper exposes provider/context/state surfaces, stories should cover them, not only the happy path.
- Remove deleted props, obsolete customization paths, and outdated examples in the same task.
- If API, behavior, styling hooks, or recommended usage changed, update local component markdown in the same task.
- If docs become inaccurate, apply `cross-package-sync`.
- If a registry-shipped component changes public styling, import contract, or registry dependencies, update
  `registry.json` and run `npm run build:registry`.