# moduix

UI component library package.

## Base Documentation

Before working with Base UI, read the local documentation:

- `references/base-ui-llms.txt` - Base UI API and CSS Modules examples
- `references/shadcn-llms.txt` - shadcn composition patterns

If the files are missing, download them:

```bash
curl -o references/base-ui-llms.txt https://base-ui.com/llms.txt
curl -o references/shadcn-llms.txt https://ui.shadcn.com/llms.txt
```

## Stack

- React, TypeScript
- CSS Modules (`.module.css`)
- Vite library mode
- `clsx` for class composition
- `@base-ui-components/react` as headless primitives

## Component Structure

Each component lives in `src/components/<ComponentName>/`:

```text
ComponentName/
  ComponentName.tsx          # Implementation
  ComponentName.module.css   # Library styles
  ComponentName.stories.tsx  # Storybook stories
  component-name.md          # Documentation, kebab-case
  index.ts                   # Re-export
```

## Before Editing a Component

Read the component `.md` file in its folder, for example `src/components/Accordion/accordion.md`.

If it is missing:

1. Find the component link in `references/base-ui-llms.txt`.
2. Download the `.md` file into the component folder.

```bash
curl -o src/components/Accordion/accordion.md https://base-ui.com/react/components/accordion.md
```

## Component Rules

1. **Reference implementation**
   `src/components/Accordion/` is the library reference component. Use it as the model for new components: file structure, shadcn-style composition, public API style, `data-slot` pattern, CSS Modules approach, token usage, theme contract (`initial` plus a default-value comment), no layout shift, and composition.

2. **Naming**
   Use PascalCase for components and `.tsx`/`.module.css` files. Use kebab-case for `.md` documentation.

3. **Exports**
   Export all component parts and types from the component `index.ts`. Register new components in `src/index.ts` in alphabetical order, with component exports placed at the end of the file. Public `type` exports should include only the most commonly needed types, such as base `Props` for key parts. Do not export helper or narrow specialized types unless clearly needed.

   If public exports are added or changed, rebuild the package with `npm run build` from `packages/ui` or `npm --workspace moduix run build` from the root. The docs import the package from built `dist`, so new exports are unavailable until rebuilt.

4. **Styles and tokens**
   Use CSS tokens from `src/styles/` (`--color-*`, `--radius-*`, `--spacing-*`, etc.). Do not hardcode values when a suitable token exists. If a token is missing, add it to the appropriate file, such as `src/styles/z-index.css`, and to `src/styles/theme.css`. Add Base UI runtime variables to `theme.css` with `initial` for the IDE contract.

   Keep base styles in slot classes (`.root`, `.trigger`, `.popup`, etc.). Style variants (`size`, `variant`, `tone`, `state`, and other modifiers) through `data-*` attributes on those slots, such as `.root[data-size="sm"]` and `.root[data-variant="outline"]`, not separate modifier classes like `.sizeSm` or `.variantOutline`.

   For `data-*` modifiers and derived selectors, use modern CSS nesting inside the slot: `.root { &[data-size="sm"] { ... } }`, `.input { &::placeholder { ... } }`, `.header { & > [data-slot="..."] { ... } }`. Do not use flat derived selectors at the top level of the file.

5. **Library styles vs demo styles**
   `src/components/<ComponentName>/<ComponentName>.module.css` must contain only styles required by consumers of the component. Do not put Storybook scenarios, examples, or showcase layout styles into library CSS.

   Put Storybook example styles in `src/components/<ComponentName>/<ComponentName>.stories.module.css` and import them only from `<ComponentName>.stories.tsx`, so they do not enter the library CSS bundle. Style documentation examples in `apps/docs` according to `apps/docs/AGENTS.md`.

6. **Docs synchronization**
   When updating an existing library component, check the matching component documentation in `apps/docs` and synchronize it with the library changes. Update examples, props/API descriptions, imports, usage notes, and related styles so the docs reflect the current component behavior.

   After any component update in `packages/ui`, rebuild the UI package from the monorepo root with `npm run build:ui` before validating docs or handing off changes. The docs consume `moduix` from built output.

7. **Reusability**
   Components must be self-contained and independent from business logic. Components must accept `className` for customization.

   Do not declare reusable icons (chevron, check, close, plus, minus, etc.) inline in components. Use shared icons from `src/primitives/Icons/Icons.tsx`. Inline SVG inside a component is allowed only for truly unique graphics tied to local styles or structure.

   Any icon that is part of composition (trigger, clear button, indicator, etc.) must remain customizable: users must be able to provide their own icon through `children`/`render` and use any external icon library.

8. **Service slots and customization**
   Keep strongly service-oriented slots such as `Portal`, `Positioner`, `Viewport`, `Backdrop`, and similar infrastructure out of the required public composition when they do not represent meaningful user content. Render them internally by default and expose simple parent props for behavior, such as `withBackdrop`, `container`, `placement`, or `offset`.

   Put this API on the component that owns and renders the internal slots, not on a higher-level state root that does not render those elements. For example, dialog infrastructure slots belong on `DialogContent`/`AlertDialogContent`, not on `Dialog`/`AlertDialog`.

   Use a `classNames` object for styling internal service slots instead of adding many slot-specific props like `backdropClassName`, `positionerClassName`, or `viewportClassName`. Keep `className` for the root/main visual slot and do not duplicate it in `classNames`. For example, if `Content` renders the `Popup`, `className` styles that popup and `classNames` is reserved for service slots such as `backdrop` and `viewport`. Example:

   ```tsx
   <DialogContent
     className={styles.popup}
     classNames={{
       backdrop: styles.backdrop,
       viewport: styles.viewport,
     }}
   />
   ```

   Add a single `slotProps` object only when there is a concrete need to pass non-class props to internal slots. Do not introduce it preemptively for styling-only customization, and do not add separate slot-specific escape hatches such as `portalProps`, `backdropProps`, `positionerProps`, or `viewportProps`.

9. **`mergeClassName` vs `clsx`**
   Use `mergeClassName` when a Base UI `className` can be a state function and an external and internal `className` must be merged. Use `clsx` when `className` is always a string or class array without a state function.

## New Component Checklist

Use this default workflow for every new component task:

1. Read the relevant `AGENTS.md` files first: the root file and `packages/ui/AGENTS.md`.
2. Go to `src/components/<ComponentName>/` and read `<component-name>.md` from Base UI before implementation.
3. Create the full component file set:
   - `ComponentName.tsx`
   - `ComponentName.stories.tsx`
   - `ComponentName.module.css`
   - `index.ts`
4. Build the component to be readable, reusable, simple in API, and complete for the scenarios from the documentation. Support key Base UI variants and Storybook scenarios. Keep click, focus, hover, and selected states polished and free of layout shift.
5. Document important customization variables in `src/styles/theme.css`:
   - one block per component;
   - components in alphabetical order;
   - every token uses `initial`, because this is documentation-only;
   - include the default value in a nearby comment;
   - do not add secondary or internal variables.
     The component must also remain directly stylable through `className`.
6. Add the re-export in the root `src/index.ts` so the library builds correctly.
7. Keep composition and DX shadcn-like: compound parts, clear names, predictable API, and no unnecessary overload.
8. Before handoff, compare the implementation with `src/components/Accordion/` and fix differences in architecture, API, and styling unless there is an explicit reason to differ.
9. For component updates, synchronize the corresponding `apps/docs` documentation with the current component API and behavior.

## Definition of Done

A component task is complete when:

1. The component and its parts follow the composition and reuse rules.
2. The component `index.ts` and root `src/index.ts` are updated.
3. `ComponentName.stories.tsx` is added or updated.
4. Styles use tokens, new variables are added to `src/styles/theme.css`, and the implementation matches `src/components/Accordion/` or has documented intentional differences.
5. Matching `apps/docs` component documentation is checked and updated when the component API, behavior, examples, or styles change.
6. These commands pass from the monorepo root:
   - `npm run fmt:fix`
   - `npm run lint:check`
   - `npm run tsc:check`