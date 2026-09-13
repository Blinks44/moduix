# Documentation page types

Use this reference when creating or substantially restructuring a page in `website/docs`. It defines stable information architecture, not a page generator. Keep page-specific sections only when they teach something useful.

## Shared contract

Every localized page has:

1. localized `title` and `description` frontmatter, while public identifiers remain unchanged;
2. a concise introduction that explains purpose and the recommended use case;
3. the same information hierarchy in every configured locale;
4. native source for every shipped framework that supports the example;
5. only verified imports, package paths, registry commands, and public behavior.

Use `groupId="framework"` for framework tabs. Framework-neutral prose, anatomy, accessibility, styling, and conceptual guidance stay outside those tabs. Add a framework tab only after that adapter and the documented API actually ship.

## Component pages

Read [the component-page contract](component-pages.md) for the full structure. Its canonical order is:

1. `API Reference`
2. `Choosing the right component`, only when close alternatives exist
3. `Basic`
4. `Install with shadcn`, when applicable
5. `Anatomy`
6. `Composition`, only for a meaningful choice
7. `Examples`
8. `Styling`, when the public styling contract is meaningful

Accordion is the current structural reference. It is not the source of truth for which frameworks or styling variants ship.

## Utility pages

Use this structure for Ark utilities that are not moduix components:

1. `API Reference` with the exact upstream Ark UI page and a compact import example for every shipped framework;
2. a recommended basic use case with one live preview when rendering or interaction helps understanding;
3. native framework source tabs for each applicable preview;
4. additional usage sections only for distinct behavior, configuration, lifecycle, accessibility, or integration concerns.

Keep utility pages concise. Do not reproduce the upstream prop table or every example. Explain the local happy path, important constraints, and the boundary between Ark behavior and application-owned behavior.

Use `ExampleFrame variant="component"` for a displayed example. Wrap its content in `<PreviewFrame maxWidth="sm">` by default because utilities do not need a full-width canvas. Choose another existing size only when the example itself requires it and keep the choice consistent across locales. Source-only examples do not need an empty visual preview.

## Collections, forms, and guides

These families do not yet have a canonical page structure. Do not infer one from a single page or force the component or utility template onto them.

When one of these families is deliberately standardized:

1. audit every page in the family and every locale;
2. identify the smallest shared hierarchy and the legitimate page-specific sections;
3. choose one accepted default-language page as the visual and structural reference;
4. record the resulting contract in this file before or together with the migration;
5. migrate all pages in the family and verify locale and framework parity.