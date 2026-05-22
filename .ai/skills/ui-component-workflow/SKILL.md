# Skill: ui-component-workflow

Use this skill for work in `packages/ui`.

## Scope

- New components
- Updates to component API/behavior/styles
- Storybook updates
- Public exports and package surface

## Read First

1. `AGENTS.md` (repo root)
2. `.ai/skills/cross-package-sync/SKILL.md` when docs parity may be affected

## Mandatory References

Before Base UI component work, check:

- `packages/ui/references/base-ui-llms.txt`
- `packages/ui/references/shadcn-llms.txt`

If missing, download with:

```bash
cd packages/ui
curl -o references/base-ui-llms.txt https://base-ui.com/llms.txt
curl -o references/shadcn-llms.txt https://ui.shadcn.com/llms.txt
```

Before editing a specific component, read `src/components/<ComponentName>/<component-name>.md`.
If missing, fetch the file from the Base UI page for that component.

## Implementation Contract

- Stack: React + TypeScript + CSS Modules + `@base-ui-components/react`.
- Use `src/components/AlertDialog/` and `src/components/Lightbox/` as architecture and API references.
- File layout for each component:
  - `ComponentName.tsx`
  - `ComponentName.module.css`
  - `ComponentName.stories.tsx`
  - `component-name.md`
  - `index.ts`
- Use PascalCase for component folders/files, kebab-case for component `.md`.
- Keep component APIs reusable and business-logic free.
- Components must accept `className`.
- Use shared icons from `src/primitives/Icons/Icons.tsx` for reusable icons.
- Keep composition and DX shadcn-like: clear compound parts, predictable naming, no unnecessary API overload.
- Prefer the simplest readable implementation that preserves behavior: avoid extra generic/type indirection when it does not improve type safety or DX, so mid-level developers can follow component code quickly.

## Styling Rules

- Use tokens from `src/styles/*` (`--color-*`, `--spacing-*`, `--radius-*`, etc.).
- Add missing tokens in the appropriate token files and `src/styles/theme.css`.
- Add Base UI runtime variables to `src/styles/theme.css` with `initial`; include default values in nearby comments.
- Keep CSS variable declarations in `src/styles/theme.css` sorted alphabetically. Exception: size scale groups with `-xs/-sm/-md/-lg/-xl` must be ordered from `xs` to `xl`.
- For CSS variable fallbacks used in component styles, avoid complex expressions (for example nested `calc(var(...))`) because they can break IDE CSS parsing; prefer simple literal fallbacks or a dedicated precomputed variable.
- Keep variants on slot selectors via `data-*`, not modifier class names.
- Use nested selectors for derived states/elements.
- Library CSS (`ComponentName.module.css`) must not contain Storybook/demo layout styles.
- Story/demo styles belong in `ComponentName.stories.module.css`.

## Exports and Build

- Export component parts/types from component `index.ts`.
- Update `packages/ui/src/index.ts` in alphabetical order.
- Keep public type exports limited to broadly useful types (usually base props). Do not export narrow helper/internal types unless clearly needed.
- Always rebuild UI package after any change in `packages/ui` by running `npm run build:ui` from repo root.
- For local package-only iteration, `npm run build` in `packages/ui` is allowed, but task handoff and docs sync must use root `npm run build:ui`.

## Slot and Customization Contract

- Keep service-oriented infrastructure slots (`Portal`, `Positioner`, `Viewport`, `Backdrop`, etc.) internal when they are not meaningful user content.
- Expose behavior via parent props (`withBackdrop`, `container`, `placement`, `offset`) on the component that renders those slots.
- For optional UI parts that are toggled on/off, use `with*` boolean naming (`withArrow`, `withBackdrop`, `withViewport`, etc.) instead of mixed forms like `show*`/`hide*`.
- For styling internal slots, prefer a compact `classNames` object.
- Keep `className` for the main/root visual slot; do not duplicate it inside `classNames`.
- Introduce `slotProps` only when there is a concrete need for non-class slot props.
- Do not add many slot-specific escape hatches (`portalProps`, `viewportProps`, etc.) without clear need.

## Composition Consistency Rules (Compound Components)

Use these rules for popup/dialog-like and other multi-part components (for example `Select`, `ScrollArea`, `Lightbox`, `Popover`, `Combobox`, `Dialog`, `Drawer`).

- Keep a predictable public part model: `Component` (root), `ComponentTrigger`, `ComponentContent` plus semantic content parts (`Header`, `Body`, `Footer`, `Title`, `Description`, etc.) only when they add real structure.
- Concentrate popup infrastructure (`Portal`, `Backdrop`, `Positioner`, `Viewport`, `Arrow`) inside `*Content`; app code should configure it through `*Content` props instead of composing those infrastructure parts manually.
- Keep boolean capability toggles in `with*` form (`withArrow`, `withBackdrop`, `withViewport`, `withHandle`, ...). Avoid `is*`, `show*`, `hide*`, `enable*` for the same concern.
- Keep service-slot customization symmetric:
  - visual customization in `classNames`
  - non-class customization in `slotProps`
  - keys should match between both objects (`portal`, `backdrop`, `positioner`, ...).
- Keep `container` as a first-class top-level prop on `*Content`; if `slotProps.portal.container` also exists, top-level `container` must win.
- For position-related props, keep a single override order: explicit top-level prop > corresponding `slotProps` value > local default.
- If supporting legacy API aliases (for example `arrow`, `portalProps`), treat them as compatibility shims only:
  - new API (`withArrow`, `slotProps`) takes precedence;
  - do not introduce new slot-specific escape-hatch props in new components.
- Use `data-slot` on every exported part and meaningful internal slot wrapper for stable styling/testing hooks.
- Default behavior should match component semantics:
  - modal surfaces (`Dialog`, `Drawer`, `Lightbox`) usually default to `withBackdrop = true`;
  - non-modal popups (`Select`, `Combobox`, `Popover`) usually default to `withBackdrop = false`.
- Keep controlled/uncontrolled behavior on root primitives predictable (`open/defaultOpen/onOpenChange` patterns) and avoid moving state control into visual subparts.

## Class Name Composition

- Use `mergeClassName` when Base UI supports function `className` and internal/external classes must be merged.
- Use `clsx` when `className` is string/class-array only.

## Docs Impact

Any UI component update must be reflected in docs. Activate `cross-package-sync` for parity checks and required docs updates.

## Done Criteria

1. Component structure/API matches project patterns.
2. Exports updated (`component/index.ts` and root `src/index.ts`).
3. Stories updated.
4. Styles use tokens; all important public styling variables are declared in `packages/ui/src/styles/theme.css` (with `initial` and default-value comments) when component styling surface changes.
5. Related docs updated when API/behavior/examples changed.
6. Root validations pass:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`