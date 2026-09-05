---
name: tailwind-component-workflow
description: Implement and synchronize moduix components in packages/react-tailwind and packages/solid-tailwind while preserving framework behavior, Tailwind styling, npm, and shadcn distribution.
---

# Tailwind Component Workflow

Use this skill for component work in `packages/react-tailwind` and `packages/solid-tailwind`. Pair it
with `ui-component-workflow` for the family-wide impact check and with the applicable React or Solid
skill for framework mechanics.

## Sources of truth

- Use the matching CSS Modules component for the public behavior, anatomy, tokens, states, and visual result.
- Use the matching Tailwind component in the other runtime for Tailwind conventions when it exists.
- Verify Ark React and Solid APIs independently; do not translate framework mechanics literally.
- Keep shared tokens, cascade layers, and keyframes in `packages/foundation`.

## Implementation

- Keep component styling in utility classes; do not add CSS Modules to Tailwind packages.
- Use the local `cn` helper and pass consumer `className` or `class` last so `tailwind-merge` can resolve conflicts in the consumer's favor.
- Express Ark states with Tailwind data/ARIA variants and retain public `data-slot`, `data-scope`, and `data-part` hooks.
- Use arbitrary values only to consume an existing CSS variable or express a value Tailwind cannot name. Do not duplicate foundation tokens as literals.
- Let the shared oxfmt configuration sort Tailwind classes; do not maintain a second class-ordering tool.
- Tailwind Preflight is the reset. Do not import or registry-install the CSS Modules reset for Tailwind variants.

## Parity

For every component present in both Tailwind packages, keep public parts, behavior tests, story
exports, scenario data, class semantics, and registry dependencies aligned. Differences should be
limited to native React/Solid syntax and documented upstream limitations.

When converting a CSS Module change, reproduce its semantic result rather than its selector text:
tokens, layout, responsive behavior, Ark states, animation, reduced motion, and consumer overrides
must remain equivalent.

## Distribution

- npm consumers import the package `style.css` once and register only `dist/components` with Tailwind `@source`.
- shadcn consumers receive component source plus the foundation and `cn` registry dependencies; copied source needs no package `@source` directive.
- Keep exports in the package `package.json` and items in the package-owned `registry.json` synchronized.
- Never edit generated files under `website/docs/public/r` manually; regenerate them with `pnpm run build:registry`.

## Verification

Run the affected React/Solid Tailwind tests and build the matching playground Storybook. When
distribution changes, build and inspect the packed npm package and verify both client and SSR paths
for Solid. Finish with the repository validation required by `AGENTS.md`.