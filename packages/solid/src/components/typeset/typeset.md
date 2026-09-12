# Typeset (Solid)

`Typeset` gives rendered Markdown, CMS content, and streaming chat output a scoped reading rhythm
while the application retains ownership of content, sanitization, layout, and reading measure.
Ark UI has no typesetting primitive, so this component is a moduix-owned semantic HTML contract
implemented with the Ark Solid factory.

## Public contract

- `Typeset` renders a `div` by default; `Typeset.Root` is an equivalent namespace alias.
- `asChild` accepts one semantic host through an Ark Solid render function.
- `Typeset.Scroll` renders a keyboard-focusable horizontal scroller with `tabIndex={0}` by default.
- A scroll label through `aria-label` or `aria-labelledby` adds `role="region"` unless a role is
  explicitly provided.
- `.not-typeset` and `data-not-typeset` exclude a subtree, including nested Typeset parts.
- The stable hooks are `data-scope="typeset"`, `data-part="root"` or `"scroll"`, and
  `data-slot="typeset"` or `"typeset-scroll"`.

## Composition and refs

```tsx
<Typeset asChild={(props) => <article {...props()}>Rendered content</article>} />
```

Ordinary refs are forwarded to the rendered root or scroll element:

```tsx
<Typeset ref={(element) => (root = element)} />
```

Ark Solid does not forward refs through an `asChild` render function, so ordinary refs and custom
host composition are separate native paths.

## Styling

The CSS module is intentionally identical to the React component. It styles semantic paragraphs,
headings, inline semantics, lists, task lists, blockquotes, code, keyboard keys, tables, math,
media, disclosures, definition lists, and GFM footnotes using the existing moduix theme tokens.

The public rhythm variables are `--moduix-typeset-size`, `--moduix-typeset-leading`, and
`--moduix-typeset-flow`; optional font variables are `--moduix-typeset-font-body`,
`--moduix-typeset-font-heading`, and `--moduix-typeset-font-mono`.

## Upstream references

- https://ark-ui.com/docs/guides/composition
- https://ark-ui.com/docs/guides/ref
- https://ark-ui.com/docs/guides/styling
- https://ui.shadcn.com/docs/typeset (reviewed 2026-09-12)