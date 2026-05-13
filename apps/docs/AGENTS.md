# Documentation (docs)

Documentation site for the UI component library.

## Stack

- React, TypeScript
- TanStack Start with file-based routing
- Fumadocs (`source.config.ts`) for MDX content
- Vite

## Structure

```text
apps/docs/
  content/docs/       # MDX documentation pages
  src/
    components/       # Site components
    routes/           # TanStack file-based routes
    styles/           # Site styles
  source.config.ts    # Fumadocs configuration
```

## Rules

1. Documentation pages are MDX files in `content/docs/`.
2. Site components live in `src/components/`.
3. Import UI components from `moduix` (`packages/ui`); do not duplicate them.
4. Put live preview examples in `src/components/examples/`. MDX pages should contain documentation structure, text, and code snippets. Interactive React components, example data, and `cssProperties` lists must live in the example `.tsx` files next to the other examples.
5. Style live examples with CSS Modules next to the example: `src/components/examples/<component>.module.css`. Do not leave demo styles in inline `style`, `React.CSSProperties` constants, or utility-string `className="..."` values inside `.tsx`. TSX should contain component composition, example data, and `className={styles.*}` for the parts that demonstrate customization.
6. CSS playground properties must not hide component variability shown on the page. Do not add inherited or broad override variables to `cssProperties` when they make documented variants render the same, such as variables that override all sizes, weights, tones, states, placements, or density options inside a preview. Keep those variables in `theme.css` when they are useful for targeted customization, but document them through focused examples or `className` usage instead of the playground.
7. Code snippets in MDX pages should focus on how consumers use the component in their projects:
   - Do not include repeated setup imports like `import "moduix/style.css";` or `import * as React from "react";`. Global library CSS and React setup are documented on the initialization page.
   - Each snippet should start with the import of the `moduix` parts used in that snippet.
   - Each `Preview.Code` snippet must be self-contained for the current variant: include the needed imports, local example data, helper functions, state hooks, and a complete demo component or complete JSX composition. Do not show isolated fragments such as only a single item, only root props, or placeholders like `{/* input and list */}` unless the section explicitly documents a tiny sub-slot outside a live preview.
   - Keep all snippets on a component page in one style, showing the recommended project-level usage pattern for that component.

## Component Page Template

The reference documentation page is `content/docs/accordion.mdx`. The reference live examples file is `src/components/examples/accordion.tsx`.

When adding or revising component pages, match these files for structure, tone, block order, previews, examples, code formatting, and MDX/TSX separation.

Every component page must use this order:

1. Frontmatter:
   - `title` - component name, for example `Accordion`;
   - `description` - short description of the component purpose.
2. A `BaseUIReference` block linking to the source Base UI docs page for the primitive, for example `https://base-ui.com/react/components/accordion`.
3. Basic preview with the heading `Basic`.
4. Tabs with the basic example code and `CSS properties`. Use `Preview` and pass `cssProperties` only to the basic example.
5. `## Anatomy` section.
   - Briefly describe visible parts and internal service slots (for example `portal`, `backdrop`, `viewport`) when the component has them.
   - Explain when consumers should keep default styling and when slot-level customization is useful.
   - Keep `Anatomy` blocks in a unified style across all component pages. Use `content/docs/accordion.mdx` as the reference format for section structure and tone.
6. `## Composition` section (optional, only when there is meaningful composition to show).
7. `## Examples` section.
8. For each Storybook example:
   - heading with the example name;
   - short scenario description;
   - preview;
   - tab with the example code, without repeating `CSS properties`.

Order examples by user learning flow rather than alphabetically:

1. Keep section order fixed: `Basic` -> `Anatomy` -> `Composition` (if present) -> `Examples`.
2. Inside `Examples`, put the most common user scenarios first.
3. Put controlled or stateful variants after common scenarios.
4. Put customization examples after behavior examples: custom icons, custom styling, slots, `className`.
5. Put edge cases and accessibility-specific examples last.

Pages should work as user-facing library documentation: show composition, customization through `className`/CSS variables, and icon replacement when the component supports icons.