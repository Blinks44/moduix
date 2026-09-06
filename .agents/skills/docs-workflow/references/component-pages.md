# Component-page contract

Read this reference when creating, migrating, or substantially restructuring a component page in `website/docs/en/docs`.

Use `website/docs/en/docs/accordion.mdx` as the canonical multi-framework component page. Match its
section order, React/Solid source tabs, honest React-powered preview note, shared styling contract,
and locale structure. Show only installation choices that actually ship; Accordion demonstrates all
four runtime/styling combinations, but an incomplete Tailwind port must stay visibly unavailable.
Keep non-React source display-only when it cannot run in the React-based documentation application.
Import one shared source file with `?raw`, render it with `CodeBlockRuntime`, and reuse it across
locales instead of adding another runtime to the documentation bundle.

## Section order

1. `API Reference`
2. `Choosing the right component` — only for close alternatives
3. `Basic`
4. `Install with shadcn` — when applicable
5. `Anatomy`
6. `Composition` — only when the component has a meaningful choice not already clear from Basic or examples
7. `Examples`
8. `Styling` — when the public styling contract is meaningful

`Basic` is the recommended happy path and must not be repeated without a clear structural reason. Every example heading has a short lead-in. Order feature examples alphabetically; put `Advanced Customization` last when it intentionally bypasses convenience composition.

## Section intent

- **API Reference:** a compact upstream reference. Link the dedicated Ark page when it exists. Otherwise state that no dedicated Ark primitive exists and link the precise guide or factory model; link Chakra only when it materially informs the contract.
- **Basic:** render one shared preview, then show native React and Solid source in
  `groupId="framework"` tabs. Keep shared example CSS outside the framework tabs. State honestly
  when the preview itself is React-powered.
- **Install with shadcn:** put runtime choices in `groupId="framework"` tabs and list only the CSS
  Modules and Tailwind registry commands that currently ship for that runtime. Keep package-manager
  variants inside `PackageManagerTabs`; link to Quick Start for full registry configuration.
- **Anatomy:** an ASCII tree plus a `Part | Role` table. The first row is `Component` / `Component.Root`.
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

## React and Solid synchronization

When migrating an existing React-first page, preserve its useful example inventory and add a native
Solid snippet for each applicable example. Keep React and Solid in `groupId="framework"` tabs and
verify both snippets against their public package APIs. Do not rewrite React syntax into
React-shaped Solid code, and do not duplicate shared prose, anatomy, or styling guidance per
framework. Follow Accordion for page structure and runtime tabs; follow Quick Start only when the
page needs to point readers to the common installation setup.

Use the moduix export path in consumer code. Direct Ark imports are rare escape hatches, not the default tutorial path. For root-only components, use `<Component>` in runnable snippets and reserve `<Component.Root>` for anatomy or explicit namespace discussion.

## Overlay families

Popup-like components teach the explicit part tree. Do not add `Portal` to examples: explain automatic portalling, `portalled={false}`, and `portalRef` where relevant. Treat arrows as opt-in unless the public contract says otherwise. Dialog-like components do not inherit popup positioning or arrow guidance.

## CSS properties

Use the shared `CssPropertiesSection` pattern from Accordion. It provides the single `CSS Variables`
tab and bounded scroll area. The table covers the complete public variable contract rather than an
abbreviated prose list.