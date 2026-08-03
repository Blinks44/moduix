# Component-page contract

Read this reference when creating, migrating, or substantially restructuring a component page in `apps/docs/docs/en/docs`.

## Section order

1. `API Reference`
2. `Choosing the right component` — only for close alternatives
3. `Basic`
4. `Install with shadcn` — when applicable
5. `Anatomy`
6. `Composition`
7. `Examples`
8. `Styling` — when the public styling contract is meaningful

`Basic` is the recommended happy path and must not be repeated without a clear structural reason. Every example heading has a short lead-in. Order feature examples alphabetically; put `Advanced Customization` last when it intentionally bypasses convenience composition.

## Section intent

- **API Reference:** a compact upstream reference. Link the dedicated Ark page when it exists. Otherwise state that no dedicated Ark primitive exists and link the precise guide or factory model; link Chakra only when it materially informs the contract.
- **Anatomy:** an ASCII tree plus a `Part | Role` table. The first row is `Component` / `Component.Root`.
- **Composition:** `Recommended composition`, `When to go custom`, optional `Default props`, and `Behavioral notes`. Default props use a table.
- **Examples:** narrower or advanced consumer paths, not a second Basic section.
- **Styling:** public CSS variables first, then actual styling hooks.

## Ark-backed contracts

Document only behavior the wrapper exposes, but do not silently omit it:

- public parts, callback shape, refs, form context, `asChild`, `ids`, context hooks, `RootProvider`, and provider state;
- native form submission and reset behavior, including whether moduix renders a hidden control automatically;
- lazy mounting, `present`, and CSS exit-animation behavior;
- useful Ark state attributes, CSS variables, `data-scope`, `data-part`, and moduix `data-slot` hooks.

Use the moduix export path in consumer code. Direct Ark imports are rare escape hatches, not the default tutorial path. For root-only components, use `<Component>` in runnable snippets and reserve `<Component.Root>` for anatomy or explicit namespace discussion.

## Overlay families

Popup-like components teach the explicit part tree. Do not add `Portal` to examples: explain automatic portalling, `portalled={false}`, and `portalRef` where relevant. Treat arrows as opt-in unless the public contract says otherwise. Dialog-like components do not inherit popup positioning or arrow guidance.

## CSS properties

Use the same `not-prose` / `Tabs` / bounded scroll-area wrapper as `accordion`, with one `CSS Variables` tab. The table covers the complete public variable contract rather than an abbreviated prose list.