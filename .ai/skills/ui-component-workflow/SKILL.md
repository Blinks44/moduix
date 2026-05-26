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
- Do not add customization APIs by default. Add them only when composition cannot cover a common
  production case, or when a very small DX shortcut clearly improves the default path without
  expanding the component into a combinator.
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

## Small Sugar Contract

Small sugar is acceptable when it solves a high-frequency consumer action without hiding the real
composition model.

Use it conservatively:

- keep the name literal and predictable
- keep the scope narrow
- remove obvious boilerplate from the default path
- target a scenario that users write the same way over and over
- keep composition available for the advanced case
- do not combine multiple internal parts behind one prop bag
- do not add parallel `classNames`, `slotProps`, render-node shims, or internal part overrides
- do not add a prop just because it is theoretically useful or symmetrical with another component

Good small sugar:

- improves the common case
- keeps the API easier to explain
- does not hide the architecture
- does not block full composition

Bad small sugar:

- replaces composition wholesale
- duplicates large parts of the primitive API
- adds many custom props at once
- introduces an abstraction layer over internal parts
- makes behavior harder to predict from the component shape

When evaluating a sugar prop, verify:

1. Is this a common production scenario?
2. Does it noticeably improve DX?
3. Is it small enough to keep the API simple?
4. Does it preserve the composition escape hatch?
5. Would the component still look plausible in shadcn/ui?

For positioned popup-like components with a high-level `*Content` wrapper, the preferred default
contract is:

- `className`
- `side`
- `sideOffset`
- `align`
- `alignOffset`
- `arrowPadding`
- `collisionAvoidance`
- `collisionBoundary`
- `collisionPadding`
- `showArrow`

Rules for this contract:

- `showArrow` is the preferred name for toggling the built-in arrow.
- for popup-like components with a built-in default arrow, keep that arrow off by default and make
  it opt-in through `showArrow`.
- `showArrow` should only control the default arrow on and off. It should not accept custom nodes.
- custom arrow content, portal options, backdrops, viewports, and DOM structure changes belong to
  explicit composition parts.
- if a component is not a positioned popup, this exact contract does not apply. Do not invent
  matching props for dialogs, drawers, alerts, or other non-positioned overlays just for symmetry.
- non-popup components may still use small sugar, but it should be domain-specific and tied to a
  frequent workflow rather than copied from another component family.
- a little sugar for a popular behavior is good when it keeps the component easy to explain in one
  sentence. If the explanation starts sounding like infrastructure, move that behavior back to
  composition.

For dialog-like components, use a different family contract. These components are not positioned
popups, so do not copy popup sugar into them.

Preferred dialog-like sugar:

- keep `className` and primitive passthrough props on the visible content part
- allow narrow workflow sugar only when it matches a repeated UX pattern in the library
- keep backdrop, viewport, popup, and close structure simple by default

Good dialog-like sugar examples:

- a built-in backdrop or viewport inside the default `*Content` when that is the normal product
  path
- a small dismissal affordance prop such as `showCloseButton` only when it is a stable,
  high-frequency library convention
- domain-specific workflow props for a specialized overlay, such as shortcut handling in a command
  palette or animation toggles in a drawer

Bad dialog-like sugar examples:

- `slotProps`, `classNames`, or prop bags for internal dialog parts
- `withBackdrop`, `withViewport`, `withPortal`, or similar switches for every structural part
- render-node sugar for internal close/backdrop/viewport parts on the high-level content wrapper
- copying popup-family props like `side`, `align`, or `showArrow` into dialog-family components

Rules for dialog-like sugar:

- the prop should simplify a common workflow, not expose hidden structure
- the default content component should still read like a thin wrapper, not a configuration surface
- if the sugar starts describing internal layout, move that behavior back to explicit composition

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