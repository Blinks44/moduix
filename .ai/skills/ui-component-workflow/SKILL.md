# Skill: ui-component-workflow

Use this skill for work in `packages/ui`.

## Scope

- New components
- Component API, behavior, and style changes
- Storybook updates
- Public exports

## Read First

1. `AGENTS.md` (repo root)
2. `packages/ui/references/base-ui-llms.txt`
3. `packages/ui/references/shadcn-llms.txt`
4. `packages/ui/src/components/<ComponentName>/<component-name>.md` for the touched primitive
5. `.ai/skills/cross-package-sync/SKILL.md` when docs parity may be affected

If a required Base UI reference file is missing, stop and report it before component work rather than guessing the primitive contract.

Before editing an existing component, also inspect its current implementation, stories, local docs, and any adjacent examples so you understand:

- what behavior is essential
- what is part of the public styling contract
- what is real user value versus historical complexity

## Component Goal

Build components as thin styled wrappers over Base UI primitives.

The target shape is close to shadcn/ui:

- simple function components
- inline prop typing
- minimal wrapper logic
- predictable composition
- small public surface area
- simple by default, composable when needed

Every API addition must justify itself. Ask: does this improve real DX, or does it just make the component more configurable?

## Implementation Rules

- Stack: React + TypeScript + CSS Modules + `@base-ui-components/react`.
- Keep file layout consistent with existing components:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use PascalCase for component folders/files and kebab-case for the local `.md` file.
- Components must accept `className` when there is a meaningful visual root.
- Use `data-slot` on exported parts and meaningful internal wrappers that are part of the styling contract.
- Prefer direct primitive passthrough over custom wrapper logic.
- Do not add business logic, state abstractions, or "future-proof" APIs.
- Prefer the shadcn-like shape where exported parts are small function components over the primitive plus styles.

When simplifying a component, ask before each abstraction or prop: is this improving real consumer DX, or is it just adding architecture?

## API Simplification Rules

- Prefer composition over feature flags.
- Prefer public parts over `slotProps` and `classNames`.
- Do not add customization APIs by default. Add them only when composition cannot cover a common production case.
- Keep infrastructure slots internal unless they are meaningful user-facing building blocks.
- Do not create "god components" that own every optional UI concern.
- Keep controlled and uncontrolled primitive behavior intact. Do not rewrap it unless the wrapper adds real value.
- For common use cases, hide structural primitive parts inside higher-level components when that makes the API materially simpler.
- Do not remove low-level composition entirely when users need it for layout, DOM structure, styling, positioning, or animation overrides.
- Do not replace composition with API-combiners such as `slotProps`, `classNames`, `withX`, `enableX`, or `disableX` when explicit parts express the same result more clearly.

When reviewing an existing API, remove or simplify anything that:

- duplicates Base UI behavior
- exists only for symmetry or completeness
- is rarely needed
- makes typing or docs noticeably harder
- can be expressed with composition instead
- exists mostly for "future" flexibility

For each custom prop, verify:

1. Is this a common production case?
2. Can composition already express it?
3. Is it duplicating Base UI?
4. Does it clearly improve DX?
5. Does it keep the component from turning into a combinator?

If the answer is weak, simplify or delete it.

## Typing Rules

- Type props inline where possible.
- Do not export prop aliases that only restate primitive props.
- Avoid exported `*Props`, `*Handle`, `*ClassNames`, `*SlotProps`, and primitive alias types unless they provide concrete consumer value.
- Avoid generics that only pass through to the primitive.
- Avoid helper types, `Pick`, `Omit`, and complex type composition unless they protect a real public contract.
- Keep component code understandable without reading internal types first.
- Do not introduce a named type only to annotate one function signature.
- Do not export internal helper types used only inside one component file.

## `forwardRef` and Imperative APIs

- Do not use `forwardRef` unless the ref is part of the real consumer API or required by the primitive contract.
- Do not keep imperative helpers or handles unless they are part of the primitive's actual UX and are used in real scenarios.
- During refactors, actively remove wrapper-level imperative APIs that are not essential Base UI behavior.

## Styling Rules

- Use tokens from `src/styles/*`.
- Add missing public styling tokens to `src/styles/theme.css` with `initial` and a nearby default-value comment.
- Keep CSS variable declarations in `src/styles/theme.css` sorted alphabetically, except ordered size scales (`xs` to `xl`).
- Keep selectors simple and readable.
- Remove styles for deleted props, slots, data attributes, and legacy modifiers.
- Avoid nested or defensive selectors when a flat selector is enough.
- Remove unused classes, orphan selectors, feature-flag selectors, and obsolete CSS variables created by API simplification.
- Library CSS must not include Storybook/demo layout styles.
- Story/demo styles belong in `ComponentName.stories.module.css`.

## Exports and Build

- Export component parts from the component `index.ts`.
- Update `packages/ui/src/index.ts` in alphabetical order.
- Keep public type exports to the minimum genuinely useful set.
- Rebuild UI after any `packages/ui` change with `npm run build:ui` from repo root.

## Stories and Local Docs

- Stories and adjacent component docs must match the real API.
- Remove examples of deleted props, slot escape hatches, or legacy customization paths.
- Prefer small, production-like composition examples over exhaustive configuration examples.
- Follow `cross-package-sync` to keep the default path and any advanced escape hatch aligned between stories and docs.

## Docs Impact

If the change affects API, behavior, styling hooks, or recommended usage, activate `cross-package-sync` and update docs in the same task.

## Preservation Rules

Simplification must not break:

- accessibility behavior
- keyboard navigation
- focus management
- screen reader behavior
- Base UI lifecycle, state, transitions, and interactions
- styling contracts such as `data-slot` and meaningful styling hooks

Remove architecture, not real behavior.

## Done Criteria

1. Component code is thinner, simpler, and closer to the primitive.
2. Public API is no larger than necessary.
3. Dead types, dead props, and dead styling paths introduced by the change are removed.
4. Stories and local component docs reflect the simplified API.
5. Related docs are updated when public behavior changed.
6. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`
7. The component still looks like something that could plausibly live in shadcn/ui.