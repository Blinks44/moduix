# moduix documentation on Rspress

This is the moduix documentation site built with Rspress.

## Commands

Run commands from the monorepo root:

```bash
pnpm --filter moduix-docs dev
pnpm run build:docs
pnpm run tsc:check --filter moduix-docs
pnpm run deploy:docs
```

Rspress writes the production site to `website/doc_build`. The deploy command publishes that
directory as Cloudflare Workers Static Assets.

## Structure

```text
website/
  docs/<locale>/        # Localized MDX pages and navigation metadata
  docs/public/          # Static and hosted registry assets shared by locales
  i18n.json             # Locale-aware UI strings
  src/components/       # Home, runnable examples, recipes, and focused MDX support components
  theme/                # Rspress theme wrapper and moduix visual tokens
  rspress.config.ts     # Rspress and official plugin configuration
  wrangler.jsonc        # Cloudflare Workers Static Assets deployment
```

The site uses Rspress search, navigation, outline, appearance switching, edit links, last-updated
metadata, package-manager tabs, and tabs. Official plugins provide runnable component previews,
per-page Markdown, `llms.txt`, `llms-full.txt`, and `sitemap.xml`.

## Localization

English is the default locale. Russian and French are supported localized trees. Keep matching pages,
navigation, framework coverage, and shared examples aligned across every configured locale. Do not add
an implicit English fallback or a locale link that produces a 404; add a page to localized navigation
only when that translation is ready.