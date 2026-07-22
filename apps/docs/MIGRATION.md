# Rspress migration review

## Result

`apps/docs` is the production Rspress documentation application that replaced the former
TanStack Start/Fumadocs application. It keeps the existing `/docs/*` URLs, all 117 documentation
pages, the custom homepage, registry assets, SEO metadata, sitemap, per-page Markdown, `llms.txt`,
and `llms-full.txt`.

The former Fumadocs application has been removed. The Worker is named `moduix`, matching the
existing production service.

## What the review changed

### Native Rspress structure and i18n

The content now follows the Rspress locale layout:

```text
docs/
  en/
    _nav.json
    index.mdx
    docs/
  public/
i18n.json
```

`en` is configured as the default locale, so Rspress removes the language prefix and the public
URLs remain `/` and `/docs/*`, not `/en/*`. Navigation labels use `i18n.json` keys. No empty `zh`
locale is registered yet because it would expose an incomplete language switcher.

To add Chinese later:

1. Add `zh` to `locales` in `rspress.config.ts`.
2. Create `docs/zh/_nav.json`, `docs/zh/index.mdx`, and translated pages under `docs/zh/docs`.
3. Add `zh` values to the existing `i18n.json` keys.

### Minimal Rspress configuration

`rspress.config.ts` now uses the default `docs` root and the official plugin APIs directly:

- `pluginPreview()` for runnable component demos;
- the built-in `llms: true` SSG-MD path for Markdown, `llms.txt`, and `llms-full.txt`;
- `pluginSitemap()` with the top-level `siteOrigin`;
- top-level `locales`, rather than the deprecated `themeConfig.locales` path;
- the original theme's search, edit link, last-updated metadata, footer, and social links.
- the official `markdown.defaultCodeOverflow` option for 600px scrollable code blocks.

The migration-specific directory scanner, generated Rsbuild aliases, CSS resolver, and
`previewCodeTransform` have been removed. Preview modules are normal default-exported modules and
use the existing `@/` source alias when they need documentation CSS Modules.

Two small config exceptions remain intentionally:

- canonical links and the global Open Graph image are emitted through `head` because they are
  site policy rather than page content;
- `/llms.txt` and `/llms-full.txt` are excluded from the dead-link pass because those files are
  generated later in Rspress's SSG-MD build.

The older `@rspress/plugin-llms` dependency has been removed. In Rspress 2, the core SSG-MD path
understands built-in components such as `PackageManagerTabs`, so generated Markdown contains real
package-manager commands instead of raw MDX component tags.

### Preview architecture

The site has 773 existing live surfaces:

- 728 are native `@rspress/plugin-preview` fenced demos;
- 33 intentionally shortened examples show a full live component through the small `ExampleFrame`
  component and keep the focused teaching fragment as an ordinary code block;
- 10 multi-file blocks use the same frame because their displayed source is an application module,
  not a standalone demo export;
- the animation playground and recipe gallery remain composed documentation widgets.

`ExampleFrame` is no longer a Fumadocs-compatible preview system. It is a small layout wrapper that
uses Rspress `BrowserOnly` for the exceptional client-only cases. The former compound `Preview`,
slot parser, `NoSSR`, Tabs compatibility adapter, and CSS transform layer are gone. Rspress's own
`Tabs`, `Tab`, and `PackageManagerTabs` are used directly.

All 765 `#region`/`#endregion` artifacts were removed from snippets. Runnable external snippets now
have ordinary default exports, so the preview plugin can compile them without config-time rewriting.
The 729 external TypeScript/TSX snippets are included in the documentation `tsconfig` and pass the
same strict compiler checks as the rest of the site.

### Source cleanup and Rspress components

`src/lib` was an unused migration leftover containing only a `cn` re-export. Nothing imported it,
and it depended on a transitive package, so it has been removed. The review also removed more than
20,000 lines of unreachable duplicated example declarations, three unused example modules, and 40
orphaned CSS/data files. The remaining files under `src/components` are all reachable from MDX or
another retained component.

The normal component-page shape is now:

- MDX for prose, metadata, and the official `tsx preview file="..."` directive;
- standalone TSX files under `_snippets` for runnable demos;
- CSS Modules only for documentation widgets or examples that actually import them.

This is the intended Rspress preview-plugin workflow. A custom React component remains only where
the documentation surface itself is interactive, where a shortened snippet cannot be executed on
its own, or where a block is composed from multiple files. Rspress's `Tabs`, `Tab`,
`PackageManagerTabs`, and `BrowserOnly` are used directly; there is no custom syntax highlighter,
Shiki client gate, preview parser, or generated alias layer.

### Runtime and visual fixes

The documentation theme now imports both `@moduix/react/reset.css` and
`@moduix/react/style.css`. The missing reset was the cause of the broken interactive demos:
component CSS overrode the browser's weak `[hidden]` rule, leaving closed popups and unchecked
indicators visible. The library reset restores `[hidden] { display: none !important; }`, so
Combobox, Select, Menu, Dialog, and related Ark-driven examples can open and close normally.

The theme now uses Rspress variables and BEM hooks instead of Fumadocs aliases and utility-class
shims:

- active sidebar items, heading anchors, links, and hover borders use the neutral gray palette;
- component cards use neutral borders and icon surfaces;
- native Rspress preview cards and the remaining example frames are white in light mode;
- preview content is centered in a 300px minimum-height card with 24px padding, while taller
  examples grow normally;
- examples keep their own intrinsic or authored width; the migration no longer forces
  `width: fit-content` on every preview child;
- the code toggle is absolutely positioned at the center of the preview's lower border instead of
  competing with the demo width;
- expanded preview code uses Rspress's native CodeBlock scroll container after 600px, so the outer
  border and radius stay fixed;
- the public Rspress layout variables set a 272px sidebar and 32px/16px desktop/mobile content
  padding;
- the 56px glass navigation stays more translucent over the homepage;
- the homepage keeps its original green/teal blurred spotlight behind the floating composition;
- the introduction's Tailwind/Fumadocs class block was replaced with a CSS Module component;
- the fragile `:has()` selector targeting the hashed homepage class was removed because
  `pageType: custom` already provides the intended full-width layout.

Sidebar icons use Rspress's official `_meta.json` `tag` field and neutral Lucide SVG assets. A small
BEM override moves the existing tag slot before the label with an 8px gap; the Sidebar is not
ejected or replaced.

Every page description now renders directly below the H1, followed by one actions row. Copy
Markdown is available on every documentation page. The 83 component pages declare a standard
`component` frontmatter value and additionally expose Open in GitHub, View as Markdown, Open in
ChatGPT, and Open in Claude. Their GitHub link targets the shipped source under
`packages/react/src/components/<component>`. Rspress's built-in LLMS title row is disabled through
`themeConfig.llmsUI: false`, while `llms: true` still generates Markdown and both LLMS files, so the
theme no longer renders duplicate controls.

Rspress produces per-page `.md` files during a production build. Its development server does not
serve those build artifacts and falls back to the HTML application shell for a `.md` URL; this is a
Rspress development limitation, not a deployment problem. The production output was checked to
contain Markdown rather than HTML.

The header uses Rspress's `navTitle` slot for the original 28px `currentColor` SVG mark and keeps
the default navigation component. Its translucent background is a CSS-only BEM override. The
homepage's duplicated top padding remains removed, while the useful spotlight layer is restored.
Quick Start uses Rspress `PackageManagerTabs`, including the built-in npm, Yarn, pnpm, Bun, and Deno
icons.

The Rspress application root creates an isolated stacking context and `body` is positioned. Ark
portals therefore paint above Rspress navigation, sidebars, Preview controls, and code blocks
without increasing component z-index values. This fixes Dialog, Drawer, Combobox, Cropper, and
other overlay examples inside the documentation shell.

The focused demo audit also restored stable Card images, the centered Carousel controls from the
old examples, repeatable dynamic slide insertion, and a stable width for Tabs previews.

The intermittent `hoverCardProfiles is not defined` error came from incomplete teaching fragments
being compiled as virtual demos. Those fragments are now ordinary code blocks, while only complete
modules use `preview`. The associated `__webpack_require__.call` message is an HMR symptom of the
stale virtual module. A production build starts from the current graph and passes; an already-open
development tab may need one hard refresh (or one dev-server restart) to discard its stale chunk.

### SEO, AI, and generated output

Every MDX page has a description. Rspress provides the page title, description, Open Graph title,
Open Graph description, and per-page Markdown; the site config adds canonical URLs, the shared
Open Graph image, and Twitter card type.

The production build writes to `apps/docs/doc_build` and contains:

- the homepage plus 117 `/docs/*` routes;
- 118 per-route Markdown files;
- `llms.txt` and `llms-full.txt`;
- `sitemap.xml` with 118 pages and `robots.txt`;
- `/r/react/registry.json` and the hosted registry items.

## Local development and validation

Run from the monorepo root:

```bash
npm run dev --workspace moduix-docs
npm run build:docs
npm run tsc:check --workspace moduix-docs
```

The production output can be served locally with:

```bash
npm run preview --workspace moduix-docs
```

### Completed checks

The reviewed tree passes the repository validation sequence:

- `npm run fmt:fix`;
- `npm run lint:check` with no warnings or errors;
- `npm run build:react`;
- root `npm run tsc:check` (all four workspace tasks passed);
- `npm run build:docs` (118 routes, 118 Markdown files, sitemap, and both llms files);
- `wrangler deploy --dry-run` (669 static assets discovered, with no Cloudflare changes made).

A separate static audit also found no missing MDX descriptions, broken external snippet references,
language-prefixed default routes, region markers, or active Fumadocs/config-transform compatibility
code.

## Deploy to Cloudflare Workers

Workers Static Assets remains the preferred deployment path. The site is fully static, so the
Wrangler config needs no `main`, asset binding, Worker code, or `nodejs_compat`. It serves
`doc_build` directly and uses the generated `404.html` for missing routes.

Authenticate once with `npx wrangler login`, or provide `CLOUDFLARE_API_TOKEN` in CI. Validate the
upload without changing Cloudflare:

```bash
npm run build:docs
npm exec --workspace moduix-docs -- wrangler deploy --dry-run
```

Deploy the production Worker with:

```bash
npm run deploy:docs
```

The production workflow runs `npm run deploy:docs` after the verification workflow succeeds.

## Cloudflare Pages fallback

Pages can deploy the same static directory without application changes. For a Pages Git project:

- root directory: repository root;
- build command: `npm run build:docs`;
- output directory: `apps/docs/doc_build`;
- Node.js version: 24.

For Direct Upload after a local or CI build:

```bash
npx wrangler pages deploy apps/docs/doc_build --project-name moduix
```

Use Workers first; Pages is only a fallback because the existing production infrastructure already
uses Workers Static Assets.

## Production cutover

The repository cutover is complete. Before each production deploy, verify `/`, `/docs/`,
`/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`, and one `/r/react/*.json` item on the
production domain. No page redirects are required because the public route structure is unchanged.

## Manual review note

The production build, static contracts, route output, metadata, and deployment dry run are verified
automatically. The in-app browser was unavailable in this session, so a final visual interaction
pass against the already-running development server is still required before replacing production.