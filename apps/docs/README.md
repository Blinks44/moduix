# moduix documentation on Rspress

This is the moduix documentation site built with Rspress.

## Commands

Run commands from the monorepo root:

```bash
npm run dev --workspace moduix-docs
npm run build:docs
npm run tsc:check --workspace moduix-docs
npm run deploy:docs
```

Rspress writes the production site to `apps/docs/doc_build`. The deploy command publishes that
directory as Cloudflare Workers Static Assets.

## Structure

```text
apps/docs/
  docs/en/              # English MDX pages, navigation metadata, and snippets
  docs/public/          # Static and hosted registry assets shared by locales
  i18n.json             # Locale-aware UI strings
  src/components/       # Home, examples, blocks, and focused MDX support components
  theme/                # Rspress theme wrapper and moduix visual tokens
  rspress.config.ts     # Rspress and official plugin configuration
  wrangler.jsonc        # Cloudflare Workers Static Assets deployment
```

The site uses Rspress search, navigation, outline, appearance switching, edit links, last-updated
metadata, package-manager tabs, and tabs. Official plugins provide runnable component previews,
per-page Markdown, `llms.txt`, `llms-full.txt`, and `sitemap.xml`.

See [MIGRATION.md](./MIGRATION.md) for the implementation report and deployment procedure.