# Component-page contract

Read this reference when creating, migrating, or substantially restructuring a component page in `website/docs/en/docs`.

Use `website/docs/en/docs/accordion.mdx` as the current structural multi-framework component page. Match its
section order, framework source tabs, shared styling contract, and locale structure, but apply the
established flat naming contract everywhere. Treat any remaining dotted moduix example as stale. Do not repeat the
site-wide framework and styling support matrix or explain which runtime powers a documentation preview.
Call out availability only when a component has a real exception, such as a missing adapter or styling track.
Show only installation choices that actually ship; an incomplete adapter or styling track must stay visibly unavailable.
Render each standard example with `<Example name="<component>/<name>" />` at the top level of the page.
`website/plugins/example-loader.js` expands it at build time into a live preview of the selected
framework, the React, Solid, Vue, and Svelte sources, the CSS files the React example imports, and
a StackBlitz project per framework. It requires `src/components/examples/<component>/<name>.tsx`,
`snippets/<component>/solid/<name>.tsx`, `snippets/<component>/vue/<name>.vue`, and
`snippets/<component>/svelte/<name>.svelte`. Every snippet must run on its own: its default export
renders without props. A Vue or Svelte example that only works inside a parent, such as a provider,
adds `<name>.preview.vue` or `<name>.preview.svelte` with that parent; the preview and StackBlitz run it
while the page shows `<name>`. Pass `width="sm"` or `clientOnly` through to `ExampleFrame`.
Write the explicit `ExampleFrame` and `ExampleCode` markup only when an example needs a `PreviewFrame`,
extra source files, or a missing framework.

## Section order

The docs redesign (`Moduix.sketch`, Button page) defines the target order below. `button.mdx` is
the reference page in every locale. Pages not yet migrated keep the legacy order (`API Reference`,
`Choosing the right component`, `Basic`, `Install with shadcn`, `Anatomy`, `Composition`,
`Examples`, `Styling`). Never mix the two orders on one page.

Page header, rendered by the theme from frontmatter rather than MDX headings: breadcrumb with the
gallery category, title, description, links to Source and npm for the selected framework and
styling, the upstream Ark page from the `ark` frontmatter field (the dedicated component page, or
the precise Ark guide when no primitive exists), Report issue, and the Copy page menu.

1. Basic preview - `<Example name="<component>/basic" />` right under the header, without a heading
2. `Installation` - `<ComponentInstall />`; it builds the Package and shadcn CLI tabs from
   frontmatter and the selected framework and styling
3. `Usage` - `<Usage />`; the example loader renders the Basic source for the selected framework and
   styling, so keep Basic minimal and free of demo-only constants. Prop details belong in API reference
4. `Choosing the right component` - only for close alternatives
5. `Examples`
6. `Composition` - only when the component has a meaningful choice not already clear from Basic or examples
7. `Anatomy` - `<AnatomyInspector parts={[...]}>` with a live scene (the ASCII tree and the separate
   `Part | Role` table are legacy; `button.mdx` is the reference); it comes before Styling because the
   styling hooks refer to these parts
8. `Styling` - `CSS variables` table, then `Styling hooks`: a `Part | data-slot` table that matches
   the React source (internal elements marked as such), followed by short prose for state attributes
   and runtime variables. A single-part component may use `Attribute | Present when` instead
9. `Keyboard` - a `Key | Action` table when the component has keyboard interaction. Skip rows that only
   repeat browser behavior (`Tab` between controls, `Enter`/`Space` on a native button); a component that
   renders a native element gets one sentence instead of a table
10. `API reference` - a `Prop | Type | Default | Description` table; one short sentence per prop, with
    the accepted values when the type is a named union such as `ButtonVariant`

`Basic` is the recommended happy path and must not be repeated without a clear structural reason. Every example heading has a short lead-in in sentence case (`Form usage`, not `Form Usage`). Order
feature examples by task, not alphabetically: appearance first (variants, sizes), then common scenarios
and states (disabled, invalid, field, form), then controlled state and narrower cases, and last
`Context`, `Root provider`, and `Build from parts`. A `Controlled` or `Root provider` lead-in names only
what is specific to the component and links the shared guide:
`/docs/composition-patterns#controlled-state` or `/docs/composition-patterns#root-provider`.

When moduix helpers hide Ark parts (composite helpers such as `SelectField` and `SelectOption`,
`*CloseIcon`, layout wrappers such as `DialogHeader`, or default indicator icons), end Examples with
`Build from parts` (`Сборка из частей`, `Assembler à partir des parties`) in
`<component>/build-from-parts`. It renders the same result as Basic from the explicit parts: composite
helpers expanded, default icons passed as explicit lucide children with the stroke width moduix uses (`strokeWidth={3}`
for X, Check, chevrons, Plus, and Minus; 2.5 for Calendar and Pipette), layout wrappers replaced by plain
elements with classes from the example CSS module. Keep a wrapper whose behavior a plain element
would lose (the `LightboxBody` animation) and say so in the lead-in. The lead-in names the skipped
helpers. Components without such helpers have no `Build from parts` section; Dialog and Select are the
reference. Other examples get headings by what they show (`Custom element` for `asChild` hosts,
`Root provider`), never `Advanced customization`.

## Section intent

- **Upstream link (header; `API Reference` section in the legacy order):** a compact upstream reference. Link the dedicated Ark page when it exists. Otherwise state that no dedicated Ark primitive exists and link the precise guide or factory model; link Chakra only when it materially informs the contract.
- **Basic:** render one shared preview, then show native source for every shipped or explicitly staged framework in
  `groupId="framework"` tabs. Keep shared example CSS outside the framework tabs. The framework tabs
  make runtime support visible without prose about the implementation of the documentation preview.
- **Install with shadcn:** put runtime choices in `groupId="framework"` tabs and list only the CSS
  Modules and Tailwind registry commands that currently ship for that runtime. Keep package-manager
  variants inside `PackageManagerTabs`; link to Quick Start for full registry configuration.
- **Anatomy:** `<AnatomyInspector parts={[[name, slot, role, depth], ...]}>` with the rendered
  component as children. Each row is `[name, data-slot or null, role, depth]`; the tree branches are
  drawn from `depth` (0 for the root), `null` marks a part that renders no element, and an optional
  `note` names parts left to API reference. Hovering, focusing, or tapping a row outlines its
  `data-slot` element in the scene. The scene is `import AnatomyScene from
  '@/components/examples/<component>/basic'`, or a scene-only `anatomy.tsx` next to it when the basic
  example hides parts: overlays render `open`, `portalled={false}` and `modal={false}` inside a
  `min-height` wrapper (Dialog is the reference). The scene is `inert`, so it never takes focus. Pass
  the same `<AnatomyScene />` to `CssPropertiesSection`. Use only flat public value names. The first row is the
  family-named root, followed by family-prefixed parts such as `AccordionItem` and
  `AccordionItemTrigger`. Lead in with one sentence that ends with how to use the inspector.
- **Composition:** add this section only for non-obvious state ownership or part combinations. Write
  it as one concise section by default. Do not add the fixed `Recommended composition`, `When to go
  custom`, `Default props`, or `Behavioral notes` template. When migrating a page that still uses
  that legacy template, consolidate the useful component-specific guidance into `Composition`, the
  relevant example, or `Styling`, and remove the rest. Add a nested heading only for a genuinely
  independent topic that needs more than a short paragraph. Add a defaults table only when moduix
  changes an upstream default or the value is unusually easy to misuse.
- **Examples:** narrower or advanced consumer paths, not a second Basic section. Follow the same
  single-preview, framework-source-tabs, shared-styles pattern as Basic.
- **Styling:** public CSS variables first, then actual styling hooks.

## Ark-backed contracts

Verify the inherited Ark contract while authoring, but include a detail on the public page only when
moduix changes it, the consumer must opt into it, or omitting it would likely cause incorrect usage.
Rely on the upstream API link for ordinary primitive behavior instead of repeating its reference:

- public parts, callback shape, refs, form context, `asChild`, `ids`, context hooks, `RootProvider`, and provider state;
- native form submission and reset behavior, including whether moduix renders a hidden control automatically;
- lazy mounting, `present`, and CSS exit-animation behavior;
- useful Ark state attributes, CSS variables, `data-scope`, `data-part`, and moduix `data-slot` hooks.

Keep the complete preservation contract in component-local maintainer markdown. Public pages should
prioritize the happy path, meaningful choices, examples, and moduix-specific styling hooks.

## Framework synchronization

When adding or synchronizing a framework on an existing page, preserve its useful example inventory
and add a native snippet for each applicable example. Keep every shipped or explicitly staged framework in
`groupId="framework"` tabs and verify each snippet against its public package API. Do not transliterate
one framework's syntax into another framework's shape, and do not duplicate shared prose, anatomy,
or styling guidance per framework. Follow Accordion for page structure, runtime tabs, and flat
public names. Follow Quick Start only when the page needs to point readers to the common installation
setup.

Use the moduix export path in consumer code. Direct Ark imports are rare escape hatches, not the
default tutorial path. Import and render the family-named root directly. Use family-prefixed flat
part names in runnable snippets, anatomy, tables, and prose; do not teach namespace syntax.

## Overlay families

Popup-like components teach the explicit part tree. Do not add `Portal` to examples: explain automatic portalling, `portalled={false}`, and `portalRef` where relevant. Treat arrows as opt-in unless the public contract says otherwise. Dialog-like components do not inherit popup positioning or arrow guidance.

## CSS properties

Render `<CssPropertiesSection properties={...} />` with the array exported from the component's
`css-properties.tsx`; do not add per-component panels or wrap the table in tabs. Pass the rendered
component as children to add the inspector scene: a hovered variable outlines the part that uses it
(the first `data-slot` element, or the optional fourth tuple field `part`) and measures paddings,
widths, and heights. The table groups variables by name (Color, Size and spacing, Typography, Shape),
resolves token values in the scene, and reads `per variant` / `per size` from descriptions that say
"Each `variant`" or "Each `size`" sets its own default. The table covers the
complete public variable contract rather than an abbreviated prose list. Every entry has a
description, and the default is a real value: when variants or sizes set their own value, list the
default recipe's value and say so in the description.