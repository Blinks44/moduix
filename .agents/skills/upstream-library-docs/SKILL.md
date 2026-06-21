---
name: upstream-library-docs
description: Use when component work needs current Ark UI, Chakra UI, or shadcn reference material from online sources.
---

# Skill: upstream-library-docs

Use this skill when component work needs upstream Ark UI, Chakra UI, or shadcn references.

## Sources

- Ark UI routing index: `https://ark-ui.com/llms.txt`
- Ark UI component docs: `https://ark-ui.com/docs/components/<component-slug>`
- Ark UI mdx component docs: `https://ark-ui.com/docs/components/<component-slug>.mdx`
- Ark UI ref guide: `https://ark-ui.com/docs/guides/ref`
- Ark UI forms guide: `https://ark-ui.com/docs/guides/forms`
- Ark UI animation guide: `https://ark-ui.com/docs/guides/animation`
- Ark UI component state guide: `https://ark-ui.com/docs/guides/component-state`
- Ark UI composition guide: `https://ark-ui.com/docs/guides/composition`
- Ark UI styling guide: `https://ark-ui.com/docs/guides/styling`
- Chakra UI component docs: `https://chakra-ui.com/docs/components/<component-slug>`
- Chakra UI mdx component docs: `https://chakra-ui.com/docs/components/<component-slug>.mdx`
- shadcn agent index: `https://ui.shadcn.com/llms.txt`

## Rules

- Read upstream sources online when current primitive or shadcn behavior matters.
- Use Ark UI for primitive behavior, accessibility, state, lifecycle, part naming, and low-level API.
- Use Chakra UI for the higher-level Ark-aligned composition model, overlay ergonomics, and recipe-level defaults.
- Use shadcn for docs ergonomics, example flow, and narrow convenience patterns, not as the source of truth for hidden structural composition.
- Do not rely on local snapshots.
- If an upstream source is unavailable, stop and report it instead of guessing.

## Ark Guide Defaults

When translating upstream guidance into moduix rules:

- Use Ark `ref` props directly for underlying DOM access. For form-library integration, forward the library field `ref`
  to the Ark control that should receive invalid-focus behavior.
- Use Ark `Field.Root` and `Fieldset.Root` context for form state (`disabled`, `invalid`, `required`, `readOnly`).
  Do not duplicate those states with local context when Ark context can carry them.
- Include the relevant Ark `HiddenInput` in form controls that need native form submission or reset behavior.
- Preserve Ark callback detail objects and state shapes. Do not convert `details` callbacks to positional
  callbacks or local aliases.
- Use `Component.Context` for local inline render-prop access, `use*Context` hooks for reusable child parts, and
  `useComponent` plus `RootProvider` only when state must be controlled outside the component tree. Do not render both
  `Root` and `RootProvider` for the same Ark instance.
- Use `asChild` for host-element composition and the `ark` factory for standalone Ark-style polymorphic elements.
  `asChild` must receive a single accessible child that can support the required interaction semantics.
- Share related element IDs through Ark `ids` props when composing multiple Ark components that must be linked for
  accessibility or interaction behavior.
- Style Ark parts through `data-scope`, `data-part`, state data attributes, and Ark CSS variables. Local `className`
  and `data-slot` hooks may layer on top, but must not replace the upstream state hooks.
- Prefer CSS keyframe animations against Ark `data-state` attributes. Use `present` for JavaScript-driven exit
  animations that need the element to remain mounted.

## Local vs Upstream

Upstream sources explain the primitive or external pattern. Local component markdown is the source of truth for `moduix` wrapper behavior that this repo intentionally adds, removes, renames, styles, or constrains.